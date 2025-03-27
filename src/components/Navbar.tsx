import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Activity, Newspaper, User, Store, LayoutDashboard, Menu, X, Bell } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-accent animate-pulse-slow" />
            <span className="text-xl font-bold">PENDOR</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/live" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <Activity className="h-5 w-5" />
              <span>Live Scores</span>
            </Link>
            <Link to="/news" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <Newspaper className="h-5 w-5" />
              <span>Actualités</span>
            </Link>
            <Link to="/store" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <Store className="h-5 w-5" />
              <span>Boutique</span>
            </Link>
            <Link to="/mes-pronos" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <User className="h-5 w-5" />
              <span>Mes Pronos</span>
            </Link>
            <Link to="/vendor" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <LayoutDashboard className="h-5 w-5" />
              <span>Espace Vendeur</span>
            </Link>
          </div>

          {/* Mobile Navigation (Icons before Hamburger) */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Notifications Icon */}
            <div className="relative">
              <Bell className="h-6 w-6 hover:text-accent transition-colors" />
              {/* Badge */}
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </div>

            {/* Profile Icon */}
            <Link to="/profile">
              <User className="h-6 w-6 hover:text-accent transition-colors" />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Menu Items) */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/live" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Live Scores</span>
              </div>
            </Link>
            <Link 
              to="/news" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Newspaper className="h-5 w-5" />
                <span>Actualités</span>
              </div>
            </Link>
            <Link 
              to="/store" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Store className="h-5 w-5" />
                <span>Boutique</span>
              </div>
            </Link>
            <Link 
              to="/mes-pronos" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Mes Pronos</span>
              </div>
            </Link>
            <Link 
              to="/vendor" 
              className="block hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="h-5 w-5" />
                <span>Espace Vendeur</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
