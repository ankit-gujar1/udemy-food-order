import React from 'react'
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import { useCartContext } from '../contexts/CartContext';
import { useUserProgressContext } from '../contexts/UserProgressContext';
const Header = () => {
    const { items } = useCartContext();
    const { showCart } = useUserProgressContext();
    const totalCartItems = items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.qty;
    }, 0)
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={showCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}

export default Header