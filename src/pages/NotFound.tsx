
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldAlert, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-security p-6">
      <div className="glass-panel p-8 md:p-12 max-w-md w-full text-center animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-security-highlight/30 flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-security-accent" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-gradient">404</h1>
        <p className="text-xl text-security-foreground mb-6">Page Not Found</p>
        <p className="text-security-muted mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="bg-security-accent hover:bg-security-accent/80 text-security w-full">
            <Home className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
