
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-security p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel rounded-2xl p-8 shadow-lg">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <ShieldAlert className="w-8 h-8 text-security-accent transition-all duration-300 group-hover:text-white" />
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">Vuln</span>
                <span className="text-security-accent">Scout</span>
              </span>
            </Link>
          </div>
          
          <h1 className="text-2xl font-semibold text-white text-center mb-8">
            Log in to your account
          </h1>
          
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-security-muted">
              Don't have an account?{" "}
              <Link to="/register" className="text-security-accent hover:text-security-accent/80 font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-security-muted">
          <p>By using VulnScout, you agree to ethical hacking principles and testing only on authorized systems.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
