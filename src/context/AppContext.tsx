import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc,
  getDocFromServer
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Watch, CartItem, UserProfile } from "../types";

interface AppContextType {
  user: UserProfile | null;
  loading: boolean;
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  addToCart: (watch: Watch, quantityToAdd?: number) => void;
  removeFromCart: (watchId: string) => void;
  updateCartQuantity: (watchId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  triggerCheckoutWhatsApp: () => void;
  triggerSingleWatchWhatsApp: (watch: Watch) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. Listen for standard Firebase Google Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        const profile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        setUser(profile);

        // Load cart from Firestore as secondary remote restore
        try {
          const cartDocRef = doc(db, "carts", firebaseUser.uid);
          // Standard connection validation helper
          const docSnap = await getDoc(cartDocRef);
          if (docSnap.exists()) {
            const remoteItems = docSnap.data().items as CartItem[];
            if (remoteItems && remoteItems.length > 0) {
              setCartItems(remoteItems);
            }
          }
        } catch (error) {
          console.error("Firestore cart restore error:", error);
        }
      } else {
        setUser(null);
        // For logged-out user, retrieve from localStorage
        const storedCart = localStorage.getItem("aurafarm-cart");
        if (storedCart) {
          try {
            setCartItems(JSON.parse(storedCart));
          } catch (e) {
            console.error("Local cart parse error:", e);
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Load LocalStorage Cart once on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("aurafarm-cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("localStorage cart load error:", e);
      }
    }
  }, []);

  // 3. Save Cart to both LocalStorage and Firestore upon adjustments
  useEffect(() => {
    // Save to LocalStorage
    localStorage.setItem("aurafarm-cart", JSON.stringify(cartItems));

    // Save to Firestore if user is authenticated
    if (user) {
      const syncCartToFirestore = async () => {
        try {
          const cartDocRef = doc(db, "carts", user.uid);
          await setDoc(cartDocRef, {
            userId: user.uid,
            items: cartItems,
            updatedAt: new Date().toISOString()
          });
        } catch (error) {
          console.error("Firestore cart sync error:", error);
        }
      };
      
      const timeoutId = setTimeout(syncCartToFirestore, 800);
      return () => clearTimeout(timeoutId);
    }
  }, [cartItems, user]);

  // Google Sign-In Dialog popup flow
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Googlepopup signin error:", e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCartItems([]);
      localStorage.removeItem("aurafarm-cart");
    } catch (e) {
      console.error("Sign-out error:", e);
    }
  };

  const addToCart = (watch: Watch, quantityToAdd = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.watch.id === watch.id);
      if (existingItem) {
        return prev.map((item) =>
          item.watch.id === watch.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      }
      return [...prev, { watch, quantity: quantityToAdd }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (watchId: string) => {
    setCartItems((prev) => prev.filter((item) => item.watch.id !== watchId));
  };

  const updateCartQuantity = (watchId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(watchId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.watch.id === watchId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("aurafarm-cart");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.watch.price * item.quantity, 0);

  // WhatsApp formatted DM redirect utility
  const triggerCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;
    const whatsappNum = "919110242527"; // Use updated phone number EVERYWHERE
    
    let text = "Interested to buy:\n\n";
    cartItems.forEach((item) => {
      text += `${item.watch.brand} ${item.watch.name} - ₹${item.watch.price.toLocaleString("en-IN")}${item.quantity > 1 ? ` (x${item.quantity})` : ""}\n`;
    });
    
    text += `\nTotal - ₹${cartTotal.toLocaleString("en-IN")}`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  const triggerSingleWatchWhatsApp = (watch: Watch) => {
    const whatsappNum = "919110242527"; // Use updated phone number EVERYWHERE
    const text = `Interested to buy:\n\n${watch.brand} ${watch.name} - ₹${watch.price.toLocaleString("en-IN")}\n\nTotal - ₹${watch.price.toLocaleString("en-IN")}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        cartItems,
        isCartOpen,
        setIsCartOpen,
        loginWithGoogle,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        triggerCheckoutWhatsApp,
        triggerSingleWatchWhatsApp
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used inside an AppProvider");
  }
  return context;
};
