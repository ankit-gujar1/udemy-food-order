import React from 'react'
import { useCartContext } from '../contexts/CartContext';
import { useUserProgressContext } from '../contexts/UserProgressContext';
import Modal from './UI/Modal';
import { currencyFormatter } from '../utils/formatting';
import Input from './UI/Input';
import Button from './UI/Button';

const Checkout = () => {
    const { items } = useCartContext();
    const { progress, hideCheckout } = useUserProgressContext();
    const cartTotal = items.reduce(
        (totalPrice, item) => totalPrice + item.qty * item.price,
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items,
                    customer: customerData
                }
            })
        });
    }
    return (
        <Modal open={progress === 'checkout'} onClose={hideCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={hideCheckout}>
                        Close
                    </Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}

export default Checkout