import React, { createContext, useContext, useState } from 'react'

export const UserProgressContext = createContext({
    progress: '', //'cart', 'checkout'
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { },
});

export const useUserProgressContext = () => {
    return useContext(UserProgressContext);
}

const UserProgressContextProvider = ({ children }) => {
    const [progress, setProgress] = useState('');

    const showCart = () => {
        setProgress('cart');
    }
    const hideCart = () => {
        setProgress('');
    }
    const showCheckout = () => {
        setProgress('checkout');
    }
    const hideCheckout = () => {
        setProgress('');
    }
    return (
        <UserProgressContext.Provider value={{ showCart, hideCart, showCheckout, hideCheckout, progress }}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContextProvider