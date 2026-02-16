import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Calculator, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2, 
  ClipboardCheck,
  Wrench,
  Scale,
  Lock,
  MapPin,
  Shield,
  Truck,
  Bike,
  Car
} from 'lucide-react';
import { Link } from "react-router-dom";

/**
 * FairFix - Modern Landing Page
 * Focus: Universal vehicle support with the signature Car logo.
 */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How it Works', href: '#how-it-works', active: true },
    { name: 'Estimate', href: '#estimate', active: true },
    { name: 'Mechanics', href: '#', active: false }, 
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo - Reverted to Car Icon */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
            <Car className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
            FairFix
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`flex items-center gap-1.5 font-medium transition-colors ${
                link.active 
                ? 'text-gray-600 hover:text-blue-600' 
                : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              {link.name}
              {!link.active && <Lock className="w-3 h-3" />}
            </a>
          ))}
          <div className="flex items-center gap-4 border-l pl-8 ml-2">
            <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 font-semibold"
            >
            Log in
            </Link>
            <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg active:scale-95"
          >
          Get Started
          </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`text-left text-lg py-2 border-b border-gray-50 flex justify-between items-center ${link.active ? 'text-gray-900' : 'text-gray-300 pointer-events-none'}`}
            >
              {link.name}
              {!link.active && <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-400">Soon</span>}
            </a>
          ))}
          <button className="bg-blue-600 text-white py-3 rounded-xl font-bold mt-2">Get Started</button>
          <button className="text-gray-600 py-2 font-medium">Log In</button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50" />
    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-50" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-100">
            <ShieldCheck className="w-4 h-4" />
            <span>Fair Resolution for Any Vehicle</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Minor Dent? <br />
            <span className="text-blue-600">Fair Fix.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Resolve fender benders fairly for cars, motorcycles, and trucks with transparent estimation tools and incident reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:-translate-y-1">
              Estimate New Damage <ArrowRight className="w-5 h-5" />
            </button>
            <button className="group relative bg-white text-slate-400 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg cursor-not-allowed overflow-hidden">
              <span className="blur-[1px] group-hover:blur-0 transition-all flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Browse Nearby Mechanics
              </span>
              <div className="absolute inset-0 bg-slate-50/10 flex items-center justify-center">
                 <span className="bg-slate-800 text-white text-[10px] uppercase tracking-tighter px-2 py-0.5 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>
              </div>
            </button>
          </div>
        </div>

        {/* Visual Mockup - Kept Truck/Bike/Wrench Icons */}
        <div className="w-full lg:w-1/2 relative">
          <div className="bg-white rounded-3xl shadow-2xl p-4 border border-slate-100 relative z-20">
            <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative">
               <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-slate-800/40">
                  <div className="text-center text-white p-6">
                    <div className="flex justify-center gap-4 mb-4 text-blue-400 opacity-60">
                       <Truck className="w-8 h-8" />
                       <Wrench className="w-10 h-10 text-white opacity-100" />
                       <Bike className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-xl mb-1">Universal Incident Report</p>
                    <p className="text-slate-300 text-sm">Select vehicle type and enter details</p>
                  </div>
               </div>
               <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <p className="text-xs opacity-80 uppercase font-bold tracking-wider">All Vehicle Support</p>
                      <p className="text-xl font-bold">Standardized Rates</p>
                    </div>
                    <div className="bg-blue-500 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tight">
                      Ready to Use
                    </div>
                  </div>
               </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-dashed border-blue-200 rounded-full opacity-40" />
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="estimate" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">A fair fix for every driver</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Whether you're on two wheels or eighteen, we provide the tools for an honest, transparent resolution.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all shadow-sm">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Calculator className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold mb-3">Cost Estimation</h3>
          <p className="text-slate-600 leading-relaxed">Input your vehicle model and damage details to get a fair-market cost estimate based on standard industry data.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all shadow-sm opacity-60">
          <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
            <Wrench className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold mb-3">Specialist Network</h3>
          <p className="text-slate-600 leading-relaxed">Coming Soon: Connect with certified mechanics and bike specialists who honor our transparent pricing.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all shadow-sm">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Scale className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold mb-3">Fair Resolution</h3>
          <p className="text-slate-600 leading-relaxed">Professional incident reports that help both parties agree on a settlement without long insurance delays.</p>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Three steps to peace of mind</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-slate-800 z-0" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/20">1</div>
          <h3 className="text-xl font-bold mb-4">Report</h3>
          <p className="text-slate-400">Document the incident. Enter your vehicle type and specific damage points into our universal reporting tool.</p>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/20">2</div>
          <h3 className="text-xl font-bold mb-4">Market Pricing</h3>
          <p className="text-slate-400">Receive instant estimates based on current parts and labor costs for your specific vehicle category.</p>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/20">3</div>
          <h3 className="text-xl font-bold mb-4">Settle Securely</h3>
          <p className="text-slate-400">Finalize the agreement with the other party, track the fix, and keep your records organized.</p>
        </div>
      </div>
    </div>
  </section>
);

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 scroll-smooth">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <section className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 className="w-48 h-48" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to resolve it fairly?</h2>
              <p className="text-xl text-blue-100 mb-10 relative z-10">Join drivers everywhere settling minor incidents without the insurance headache.</p>
              <Link
              to="/register"
              className="inline-block bg-white text-blue-600 hover:bg-slate-50 px-10 py-5 rounded-2xl font-extrabold text-xl relative z-10 transition-all active:scale-95"
              >
              Get Started for Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Car className="text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold">FairFix</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed mb-6">
                Redefining resolution for all vehicle types through transparency and standardized pricing.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-slate-500">
                <li><button className="hover:text-blue-600">Estimator</button></li>
                <li><button className="hover:text-blue-600">Reporting Tool</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-slate-500">
                <li><button className="hover:text-blue-600">Help Center</button></li>
                <li><button className="hover:text-blue-600">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2024 FairFix Technologies Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-slate-600">Twitter</button>
              <button className="hover:text-slate-600">LinkedIn</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;