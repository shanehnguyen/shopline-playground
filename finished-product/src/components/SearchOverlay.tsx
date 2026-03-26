import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ChevronLeft, ChevronRight, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../assets/images';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "Base Cabinets", 
  "Wall Cabinets", 
  "Tall Cabinets", 
  "Drawer Sets", 
  "Corner Cabinets", 
  "Pantry", 
  "Vanity"
];

const POPULAR_SEARCHES = [
  "Shaker", "Base Cabinet", "Wall Cabinet", "Drawer Set", "Island", 
  "Pantry", "Tall Cabinet", "Corner Cabinet", "Vanity", "Floating Shelf"
];

const ALL_PRODUCTS = [
  // <!-- DYNAMIC: loop through all products for search here -->
];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
      setSelectedCategories([]);
      setSortBy('relevance');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle click outside for overlay and sort dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const filteredProducts = ALL_PRODUCTS
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // relevance (default)
    });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Rating', value: 'rating' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-[60]"
          />
          
          {/* Overlay Content */}
          <motion.div
            ref={overlayRef}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`fixed top-0 left-0 w-full bg-white z-[70] shadow-2xl overflow-hidden transition-all duration-300 ${
              searchQuery !== '' ? 'h-screen' : 'h-auto max-h-[90vh]'
            } overflow-y-auto`}
          >
            {/* Top Bar */}
            <div className="h-[70px] w-full border-b border-pk-border flex items-center px-4 md:px-12 sticky top-0 bg-white z-10">
              <Search size={18} className="text-pk-muted" strokeWidth={1.5} />
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 ml-4 h-full bg-transparent border-none outline-none text-[16px] font-sans text-pk-dark placeholder:text-pk-muted"
              />
              <button 
                onClick={onClose}
                className="p-2 text-pk-muted hover:text-pk-dark transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Content Area */}
            <div className="px-4 md:px-12 py-6 md:py-10 pb-12">
              {searchQuery === '' ? (
                <div className="flex flex-col md:flex-row gap-10">
                  {/* Left Column: Popular Searches */}
                  <div className="w-full md:w-[200px] flex-shrink-0">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-pk-muted mb-4 font-sans">
                      Popular searches
                    </h4>
                    <div className="flex flex-wrap md:flex-col gap-x-4 gap-y-1">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="text-[14px] text-pk-muted hover:text-pk-dark text-left leading-[32px] transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Recommended Products */}
                  <div className="flex-1 min-w-0 relative">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-pk-muted mb-4 font-sans">
                      Recommended products
                    </h4>
                    
                    <div className="relative group/scroll">
                      <button 
                        onClick={() => scroll('left')}
                        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 p-2 bg-white rounded-full shadow-md text-pk-dark opacity-0 group-hover/scroll:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={() => scroll('right')}
                        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 p-2 bg-white rounded-full shadow-md text-pk-dark opacity-0 group-hover/scroll:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={20} />
                      </button>

                      <div 
                        ref={scrollContainerRef}
                        className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory"
                      >
                        {/* <!-- DYNAMIC: loop through recommended products here --> */}
                        {ALL_PRODUCTS.slice(0, 6).map((product) => (
                          <Link 
                            key={product.id}
                            to="/product"
                            onClick={onClose}
                            className="w-[75%] sm:w-[240px] md:w-[160px] flex-shrink-0 group snap-start"
                          >
                            <div className="h-[200px] border border-pk-border rounded-sm overflow-hidden flex flex-col">
                              <div className="h-[65%] bg-white flex items-center justify-center overflow-hidden">
                                {/* <!-- DYNAMIC: product image --> */}
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 p-3 bg-white">
                                <p className="text-[13px] text-pk-dark font-sans leading-tight line-clamp-2">
                                  {/* <!-- DYNAMIC: product title --> */}
                                  {product.name}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-10">
                  {/* Left Column: Categories Filter */}
                  <div className="w-full md:w-[200px] flex-shrink-0">
                    <div className="flex items-center justify-between md:block mb-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-pk-muted font-sans">
                        Categories
                      </h4>
                      <button 
                        className="md:hidden text-[11px] font-bold uppercase tracking-widest text-pk-dark"
                        onClick={() => {
                          const el = document.getElementById('mobile-categories');
                          if (el) el.classList.toggle('hidden');
                        }}
                      >
                        Toggle Filters
                      </button>
                    </div>
                    <div id="mobile-categories" className="hidden md:flex flex-col">
                      {CATEGORIES.map((category) => (
                        <label 
                          key={category}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="relative flex items-center justify-center">
                            <input 
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="peer appearance-none w-4 h-4 border border-pk-border rounded-sm checked:bg-pk-dark checked:border-pk-dark transition-all"
                            />
                            <svg 
                              className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor" 
                              strokeWidth="4"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[14px] text-pk-muted group-hover:text-pk-dark leading-[32px] transition-colors">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Search Results */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <p className="text-[14px] text-pk-muted">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
                      </p>
                      <div className="relative" ref={sortRef}>
                        <button 
                          onClick={() => setIsSortOpen(!isSortOpen)}
                          className="flex items-center gap-2 text-[14px] text-pk-muted hover:text-pk-dark transition-colors"
                        >
                          <span>Sorted by: {sortOptions.find(o => o.value === sortBy)?.label}</span>
                          <ChevronDown size={14} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isSortOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute right-0 mt-2 w-[200px] bg-white border border-pk-border rounded-sm shadow-xl z-20 py-2"
                            >
                              {sortOptions.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => {
                                    setSortBy(option.value);
                                    setIsSortOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 text-[14px] transition-colors ${
                                    sortBy === option.value 
                                      ? 'bg-pk-placeholder-bg text-pk-dark font-medium' 
                                      : 'text-pk-muted hover:bg-pk-placeholder-bg hover:text-pk-dark'
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {/* <!-- DYNAMIC: loop through search results here --> */}
                        {filteredProducts.map((product) => (
                          <Link 
                            key={product.id}
                            to="/product"
                            onClick={onClose}
                            className="group"
                          >
                            <div className="border border-pk-border rounded-sm overflow-hidden flex flex-col bg-white h-full">
                              <div className="aspect-[4/5] bg-white flex items-center justify-center overflow-hidden">
                                {/* <!-- DYNAMIC: product image --> */}
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="p-3 md:p-4 space-y-1.5 flex-1 flex flex-col">
                                <h3 className="text-[13px] md:text-[14px] font-medium text-pk-dark font-sans leading-tight line-clamp-2 min-h-[2.5rem]">
                                  {/* <!-- DYNAMIC: product title --> */}
                                  {product.name}
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] md:text-[11px]">
                                  <div className="flex items-center text-pk-gold">
                                    <Star size={10} fill="currentColor" />
                                    <span className="font-medium ml-1 text-pk-dark">{product.rating}/5</span>
                                  </div>
                                  <span className="hidden md:inline text-pk-border">|</span>
                                  <span className="text-pk-muted">{product.reviewCount} reviews</span>
                                  <span className="hidden md:inline text-pk-border">|</span>
                                  <span className="text-pk-muted">{product.dimensions}</span>
                                </div>

                                <div className="pt-auto mt-2">
                                  <p className="text-[14px] md:text-[15px] font-medium text-pk-dark">
                                    {/* <!-- DYNAMIC: product price --> */}
                                    ${product.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-[16px] text-pk-dark font-medium mb-2">No results found</p>
                        <p className="text-[14px] text-pk-muted">Try adjusting your search or filters to find what you're looking for.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;

