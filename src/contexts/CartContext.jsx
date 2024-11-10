import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext({
    items: [], //ex:- [{ item: pizza, qty: 0 }, { item: burger, qty: 0 }]
    addItem: (item) => { },
    removeItem: (id) => { }
});

export const useCartContext = () => {
    return useContext(CartContext);
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = state.items.findIndex((i) => i.id === action.item.id);

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = { //create new object
                ...existingItem,
                qty: existingItem.qty + 1
            }

            updatedItems[existingCartItemIndex] = updatedItem; //replace old object with new one
        }
        else {
            updatedItems.push({ ...action.item, qty: 1 });
        }
        return { ...state, items: updatedItems };
    }


    if (action.type === 'REMOVE_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = state.items.findIndex((i) => i.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex]; //{ item: burger, qty: 2 }

        if (existingCartItem.qty === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        }
        else {
            const updatedItem = { //create new object
                ...existingCartItem,
                qty: existingCartItem.qty - 1
            }

            updatedItems[existingCartItemIndex] = updatedItem; //replace old object with new one
        }

        return { ...state, items: updatedItems };
    }

    return state;
}

export const CartContextProvider = ({ children }) => {
    const [cart, dispatchCart] = useReducer(cartReducer, {
        items: []
    })
    console.log(cart);
    

    const addItem = (item) => {
        dispatchCart({ type: 'ADD_ITEM', item });
    }

    const removeItem = (id) => {
        dispatchCart({ type: 'REMOVE_ITEM', id });
    }

    return (
        <CartContext.Provider value={{ items: cart.items, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}
