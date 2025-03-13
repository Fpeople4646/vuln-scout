
import { ShieldAlert, Heart, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 mt-20 border-t border-security-highlight/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <ShieldAlert className="w-5 h-5 text-security-accent mr-2" />
            <span className="text-lg font-semibold">
              <span className="text-white">Vuln</span>
              <span className="text-security-accent">Scout</span>
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <span className="text-sm text-security-muted flex items-center">
              <Heart className="w-4 h-4 text-security-danger mr-2" />
              Made for security professionals
            </span>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="text-security-muted hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-security-muted">
          <p>This application is intended for authorized security testing only.</p>
          <p className="mt-2">© {new Date().getFullYear()} VulnScout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
