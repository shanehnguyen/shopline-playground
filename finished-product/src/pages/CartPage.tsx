import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ChevronDown, ChevronUp, Truck } from 'lucide-react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const [orderNotesOpen, setOrderNotesOpen] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');

  if (cart.length === 0) {
    return (
      <Layout>
        <Breadcrumbs label="Your Cart" />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="w-20 h-20 bg-white border border-pk-border rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="text-pk-muted" size={32} />
            </div>
            <div className="space-y-4">
              <h1 className="text-[42px] font-serif text-pk-dark">Your cart is empty</h1>
              <p className="text-pk-muted max-w-md mx-auto">
                Looks like you haven't added any cabinets to your cart yet. Explore our collections to find the perfect fit for your kitchen.
              </p>
            </div>
            <Link to="/products">
              <Button className="mt-4">Continue Shopping</Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumbs label="Your Cart" />
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Left Side: Cart Items */}
            <div className="lg:w-[70%] space-y-10">
              <div className="flex justify-between items-end border-b border-pk-border pb-6">
                <h1 className="text-[32px] md:text-[42px] font-serif text-pk-dark leading-none">Your cart</h1>
                <span className="text-[13px] font-medium text-pk-muted uppercase tracking-wider">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="space-y-12">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-8 pb-12 border-b border-pk-border last:border-0">
                    {/* Thumbnail */}
                    <div className="w-full md:w-[120px] aspect-square bg-white border border-pk-border overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-pk-gold">
                          SKU: {item.sku}
                        </span>
                        <Link to={`/product/${item.id}`} className="block text-[18px] font-medium text-pk-dark hover:text-pk-gold transition-colors leading-tight">
                          {item.name}
                        </Link>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-[18px] font-bold text-pk-gold">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-8 pt-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-pk-input-border">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-pk-dark hover:bg-pk-placeholder-bg transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity}
                            readOnly
                            className="w-12 text-center text-[14px] font-medium focus:outline-none bg-transparent"
                          />
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-pk-dark hover:bg-pk-placeholder-bg transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-pk-muted hover:text-pk-dark transition-colors"
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Order Summary */}
            <div className="lg:w-[30%]">
              <div className="sticky top-24 space-y-8">
                {/* Order Summary Box */}
                <div className="border border-pk-border p-8 space-y-8">
                  <h2 className="text-[24px] font-serif text-pk-dark border-b border-pk-border pb-4">Order Summary</h2>
                  
                  {/* Order Notes */}
                  <div className="space-y-4">
                    <button 
                      onClick={() => setOrderNotesOpen(!orderNotesOpen)}
                      className="flex items-center justify-between w-full text-[13px] font-bold uppercase tracking-wider text-pk-dark hover:text-pk-gold transition-colors"
                    >
                      <span>Add order notes</span>
                      {orderNotesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence>
                      {orderNotesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <textarea 
                            value={orderNotes}
                            onChange={(e) => setOrderNotes(e.target.value)}
                            placeholder="How can we help you?"
                            className="w-full h-32 p-4 text-[14px] border border-pk-input-border focus:outline-none focus:border-pk-gold transition-colors resize-none"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[14px] text-pk-muted">Subtotal</span>
                      <span className="text-[24px] font-bold text-pk-dark">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[14px] text-pk-muted">Shipping</span>
                      <span className="text-[14px] text-pk-muted italic">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-pk-border pt-4">
                      <span className="text-[16px] font-bold text-pk-dark">Total</span>
                      <span className="text-[24px] font-bold text-pk-gold">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full py-5 text-[14px] tracking-[0.1em]">
                    PROCEED TO CHECKOUT
                  </Button>

                  <div className="text-center">
                    <Link to="/products" className="text-[13px] text-pk-muted hover:text-pk-gold transition-colors underline underline-offset-4">
                      Continue Shopping
                    </Link>
                  </div>

                  <div className="pt-4 flex flex-col items-center gap-4">
                    <p className="text-[11px] uppercase tracking-widest text-pk-muted font-bold">Secure Checkout</p>
                    <div className="flex gap-3 opacity-50 grayscale">
                      <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" className="h-4" />
                      <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-4" />
                      <img src="https://cdn-icons-png.flaticon.com/512/349/349230.png" alt="Amex" className="h-4" />
                      <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="PayPal" className="h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
