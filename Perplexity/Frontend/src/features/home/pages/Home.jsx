import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router';
import { useState } from 'react';

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    if(!loading && user){
      return <Navigate to="/dashboard" />
    }
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-neutral-200 font-sans selection:bg-teal-500/30">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#1c1c1c]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="shrink-0 flex items-center">
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Agentra AI
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex gap-4 items-center">
              <Link
                to="/login"
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Sign up
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden border-t border-white/5 bg-[#1c1c1c]/95 backdrop-blur-xl absolute w-full`}>
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link
              to="/login"
              className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="block w-full text-center px-4 py-3 text-base font-medium text-black bg-white rounded-xl hover:bg-neutral-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8">
            Where knowledge begins
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-neutral-400 mb-10 leading-relaxed">
            Experience the future of search and learning. Our application combines advanced AI with an intuitive interface to help you discover, understand, and explore information faster than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <Link
                to="/register"
                className="w-full sm:w-auto text-lg font-medium bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-400 transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transform hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto text-lg font-medium bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Sign In
              </Link>
          </div>
        </div>
      </div>

      {/* Features Showcase Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Intelligent Search</h3>
                <p className="text-neutral-400 leading-relaxed">Ask questions naturally and get comprehensive, accurate answers synthesized from multiple reliable sources.</p>
            </div>
            
             {/* Feature 2 */}
             <div className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Real-time Insights</h3>
                <p className="text-neutral-400 leading-relaxed">Stay updated with the latest information as our AI engine processes data in real-time to bring you relevant insights.</p>
            </div>

             {/* Feature 3 */}
             <div className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
                <p className="text-neutral-400 leading-relaxed">Your data and search history belong to you. We prioritize privacy with state-of-the-art security measures.</p>
            </div>
        </div>
      </div>
      
       {/* Footer */}
       <footer className="border-t border-white/5 py-10 text-center">
        <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Perplexity Clone. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
