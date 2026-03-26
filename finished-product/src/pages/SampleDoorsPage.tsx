import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { images } from '../assets/images';

const SampleDoorsPage: React.FC = () => {
  const { addToCart } = useCart();
  
  const doorStyles = [
    // <!-- DYNAMIC: loop through sample door products here -->
  ];

  const handleAddToCart = (door: typeof doorStyles[0]) => {
    addToCart({
      id: door.id,
      name: door.name,
      sku: door.id.toUpperCase(),
      price: door.price,
      image: door.image,
      quantity: 1
    });
  };

  return (
    <Layout>
      <Breadcrumbs label="Sample Doors" />
      
      {/* Products Grid */}
      <section className="px-8 py-[72px] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {/* <!-- DYNAMIC: loop through sample door products here --> */}
            {doorStyles.map((door, index) => (
              <motion.div 
                key={door.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index % 4 * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-square mb-6 overflow-hidden bg-white group/image">
                  {/* <!-- DYNAMIC: product image --> */}
                  <img 
                    src={door.image} 
                    alt={door.name} 
                    className="absolute inset-0 w-full h-full object-contain bg-white transition-transform duration-500 group-hover/image:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Quick Add Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(door);
                    }}
                    className="absolute bottom-4 left-4 right-4 bg-white py-3 text-[11px] font-bold uppercase tracking-widest text-pk-dark opacity-0 translate-y-4 transition-all duration-300 group-hover/image:opacity-100 group-hover/image:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={14} />
                    Add to Cart
                  </button>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <h3 className="text-[15px] font-medium text-pk-dark group-hover:text-pk-gold transition-colors line-clamp-1">
                    {/* <!-- DYNAMIC: product title --> */}
                    {door.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-[12px]">
                    <div className="flex text-pk-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          fill={i < Math.floor(door.rating) ? "currentColor" : "none"} 
                          className={i < Math.floor(door.rating) ? "" : "text-pk-border"}
                        />
                      ))}
                    </div>
                    <span className="text-pk-muted">({door.reviews})</span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[16px] font-bold text-pk-dark">
                      {/* <!-- DYNAMIC: product price --> */}
                      ${door.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Sample Program Section */}
      <section className="px-8 py-[72px] bg-white border-t border-pk-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-pk-gold block">Try Before You Buy</span>
              <h2 className="text-[42px] md:text-[56px] font-serif font-normal text-pk-dark leading-[1.1]">
                The Sample Program
              </h2>
              <div className="space-y-6 text-[15px] text-pk-muted leading-[1.8]">
                <p>
                  Choosing the right finish for your kitchen is a big decision. That's why we offer a comprehensive sample program that brings our workshop to your doorstep.
                </p>
                <ul className="space-y-5">
                  {[
                    { num: '01', text: 'Order up to 3 sample doors to compare different styles and materials.' },
                    { num: '02', text: 'The cost of your samples is fully refundable when you place a full kitchen order.' },
                    { num: '03', text: 'Free shipping on all sample orders within the continental US.' }
                  ].map((item) => (
                    <li key={item.num} className="flex gap-5">
                      <span className="text-pk-gold font-bold text-[13px] pt-1">{item.num}.</span>
                      <span className="text-pk-dark">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6">
                <Button className="px-10">Learn More About Our Process</Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-white">
                <img 
                  src={images.sampleDoors.grayShakerBanner} 
                  alt="Sample Door Program" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 md:-left-12 bg-pk-dark p-8 md:p-12 max-w-[320px] hidden md:block"
              >
                <p className="text-white text-[20px] md:text-[24px] font-serif italic leading-relaxed">
                  "Seeing the samples in our own light made all the difference."
                </p>
                <p className="text-pk-gold text-[10px] font-bold uppercase tracking-[0.2em] mt-6">
                  — Sarah M., Los Angeles
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SampleDoorsPage;
