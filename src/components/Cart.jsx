import React from 'react'
import Modal from './UI/Modal'
import { useCartContext } from '../contexts/CartContext'
import { currencyFormatter } from '../utils/formatting';
import Button from './UI/Button';
import { useUserProgressContext } from '../contexts/UserProgressContext';
import CartItem from './CartItem';

const Cart = () => {
    const { items } = useCartContext();
    const { progress, hideCart, showCheckout } = useUserProgressContext();
    const cartTotal = items.reduce(
        (totalPrice, item) => totalPrice + item.qty * item.price,
        0
    );
    // console.log(cartTotal);

    return (
        <Modal className='cart' open={progress === 'cart'} onClose={progress === 'cart' ? hideCart : null}>
            <h2>Cart</h2>
            <ul>
                {items && items.map((i) => (
                    <CartItem key={i.id} item={i} />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={hideCart}>Close</Button>
                {items.length > 0 && <Button onClick={showCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}

export default Cart