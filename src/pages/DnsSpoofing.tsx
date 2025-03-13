
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Globe, Play, AlertCircle, FileText, Eye, Shield } from 'lucide-react';

const DnsSpoofing = () => {
  const [targetDomain, setTargetDomain] = useState('');
  const [spoofedIP, setSpoofedIP] = useState('');
  const [networkInterface, setNetworkInterface] = useState('eth0');
  const [isTesting, setIsTesting] = useState(false);
  const [capturePackets, setCapturePackets] = useState(true);
  const [testResults, setTestResults] = useState<any>(null);
  
  const simulateTest = () => {
    if (!targetDomain || !spoofedIP) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsTesting(true);
    setTestResults(null);
    
    toast.info('Starting DNS spoofing simulation...');
    
    // Simulate DNS spoofing test
    setTimeout(() => {
      const results = {
        success: Math.random() > 0.3, // 70% chance of success for demo
        target: targetDomain,
        spoofedIP,
        networkInterface,
        timestamp: new Date().toISOString(),
        duration: Math.floor(Math.random() * 10) + 5,
        interceptedRequests: Math.floor(Math.random() * 20) + 1,
        details: {
          attackVector: 'ARP cache poisoning + DNS response spoofing',
          detectionRisk: 'Medium',
          mitigation: 'DNSSEC, DNS over HTTPS, Network monitoring'
        },
        packetCapture: capturePackets ? [
          {
            time: '00:00:01.234',
            source: '192.168.1.5',
            destination: '192.168.1.1',
            protocol: 'DNS',
            info: `Standard query 0x1234 A ${targetDomain}`
          },
          {
            time: '00:00:01.245',
            source: '192.168.1.100',
            destination: '192.168.1.5',
            protocol: 'DNS',
            info: `Standard query response 0x1234 A ${targetDomain} A ${spoofedIP}`
          },
          {
            time: '00:00:01.347',
            source: '192.168.1.5',
            destination: spoofedIP,
            protocol: 'TCP',
            info: `49234 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM=1`
          }
        ] : []
      };
      
      setTestResults(results);
      setIsTesting(false);
      
      if (results.success) {
        toast.success('DNS spoofing test completed successfully');
      } else {
        toast.error('DNS spoofing test failed');
      }
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="flex items-center mb-8">
        <Globe className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">DNS Spoofing</h1>
      </div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        The DNS Spoofing module allows you to test for DNS vulnerabilities by simulating attacks that redirect users from legitimate websites to potentially malicious ones. This helps identify weaknesses in DNS security implementations.
      </p>
      
      <Tabs defaultValue="basic" className="mb-8">
        <TabsList className="glass-panel border-none">
          <TabsTrigger value="basic" className="data-[state=active]:bg-security-accent/20">Basic Test</TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-security-accent/20">Advanced Options</TabsTrigger>
          <TabsTrigger value="detection" className="data-[state=active]:bg-security-accent/20">Detection Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="mt-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Test Configuration</CardTitle>
                <CardDescription>Configure your DNS spoofing test parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Domain</label>
                  <Input 
                    placeholder="example.com" 
                    value={targetDomain}
                    onChange={(e) => setTargetDomain(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Spoofed IP Address</label>
                  <Input 
                    placeholder="192.168.1.100" 
                    value={spoofedIP}
                    onChange={(e) => setSpoofedIP(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Network Interface</label>
                  <Input 
                    placeholder="eth0" 
                    value={networkInterface}
                    onChange={(e) => setNetworkInterface(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Capture Packets</span>
                  <Switch 
                    checked={capturePackets} 
                    onCheckedChange={setCapturePackets} 
                  />
                </div>
                
                <Button 
                  onClick={simulateTest}
                  disabled={isTesting}
                  className="w-full bg-security-accent hover:bg-security-accent/80 text-security"
                >
                  {isTesting ? 'Testing...' : (
                    <span className="flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      Run DNS Spoofing Test
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>View DNS spoofing test results</CardDescription>
              </CardHeader>
              <CardContent>
                {testResults ? (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center">
                      {testResults.success ? (
                        <div className="bg-security-success/20 text-security-success px-3 py-2 rounded-md flex items-center space-x-2 w-full">
                          <Shield className="w-5 h-5" />
                          <span className="font-medium">DNS Spoofing Successful</span>
                        </div>
                      ) : (
                        <div className="bg-security-danger/20 text-security-danger px-3 py-2 rounded-md flex items-center space-x-2 w-full">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-medium">DNS Spoofing Failed</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="glass-panel p-4">
                      <h3 className="text-sm font-medium mb-3">Test Details</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <span className="text-security-muted">Target Domain:</span>
                        <span>{testResults.target}</span>
                        
                        <span className="text-security-muted">Spoofed IP:</span>
                        <span>{testResults.spoofedIP}</span>
                        
                        <span className="text-security-muted">Interface:</span>
                        <span>{testResults.networkInterface}</span>
                        
                        <span className="text-security-muted">Duration:</span>
                        <span>{testResults.duration} seconds</span>
                        
                        <span className="text-security-muted">Intercepted Requests:</span>
                        <span>{testResults.interceptedRequests}</span>
                        
                        <span className="text-security-muted">Attack Vector:</span>
                        <span>{testResults.details.attackVector}</span>
                        
                        <span className="text-security-muted">Detection Risk:</span>
                        <span>{testResults.details.detectionRisk}</span>
                      </div>
                    </div>
                    
                    {testResults.packetCapture && testResults.packetCapture.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium flex items-center">
                          <Eye className="w-4 h-4 mr-2" />
                          Packet Capture
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-security-highlight/40 text-xs text-security-muted">
                                <th className="px-3 py-2 text-left">Time</th>
                                <th className="px-3 py-2 text-left">Source</th>
                                <th className="px-3 py-2 text-left">Destination</th>
                                <th className="px-3 py-2 text-left">Protocol</th>
                                <th className="px-3 py-2 text-left">Info</th>
                              </tr>
                            </thead>
                            <tbody>
                              {testResults.packetCapture.map((packet: any, index: number) => (
                                <tr key={index} className="border-t border-security-highlight/20 text-xs">
                                  <td className="px-3 py-2">{packet.time}</td>
                                  <td className="px-3 py-2">{packet.source}</td>
                                  <td className="px-3 py-2">{packet.destination}</td>
                                  <td className="px-3 py-2">{packet.protocol}</td>
                                  <td className="px-3 py-2 font-mono text-xs">{packet.info}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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
        
        <TabsContent value="advanced" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <AlertCircle className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              Advanced DNS Spoofing options are currently in development. This feature will include more sophisticated attack vectors and customization options.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="detection" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <AlertCircle className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              The Detection Analysis module is currently in development. This feature will help assess how well security controls can detect DNS spoofing attempts.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="glass-panel border-security-highlight/30 mt-6">
        <CardHeader>
          <CardTitle className="text-lg">DNS Spoofing Mitigation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-security-muted list-disc pl-5">
            <li>Implement DNSSEC (Domain Name System Security Extensions) to validate DNS responses</li>
            <li>Use encrypted DNS protocols like DNS over HTTPS (DoH) or DNS over TLS (DoT)</li>
            <li>Configure DNS servers to use randomized source ports and query IDs</li>
            <li>Monitor network traffic for unusual DNS activity</li>
            <li>Keep DNS server software updated with the latest security patches</li>
            <li>Use trusted DNS resolvers with built-in security features</li>
          </ul>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default DnsSpoofing;
