import React from 'react';
import { ShoppingCart, Heart, Info, CheckCircle2 } from 'lucide-react';

const productsData = [
  {
    category: 'Pulses & Legumes',
    description: 'High-protein essential legumes, hygienically cleaned and packed.',
    items: [
      { name: 'Red Dhal (Split)', price: 'LKR 450.00', weight: '1kg', image: 'https://images.unsplash.com/photo-1585914924626-45adac9e6971?auto=format&fit=crop&w=500&q=80' },
      { name: 'Chickpeas', price: 'LKR 550.00', weight: '1kg', image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=500&q=80' },
      { name: 'Green Gram', price: 'LKR 580.00', weight: '1kg', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=80' },
      { name: 'Black Eyed Beans', price: 'LKR 520.00', weight: '1kg', image: 'https://images.unsplash.com/photo-1551462147-ff29053fad31?auto=format&fit=crop&w=500&q=80' }
    ]
  },
  {
    category: 'Spices & Herbs',
    description: 'The finest Ceylon spices, sourced for authentic aroma and purity.',
    items: [
      { name: 'Ceylon Cinnamon Sticks', price: 'LKR 1,200.00', weight: '100g', image: 'https://images.unsplash.com/photo-1599940824399-b87987cb9723?auto=format&fit=crop&w=500&q=80' },
      { name: 'Black Pepper (Whole)', price: 'LKR 850.00', weight: '250g', image: 'https://images.unsplash.com/photo-1615485290382-441e4d019cb5?auto=format&fit=crop&w=500&q=80' },
      { name: 'Turmeric Powder', price: 'LKR 420.00', weight: '200g', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=500&q=80' },
      { name: 'Chilli Pieces', price: 'LKR 380.00', weight: '250g', image: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=500&q=80' }
    ]
  }
];

const Products = () => {
  return (
    <div className="bg-warm-white pb-16 md:pb-24">
      {/* Header */}
      <section className="bg-brand-dark py-12 md:py-20 px-4 md:px-8 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4">Our Product Range</h1>
        <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">Discover the purest ingredients, processed with care and delivered with integrity.</p>
      </section>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-12 md:mt-16">
        {productsData.map((cat, idx) => (
          <div key={idx} className="mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 border-b border-gray-200 pb-6 md:pb-8 gap-4">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-dark mb-2">{cat.category}</h2>
                <p className="text-gray-500 text-sm md:text-base font-medium">{cat.description}</p>
              </div>
              <div className="flex items-center space-x-2 text-brand-green font-bold text-[10px] tracking-widest uppercase">
                 <CheckCircle2 size={14} />
                 <span>Hygienically Packed</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {cat.items.map((product, pIdx) => (
                <div key={pIdx} className="group">
                  <div className="relative aspect-square rounded-[30px] md:rounded-[40px] overflow-hidden mb-4 md:mb-6 bg-white shadow-lg">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute top-4 right-4 md:top-6 md:right-6">
                      <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-brand-dark hover:bg-brand-green hover:text-white transition-all shadow-md">
                        <Heart size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 w-[80%]">
                      <button className="bg-brand-dark text-white w-full py-3 md:py-4 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-2xl flex items-center justify-center space-x-2 hover:bg-brand-green transition-all">
                        <ShoppingCart size={14} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start px-2">
                    <div>
                      <h3 className="font-bold text-brand-dark text-base md:text-lg mb-1 leading-tight">{product.name}</h3>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{product.weight}</p>
                    </div>
                    <p className="text-brand-green font-bold text-base md:text-lg font-serif">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quality Banner */}
      <section className="px-4 md:px-8 mt-12 md:mt-20">
        <div className="bg-brand-light/50 rounded-[40px] md:rounded-[50px] p-8 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
          <div className="max-w-2xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-dark mb-6 md:mb-8">Uncompromising Quality Standards</h2>
            <div className="space-y-4 md:space-y-6">
              {[
                "Multiple rounds of cleaning and sorting to ensure 100% purity.",
                "State-of-the-art packaging technology to preserve freshness and aroma.",
                "Regular quality audits and laboratory testing for food safety."
              ].map((text, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-green text-white flex items-center justify-center mt-1 shrink-0"><CheckCircle2 size={12} /></div>
                  <p className="text-gray-600 font-medium text-sm md:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
             <div className="bg-white p-8 rounded-[30px] md:rounded-[32px] shadow-lg border border-gray-50">
                <h4 className="text-brand-dark font-bold font-serif mb-2 text-lg">Bulk Orders?</h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">We provide special pricing for restaurants, retail chains, and distributors.</p>
                <button className="text-brand-green font-bold text-xs uppercase tracking-widest flex items-center hover:translate-x-2 transition-transform">
                  Enquire Now <Info size={14} className="ml-2"/>
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
