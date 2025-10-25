/* eslint-disable no-unused-vars */

import { motion } from 'framer-motion';
import { useCartStore } from '../stores/useCartStore';
import { Link, useNavigate } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

const stripePromise = loadStripe(
  'pk_test_51RNvhdP3AdoE9sbBvR9VzC4YLPVUhOMt4QsgWC33rbW1CbiUFT5255eLjZzJKGNtJ1Hym39rNF0n5zShfknFLgBu00x72r1R5Y'
);

const OrderSummary = () => {
  const { total, subTotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subTotal - total;
  const formattedSubtotal = subTotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);
  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const { data } = await axios.post(
        'payments/create-checkout-session',
        {
          products: cart,
          couponCode: coupon ? coupon.code : null,
        },
        {
          withCredentials: true,
        }
      );

      const url = data.session.url;
      window.location.href = url;
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <motion.div
      className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <p className='text-xl font-semibold text-emerald-400'>Order summary</p>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <dl className='flex items-center justify-between gap-4'>
            <dt className='text-base font-normal text-gray-300'>
              Original price
            </dt>
            <dd className='text-base font-medium text-white'>
              ${formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-300'>Savings</dt>
              <dd className='text-base font-medium text-emerald-400'>
                -${formattedSavings}
              </dd>
            </dl>
          )}
          {coupon && isCouponApplied && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-300'>
                Coupon ({coupon.code})
              </dt>
              <dd className='text-base font-medium text-emerald-400'>
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
            <dt className='text-base font-bold text-white'>Total</dt>
            <dd className='text-base font-bold text-emerald-400'>
              ${formattedTotal}
            </dd>
          </dl>
        </div>
        <motion.button
          className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}>
          Proceed to Checkout
        </motion.button>
        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-gray-400'>or</span>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'>
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
