
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Key, Play, Clock, Check, AlertCircle, FileText, X } from 'lucide-react';

const BruteForce = () => {
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [passwordList, setPasswordList] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    tested: number;
    found: boolean;
    password?: string;
    time?: number;
  } | null>(null);

  const simulateBruteForce = () => {
    if (!url || !username || !passwordList) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSimulating(true);
    setProgress(0);
    setResults(null);
    
    const passwords = passwordList.split('\n').filter(pw => pw.trim());
    const totalPasswords = passwords.length;
    if (totalPasswords === 0) {
      toast.error('Please provide at least one password to test');
      setIsSimulating(false);
      return;
    }
    
    const startTime = Date.now();
    let currentIndex = 0;
    
    // For demo purposes, let's simulate finding a password after testing 70% of the list
    const targetIndex = Math.floor(totalPasswords * 0.7);
    const foundPassword = passwords[targetIndex] || 'password123';
    
    const interval = setInterval(() => {
      currentIndex++;
      const newProgress = Math.floor((currentIndex / totalPasswords) * 100);
      setProgress(newProgress);
      
      if (currentIndex === targetIndex) {
        // Simulate finding the password
        clearInterval(interval);
        const timeElapsed = (Date.now() - startTime) / 1000;
        setResults({
          tested: currentIndex,
          found: true,
          password: foundPassword,
          time: timeElapsed
        });
        setIsSimulating(false);
        toast.success('Password found!');
      } else if (currentIndex >= totalPasswords) {
        // Simulate not finding the password
        clearInterval(interval);
        const timeElapsed = (Date.now() - startTime) / 1000;
        setResults({
          tested: totalPasswords,
          found: false,
          time: timeElapsed
        });
        setIsSimulating(false);
        toast.error('No valid password found');
      }
    }, 100); // Simulating testing speed
    
    return () => clearInterval(interval);
  };

  return (
    <MainLayout>
      <div className="flex items-center mb-8">
        <Key className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">Brute Force Testing</h1>
      </div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        The Brute Force Testing module allows you to test authentication systems by attempting to log in with various password combinations.
        This can help identify weak password policies or account lockout vulnerabilities.
      </p>
      
      <Tabs defaultValue="dictionary" className="mb-8">
        <TabsList className="glass-panel border-none">
          <TabsTrigger value="dictionary" className="data-[state=active]:bg-security-accent/20">Dictionary Attack</TabsTrigger>
          <TabsTrigger value="bruteforce" className="data-[state=active]:bg-security-accent/20">Pure Brute Force</TabsTrigger>
          <TabsTrigger value="credential" className="data-[state=active]:bg-security-accent/20">Credential Stuffing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dictionary" className="mt-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Test Configuration</CardTitle>
                <CardDescription>Configure your dictionary attack parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target URL</label>
                  <Input 
                    placeholder="https://example.com/login" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input 
                    placeholder="admin" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password List</label>
                  <textarea 
                    className="w-full h-40 rounded-md border border-security-highlight/30 bg-security-secondary/30 p-3 focus:border-security-accent/50 focus:outline-none focus:ring-1 focus:ring-security-accent/50"
                    placeholder="password123&#10;qwerty&#10;admin123&#10;..."
                    value={passwordList}
                    onChange={(e) => setPasswordList(e.target.value)}
                  />
                  <p className="text-xs text-security-muted">Enter one password per line</p>
                </div>
                
                <Button 
                  onClick={simulateBruteForce}
                  disabled={isSimulating}
                  className="w-full bg-security-accent hover:bg-security-accent/80 text-security"
                >
                  {isSimulating ? (
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      Start Dictionary Attack
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>View attack progress and results</CardDescription>
              </CardHeader>
              <CardContent>
                {isSimulating && (
                  <div className="space-y-4">
                    <p className="text-security-muted">Testing passwords...</p>
                    <Progress value={progress} className="h-2 bg-security-highlight">
                      <div className="h-full bg-security-accent rounded-full" style={{ width: `${progress}%` }} />
                    </Progress>
                    <p className="text-sm text-security-muted">{progress}% complete</p>
                  </div>
                )}
                
                {results && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-center py-6">
                      {results.found ? (
                        <div className="w-16 h-16 rounded-full bg-security-success/20 flex items-center justify-center">
                          <Check className="w-8 h-8 text-security-success" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-security-danger/20 flex items-center justify-center">
                          <X className="w-8 h-8 text-security-danger" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-security-muted">Status:</span>
                        <span className={results.found ? "text-security-success" : "text-security-danger"}>
                          {results.found ? "Password Found" : "No Password Found"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-security-muted">Passwords Tested:</span>
                        <span>{results.tested}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-security-muted">Time Elapsed:</span>
                        <span>{results.time?.toFixed(2)}s</span>
                      </div>
                      
                      {results.found && (
                        <div className="flex justify-between items-center">
                          <span className="text-security-muted">Password:</span>
                          <span className="font-mono bg-security-highlight/30 px-2 py-1 rounded text-security-accent">
                            {results.password}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        variant="outline"
                        className="w-full border-security-accent/30 text-security-accent hover:bg-security-accent/10"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </div>
                )}
                
                {!isSimulating && !results && (
                  <div className="h-64 flex flex-col items-center justify-center text-security-muted">
                    <AlertCircle className="w-12 h-12 mb-4 opacity-30" />
                    <p>No test results yet</p>
                    <p className="text-sm">Configure and run a test to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="bruteforce" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <Clock className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              The Pure Brute Force module is currently under development. This feature will allow testing with automatically generated character combinations.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="credential" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <Clock className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              The Credential Stuffing module is currently under development. This feature will allow testing with known username/password combinations from data breaches.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="glass-panel border-security-highlight/30 mt-12">
        <CardHeader>
          <CardTitle className="text-lg">Security Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-security-muted text-sm">
            This tool should only be used for authorized security testing. Attempting to gain unauthorized access to systems is illegal and unethical.
            Always ensure you have explicit permission before conducting security tests.
          </p>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default BruteForce;
