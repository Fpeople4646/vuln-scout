
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Network, Play, AlertCircle, FileText, Search, Server, Activity } from 'lucide-react';

const NetworkScanner = () => {
  const [targetIP, setTargetIP] = useState('');
  const [portRange, setPortRange] = useState('common');
  const [scanType, setScanType] = useState('tcp');
  const [customPorts, setCustomPorts] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [scanTimeout, setScanTimeout] = useState('30');
  const [scanIntensity, setScanIntensity] = useState('normal');
  const [detectServices, setDetectServices] = useState(true);
  
  const simulateScan = () => {
    if (!targetIP) {
      toast.error('Please enter a target IP or hostname');
      return;
    }
    
    setIsScanning(true);
    setScanResults(null);
    
    // Simulate scan process
    toast.info('Scanning started. This may take a few moments...');
    
    setTimeout(() => {
      // Simulate scan results
      const results = {
        target: targetIP,
        scanType,
        timestamp: new Date().toISOString(),
        duration: Math.floor(Math.random() * 15) + 5,
        portsScanned: portRange === 'custom' 
          ? customPorts.split(',').length
          : portRange === 'all' ? 65535 : 1000,
        openPorts: [
          {
            port: 22,
            service: 'SSH',
            state: 'open',
            version: 'OpenSSH 8.2p1',
            details: 'Protocol 2.0'
          },
          {
            port: 80,
            service: 'HTTP',
            state: 'open',
            version: 'nginx 1.18.0',
            details: 'Accepts HEAD, GET, POST'
          },
          {
            port: 443,
            service: 'HTTPS',
            state: 'open',
            version: 'nginx 1.18.0',
            details: 'TLS v1.2, v1.3'
          },
          {
            port: 3306,
            service: 'MySQL',
            state: Math.random() > 0.5 ? 'open' : 'filtered',
            version: 'MySQL 8.0.27',
            details: 'Authentication required'
          }
        ],
        osDetails: {
          name: 'Linux',
          version: 'Ubuntu 20.04',
          confidence: '94%'
        },
        vulnerabilities: [
          {
            port: 22,
            severity: 'Medium',
            description: 'SSH weak cipher algorithms',
            remediation: 'Update SSH configuration to use only strong ciphers'
          },
          {
            port: 80,
            severity: 'Low',
            description: 'HTTP server information disclosure',
            remediation: 'Configure server to hide version information'
          }
        ]
      };
      
      setScanResults(results);
      setIsScanning(false);
      toast.success('Scan completed successfully');
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="flex items-center mb-8">
        <Network className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">Network Scanner</h1>
      </div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        The Network Scanner module allows you to scan networks and hosts to identify open ports, running services, and potential vulnerabilities. This helps map attack surfaces and find potential entry points.
      </p>
      
      <Tabs defaultValue="portscan" className="mb-8">
        <TabsList className="glass-panel border-none">
          <TabsTrigger value="portscan" className="data-[state=active]:bg-security-accent/20">Port Scanner</TabsTrigger>
          <TabsTrigger value="vulnerability" className="data-[state=active]:bg-security-accent/20">Vulnerability Scanner</TabsTrigger>
          <TabsTrigger value="discovery" className="data-[state=active]:bg-security-accent/20">Network Discovery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="portscan" className="mt-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Scan Configuration</CardTitle>
                <CardDescription>Configure your port scanning parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target IP/Hostname</label>
                  <Input 
                    placeholder="192.168.1.1 or example.com" 
                    value={targetIP}
                    onChange={(e) => setTargetIP(e.target.value)}
                    className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Port Range</label>
                  <Select value={portRange} onValueChange={setPortRange}>
                    <SelectTrigger className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50">
                      <SelectValue placeholder="Select port range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Common Ports (1-1000)</SelectItem>
                      <SelectItem value="all">All Ports (1-65535)</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {portRange === 'custom' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Ports</label>
                    <Input 
                      placeholder="21-23,80,443,3306,8080" 
                      value={customPorts}
                      onChange={(e) => setCustomPorts(e.target.value)}
                      className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50"
                    />
                    <p className="text-xs text-security-muted">Enter ports or ranges separated by commas</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Scan Type</label>
                  <Select value={scanType} onValueChange={setScanType}>
                    <SelectTrigger className="border-security-highlight/30 bg-security-secondary/30 focus:border-security-accent/50">
                      <SelectValue placeholder="Select scan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tcp">TCP Connect</SelectItem>
                      <SelectItem value="syn">SYN Stealth</SelectItem>
                      <SelectItem value="udp">UDP Scan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Advanced Options</label>
                  <div className="glass-panel p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-security-muted">Detect Service Versions</span>
                      <Switch 
                        checked={detectServices} 
                        onCheckedChange={setDetectServices} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-security-muted">Scan Timeout (seconds)</span>
                      <Select value={scanTimeout} onValueChange={setScanTimeout}>
                        <SelectTrigger className="h-7 w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15s</SelectItem>
                          <SelectItem value="30">30s</SelectItem>
                          <SelectItem value="60">60s</SelectItem>
                          <SelectItem value="120">120s</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-security-muted">Scan Intensity</span>
                      <Select value={scanIntensity} onValueChange={setScanIntensity}>
                        <SelectTrigger className="h-7 w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paranoid">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={simulateScan}
                  disabled={isScanning}
                  className="w-full bg-security-accent hover:bg-security-accent/80 text-security"
                >
                  {isScanning ? (
                    <span className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 animate-pulse" />
                      Scanning...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      Start Scan
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-panel border-security-highlight/30">
              <CardHeader>
                <CardTitle>Scan Results</CardTitle>
                <CardDescription>View discovered ports and services</CardDescription>
              </CardHeader>
              <CardContent>
                {scanResults ? (
                  <div className="space-y-6 animate-fade-in">
                    <div className="glass-panel p-4">
                      <h3 className="text-sm font-medium mb-3">Scan Summary</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <span className="text-security-muted">Target:</span>
                        <span>{scanResults.target}</span>
                        
                        <span className="text-security-muted">Scan Type:</span>
                        <span>{scanResults.scanType.toUpperCase()}</span>
                        
                        <span className="text-security-muted">Duration:</span>
                        <span>{scanResults.duration} seconds</span>
                        
                        <span className="text-security-muted">Ports Scanned:</span>
                        <span>{scanResults.portsScanned}</span>
                        
                        <span className="text-security-muted">Open Ports:</span>
                        <span>{scanResults.openPorts.length}</span>
                        
                        <span className="text-security-muted">OS Detection:</span>
                        <span>{scanResults.osDetails.name} {scanResults.osDetails.version} ({scanResults.osDetails.confidence})</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center">
                        <Server className="w-4 h-4 mr-2" />
                        Open Ports and Services
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-security-highlight/40 text-xs text-security-muted">
                              <th className="px-3 py-2 text-left">Port</th>
                              <th className="px-3 py-2 text-left">State</th>
                              <th className="px-3 py-2 text-left">Service</th>
                              <th className="px-3 py-2 text-left">Version</th>
                              <th className="px-3 py-2 text-left">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {scanResults.openPorts.map((port: any) => (
                              <tr key={port.port} className="border-t border-security-highlight/20 text-xs">
                                <td className="px-3 py-2">{port.port}</td>
                                <td className="px-3 py-2">
                                  <span className={`px-2 py-0.5 rounded text-xs ${port.state === 'open' ? 'bg-security-success/20 text-security-success' : 'bg-security-warning/20 text-security-warning'}`}>
                                    {port.state}
                                  </span>
                                </td>
                                <td className="px-3 py-2">{port.service}</td>
                                <td className="px-3 py-2">{port.version}</td>
                                <td className="px-3 py-2">{port.details}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {scanResults.vulnerabilities && scanResults.vulnerabilities.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Potential Vulnerabilities
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-security-highlight/40 text-xs text-security-muted">
                                <th className="px-3 py-2 text-left">Port</th>
                                <th className="px-3 py-2 text-left">Severity</th>
                                <th className="px-3 py-2 text-left">Description</th>
                                <th className="px-3 py-2 text-left">Remediation</th>
                              </tr>
                            </thead>
                            <tbody>
                              {scanResults.vulnerabilities.map((vuln: any, index: number) => (
                                <tr key={index} className="border-t border-security-highlight/20 text-xs">
                                  <td className="px-3 py-2">{vuln.port}</td>
                                  <td className="px-3 py-2">
                                    <span className={`px-2 py-0.5 rounded text-xs ${
                                      vuln.severity === 'High' ? 'bg-security-danger/20 text-security-danger' : 
                                      vuln.severity === 'Medium' ? 'bg-security-warning/20 text-security-warning' : 
                                      'bg-security-muted/20 text-security-muted'
                                    }`}>
                                      {vuln.severity}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2">{vuln.description}</td>
                                  <td className="px-3 py-2">{vuln.remediation}</td>
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
                    <Search className="w-12 h-12 mb-4 opacity-30" />
                    <p>No scan results yet</p>
                    <p className="text-sm">Configure and run a scan to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="vulnerability" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <AlertCircle className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              The Vulnerability Scanner module is currently in development. This feature will help identify security vulnerabilities in network services and applications.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="discovery" className="mt-6">
          <Card className="glass-panel border-security-highlight/30 p-12 flex flex-col items-center justify-center min-h-[300px]">
            <AlertCircle className="w-10 h-10 text-security-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-security-muted text-center max-w-lg">
              The Network Discovery module is currently in development. This feature will help map network topology and discover active hosts.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="glass-panel border-security-highlight/30 mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Network Scanning Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-security-muted list-disc pl-5">
            <li>Always obtain proper authorization before scanning any network or system</li>
            <li>Consider the potential impact of scanning on critical systems and services</li>
            <li>Use stealth scanning options when testing in production environments</li>
            <li>Document all findings and report them to the appropriate stakeholders</li>
            <li>Verify findings manually to reduce false positives</li>
            <li>Schedule intensive scans during maintenance windows or low-traffic periods</li>
          </ul>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default NetworkScanner;
