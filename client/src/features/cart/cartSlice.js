import { createSlice } from '@reduxjs/toolkit';

// Load initial cart and wishlist from localStorage if available
const loadInitialState = () => {
  try {
    const savedCart = localStorage.getItem('glome_cart');
    const savedWishlist = localStorage.getItem('glome_wishlist');
    return {
      items: savedCart ? JSON.parse(savedCart) : [],
      wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
      lastAddedItem: null,
    };
  } catch {
    return {
      items: [],
      wishlist: [],
      lastAddedItem: null,
    };
  }
};

const initialState = loadInitialState();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, selectedSize, selectedColor, quantity = 1 } = action.payload;
      const size = selectedSize || product.sizes?.[0] || 'Standard';
      const color = selectedColor || product.colors?.[0]?.name || 'Standard';

      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          color,
          brand: product.brand,
          quantity,
        });
      }

      state.lastAddedItem = {
        name: product.name,
        price: product.price,
        size,
        color,
        timestamp: Date.now(),
      };

      try {
        localStorage.setItem('glome_cart', JSON.stringify(state.items));
      } catch {
        // Ignore storage write issues
      }
    },
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      );
      try {
        localStorage.setItem('glome_cart', JSON.stringify(state.items));
      } catch {
        // Ignore
      }
    },
    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.id === id && i.size === size && i.color === color
      );
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (i) => !(i.id === id && i.size === size && i.color === color)
          );
        } else {
          item.quantity = quantity;
        }
      }
      try {
        localStorage.setItem('glome_cart', JSON.stringify(state.items));
      } catch {
        // Ignore
      }
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existsIndex = state.wishlist.findIndex((id) => id === product.id);
      if (existsIndex >= 0) {
        state.wishlist.splice(existsIndex, 1);
      } else {
        state.wishlist.push(product.id);
      }
      try {
        localStorage.setItem('glome_wishlist', JSON.stringify(state.wishlist));
      } catch {
        // Ignore
      }
    },
    clearLastAdded: (state) => {
      state.lastAddedItem = null;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleWishlist, clearLastAdded } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart?.items || [];
export const selectCartCount = (state) =>
  state.cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
export const selectCartSubtotal = (state) =>
  state.cart?.items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
export const selectWishlist = (state) => state.cart?.wishlist || [];
export const selectIsWishlisted = (id) => (state) =>
  state.cart?.wishlist?.includes(id) || false;
export const selectLastAddedItem = (state) => state.cart?.lastAddedItem;

export default cartSlice.reducer;
