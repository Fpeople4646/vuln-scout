
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Code, Play, AlertCircle, FileText, ExternalLink, X, Check } from 'lucide-react';

const XSS = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [parameter, setParameter] = useState('');
  const [customPayload, setCustomPayload] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [interceptResponse, setInterceptResponse] = useState(true);
  
  const xssPayloads = [
    "<script>alert('XSS')</script>",
    "<img src='x' onerror='alert(\"XSS\")'>",
    "<body onload='alert(\"XSS\")'>",
    "javascript:alert('XSS')",
    "<iframe src='javascript:alert(`XSS`)'></iframe>",
  ];
  
  const simulateTest = () => {
    if (!targetUrl) {
      toast.error('Please enter a target URL');
      return;
    }
    
    setIsTesting(true);
    setTestResults(null);
    
    // Simulate test process
    setTimeout(() => {
      const isVulnerable = Math.random() > 0.3;
      
      const results = {
        isVulnerable,
        url: targetUrl,
        parameter: parameter || 'search',
        payload: customPayload || xssPayloads[0],
        details: isVulnerable ? {
          type: 'Reflected XSS',
          context: 'HTML Body',
          bypassedFilters: ['Basic HTML filtering'],
          executionPoint: 'User input is reflected in the response without proper encoding',
          impact: 'High - Can execute arbitrary JavaScript code in victim\'s browser context'
        } : null,
        screenshot: isVulnerable ? '/screenshot.jpg' : null
      };
      
      setTestResults(results);
      setIsTesting(false);
      
      if (isVulnerable) {
        toast.error('XSS vulnerability detected!');
      } else {
        toast.success('No XSS vulnerability detected');
      }
    }, 2500);
  };

  return (
    <MainLayout>
      <div className="flex items-center mb-8">
        <Code className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">XSS Testing</h1>
      </div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        The Cross-Site Scripting (XSS) Testing module helps identify vulnerabilities that could allow attackers to inject malicious scripts into web pages, potentially stealing session cookies, redirecting users to malicious sites, or performing actions on behalf of the victim.
      </p>
      
      <Tabs defaultValue="reflected" className="mb-8">
        <TabsList className="glass-panel border-none">
          <TabsTrigger value="reflected" className="data-[state=active]:bg-security-accent/20">Reflected XSS</TabsTrigger>
          <TabsTrigger value="stored" className="data-[state=active]:bg-security-accent/20">Stored XSS</TabsTrigger>
          <TabsTrigger value="dom" className="data-[state=active]:bg-security-accent/20">DOM-based XSS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reflected" className="mt-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Test Configuration</CardTitle>
                <CardDescription>Set up your XSS test parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target URL</label>
                  <Input 
                    placeholder="https://example.com/search?q=term" 
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parameter to Test (Optional)</label>
                  <Input 
                    placeholder="q" 
                    value={parameter}
                    onChange={(e) => setParameter(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">XSS Payload</label>
                  <select 
                    className="w-full border border-security-highlight/30 bg-security-secondary/30 rounded-md p-2 focus:border-security-accent/50 focus:outline-none focus:ring-1 focus:ring-security-accent/50"
                    onChange={(e) => setCustomPayload(e.target.value === 'custom' ? '' : e.target.value)}
                  >
                    <option value="">Select a payload</option>
                    {xssPayloads.map((payload, index) => (
                      <option key={index} value={payload}>{payload}</option>
                    ))}
                    <option value="custom">Custom Payload</option>
                  </select>
                </div>
                
                {customPayload === 'custom' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Payload</label>
                    <Input 
                      placeholder="Enter your custom XSS payload" 
                      onChange={(e) => setCustomPayload(e.target.value)}
                      className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Intercept Response</span>
                  <Switch 
                    checked={interceptResponse} 
                    onCheckedChange={setInterceptResponse} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Advanced Options</label>
                  <div className="glass-panel p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-security-muted">Test All Parameters</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-security-muted">Follow Redirects</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-security-muted">Use Headless Browser</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={simulateTest}
                  disabled={isTesting}
                  className="w-full bg-security-accent hover:bg-security-accent/80 text-security"
                >
                  {isTesting ? 'Testing...' : (
                    <span className="flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      Run XSS Test
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>View XSS vulnerabilities detected</CardDescription>
              </CardHeader>
              <CardContent>
                {testResults ? (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center">
                      {testResults.isVulnerable ? (
                        <div className="bg-security-danger/20 text-security-danger px-3 py-2 rounded-md flex items-center space-x-2 w-full">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-medium">Vulnerable to XSS!</span>
                        </div>
                      ) : (
                        <div className="bg-security-success/20 text-security-success px-3 py-2 rounded-md flex items-center space-x-2 w-full">
                          <Check className="w-5 h-5" />
                          <span className="font-medium">No XSS vulnerability detected</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="glass-panel p-4">
                      <h3 className="text-sm font-medium mb-3">Test Details</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <span className="text-security-muted">URL:</span>
                        <span className="truncate">{testResults.url}</span>
                        
                        <span className="text-security-muted">Parameter:</span>
                        <span>{testResults.parameter}</span>
                        
                        <span className="text-security-muted">Payload:</span>
                        <span className="font-mono text-xs bg-security/50 px-1 py-0.5 rounded">{testResults.payload}</span>
                      </div>
                    </div>
                    
                    {testResults.isVulnerable && testResults.details && (
                      <div className="glass-panel p-4">
                        <h3 className="text-sm font-medium mb-3">Vulnerability Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex">
                            <span className="text-security-muted w-24">Type:</span>
                            <span>{testResults.details.type}</span>
                          </div>
                          <div className="flex">
                            <span className="text-security-muted w-24">Context:</span>
                            <span>{testResults.details.context}</span>
                          </div>
                          <div className="flex">
                            <span className="text-security-muted w-24">Bypassed:</span>
                            <span>{testResults.details.bypassedFilters.join(', ')}</span>
                          </div>
                          <div className="flex">
                            <span className="text-security-muted w-24">Impact:</span>
                            <span>{testResults.details.impact}</span>
                          </div>
                        </div>
                      </div>
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
        
        <TabsContent value="stored" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <ExternalLink className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              The Stored XSS Testing module is currently in development. This feature will help identify persistent XSS vulnerabilities where malicious scripts are stored on the target server.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="dom" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <ExternalLink className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              The DOM-based XSS Testing module is currently in development. This feature will help identify XSS vulnerabilities that occur in client-side JavaScript.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="glass-panel border-security-highlight/30 mt-6">
        <CardHeader>
          <CardTitle className="text-lg">XSS Prevention Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-security-muted list-disc pl-5">
            <li>Use proper output encoding/escaping for the correct context (HTML, JavaScript, CSS, URL)</li>
            <li>Implement Content Security Policy (CSP) to restrict script execution sources</li>
            <li>Use frameworks with built-in XSS protection (React, Angular, Vue)</li>
            <li>Validate and sanitize all user inputs on both client and server sides</li>
            <li>Use HTTP-only cookies to prevent cookie theft via XSS</li>
            <li>Implement X-XSS-Protection and X-Content-Type-Options headers</li>
          </ul>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default XSS;
