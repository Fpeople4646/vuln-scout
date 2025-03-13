
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Globe, ShieldAlert, FileText, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface GeoIPData {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  proxy: boolean;
  hosting: boolean;
}

const IPTracking = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geoData, setGeoData] = useState<GeoIPData | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const handleTrackIP = () => {
    if (!ipAddress) {
      toast.error('Please enter an IP address');
      return;
    }
    
    // Validate IP format (basic validation)
    const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    if (!ipRegex.test(ipAddress)) {
      toast.error('Please enter a valid IPv4 address');
      return;
    }
    
    setIsLoading(true);
    toast.info(`Tracking IP address: ${ipAddress}`);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate mock geolocation data based on the IP
      const mockData: GeoIPData = {
        ip: ipAddress,
        country: 'United States',
        countryCode: 'US',
        region: 'California',
        city: 'San Francisco',
        zip: '94105',
        lat: 37.7749,
        lon: -122.4194,
        timezone: 'America/Los_Angeles',
        isp: 'Cloudflare, Inc.',
        org: 'Cloudflare',
        as: 'AS13335 Cloudflare, Inc.',
        proxy: Math.random() > 0.7,
        hosting: Math.random() > 0.5
      };
      
      setGeoData(mockData);
      setIsLoading(false);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(ipAddress)) {
        setRecentSearches(prev => [ipAddress, ...prev].slice(0, 5));
      }
      
      toast.success(`IP tracking complete for ${ipAddress}`);
    }, 1500);
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <MapPin className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">IP Tracking (GeoIP)</h1>
      </motion.div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        Track and analyze IP addresses to obtain geolocation data, ISP information, and 
        detect proxies or VPNs. This tool helps with network forensics and reconnaissance.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card className="glass-panel border-security-highlight/30">
            <CardHeader>
              <CardTitle>IP Tracker</CardTitle>
              <CardDescription>Enter an IP address to track its location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <Input
                  placeholder="Enter IP address (e.g. 8.8.8.8)"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  className="bg-security-highlight/20 border-security-highlight/30 rounded-r-none"
                />
                <Button 
                  onClick={handleTrackIP}
                  disabled={isLoading}
                  className="bg-security-accent text-security rounded-l-none"
                >
                  {isLoading ? 'Tracking...' : 'Track'}
                </Button>
              </div>
              
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Recent Searches</h3>
                  <div className="space-y-2">
                    {recentSearches.map((ip, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-2 bg-security-highlight/20 rounded-md cursor-pointer hover:bg-security-highlight/30 transition-colors"
                        onClick={() => setIpAddress(ip)}
                      >
                        <div className="flex items-center">
                          <Search className="w-3.5 h-3.5 text-security-muted mr-2" />
                          <span className="text-sm">{ip}</span>
                        </div>
                        <Button
                          variant="ghost" 
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTrackIP();
                          }}
                        >
                          <Search className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="glass-panel border-security-highlight/30">
            <CardHeader>
              <CardTitle>IP Information</CardTitle>
              <CardDescription>What data can be found using an IP</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-security-muted">
                <li className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-security-accent mt-0.5" />
                  <span>Geographic location (country, city)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-security-accent mt-0.5" />
                  <span>Internet Service Provider (ISP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-security-accent mt-0.5" />
                  <span>Time zone information</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-security-accent mt-0.5" />
                  <span>Proxy/VPN detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-security-accent mt-0.5" />
                  <span>Autonomous System (AS) information</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="glass-panel border-security-highlight/30 h-full">
            <CardHeader>
              <CardTitle>Geolocation Results</CardTitle>
              <CardDescription>
                {geoData 
                  ? `Showing results for ${geoData.ip}` 
                  : 'Enter an IP address to see geolocation data'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16 animate-pulse">
                  <Globe className="w-12 h-12 text-security-accent mb-4" />
                  <p>Retrieving geolocation data...</p>
                </div>
              ) : geoData ? (
                <div>
                  <div className="flex justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">{geoData.city}, {geoData.region}</h3>
                      <div className="flex items-center mt-1">
                        <Globe className="w-4 h-4 text-security-accent mr-2" />
                        <span>{geoData.country} ({geoData.countryCode})</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-security-highlight/30"
                      onClick={() => handleCopyToClipboard(
                        `IP: ${geoData.ip}\nLocation: ${geoData.city}, ${geoData.region}, ${geoData.country}\nCoordinates: ${geoData.lat}, ${geoData.lon}\nISP: ${geoData.isp}\nOrganization: ${geoData.org}`
                      )}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy Data
                    </Button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="aspect-video bg-security-highlight/30 rounded-md flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <MapPin className="w-8 h-8 text-security-accent mb-2" />
                        <span className="text-sm mb-1">Map would display here</span>
                        <div className="text-xs text-security-muted">Coordinates: {geoData.lat}, {geoData.lon}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-security-highlight/20 p-3 rounded-md">
                      <h3 className="text-sm font-medium mb-2">Connection Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-security-muted">IP Address:</span>
                          <span className="font-mono">{geoData.ip}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-security-muted">ISP:</span>
                          <span>{geoData.isp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-security-muted">Organization:</span>
                          <span>{geoData.org}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-security-muted">AS Number:</span>
                          <span className="font-mono">{geoData.as.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-security-highlight/20 p-3 rounded-md">
                      <h3 className="text-sm font-medium mb-2">Location Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-security-muted">Country:</span>
                          <span>{geoData.country} ({geoData.countryCode})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-security-muted">Region/State:</span>
                          <span>{geoData.region}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-security-muted">City:</span>
                          <span>{geoData.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-security-muted">Postal Code:</span>
                          <span>{geoData.zip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-security-highlight/20 p-3 rounded-md">
                      <h3 className="text-sm font-medium mb-2">Time & Coordinates</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-security-muted">Timezone:</span>
                          <span>{geoData.timezone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-security-muted">Latitude:</span>
                          <span>{geoData.lat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-security-muted">Longitude:</span>
                          <span>{geoData.lon}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-security-highlight/20 p-3 rounded-md">
                      <h3 className="text-sm font-medium mb-2">Security Analysis</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-security-muted">Proxy/VPN:</span>
                          <span className={geoData.proxy ? 'text-security-danger' : 'text-security-success'}>
                            {geoData.proxy ? 'Detected' : 'Not Detected'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-security-muted">Hosting Provider:</span>
                          <span className={geoData.hosting ? 'text-security-warning' : 'text-security-success'}>
                            {geoData.hosting ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-security-muted">Threat Level:</span>
                          <span className={
                            geoData.proxy 
                              ? 'text-security-danger' 
                              : geoData.hosting 
                                ? 'text-security-warning' 
                                : 'text-security-success'
                          }>
                            {geoData.proxy 
                              ? 'High' 
                              : geoData.hosting 
                                ? 'Medium' 
                                : 'Low'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-security-muted">
                  <Search className="w-12 h-12 opacity-30 mb-4" />
                  <p>No data to display</p>
                  <p className="text-sm">Enter an IP address and click Track</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-security-danger/10 border border-security-danger/30 rounded-md">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-security-danger mt-0.5" />
          <div>
            <h3 className="text-security-danger font-semibold mb-1">Privacy and Legal Notice</h3>
            <p className="text-sm text-security-muted">
              This tool is for educational and authorized security testing purposes only. IP tracking without proper authorization may violate privacy laws in many jurisdictions. Always ensure you have proper consent before tracking IP addresses that don't belong to you or your organization.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default IPTracking;
