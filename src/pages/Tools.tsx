
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShieldAlert, 
  Globe, 
  Wifi, 
  Mail, 
  Network, 
  Server, 
  FileText, 
  Lock, 
  Key,
  Database,
  Code,
  Search,
  FileArchive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Tools = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'network', name: 'Network' },
    { id: 'web', name: 'Web' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'crypto', name: 'Cryptography' },
    { id: 'recon', name: 'Reconnaissance' }
  ];
  
  const toolsList = [
    {
      id: 'mitm',
      name: 'Man-in-the-Middle',
      description: 'Set up and execute MitM attacks to intercept network traffic',
      icon: <Network className="w-5 h-5" />,
      category: 'network',
      status: 'coming_soon'
    },
    {
      id: 'phishing',
      name: 'Phishing Simulator',
      description: 'Create and manage phishing campaigns to test user awareness',
      icon: <Mail className="w-5 h-5" />,
      category: 'web',
      status: 'coming_soon'
    },
    {
      id: 'dos',
      name: 'DoS/DDoS Testing',
      description: 'Simulate DoS attacks to test system resilience',
      icon: <Server className="w-5 h-5" />,
      category: 'network',
      status: 'coming_soon'
    },
    {
      id: 'dns',
      name: 'DNS Spoofing',
      description: 'Test DNS security by attempting to spoof DNS responses',
      icon: <Globe className="w-5 h-5" />,
      category: 'network',
      status: 'coming_soon'
    },
    {
      id: 'password',
      name: 'Password Spraying',
      description: 'Test multiple accounts with common passwords',
      icon: <Key className="w-5 h-5" />,
      category: 'web',
      status: 'coming_soon'
    },
    {
      id: 'csrf',
      name: 'CSRF Testing',
      description: 'Test for Cross-Site Request Forgery vulnerabilities',
      icon: <FileText className="w-5 h-5" />,
      category: 'web',
      status: 'coming_soon'
    },
    {
      id: 'ssl',
      name: 'SSL/TLS Scanner',
      description: 'Analyze SSL/TLS configuration for security issues',
      icon: <Lock className="w-5 h-5" />,
      category: 'crypto',
      status: 'coming_soon'
    },
    {
      id: 'wifi',
      name: 'Wifi Security',
      description: 'Test wireless network security and encryption',
      icon: <Wifi className="w-5 h-5" />,
      category: 'network',
      status: 'coming_soon'
    },
    {
      id: 'vuln-scan',
      name: 'Vulnerability Scanner',
      description: 'Comprehensive scanner for common security vulnerabilities',
      icon: <Search className="w-5 h-5" />,
      category: 'recon',
      status: 'coming_soon'
    },
    {
      id: 'mobile-sec',
      name: 'Mobile App Analyzer',
      description: 'Analyze mobile applications for security vulnerabilities',
      icon: <FileArchive className="w-5 h-5" />,
      category: 'mobile',
      status: 'coming_soon'
    },
    {
      id: 'sql-adv',
      name: 'Advanced SQL Injection',
      description: 'Comprehensive SQL injection testing with time-based and blind techniques',
      icon: <Database className="w-5 h-5" />,
      category: 'web',
      status: 'coming_soon'
    },
    {
      id: 'xss-adv',
      name: 'Advanced XSS Suite',
      description: 'Complete XSS testing toolkit with DOM, reflected and stored XSS testing',
      icon: <Code className="w-5 h-5" />,
      category: 'web',
      status: 'coming_soon'
    },
  ];
  
  const filteredTools = activeCategory === 'all' 
    ? toolsList 
    : toolsList.filter(tool => tool.category === activeCategory);
    
  const notifyComingSoon = () => {
    toast.info('This tool is coming soon!');
  };

  return (
    <MainLayout>
      <div className="flex items-center mb-8">
        <ShieldAlert className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">Security Tools</h1>
      </div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        Browse our comprehensive collection of security testing tools. Each tool is designed to help identify specific vulnerabilities and security issues.
      </p>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category.id)}
            className={
              activeCategory === category.id 
                ? 'bg-security-accent text-security hover:bg-security-accent/80' 
                : 'border-security-highlight/30 text-security-muted hover:bg-security-secondary/40 hover:text-white'
            }
            size="sm"
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <Card 
            key={tool.id}
            className="glass-panel border-security-highlight/30 glass-panel-hover hover:scale-[1.02] transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-security-highlight/20 rounded-md text-security-accent">
                    {tool.icon}
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </div>
                {tool.status === 'coming_soon' && (
                  <span className="text-xs px-2 py-1 bg-security-accent/10 text-security-accent rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={notifyComingSoon}
                className="w-full bg-security-secondary hover:bg-security-highlight text-security-foreground"
              >
                Open Tool
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Tools;
