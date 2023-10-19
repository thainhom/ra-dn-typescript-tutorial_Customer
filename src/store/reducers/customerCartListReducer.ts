import { createReducer } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu cho một sản phẩm trong giỏ hàng
interface CartItem {
  product_id?: number;
  quantity: number;
  unit_price: number;
  subTotal: number;
  name: string;
  id: string;
}

// Định nghĩa kiểu cho trạng thái giỏ hàng
interface CustomerCartListState {
  cart: CartItem[];
  numberOfItems: number;
  total: number;
}

// Hàm tính tổng số tiền trong giỏ hàng
const calculateTotal = (cart: CartItem[]) => {
  let total = 0;
  for (let item of cart) {
    total += item.subTotal;
  }
  return total;
};

// Hàm lấy giỏ hàng từ Local Storage
const getCartFromLocalStorage = () => {
  const cartFromStorage = window.localStorage.getItem("cart");
  return cartFromStorage ? JSON.parse(cartFromStorage) : [];
};

const cart: CartItem[] = getCartFromLocalStorage();

const initialState: CustomerCartListState = {
  cart: cart,
  numberOfItems: cart.length,
  total: calculateTotal(cart),
};

const customerCartListReducer = createReducer(initialState, {
  ADD_TO_CART: (state, action: PayloadAction<CartItem>) => {
    const { product_id, quantity, unit_price } = action.payload;
    let isExist = false;
    const updatedCart = state.cart.map((item) => {
      if (item.product_id === product_id) {
        isExist = true;
        const newQuantity = item.quantity + quantity;

        return {
          ...item,
          quantity: newQuantity,
          subTotal: item.unit_price * newQuantity,
        };
      }
      return item;
    });

    if (!isExist) {
      updatedCart.push({ ...action.payload, subTotal: unit_price * quantity });
    }

    return {
      cart: updatedCart,
      numberOfItems: updatedCart.length,
      total: calculateTotal(updatedCart),
    };
  },
  CHANGE_Quantity: (state, action: PayloadAction<CartItem>) => {
    const { product_id, quantity } = action.payload;
    const updatedCart = state.cart.map((item) => {
      if (item.product_id === product_id) {
        item.quantity = quantity;
        item.subTotal = item.unit_price * quantity;
      }
      return item;
    });

    return {
      cart: updatedCart,
      numberOfItems: updatedCart.length,
      total: calculateTotal(updatedCart),
    };
  },
  CHECKOUT: (state, action: PayloadAction<{ note: any }>) => {
    const ordersFromStorage = window.localStorage.getItem("orders");
    const orders = ordersFromStorage ? JSON.parse(ordersFromStorage) : [];

    const newOrder = {
      total_price: calculateTotal(state.cart),
      note: action.payload.note,
      orderDetails: state.cart,
      status: "Đơn hàng mới",
      serial_number: new Date().getTime(),
    };

    window.localStorage.setItem(
      "orders",
      JSON.stringify([...orders, newOrder])
    );
    window.localStorage.removeItem("cart");

    return {
      cart: [],
      numberOfItems: 0,
      total: 0,
    };
  },
  DELETE_FROM_CART: (state, action: PayloadAction<any>) => {
    const idFromCart = action.payload;
    state.cart = state.cart.filter((c) => c.product_id !== idFromCart);
  },
});

export default customerCartListReducer;
