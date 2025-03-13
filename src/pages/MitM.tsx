
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network, Wifi, Shield, ShieldAlert, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const MitM = () => {
  const [targetNetwork, setTargetNetwork] = useState('');
  const [interfaceDevice, setInterfaceDevice] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const handleScan = () => {
    if (!targetNetwork || !interfaceDevice) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsScanning(true);
    toast.info('Scanning network for devices...');

    // Simulate scanning process
    setTimeout(() => {
      const mockDevices = [
        '00:1A:2B:3C:4D:5E - 192.168.1.10 - Android Device',
        'A1:B2:C3:D4:E5:F6 - 192.168.1.11 - iPhone',
        'F1:E2:D3:C4:B5:A6 - 192.168.1.12 - Windows Laptop',
        '1A:2B:3C:4D:5E:6F - 192.168.1.13 - MacBook Pro',
      ];
      
      setDiscoveredDevices(mockDevices);
      setIsScanning(false);
      toast.success('Scan completed! Discovered ' + mockDevices.length + ' devices');
    }, 3000);
  };

  const handleStartAttack = () => {
    if (discoveredDevices.length === 0) {
      toast.error('No devices discovered. Please scan first.');
      return;
    }

    setIsAttacking(true);
    toast.info('Starting MitM attack...');
    
    // Simulate attack process
    setLogs(prev => [...prev, 'Starting ARP spoofing attack...']);
    
    const attackSteps = [
      'Enabling IP forwarding...',
      'Setting up packet interception...',
      'Initiating ARP cache poisoning...',
      'Redirecting traffic through attacking machine...',
      'Capturing packets...',
      'Attack active - traffic is now being intercepted'
    ];
    
    attackSteps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (index === attackSteps.length - 1) {
          toast.success('Attack successfully initiated');
        }
      }, (index + 1) * 1500);
    });
  };

  const handleStopAttack = () => {
    setIsAttacking(false);
    setLogs(prev => [...prev, 'Stopping attack...', 'Restoring ARP tables...', 'Attack stopped']);
    toast.success('Attack stopped successfully');
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <Network className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">Man-in-the-Middle Attack</h1>
      </motion.div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        This tool simulates a Man-in-the-Middle attack to test network security. The attack works by intercepting
        communication between two parties without their knowledge, allowing the attacker to eavesdrop or modify data.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-panel border-security-highlight/30 lg:col-span-2">
          <CardHeader>
            <CardTitle>Attack Configuration</CardTitle>
            <CardDescription>Configure the network settings for the MitM attack</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="setup" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="network" className="text-sm font-medium">Target Network</label>
                    <Input
                      id="network"
                      placeholder="e.g. 192.168.1.0/24"
                      value={targetNetwork}
                      onChange={(e) => setTargetNetwork(e.target.value)}
                      className="bg-security-highlight/20 border-security-highlight/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="interface" className="text-sm font-medium">Interface Device</label>
                    <Input
                      id="interface"
                      placeholder="e.g. wlan0, eth0"
                      value={interfaceDevice}
                      onChange={(e) => setInterfaceDevice(e.target.value)}
                      className="bg-security-highlight/20 border-security-highlight/30"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <Button 
                    onClick={handleScan}
                    disabled={isScanning || isAttacking}
                    className={`${isScanning ? 'bg-security-warning/60' : 'bg-security-accent'} text-security`}
                  >
                    {isScanning ? 'Scanning...' : 'Scan Network'}
                  </Button>
                  
                  <Button 
                    onClick={handleStartAttack}
                    disabled={isScanning || isAttacking || discoveredDevices.length === 0}
                    className="bg-security-danger text-white"
                  >
                    Start Attack
                  </Button>
                  
                  <Button 
                    onClick={handleStopAttack}
                    disabled={!isAttacking}
                    variant="outline"
                    className="border-security-highlight/30"
                  >
                    Stop Attack
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Packet Capturing Options</label>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="http" className="rounded text-security-accent" />
                      <label htmlFor="http" className="text-sm">Capture HTTP</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="https" className="rounded text-security-accent" />
                      <label htmlFor="https" className="text-sm">Try HTTPS Downgrade</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="dns" className="rounded text-security-accent" />
                      <label htmlFor="dns" className="text-sm">DNS Spoofing</label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Output Options</label>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="save-pcap" className="rounded text-security-accent" />
                      <label htmlFor="save-pcap" className="text-sm">Save to PCAP</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="credentials" className="rounded text-security-accent" />
                      <label htmlFor="credentials" className="text-sm">Focus on Credentials</label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="glass-panel border-security-highlight/30">
          <CardHeader>
            <CardTitle>Discovered Devices</CardTitle>
            <CardDescription>Devices available on the network</CardDescription>
          </CardHeader>
          <CardContent>
            {discoveredDevices.length > 0 ? (
              <motion.ul 
                className="space-y-2"
                variants={containerAnimation}
                initial="hidden"
                animate="show"
              >
                {discoveredDevices.map((device, index) => (
                  <motion.li 
                    key={index}
                    variants={itemAnimation}
                    className="p-2 bg-security-highlight/20 rounded-md text-sm flex items-center gap-2"
                  >
                    <Wifi className="w-4 h-4 text-security-accent" />
                    {device}
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-security-muted">
                <Wifi className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm">No devices discovered yet</p>
                <p className="text-xs">Scan the network to discover devices</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Attack Logs */}
      <Card className="glass-panel border-security-highlight/30 mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Attack Logs</CardTitle>
            <CardDescription>Logs and captured data from the attack</CardDescription>
          </div>
          {isAttacking && (
            <div className="flex items-center gap-2">
              <span className="animate-pulse w-2 h-2 bg-security-danger rounded-full"></span>
              <span className="text-sm text-security-danger">Live Attack</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <div className="bg-security/90 rounded-md p-3 max-h-60 overflow-y-auto font-mono text-sm">
              {logs.map((log, index) => (
                <div key={index} className="mb-1">
                  <span className="text-security-muted">[{new Date().toLocaleTimeString()}]</span> <span className={log.includes('Attack active') ? 'text-security-success' : log.includes('Stopping') ? 'text-security-warning' : ''}>{log}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-security-muted">
              <AlertTriangle className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm">No attack logs available</p>
              <p className="text-xs">Start an attack to see logs here</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-8 p-4 bg-security-danger/10 border border-security-danger/30 rounded-md">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-security-danger mt-0.5" />
          <div>
            <h3 className="text-security-danger font-semibold mb-1">Legal Warning</h3>
            <p className="text-sm text-security-muted">
              This tool is for educational and authorized security testing only. Using MitM attacks against networks without explicit permission is illegal and unethical. Always obtain proper authorization before performing security tests.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MitM;
