
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Database, Play, AlertCircle, FileText, Table, ExternalLink } from 'lucide-react';

const SqlInjection = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [parameter, setParameter] = useState('');
  const [method, setMethod] = useState('GET');
  const [customPayload, setCustomPayload] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  
  const commonPayloads = [
    "' OR '1'='1",
    "admin' --",
    "'; DROP TABLE users; --",
    "1' OR '1' = '1' --",
    "' UNION SELECT username, password FROM users --",
  ];
  
  const simulateTest = () => {
    if (!targetUrl || !parameter) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsTesting(true);
    setTestResults(null);
    
    // Simulating test process
    setTimeout(() => {
      const isVulnerable = Math.random() > 0.3; // 70% chance of being vulnerable for demo
      
      const results = {
        isVulnerable,
        url: targetUrl,
        parameter,
        method,
        payload: customPayload || commonPayloads[0],
        details: isVulnerable ? 
          {
            type: 'Error-based SQL Injection',
            extractedData: [
              { id: 1, username: 'admin', email: 'admin@example.com' },
              { id: 2, username: 'user1', email: 'user1@example.com' },
              { id: 3, username: 'john_doe', email: 'john@example.com' },
            ],
            dbType: 'MySQL',
            errorMessages: [
              "Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''1'' at line 1"
            ]
          } : null
      };
      
      setTestResults(results);
      setIsTesting(false);
      
      if (isVulnerable) {
        toast.error('SQL Injection vulnerability detected!');
      } else {
        toast.success('No SQL Injection vulnerability detected');
      }
    }, 2500);
  };

  return (
    <MainLayout>
      <div className="flex items-center mb-8">
        <Database className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">SQL Injection Testing</h1>
      </div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        The SQL Injection Testing module helps identify vulnerabilities that could allow attackers to manipulate database queries, potentially exposing sensitive data or allowing unauthorized operations.
      </p>
      
      <Tabs defaultValue="basic" className="mb-8">
        <TabsList className="glass-panel border-none">
          <TabsTrigger value="basic" className="data-[state=active]:bg-security-accent/20">Basic Testing</TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-security-accent/20">Advanced Testing</TabsTrigger>
          <TabsTrigger value="blind" className="data-[state=active]:bg-security-accent/20">Blind SQLi</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="mt-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Test Configuration</CardTitle>
                <CardDescription>Set up your SQL injection test parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target URL</label>
                  <Input 
                    placeholder="https://example.com/products.php?id=1" 
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parameter to Test</label>
                  <Input 
                    placeholder="id" 
                    value={parameter}
                    onChange={(e) => setParameter(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Request Method</label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payload</label>
                  <Select onValueChange={(value) => setCustomPayload(value)}>
                    <SelectTrigger className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50">
                      <SelectValue placeholder="Select a payload or use custom" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonPayloads.map((payload, index) => (
                        <SelectItem key={index} value={payload}>
                          {payload}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom Payload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {customPayload === 'custom' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Payload</label>
                    <Input 
                      placeholder="Enter your custom SQL injection payload" 
                      onChange={(e) => setCustomPayload(e.target.value)}
                      className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                    />
                  </div>
                )}
                
                <Button 
                  onClick={simulateTest}
                  disabled={isTesting}
                  className="w-full bg-security-accent hover:bg-security-accent/80 text-security"
                >
                  {isTesting ? 'Testing...' : (
                    <span className="flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      Run SQL Injection Test
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>View SQL injection vulnerabilities detected</CardDescription>
              </CardHeader>
              <CardContent>
                {testResults ? (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-security-highlight/30 p-4 rounded-md border border-security-highlight/40">
                      <div className="flex items-center mb-4">
                        <div className={`w-3 h-3 rounded-full mr-3 ${testResults.isVulnerable ? 'bg-security-danger' : 'bg-security-success'}`}></div>
                        <span className={`font-medium ${testResults.isVulnerable ? 'text-security-danger' : 'text-security-success'}`}>
                          {testResults.isVulnerable ? 'Vulnerable' : 'Not Vulnerable'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <span className="text-security-muted">URL:</span>
                        <span className="truncate">{testResults.url}</span>
                        
                        <span className="text-security-muted">Parameter:</span>
                        <span>{testResults.parameter}</span>
                        
                        <span className="text-security-muted">Method:</span>
                        <span>{testResults.method}</span>
                        
                        <span className="text-security-muted">Payload:</span>
                        <span className="font-mono text-xs bg-security/50 px-1 py-0.5 rounded">{testResults.payload}</span>
                      </div>
                    </div>
                    
                    {testResults.isVulnerable && testResults.details && (
                      <>
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium">Vulnerability Details</h3>
                          <p className="text-sm text-security-muted">Type: {testResults.details.type}</p>
                          <p className="text-sm text-security-muted">Database Type: {testResults.details.dbType}</p>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Error Messages:</h4>
                            <div className="bg-security-danger/10 border border-security-danger/20 p-3 rounded-md text-xs font-mono">
                              {testResults.details.errorMessages.map((msg: string, i: number) => (
                                <div key={i} className="mb-1">{msg}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium flex items-center">
                            <Table className="w-4 h-4 mr-2" />
                            Extracted Data
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-security-highlight/40 text-xs text-security-muted">
                                  <th className="px-3 py-2 text-left">ID</th>
                                  <th className="px-3 py-2 text-left">Username</th>
                                  <th className="px-3 py-2 text-left">Email</th>
                                </tr>
                              </thead>
                              <tbody>
                                {testResults.details.extractedData.map((row: any) => (
                                  <tr key={row.id} className="border-t border-security-highlight/20 text-xs">
                                    <td className="px-3 py-2">{row.id}</td>
                                    <td className="px-3 py-2">{row.username}</td>
                                    <td className="px-3 py-2">{row.email}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}
                    
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
                ) : (
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
        
        <TabsContent value="advanced" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <ExternalLink className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              The Advanced SQL Injection Testing module is currently in development. This will include time-based, boolean-based, and UNION-based techniques.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="blind" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <ExternalLink className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              The Blind SQL Injection module is currently in development. This will include specialized techniques for detecting and exploiting blind SQL injection vulnerabilities.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="glass-panel border-security-highlight/30 mt-6">
        <CardHeader>
          <CardTitle className="text-lg">SQL Injection Prevention Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-security-muted list-disc pl-5">
            <li>Use parameterized statements (prepared statements) with variable binding</li>
            <li>Use stored procedures with proper input validation</li>
            <li>Escape all user-supplied input before using it in SQL queries</li>
            <li>Implement the principle of least privilege for database accounts</li>
            <li>Use web application firewalls (WAF) to filter common SQL injection attempts</li>
            <li>Validate and sanitize all user inputs on both client and server sides</li>
          </ul>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default SqlInjection;
