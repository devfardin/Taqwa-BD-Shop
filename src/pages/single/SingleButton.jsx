import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import CartModal from '../../components/Modal/CartModal';
import { toast } from 'react-toastify';

const SingleButton = ({ product }) => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const addProductsToCart = (product) => {
            const existingCart = JSON.parse(localStorage.getItem('cart')) || []
            const productExists = existingCart.find((item) => item.id === product.id);
            
            let cart;
            if (productExists) {
                productExists.quantity += 1;
                cart = existingCart;
            } else {
                // Clear existing cart and add new product
                product.quantity = 1;
                cart = [product];
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));
            setCart([...cart]);
            if (cart.length > 0) {
                toast.success('Successfully Product add to cart')
                navigate('/checkout');
            } else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Product not added to cart",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
    return (
        <div className='flex gap-3'>
            <button onClick={() => addProductsToCart(product)}
                className='bg-primary text-white px-2 py-3 cursor-pointer transition-colors duration-300 w-full block text-center text-xl font-semibold rounded'>
                অর্ডার করুন
            </button>
        </div>
    )
}

export default SingleButton
