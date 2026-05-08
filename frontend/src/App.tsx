/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, ChevronDown, Play, ArrowRight, ArrowLeft, ArrowUpRight, Instagram, Facebook, Pin, ShoppingBag, Armchair, Sofa, Bed, Archive, Lamp, DoorOpen } from 'lucide-react';

const products = [
  { 
    title: 'Cloud Sectional Sofa Five Stars China Factory', 
    price: '$1,140.00', 
    category: 'Sofa',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    title: 'Compact Wooden Storage Bed DKHousehold Products', 
    price: '$440.00', 
    oldPrice: '$475.00', 
    category: 'Bed',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    title: 'Comfortable Velvet Dining Chair Qing-yun', 
    price: '$191.00', 
    oldPrice: '$280.00', 
    category: 'Chair',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    title: 'Chic Floor Dining Chair Fu-Yao', 
    price: '$218.00', 
    oldPrice: '$230.00', 
    category: 'Chair',
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    title: 'Comfortable and Elegant Lounge Seating Harmonia Designs', 
    price: '$878.00', 
    oldPrice: '$899.00', 
    category: 'Sofa',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80' 
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. Header (Top Nav) */}
      <header className="relative flex items-center justify-between px-8 h-[4.5rem] border-b border-gray-100">
        <nav className="flex items-center space-x-6 text-sm font-medium text-gray-800">
          <a href="#" className="flex items-center hover:text-black">Home <ChevronDown size={14} className="ml-1 opacity-70"/></a>
          <a href="#" className="flex items-center hover:text-black">New Arrivals <ChevronDown size={14} className="ml-1 opacity-70"/></a>
          <a href="#" className="flex items-center hover:text-black">Collections <ChevronDown size={14} className="ml-1 opacity-70"/></a>
          <a href="#" className="flex items-center hover:text-black">Resources <ChevronDown size={14} className="ml-1 opacity-70"/></a>
        </nav>
        
        {/* Centered Logo Block */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 bg-[#111111] text-white px-10 h-full flex flex-col justify-center items-center">
          <span className="text-[28px] font-medium tracking-wide font-serif">Urban Dén</span>
        </div>
        
        <div className="flex items-center space-x-6 text-sm font-medium z-10">
          <button className="text-gray-800 hover:text-black"><Search size={18} strokeWidth={2.5} /></button>
          <a href="#" className="flex items-center hover:text-black">Login <span className="ml-3 text-gray-300">•</span></a>
          <a href="#" className="bg-[#111111] text-white px-6 py-[10px] rounded-full hover:bg-black transition">Sign up</a>
        </div>
      </header>

      {/* 2. Secondary Header (Sub Nav) */}
      <div className="flex justify-between items-center px-8 py-[10px] border-b border-gray-100 text-xs">
        <div className="flex items-center space-x-5 text-gray-600 font-medium tracking-wide">
          <a href="#" className="hover:text-black">Instagram</a>
          <a href="#" className="hover:text-black">Facebook</a>
          <a href="#" className="hover:text-black">Pinterest</a>
        </div>
        <div className="flex items-center space-x-4 text-gray-500 tracking-wider">
          <a href="#" className="hover:text-black">Snap Deal</a>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <a href="#" className="hover:text-black">Find Store</a>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <a href="#" className="hover:text-black">Upcoming Events</a>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <a href="#" className="hover:text-black">FAQs</a>
        </div>
        <div>
          <button className="bg-[#111111] text-white px-5 py-[10px] rounded-full flex items-center space-x-2 hover:bg-black transition text-xs font-medium">
            <ShoppingBag size={14} strokeWidth={2.5} className="mr-1"/>
            <span>0 items in cart</span>
          </button>
        </div>
      </div>

      {/* 3. Ticker Bar */}
      <div className="w-full flex items-center h-10 border-b border-gray-100 bg-white overflow-hidden text-[#111111] text-xs font-semibold tracking-widest uppercase" aria-hidden="true">
        <div className="flex w-max space-x-8 px-4 items-center whitespace-nowrap">
          <span>Sofas 15% off - Use code COZY15</span>
          <span className="text-gray-300 text-lg">/</span>
          <span>Dining Tables starting at $199</span>
          <span className="text-gray-300 text-lg">/</span>
          <span>Limited Time Offer: Free throw pillows with sofa purchases</span>
          <span className="text-gray-300 text-lg">/</span>
          <span>Free Shipping on orders over $200</span>
          <span className="text-gray-300 text-lg">/</span>
          <span>Sofas 15% off - Use code COZY15</span>
        </div>
      </div>

      {/* 4. Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        {/* Use a placeholder image similar to the ceramic/wood modern theme */}
        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2000&q=80" alt="Modern interior" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/5"></div> {/* Subtle tint */}
        
        <div className="relative z-10 flex flex-col items-center text-center mt-[-40px]">
          <h1 className="text-6xl md:text-7xl font-semibold text-[#1a1a1a] tracking-tight mb-4 drop-shadow-sm">Urban Elegance</h1>
          <p className="text-lg md:text-xl text-[#333333] font-medium mb-10 drop-shadow-sm">Natural Fabrics for Modern Living</p>
          <div className="flex items-center space-x-4">
            <button className="bg-[#111111] leading-none text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-black transition drop-shadow-md">SHOP NOW</button>
            <button className="bg-white leading-none text-[#111111] px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-gray-50 transition border border-gray-100 drop-shadow-md">VIEW ALL</button>
          </div>
        </div>
        
        <button className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-[#111111] bg-opacity-90 hover:bg-black text-white p-3 rounded-full transition shadow-lg">
          <ArrowLeft size={16} strokeWidth={2.5}/>
        </button>
        <button className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-[#111111] bg-opacity-90 hover:bg-black text-white p-3 rounded-full transition shadow-lg">
          <ArrowRight size={16} strokeWidth={2.5}/>
        </button>
      </section>

      {/* 5. Product Carousel */}
      <section className="py-12 pl-8 pr-4">
        <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-6 cursor-pointer">
          <div className="min-w-[280px] h-[340px] relative rounded-[32px] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80" alt="European Style Velvet Sofa" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out" />
            <div className="absolute flex flex-col justify-end p-6 inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">European Style Velvet Sofa</span>
              <h3 className="text-white font-medium text-base mb-2 leading-tight">Professional Furniture</h3>
              <p className="text-white text-sm font-medium flex gap-2 items-center">
                <span>Price: <span className="line-through text-white/50 ml-1">$950.00</span></span> 
                <span>$850.00</span>
              </p>
            </div>
          </div>
          {products.map((p, idx) => (
             <div key={idx} className="min-w-[280px] h-[340px] relative rounded-[32px] overflow-hidden group">
               <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out" />
               <div className="absolute flex flex-col justify-end p-6 inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                 <h3 className="text-white font-medium text-base mb-2 w-4/5 leading-tight">{p.title}</h3>
                 <p className="text-white text-sm font-medium flex gap-2 items-center">
                   <span>Price: {p.price}</span>
                   {p.oldPrice && <span className="line-through text-white/50">{p.oldPrice}</span>}
                 </p>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* 6. As Featured On */}
      <section className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 py-6 border-y border-gray-100 text-gray-500 stroke-[1.5px]">
         <span className="text-xs tracking-widest font-semibold uppercase text-gray-400 mr-4">AS FEATURED ON</span>
         
         <div className="flex flex-col items-center">
           <Sofa size={28} className="mb-1 text-gray-400" strokeWidth={1} />
           <span className="font-serif italic text-xs">fur</span>
         </div>
         <div className="flex items-center space-x-2">
           <Archive size={28} className="text-gray-400" strokeWidth={1} />
           <div className="flex flex-col leading-none text-[10px] font-bold tracking-wider text-black">
             <span>Smart</span>
             <span>Homes</span>
           </div>
         </div>
         <div className="flex flex-col items-center">
           <Armchair size={28} className="mb-1 text-gray-400" strokeWidth={1} />
           <span className="font-semibold tracking-wide text-xs">creative</span>
         </div>
         <div className="flex items-center space-x-2">
           <DoorOpen size={28} className="text-gray-400" strokeWidth={1} />
           <div className="flex flex-col leading-none text-xs font-medium text-black">
             <span>Furniture</span>
             <span>gallery</span>
           </div>
         </div>
         <div className="flex flex-col items-center">
           <Bed size={28} className="mb-1 text-gray-400" strokeWidth={1} />
           <span className="font-bold tracking-widest text-[9px] uppercase">FURNITIRE</span>
         </div>
         <div className="flex flex-col items-center">
           <Lamp size={28} className="mb-1 text-gray-400" strokeWidth={1} />
           <span className="font-serif italic tracking-wider text-xs">avsfiv</span>
         </div>
         <div className="flex items-center space-x-2">
           <Archive size={28} className="text-gray-400" strokeWidth={1} />
           <div className="flex flex-col leading-none text-[10px] font-bold tracking-wider text-black">
             <span>Smart</span>
             <span>Homes</span>
           </div>
         </div>
         <div className="flex flex-col items-center">
           <Armchair size={28} className="mb-1 text-gray-400" strokeWidth={1} />
           <span className="font-semibold tracking-wide text-xs">creative</span>
         </div>
      </section>

      {/* 7. Furnish Every Corner */}
      <section className="max-w-[1400px] mx-auto px-8 py-20 flex flex-col md:flex-row gap-12 items-center">
        {/* Left */}
        <div className="w-full md:w-1/3 pr-0 md:pr-10">
          <h2 className="text-3xl md:text-[40px] font-medium mb-6 leading-tight text-[#111111]">Furnish Every Corner</h2>
          <p className="text-gray-600 leading-[1.8] text-[15px]">
            From elegant dining room furniture to cozy bedroom sets, our collections cover every corner of your home. Discover high-quality pieces for every room.
          </p>
        </div>
        {/* Center */}
        <div className="w-full md:w-[40%] rounded-[32px] overflow-hidden aspect-[4/3] bg-gray-100 flex-shrink-0">
          <img src="https://images.unsplash.com/photo-1583847268964-b28e50394cce?auto=format&fit=crop&w=800&q=80" alt="Elegant white sofa" className="w-full h-full object-cover" />
        </div>
        {/* Right */}
        <div className="w-full md:w-1/3 flex flex-col pt-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-5 mb-5 group cursor-pointer hover:border-black transition">
            <span className="text-[15px] font-medium text-gray-700 group-hover:text-black">Luxury Sofa Set</span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-black" />
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-5 mb-5 group cursor-pointer hover:border-black transition">
            <span className="text-[15px] font-medium text-gray-700 group-hover:text-black">Office Furniture</span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-black" />
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-5 mb-5 group cursor-pointer hover:border-black transition">
            <span className="text-[15px] font-medium text-gray-700 group-hover:text-black">Bedroom Furniture</span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-black" />
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-5 mb-8 group cursor-pointer hover:border-black transition">
            <span className="text-[15px] font-medium text-gray-700 group-hover:text-black">Dinning Room Furniture</span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-black" />
          </div>
          <div>
            <button className="bg-[#111111] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-black transition tracking-wide leading-none">
              Explore collections
            </button>
          </div>
        </div>
      </section>

      {/* 8. Gallery */}
      <section className="flex flex-col md:flex-row gap-4 px-8 pb-16 h-[300px] md:h-[500px]">
        {/* Left image */}
        <div className="flex-1 md:w-1/4 rounded-[32px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80" alt="Rustic wood interior" className="w-full h-full object-cover" />
        </div>
        {/* Center video/image overlay */}
        <div className="flex-[2] md:w-2/4 rounded-[32px] overflow-hidden relative group cursor-pointer">
          <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80" alt="Kitchen interior" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out" />
          <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-4 text-[#111111] hover:scale-105 transition">
              <Play fill="currentColor" size={24} className="ml-1" />
            </button>
            <span className="bg-[#111111] bg-opacity-90 backdrop-blur text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide">
              Cozy Living
            </span>
          </div>
        </div>
        {/* Right image */}
        <div className="flex-1 md:w-1/4 rounded-[32px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1524901548305-08eeddc35080?auto=format&fit=crop&w=600&q=80" alt="Bookshelf interior" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* 9. Newsletter & Footer Block */}
      <section className="px-8 pb-12">
        <div className="bg-[#FAF9F7] rounded-[40px] flex flex-col lg:flex-row">
          
          {/* Subscribe to Newsletter */}
          <div className="flex-1 p-12 md:p-20 flex flex-col justify-center">
            <h2 className="text-3xl font-medium mb-3 text-[#111111]">Subscribe to Newsletter</h2>
            <p className="text-gray-500 mb-10 text-[15px]">Subscribe and receive exclusive information and offers!</p>
            <form className="max-w-md w-full" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="block text-sm font-medium text-[#111111] mb-2">E-mail *</label>
              <div className="flex items-center border border-gray-300 rounded-[10px] p-2 hover:border-gray-400 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition bg-transparent">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="E-mail Address" 
                  className="flex-1 bg-transparent border-none outline-none px-3 py-1 text-[15px] placeholder-gray-400" 
                />
                <button type="submit" className="text-gray-400 hover:text-black p-1 transition" aria-label="Submit">
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            </form>
          </div>
          
          {/* Urban Den Card */}
          <div className="flex-1 bg-[#1A1A1A] text-white p-12 rounded-[32px] m-4 shadow-xl">
            <div className="flex justify-between items-center mb-10 border-b border-gray-700 pb-6">
              <h3 className="text-[26px] font-medium tracking-wide">Urban Den</h3>
              <div className="flex items-center space-x-6 text-sm font-light">
                <span>Social Media:</span>
                <div className="flex items-center space-x-4">
                  <a href="#" className="hover:text-gray-300 transition" aria-label="Instagram"><Instagram size={18} strokeWidth={1.5} /></a>
                  <a href="#" className="hover:text-gray-300 transition" aria-label="Facebook"><Facebook size={18} strokeWidth={1.5} /></a>
                  {/* Pinterest Icon (approximated with a Pin icon or Lucide Pin) */}
                  <a href="#" className="hover:text-gray-300 transition font-serif italic text-lg leading-none" aria-label="Pinterest">P</a>
                </div>
              </div>
            </div>
            {/* Gallery Mini Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="aspect-[4/5] rounded-[20px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=400&q=80" alt="Plant and chair" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/5] rounded-[20px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80" alt="Living space" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/5] rounded-[20px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1583847268964-b28e50394cce?auto=format&fit=crop&w=400&q=80" alt="Yellow chair" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. Furnishing Essentials (Bottom cutoff approximation) */}
      <section className="text-center py-10 pb-20">
        <h2 className="text-[#111111] text-[40px] font-semibold tracking-tight mb-3">Furnishing Essentials</h2>
        <p className="text-gray-500 text-[15px]">Discover key pieces to elevate your home</p>
        
        {/* Placeholder bottom cards row based on image edge */}
        <div className="mt-12 flex justify-center gap-6 overflow-hidden px-8 max-h-[120px]">
           <div className="relative w-64 h-48 bg-gray-100 rounded-t-[32px] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-6">
               <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-semibold">BUY NOW</button>
             </div>
           </div>
           <div className="relative w-64 h-48 bg-gray-100 rounded-t-[32px] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
             <div className="absolute inset-x-0 bottom-6 flex justify-center">
               <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-semibold z-10">BUY NOW</button>
             </div>
           </div>
           <div className="relative w-64 h-48 bg-gray-100 rounded-t-[32px] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
             <div className="absolute inset-x-0 bottom-6 flex justify-center">
               <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-semibold z-10">BUY NOW</button>
             </div>
           </div>
           <div className="relative w-64 h-48 bg-gray-100 rounded-t-[32px] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
             <div className="absolute inset-x-0 bottom-6 flex justify-center">
               <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-semibold z-10">BUY NOW</button>
             </div>
           </div>
        </div>
      </section>

    </div>
  );
}
