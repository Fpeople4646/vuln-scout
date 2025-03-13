
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  className?: string;
  gradient?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  to,
  className,
  gradient = "from-security-accent/20 to-blue-500/20"
}: FeatureCardProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "glass-panel p-6 flex flex-col h-full glass-panel-hover group relative overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
        style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
      />
      
      <div className="text-security-accent mb-4 p-3 bg-security-highlight/20 rounded-lg w-fit">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-2 group-hover:text-security-accent transition-colors duration-300">{title}</h3>
      
      <p className="text-security-muted mb-6 flex-grow">{description}</p>
      
      <div className="flex items-center text-sm font-medium text-security-accent mt-auto">
        <span>Launch tool</span>
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default FeatureCard;
