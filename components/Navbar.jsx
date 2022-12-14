import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">

      <p className="logo">
        <Link href="/">Soccer Gear</Link>
      </p>

      {/* showCart true if cart clicked on, false if click away */}
      <button type="button" className="cart-icon" onClick={ () => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {/* Only show cart if showCart is true*/}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar