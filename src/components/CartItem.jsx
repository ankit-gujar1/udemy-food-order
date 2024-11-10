import React from 'react'
import { currencyFormatter } from '../utils/formatting'
import { useCartContext } from '../contexts/CartContext'

const CartItem = ({ item }) => {
    const { addItem, removeItem } = useCartContext();
    return (
        <li className='cart-item'>
            <p>
                {item.name} - {item.qty} x {currencyFormatter.format(item.price)}
            </p>
            <p className='cart-item-actions'>
                <button onClick={() => removeItem(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => addItem(item)}>+</button>
            </p>
        </li>
    )
}

export default CartItem