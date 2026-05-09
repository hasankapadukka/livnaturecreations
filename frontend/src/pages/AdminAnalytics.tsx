import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users2, 
  FileText, 
  HelpCircle, 
  Plus,
  ArrowUpRight,
  TrendingUp,
  Globe2,
  Droplets,
  Wind
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminAnalytics = () => {
  return (
    <div className="min-h-screen bg-[#F0F4F3] flex p-4 lg:p-6 font-sans">
      {/* 1. The "Aeux" Sidebar */}
      <aside className="hidden lg:flex w-72 bg-[#0A261D] rounded-[40px] flex-col p-8 mr-6 shadow-2xl">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
          </div>
          <span className="text-white font-bold tracking-widest text-lg">AeuxGlobal</span>
        </div>

        <nav className="flex-grow space-y-2">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 ml-4">Navigation</p>
          {[
            { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
            { icon: <BarChart3 size={20} />, label: 'Analytics' },
            { icon: <Users2 size={20} />, label: 'Team Structure' },
            { icon: <FileText size={20} />, label: 'Reports' },
            { icon: <HelpCircle size={20} />, label: 'Support' },
          ].map((item, i) => (
            <div 
              key={i}
              className={`flex items-center space-x-4 px-6 py-4 rounded-2xl cursor-pointer transition-all ${
                item.active ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/10">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 ml-4">User Account</p>
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 bg-gray-700 rounded-xl overflow-hidden border border-white/10">
              <img src="https://i.pravatar.cc/150?u=alex" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Alex Williamson</p>
              <p className="text-[9px] text-gray-500 font-medium">#dela-1974</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Analytics Canvas */}
      <main className="flex-grow flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 px-4">
          <h1 className="text-3xl font-bold text-[#0A261D]">Dashboard</h1>
          <button className="flex items-center space-x-3 bg-[#0A261D] text-white px-8 py-3 rounded-2xl text-xs font-bold hover:bg-brand-green transition-all shadow-xl shadow-black/10">
            <Plus size={18} />
            <span>Add Custom Widget</span>
          </button>
        </header>

        {/* Top Row: Mini Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: 'Air Pollution Level', value: '35.05', unit: 'µg/m³', change: '2.3% than last month', icon: <Wind size={16} />, color: 'text-brand-green' },
            { label: 'Environmental Quality', value: '75.50', unit: '/100%', change: '1.4% than last month', icon: <Droplets size={16} />, color: 'text-red-400' },
            { label: 'Clean Investments', value: '$967,570', unit: '', change: '5.1% than last month', icon: <TrendingUp size={16} />, color: 'text-brand-green' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col justify-between h-48">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-[#0A261D]">{stat.value}</span>
                    <span className="text-xs font-bold text-gray-400">{stat.unit}</span>
                  </div>
                </div>
                <div className="flex space-x-1 h-12 items-end">
                   {[40, 70, 45, 90, 60].map((h, j) => (
                     <div key={j} className={`w-1.5 rounded-full ${i === 1 ? 'bg-red-400' : 'bg-brand-green'}`} style={{ height: `${h}%` }} />
                   ))}
                </div>
              </div>
              <p className="text-[10px] font-medium text-gray-400 italic">
                <span className={stat.color}>{stat.change.split(' ')[0]}</span> {stat.change.split(' ').slice(1).join(' ')}
              </p>
            </div>
          ))}
        </div>

        {/* Middle Row: Main Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
          {/* Waste Processing */}
          <div className="xl:col-span-3 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-full text-left">Waste Processing</p>
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 * (1 - 0.72)} className="text-brand-green" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-[#0A261D]">72%</span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400">Deviation Index <span className="text-[#0A261D]">2%</span></p>
          </div>

          {/* Renewable Energy */}
          <div className="xl:col-span-3 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Renewable Energy</p>
            <div className="flex flex-col items-center">
               <span className="text-6xl font-bold text-[#0A261D] mb-6">86%</span>
               <div className="w-full space-y-3">
                  {[
                    { label: 'Solar Energy', val: '52%' },
                    { label: 'Hydropower', val: '22%' },
                    { label: 'Wind Energy', val: '12%' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-bold">
                       <div className="flex items-center space-x-2">
                         <div className="w-2 h-2 rounded-full bg-brand-green" />
                         <span className="text-gray-400">{item.label}</span>
                       </div>
                       <span className="text-[#0A261D]">{item.val}</span>
                    </div>
                  ))}
               </div>
            </div>
            <button className="w-full py-3 border border-gray-200 rounded-xl text-[10px] font-bold text-[#0A261D] uppercase tracking-widest hover:bg-gray-50 transition-all">View Details</button>
          </div>

          {/* Sources Usage (Map Placeholder) */}
          <div className="xl:col-span-6 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 grid grid-cols-2 gap-8">
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sources Usage in Manufacturing</p>
                <p className="text-[9px] text-gray-400 leading-relaxed">Percentage of renewable energy sources used in manufacturing industries.</p>
              </div>
              <div className="space-y-2">
                {[
                  { country: 'Ukraine', val: '89%' },
                  { country: 'Belgium', val: '82%' },
                  { country: 'Latvia', val: '85%' },
                  { country: 'Spain', val: '80%' },
                ].map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-[9px] font-bold">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      <span className="text-gray-400">{c.country}</span>
                    </div>
                    <span className="text-[#0A261D]">{c.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative bg-brand-green/5 rounded-3xl overflow-hidden flex items-center justify-center p-4">
               <Globe2 className="w-full h-full text-brand-green/20" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#0A261D] p-4 rounded-2xl text-white shadow-2xl">
                     <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ukraine</p>
                     <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold">High Level</span>
                        <span className="text-xs font-bold text-brand-green">89%</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#0A261D] p-8 rounded-[40px] shadow-2xl flex items-center space-x-6">
             <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                  <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={220} strokeDashoffset={220 * (1 - 0.76)} className="text-brand-gold" />
                </svg>
                <span className="absolute text-xs font-bold text-white">76.2</span>
             </div>
             <div>
                <h4 className="text-white font-bold text-sm mb-1">Climate Change Index</h4>
                <p className="text-[10px] text-gray-400 leading-tight">Impact of anthropogenic activities on climate</p>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex items-center space-x-6">
             <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
                  <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={220} strokeDashoffset={220 * (1 - 0.57)} className="text-brand-green" />
                </svg>
                <span className="absolute text-xs font-bold text-[#0A261D]">57m</span>
             </div>
             <div>
                <h4 className="text-[#0A261D] font-bold text-sm mb-1">Water level in Dnipro</h4>
                <p className="text-[10px] text-gray-400 leading-tight">Water level value in m with ice melting,</p>
             </div>
          </div>

          <div className="bg-gradient-to-br from-brand-green to-[#0A261D] p-8 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col justify-between">
             <div className="relative z-10">
                <h4 className="text-white font-bold text-lg mb-2">Let's join our community</h4>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A261D] overflow-hidden bg-gray-800">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[8px] text-white font-bold backdrop-blur-md">230k+</div>
                </div>
             </div>
             <ArrowUpRight className="absolute top-6 right-6 text-white opacity-40" />
             <div className="flex space-x-2 mt-4 relative z-10">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] text-white font-bold">Ecology Systems</span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] text-white font-bold">Global Statistic</span>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
