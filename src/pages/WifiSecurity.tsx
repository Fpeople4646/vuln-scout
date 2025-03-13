
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Wifi, WifiOff, Lock, Unlock, ShieldAlert, Database, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface WifiNetwork {
  id: string;
  ssid: string;
  bssid: string;
  channel: number;
  encryption: string;
  signal: number;
  clients: number;
  vulnerable: boolean;
}

const WifiSecurity = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [testProgress, setTestProgress] = useState(0);
  const [interfaceDevice, setInterfaceDevice] = useState('');
  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<WifiNetwork | null>(null);
  const [testResults, setTestResults] = useState<{
    wps: boolean;
    weak_password: boolean;
    pmkid: boolean;
    krack: boolean;
    fragmentation: boolean;
  } | null>(null);
  
  const handleStartScan = () => {
    if (!interfaceDevice) {
      toast.error('Please enter an interface device');
      return;
    }
    
    setIsScanning(true);
    setScanProgress(0);
    setNetworks([]);
    
    toast.info('Starting WiFi network scan...');
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Generate mock networks
          const mockNetworks: WifiNetwork[] = [
            {
              id: '1',
              ssid: 'HomeNetwork_2.4G',
              bssid: '00:11:22:33:44:55',
              channel: 6,
              encryption: 'WPA2',
              signal: 78,
              clients: 3,
              vulnerable: false
            },
            {
              id: '2',
              ssid: 'GuestWifi',
              bssid: 'AA:BB:CC:DD:EE:FF',
              channel: 1,
              encryption: 'WPA',
              signal: 65,
              clients: 1,
              vulnerable: true
            },
            {
              id: '3',
              ssid: 'CoffeeShop_Free',
              bssid: '11:22:33:44:55:66',
              channel: 11,
              encryption: 'None',
              signal: 42,
              clients: 8,
              vulnerable: true
            },
            {
              id: '4',
              ssid: 'SecureOffice',
              bssid: 'FF:EE:DD:CC:BB:AA',
              channel: 9,
              encryption: 'WPA2-Enterprise',
              signal: 89,
              clients: 12,
              vulnerable: false
            },
            {
              id: '5',
              ssid: 'IoT_Network',
              bssid: '66:55:44:33:22:11',
              channel: 3,
              encryption: 'WPA2',
              signal: 55,
              clients: 6,
              vulnerable: true
            }
          ];
          
          setNetworks(mockNetworks);
          toast.success(`Scan complete! Found ${mockNetworks.length} networks`);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const handleSelectNetwork = (network: WifiNetwork) => {
    setSelectedNetwork(network);
    setTestResults(null);
  };
  
  const handleStartTest = () => {
    if (!selectedNetwork) {
      toast.error('Please select a network to test');
      return;
    }
    
    setIsTesting(true);
    setTestProgress(0);
    
    toast.info(`Starting security tests on ${selectedNetwork.ssid}...`);
    
    // Simulate testing progress
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTesting(false);
          
          // Generate mock test results
          const mockResults = {
            wps: Math.random() > 0.5,
            weak_password: selectedNetwork.vulnerable,
            pmkid: Math.random() > 0.7,
            krack: selectedNetwork.encryption === 'WPA',
            fragmentation: Math.random() > 0.8
          };
          
          setTestResults(mockResults);
          
          const vulnerabilityCount = Object.values(mockResults).filter(Boolean).length;
          if (vulnerabilityCount > 0) {
            toast.error(`Testing complete! Found ${vulnerabilityCount} vulnerabilities.`);
          } else {
            toast.success('Testing complete! No vulnerabilities found.');
          }
          
          return 100;
        }
        return prev + 2;
      });
    }, 150);
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <Wifi className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">WiFi Security Testing</h1>
      </motion.div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        Test wireless networks for common vulnerabilities and security misconfigurations.
        This tool helps identify weaknesses in WiFi security, including encryption vulnerabilities,
        weak passwords, and protocol exploits.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-panel border-security-highlight/30">
          <CardHeader>
            <CardTitle>WiFi Scanner</CardTitle>
            <CardDescription>Scan for wireless networks in range</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="interface" className="text-sm font-medium">Interface Device</label>
              <Input
                id="interface"
                placeholder="e.g. wlan0, mon0"
                value={interfaceDevice}
                onChange={(e) => setInterfaceDevice(e.target.value)}
                className="bg-security-highlight/20 border-security-highlight/30"
              />
              <p className="text-xs text-security-muted">Enter the wireless interface to use for scanning</p>
            </div>
            
            <Button 
              onClick={handleStartScan}
              disabled={isScanning}
              className="w-full bg-security-accent text-security"
            >
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </Button>
            
            {isScanning && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-security-muted">
                  <span>Scanning networks...</span>
                  <span>{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="glass-panel border-security-highlight/30 lg:col-span-2">
          <CardHeader>
            <CardTitle>Discovered Networks</CardTitle>
            <CardDescription>Select a network to test</CardDescription>
          </CardHeader>
          <CardContent>
            {networks.length > 0 ? (
              <div className="space-y-3">
                {networks.map((network) => (
                  <div 
                    key={network.id}
                    className={`p-3 rounded-md border cursor-pointer transition-all ${
                      selectedNetwork?.id === network.id 
                        ? 'bg-security-accent/10 border-security-accent' 
                        : 'bg-security-highlight/20 border-security-highlight/30 hover:border-security-accent/50'
                    }`}
                    onClick={() => handleSelectNetwork(network)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        {network.signal > 70 ? (
                          <Wifi className="w-4 h-4 text-security-accent mr-2" />
                        ) : network.signal > 40 ? (
                          <Wifi className="w-4 h-4 text-security-warning mr-2" />
                        ) : (
                          <WifiOff className="w-4 h-4 text-security-muted mr-2" />
                        )}
                        <span className="font-medium">{network.ssid}</span>
                      </div>
                      <div className="flex items-center">
                        {network.encryption === 'None' ? (
                          <Unlock className="w-4 h-4 text-security-danger mr-1" />
                        ) : (
                          <Lock className="w-4 h-4 text-security-success mr-1" />
                        )}
                        <span className="text-xs">{network.encryption}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-security-muted">
                      <div>
                        <span className="block">Signal</span>
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-security-highlight/30 rounded-full mr-2">
                            <div 
                              className={`h-full rounded-full ${
                                network.signal > 70 
                                  ? 'bg-security-success' 
                                  : network.signal > 40 
                                    ? 'bg-security-warning' 
                                    : 'bg-security-danger'
                              }`}
                              style={{ width: `${network.signal}%` }}
                            ></div>
                          </div>
                          {network.signal}%
                        </div>
                      </div>
                      <div>
                        <span className="block">Channel</span>
                        {network.channel}
                      </div>
                      <div>
                        <span className="block">Clients</span>
                        {network.clients}
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs font-mono opacity-60">{network.bssid}</div>
                  </div>
                ))}
              </div>
            ) : isScanning ? (
              <div className="flex flex-col items-center justify-center h-40 animate-pulse">
                <Wifi className="w-8 h-8 text-security-accent mb-2" />
                <p className="text-sm">Scanning for networks...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-security-muted">
                <WifiOff className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">No networks found</p>
                <p className="text-xs">Start a scan to discover WiFi networks</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {selectedNetwork && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-panel border-security-highlight/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Wifi className="w-5 h-5 text-security-accent mr-2" />
                {selectedNetwork.ssid}
              </CardTitle>
              <CardDescription>Selected network details</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-security-muted">BSSID:</dt>
                <dd className="font-mono">{selectedNetwork.bssid}</dd>
                
                <dt className="text-security-muted">Encryption:</dt>
                <dd 
                  className={selectedNetwork.encryption === 'None' 
                    ? 'text-security-danger' 
                    : 'text-security-foreground'}
                >
                  {selectedNetwork.encryption}
                </dd>
                
                <dt className="text-security-muted">Channel:</dt>
                <dd>{selectedNetwork.channel}</dd>
                
                <dt className="text-security-muted">Signal:</dt>
                <dd>{selectedNetwork.signal}%</dd>
                
                <dt className="text-security-muted">Clients:</dt>
                <dd>{selectedNetwork.clients}</dd>
              </dl>
            </CardContent>
            <CardFooter className="pt-4">
              <Button 
                onClick={handleStartTest}
                disabled={isTesting}
                className="w-full bg-security-accent text-security"
              >
                {isTesting ? 'Testing...' : 'Start Security Test'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-panel border-security-highlight/30 lg:col-span-2">
            <CardHeader>
              <CardTitle>Security Test Results</CardTitle>
              <CardDescription>Vulnerabilities and security assessment</CardDescription>
            </CardHeader>
            <CardContent>
              {testResults ? (
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="vulns">Vulnerabilities</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="space-y-4">
                    <div className="bg-security-highlight/20 p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-3">Security Score</h3>
                      <div className="relative h-4 bg-security-highlight/30 rounded-full mb-2">
                        {/* Calculate score based on vulnerabilities (fewer vulnerabilities = higher score) */}
                        {(() => {
                          const vulnerabilityCount = Object.values(testResults).filter(Boolean).length;
                          const score = Math.max(0, 100 - (vulnerabilityCount * 20));
                          const scoreColor = score > 70 
                            ? 'bg-security-success' 
                            : score > 40 
                              ? 'bg-security-warning' 
                              : 'bg-security-danger';
                          
                          return (
                            <div 
                              className={`h-full rounded-full ${scoreColor}`}
                              style={{ width: `${score}%` }}
                            ></div>
                          );
                        })()}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>High Risk</span>
                        <span>Low Risk</span>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        {(() => {
                          const vulnerabilityCount = Object.values(testResults).filter(Boolean).length;
                          if (vulnerabilityCount === 0) {
                            return (
                              <>
                                <CheckCircle className="w-5 h-5 text-security-success mr-2" />
                                <span className="text-security-success font-medium">No vulnerabilities detected</span>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <AlertTriangle className="w-5 h-5 text-security-danger mr-2" />
                                <span className="text-security-danger font-medium">
                                  {vulnerabilityCount} {vulnerabilityCount === 1 ? 'vulnerability' : 'vulnerabilities'} detected
                                </span>
                              </>
                            );
                          }
                        })()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-security-highlight/20 p-4 rounded-md">
                        <h3 className="text-sm font-medium mb-2">Encryption</h3>
                        <div className="flex items-center">
                          {(() => {
                            if (selectedNetwork.encryption === 'None') {
                              return (
                                <>
                                  <XCircle className="w-5 h-5 text-security-danger mr-2" />
                                  <span className="text-security-danger">Unencrypted</span>
                                </>
                              );
                            } else if (selectedNetwork.encryption === 'WPA') {
                              return (
                                <>
                                  <AlertTriangle className="w-5 h-5 text-security-warning mr-2" />
                                  <span className="text-security-warning">WPA (Outdated)</span>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <CheckCircle className="w-5 h-5 text-security-success mr-2" />
                                  <span className="text-security-success">Strong ({selectedNetwork.encryption})</span>
                                </>
                              );
                            }
                          })()}
                        </div>
                      </div>
                      
                      <div className="bg-security-highlight/20 p-4 rounded-md">
                        <h3 className="text-sm font-medium mb-2">Authentication</h3>
                        <div className="flex items-center">
                          {testResults.weak_password ? (
                            <>
                              <XCircle className="w-5 h-5 text-security-danger mr-2" />
                              <span className="text-security-danger">Weak Password</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5 text-security-success mr-2" />
                              <span className="text-security-success">Strong Authentication</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="vulns" className="space-y-3">
                    <div className={`p-3 rounded-md ${testResults.wps ? 'bg-security-danger/10 border border-security-danger/30' : 'bg-security-highlight/20'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {testResults.wps ? (
                            <XCircle className="w-5 h-5 text-security-danger mr-2" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-security-success mr-2" />
                          )}
                          <span className="font-medium">WPS Vulnerability</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${testResults.wps ? 'bg-security-danger/10 text-security-danger' : 'bg-security-success/10 text-security-success'}`}>
                          {testResults.wps ? 'Vulnerable' : 'Secure'}
                        </span>
                      </div>
                      {testResults.wps && (
                        <p className="text-xs text-security-muted mt-2">
                          WiFi Protected Setup (WPS) is enabled and vulnerable to brute force attacks.
                        </p>
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-md ${testResults.weak_password ? 'bg-security-danger/10 border border-security-danger/30' : 'bg-security-highlight/20'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {testResults.weak_password ? (
                            <XCircle className="w-5 h-5 text-security-danger mr-2" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-security-success mr-2" />
                          )}
                          <span className="font-medium">Weak Password</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${testResults.weak_password ? 'bg-security-danger/10 text-security-danger' : 'bg-security-success/10 text-security-success'}`}>
                          {testResults.weak_password ? 'Vulnerable' : 'Secure'}
                        </span>
                      </div>
                      {testResults.weak_password && (
                        <p className="text-xs text-security-muted mt-2">
                          The network password is vulnerable to dictionary or brute force attacks.
                        </p>
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-md ${testResults.pmkid ? 'bg-security-danger/10 border border-security-danger/30' : 'bg-security-highlight/20'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {testResults.pmkid ? (
                            <XCircle className="w-5 h-5 text-security-danger mr-2" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-security-success mr-2" />
                          )}
                          <span className="font-medium">PMKID Attack</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${testResults.pmkid ? 'bg-security-danger/10 text-security-danger' : 'bg-security-success/10 text-security-success'}`}>
                          {testResults.pmkid ? 'Vulnerable' : 'Secure'}
                        </span>
                      </div>
                      {testResults.pmkid && (
                        <p className="text-xs text-security-muted mt-2">
                          Vulnerable to PMKID client-less attack, which can be used to recover the password.
                        </p>
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-md ${testResults.krack ? 'bg-security-danger/10 border border-security-danger/30' : 'bg-security-highlight/20'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {testResults.krack ? (
                            <XCircle className="w-5 h-5 text-security-danger mr-2" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-security-success mr-2" />
                          )}
                          <span className="font-medium">KRACK Attack</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${testResults.krack ? 'bg-security-danger/10 text-security-danger' : 'bg-security-success/10 text-security-success'}`}>
                          {testResults.krack ? 'Vulnerable' : 'Secure'}
                        </span>
                      </div>
                      {testResults.krack && (
                        <p className="text-xs text-security-muted mt-2">
                          Vulnerable to Key Reinstallation Attack (KRACK), affecting WPA/WPA2 protocols.
                        </p>
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-md ${testResults.fragmentation ? 'bg-security-danger/10 border border-security-danger/30' : 'bg-security-highlight/20'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {testResults.fragmentation ? (
                            <XCircle className="w-5 h-5 text-security-danger mr-2" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-security-success mr-2" />
                          )}
                          <span className="font-medium">Fragmentation Attack</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${testResults.fragmentation ? 'bg-security-danger/10 text-security-danger' : 'bg-security-success/10 text-security-success'}`}>
                          {testResults.fragmentation ? 'Vulnerable' : 'Secure'}
                        </span>
                      </div>
                      {testResults.fragmentation && (
                        <p className="text-xs text-security-muted mt-2">
                          Vulnerable to fragmentation attacks that can be used to obtain the PMKID.
                        </p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="recommendations" className="space-y-4">
                    {(Object.values(testResults).some(value => value) && (
                      <div className="space-y-3">
                        {testResults.wps && (
                          <div className="p-3 bg-security-highlight/20 rounded-md">
                            <h3 className="font-medium text-sm mb-1">Disable WPS</h3>
                            <p className="text-xs text-security-muted">
                              Access your router's administration interface and disable WPS. This protocol has known vulnerabilities that can be exploited.
                            </p>
                          </div>
                        )}
                        
                        {testResults.weak_password && (
                          <div className="p-3 bg-security-highlight/20 rounded-md">
                            <h3 className="font-medium text-sm mb-1">Use Strong Password</h3>
                            <p className="text-xs text-security-muted">
                              Create a strong password with at least 12 characters, including uppercase and lowercase letters, numbers, and special characters.
                            </p>
                          </div>
                        )}
                        
                        {(testResults.pmkid || testResults.krack || testResults.fragmentation) && (
                          <div className="p-3 bg-security-highlight/20 rounded-md">
                            <h3 className="font-medium text-sm mb-1">Update Firmware</h3>
                            <p className="text-xs text-security-muted">
                              Update your router's firmware to the latest version to patch known vulnerabilities.
                            </p>
                          </div>
                        )}
                        
                        {selectedNetwork.encryption === 'WPA' && (
                          <div className="p-3 bg-security-highlight/20 rounded-md">
                            <h3 className="font-medium text-sm mb-1">Upgrade to WPA2/WPA3</h3>
                            <p className="text-xs text-security-muted">
                              WPA is outdated and has security vulnerabilities. Configure your router to use WPA2 or WPA3 if available.
                            </p>
                          </div>
                        )}
                        
                        {selectedNetwork.encryption === 'None' && (
                          <div className="p-3 bg-security-highlight/20 rounded-md">
                            <h3 className="font-medium text-sm mb-1">Enable Encryption</h3>
                            <p className="text-xs text-security-muted">
                              Open networks without encryption are highly insecure. Enable WPA2 or WPA3 encryption immediately.
                            </p>
                          </div>
                        )}
                      </div>
                    )) || (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <CheckCircle className="w-10 h-10 text-security-success mb-3" />
                        <h3 className="text-lg font-medium text-security-success mb-2">Network is Secure</h3>
                        <p className="text-security-muted text-sm">
                          No significant vulnerabilities were detected. Continue monitoring and keeping firmware updated.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              ) : isTesting ? (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-8 animate-pulse">
                    <Database className="w-8 h-8 text-security-accent mb-3" />
                    <p className="text-sm mb-4">Running security tests...</p>
                    <div className="w-full max-w-md space-y-2">
                      <Progress value={testProgress} className="h-2" />
                      <div className="flex justify-between text-xs text-security-muted">
                        <span>Testing vulnerabilities</span>
                        <span>{testProgress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-60 text-security-muted">
                  <ShieldAlert className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm">No security tests run yet</p>
                  <p className="text-xs">Select a network and start a security test</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-security-danger/10 border border-security-danger/30 rounded-md">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-security-danger mt-0.5" />
          <div>
            <h3 className="text-security-danger font-semibold mb-1">Legal Warning</h3>
            <p className="text-sm text-security-muted">
              This tool is for educational and authorized security testing only. Testing WiFi networks without explicit permission from the network owner is illegal in most jurisdictions and violates computer misuse laws. Always ensure you have proper authorization before conducting any security tests.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WifiSecurity;
