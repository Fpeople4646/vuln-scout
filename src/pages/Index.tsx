
import { ShieldAlert, Key, Database, Code } from 'lucide-react';
import MainLayout from '@/layout/MainLayout';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  return (
    <MainLayout>
      <section className="text-center mb-16 mt-12">
        <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-security-accent/10 text-security-accent border border-security-accent/20">
          <span>Security Testing Toolkit</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight animate-fade-in">
          Comprehensive Vulnerability
          <br/>
          <span className="text-gradient">Testing Platform</span>
        </h1>
        
        <p className="text-security-muted max-w-2xl mx-auto text-lg animate-slide-up">
          A powerful suite of security testing tools to help you identify and address vulnerabilities in your applications.
        </p>
      </section>
      
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Brute Force Testing"
            description="Test password strength and authentication systems against dictionary and brute force attacks."
            icon={<Key className="w-6 h-6" />}
            to="/bruteforce"
            gradient="from-security-accent/20 to-green-500/20"
          />
          
          <FeatureCard
            title="SQL Injection"
            description="Check for SQL injection vulnerabilities that could compromise your database."
            icon={<Database className="w-6 h-6" />}
            to="/sql-injection"
            gradient="from-blue-500/20 to-purple-500/20"
          />
          
          <FeatureCard
            title="XSS Testing"
            description="Identify cross-site scripting vulnerabilities in your web applications."
            icon={<Code className="w-6 h-6" />}
            to="/xss"
            gradient="from-orange-500/20 to-red-500/20"
          />
        </div>
      </section>
      
      <section className="glass-panel p-8 animate-slide-up">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Advanced Security Testing</h2>
            <p className="text-security-muted mb-4">
              Our platform offers a comprehensive suite of tools for security professionals to identify vulnerabilities in applications and networks. 
              From common attack vectors to advanced exploitation techniques, VulnScout provides everything you need for thorough security testing.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="px-3 py-1 text-xs rounded-full bg-security-highlight text-security-muted">Brute Force</span>
              <span className="px-3 py-1 text-xs rounded-full bg-security-highlight text-security-muted">SQL Injection</span>
              <span className="px-3 py-1 text-xs rounded-full bg-security-highlight text-security-muted">XSS</span>
              <span className="px-3 py-1 text-xs rounded-full bg-security-highlight text-security-muted">CSRF</span>
              <span className="px-3 py-1 text-xs rounded-full bg-security-highlight text-security-muted">MitM</span>
              <span className="px-3 py-1 text-xs rounded-full bg-security-highlight text-security-muted">Phishing</span>
              <span className="px-3 py-1 text-xs rounded-full bg-security-highlight text-security-muted">DoS/DDoS</span>
              <span className="px-3 py-1 text-xs rounded-full bg-security-highlight text-security-muted">DNS Spoofing</span>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-video overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-security-accent/30 to-blue-500/30 opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldAlert className="w-16 h-16 text-security-accent animate-pulse-slow" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-security/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
