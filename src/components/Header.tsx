
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShieldAlert, Menu, X, LogIn, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/bruteforce', label: 'Brute Force' },
    { path: '/sql-injection', label: 'SQL Injection' },
    { path: '/xss', label: 'XSS' },
    { path: '/tools', label: 'More Tools' },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-security/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center space-x-2 group"
        >
          <ShieldAlert className="w-7 h-7 text-security-accent transition-all duration-300 group-hover:text-white" />
          <span className="text-xl font-semibold tracking-tight">
            <span className="text-white">Vuln</span>
            <span className="text-security-accent">Scout</span>
          </span>
        </Link>
        
        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'relative py-1 text-sm font-medium transition-colors duration-200',
                isActive(link.path) 
                  ? 'text-security-accent' 
                  : 'text-security-muted hover:text-white'
              )}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-security-accent rounded-full" />
              )}
            </Link>
          ))}
          
          {/* Auth buttons */}
          <div className="flex items-center gap-2">
            {user?.isLoggedIn ? (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-security-muted hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-security-muted hover:text-white"
                  >
                    <LogIn className="w-4 h-4 mr-1" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-security-accent text-security-accent hover:bg-security-accent/10"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
        
        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-security-muted hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-security pt-4 animate-fade-in">
          <nav className="flex flex-col space-y-4 px-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'py-2 px-4 text-base rounded-md transition-all duration-200 animate-slide-up',
                  isActive(link.path) 
                    ? 'glass-panel text-security-accent' 
                    : 'text-security-muted hover:text-white hover:bg-security-secondary/30'
                )}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth buttons for mobile */}
            {user?.isLoggedIn ? (
              <Button 
                variant="ghost" 
                className="py-2 px-4 w-full justify-start text-security-muted hover:text-white animate-slide-up"
                style={{ animationDelay: `${navLinks.length * 50}ms` }}
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-4 text-base rounded-md transition-all duration-200 animate-slide-up flex items-center text-security-muted hover:text-white hover:bg-security-secondary/30"
                  style={{ animationDelay: `${navLinks.length * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-4 text-base rounded-md transition-all duration-200 animate-slide-up flex items-center text-security-accent bg-security-secondary/30 hover:bg-security-secondary/50"
                  style={{ animationDelay: `${(navLinks.length + 1) * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
