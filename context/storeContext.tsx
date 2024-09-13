'use client';
import { Product } from '@/utils/types';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types
// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   // Add other product properties as needed
// }

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; updateType: string } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, updateType: string) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
};

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: parseFloat((state.total + action.payload.price).toFixed(2)),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: parseFloat((state.total + action.payload.price).toFixed(2)),
      };
    }
    case 'REMOVE_FROM_CART': {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (!itemToRemove) return state;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: parseFloat((state.total - itemToRemove.price * itemToRemove.quantity).toFixed(2)),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, updateType } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (!item) return state; // Item not found, return state unchanged
    
      if (updateType === 'increment') {
        // Increment the quantity and update the total
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          total: parseFloat((state.total + item.price).toFixed(2)), // Add price of one unit
        };
      } else if (updateType === 'decrement') {
        if (item.quantity === 1) {
          // If quantity is 1, remove the item completely and subtract its full price
          return {
            ...state,
            items: state.items.filter((item) => item.id !== id),
            total: parseFloat((state.total - item.price).toFixed(2)), // Subtract the price of the last item
          };
        } else {
          // Decrement quantity and update the total
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
            total: parseFloat((state.total - item.price).toFixed(2)), // Subtract price of one unit
          };
        }
      }
      return state;
    }
    

    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: number, updateType: string) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, updateType },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
