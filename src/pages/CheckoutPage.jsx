import Nav from "../components/Nav";
import Receipt from "../components/Receipt";
import React from "react";
const CheckoutPage = ({ handleShowCart }) => {
   return (
      < div >
         <Nav handleShowCart={handleShowCart} showCart={true} />
         <div className='d-flex justify-content-center'>
            <div className='col-5 mt-5'>
               <Receipt />
            </div>
         </div>
      </div >
   );
}

export default CheckoutPage;