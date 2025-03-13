
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Users, User, FileCheck, Copy, ExternalLink, ShieldAlert, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const PhishingSimulator = () => {
  const [campaignName, setCampaignName] = useState('');
  const [targetEmails, setTargetEmails] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  
  const [campaigns, setCampaigns] = useState<{
    id: number;
    name: string;
    targets: number;
    opened: number;
    clicked: number;
    credentials: number;
    status: 'active' | 'completed' | 'draft';
  }[]>([
    {
      id: 1,
      name: 'Security Awareness Test',
      targets: 25,
      opened: 18,
      clicked: 12,
      credentials: 8,
      status: 'completed'
    }
  ]);
  
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  const templates = [
    {
      id: 'password-reset',
      name: 'Password Reset',
      subject: 'Action Required: Reset Your Password',
      preview: 'IT Security has identified potential suspicious activity on your account...'
    },
    {
      id: 'covid-alert',
      name: 'COVID-19 Update',
      subject: 'Important COVID-19 Update for Employees',
      preview: 'Please review the latest COVID-19 policies and health guidelines...'
    },
    {
      id: 'office365',
      name: 'Office 365 Login',
      subject: 'Office 365: Action Required to Maintain Access',
      preview: 'Your Office 365 account needs to be verified to continue access...'
    },
    {
      id: 'bonus',
      name: 'Year-End Bonus',
      subject: 'Your Year-End Bonus Information',
      preview: 'Please access the secure portal to view your year-end bonus information...'
    }
  ];
  
  const handleSaveCampaign = () => {
    if (!campaignName || !targetEmails || !emailSubject || !emailBody) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Logic to save campaign as draft
    const newCampaign = {
      id: Date.now(),
      name: campaignName,
      targets: targetEmails.split('\n').filter(email => email.trim()).length,
      opened: 0,
      clicked: 0,
      credentials: 0,
      status: 'draft' as const
    };
    
    setCampaigns(prev => [newCampaign, ...prev]);
    toast.success('Campaign saved as draft');
  };
  
  const handleLaunchCampaign = () => {
    if (!campaignName || !targetEmails || !emailSubject || !emailBody) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Logic to launch campaign
    const newCampaign = {
      id: Date.now(),
      name: campaignName,
      targets: targetEmails.split('\n').filter(email => email.trim()).length,
      opened: 0,
      clicked: 0,
      credentials: 0,
      status: 'active' as const
    };
    
    setCampaigns(prev => [newCampaign, ...prev]);
    toast.success('Campaign launched successfully');
    
    // Reset form
    setCampaignName('');
    setTargetEmails('');
    setEmailSubject('');
    setEmailBody('');
    setSelectedTemplate('');
  };
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
      setEmailSubject(template.subject);
      
      // Generate email body based on template
      let body = '';
      
      switch (templateId) {
        case 'password-reset':
          body = `Dear User,

IT Security has identified potential suspicious activity on your account. To ensure your account remains secure, please reset your password immediately.

[Reset Password Now]

If you did not initiate this request, please contact IT support immediately.

Thank you,
IT Security Team`;
          break;
          
        case 'covid-alert':
          body = `Dear Employee,

Please review the latest COVID-19 policies and health guidelines. All employees are required to acknowledge these updated policies.

[View and Acknowledge Policies]

Stay safe,
Human Resources`;
          break;
          
        case 'office365':
          body = `Your Microsoft Office 365 account requires verification.

Due to recent security updates, all users must verify their accounts within 48 hours to maintain uninterrupted access.

[Verify Account Now]

Microsoft Office 365 Team`;
          break;
          
        case 'bonus':
          body = `Confidential: Year-End Bonus Information

Your year-end bonus information is now available for review. Please log in to access your statement.

[Access Bonus Statement]

This is confidential information. Please do not share.

Finance Department`;
          break;
      }
      
      setEmailBody(body);
    }
  };
  
  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(emailBody);
    toast.success('Email template copied to clipboard');
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <Mail className="w-6 h-6 text-security-accent mr-3" />
        <h1 className="text-3xl font-bold">Phishing Simulator</h1>
      </motion.div>
      
      <p className="text-security-muted mb-8 max-w-3xl">
        Create and manage phishing campaigns to test user security awareness and susceptibility to social engineering attacks.
        This tool helps identify training needs and improve organizational security posture.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-security-highlight/30">
            <CardHeader>
              <CardTitle>Create Campaign</CardTitle>
              <CardDescription>Configure your phishing simulation campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="campaign" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="campaign">Campaign Details</TabsTrigger>
                  <TabsTrigger value="targets">Target Audience</TabsTrigger>
                  <TabsTrigger value="email">Email Content</TabsTrigger>
                  <TabsTrigger value="landing">Landing Page</TabsTrigger>
                </TabsList>
                
                <TabsContent value="campaign" className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="campaign-name" className="text-sm font-medium">Campaign Name</label>
                    <Input
                      id="campaign-name"
                      placeholder="e.g. Q2 Security Awareness Test"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="bg-security-highlight/20 border-security-highlight/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Schedule</label>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="send-now" name="schedule" className="text-security-accent" defaultChecked />
                      <label htmlFor="send-now" className="text-sm">Send Immediately</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="schedule-later" name="schedule" className="text-security-accent" />
                      <label htmlFor="schedule-later" className="text-sm">Schedule for Later</label>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="targets" className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="target-emails" className="text-sm font-medium">Target Email Addresses</label>
                    <p className="text-xs text-security-muted">Enter one email address per line</p>
                    <Textarea
                      id="target-emails"
                      placeholder="john.doe@example.com&#10;jane.smith@example.com"
                      value={targetEmails}
                      onChange={(e) => setTargetEmails(e.target.value)}
                      className="bg-security-highlight/20 border-security-highlight/30 min-h-[150px]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between bg-security-highlight/20 p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-security-accent" />
                      <span className="text-sm">Target count:</span>
                    </div>
                    <span className="font-mono font-bold">
                      {targetEmails ? targetEmails.split('\n').filter(email => email.trim()).length : 0}
                    </span>
                  </div>
                </TabsContent>
                
                <TabsContent value="email" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email-subject" className="text-sm font-medium">Email Subject</label>
                      <Input
                        id="email-subject"
                        placeholder="Enter email subject line"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="bg-security-highlight/20 border-security-highlight/30"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email-body" className="text-sm font-medium">Email Body</label>
                      <Textarea
                        id="email-body"
                        placeholder="Enter email content here..."
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        className="bg-security-highlight/20 border-security-highlight/30 min-h-[200px]"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleCopyTemplate} 
                        variant="outline" 
                        size="sm"
                        className="text-security-muted border-security-highlight/30"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="landing" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Landing Page Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-security-highlight/20 p-4 rounded-md border border-security-highlight/30 cursor-pointer hover:border-security-accent transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <input type="radio" id="credential-harvest" name="landing-type" className="text-security-accent" defaultChecked />
                          <label htmlFor="credential-harvest" className="text-sm font-medium">Credential Harvest</label>
                        </div>
                        <p className="text-xs text-security-muted">Simulates a login page to test if users attempt to enter credentials</p>
                      </div>
                      
                      <div className="bg-security-highlight/20 p-4 rounded-md border border-security-highlight/30 cursor-pointer hover:border-security-accent transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <input type="radio" id="awareness" name="landing-type" className="text-security-accent" />
                          <label htmlFor="awareness" className="text-sm font-medium">Awareness Page</label>
                        </div>
                        <p className="text-xs text-security-muted">Shows educational content once the link is clicked</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium">Landing Page Template</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-security-highlight/20 p-3 rounded-md border border-security-highlight/30 cursor-pointer hover:border-security-accent transition-colors">
                        <div className="flex items-center gap-2">
                          <input type="radio" id="office-365" name="landing-template" className="text-security-accent" defaultChecked />
                          <label htmlFor="office-365" className="text-sm">Office 365</label>
                        </div>
                      </div>
                      
                      <div className="bg-security-highlight/20 p-3 rounded-md border border-security-highlight/30 cursor-pointer hover:border-security-accent transition-colors">
                        <div className="flex items-center gap-2">
                          <input type="radio" id="google" name="landing-template" className="text-security-accent" />
                          <label htmlFor="google" className="text-sm">Google Workspace</label>
                        </div>
                      </div>
                      
                      <div className="bg-security-highlight/20 p-3 rounded-md border border-security-highlight/30 cursor-pointer hover:border-security-accent transition-colors">
                        <div className="flex items-center gap-2">
                          <input type="radio" id="dropbox" name="landing-template" className="text-security-accent" />
                          <label htmlFor="dropbox" className="text-sm">Dropbox</label>
                        </div>
                      </div>
                      
                      <div className="bg-security-highlight/20 p-3 rounded-md border border-security-highlight/30 cursor-pointer hover:border-security-accent transition-colors">
                        <div className="flex items-center gap-2">
                          <input type="radio" id="custom" name="landing-template" className="text-security-accent" />
                          <label htmlFor="custom" className="text-sm">Custom</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={handleSaveCampaign}
                variant="outline"
                className="border-security-highlight/30"
              >
                Save as Draft
              </Button>
              
              <Button
                onClick={handleLaunchCampaign}
                className="bg-security-accent text-security"
              >
                Launch Campaign
              </Button>
            </CardFooter>
          </Card>
          
          {/* Campaign List */}
          <Card className="glass-panel border-security-highlight/30">
            <CardHeader>
              <CardTitle>My Campaigns</CardTitle>
              <CardDescription>View and manage your phishing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {campaigns.length > 0 ? (
                <div className="space-y-4">
                  {campaigns.map(campaign => (
                    <div 
                      key={campaign.id}
                      className="p-4 bg-security-highlight/20 rounded-md border border-security-highlight/30"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <div className="flex items-center text-xs text-security-muted mt-1">
                            <Users className="w-3 h-3 mr-1" />
                            <span>{campaign.targets} targets</span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          campaign.status === 'active' 
                            ? 'bg-security-success/10 text-security-success' 
                            : campaign.status === 'completed'
                              ? 'bg-security-muted/10 text-security-muted'
                              : 'bg-security-warning/10 text-security-warning'
                        }`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-security/40 p-2 rounded text-center">
                          <div className="text-lg font-bold">{Math.round((campaign.opened / campaign.targets) * 100)}%</div>
                          <div className="text-xs text-security-muted">Opened</div>
                        </div>
                        <div className="bg-security/40 p-2 rounded text-center">
                          <div className="text-lg font-bold">{Math.round((campaign.clicked / campaign.targets) * 100)}%</div>
                          <div className="text-xs text-security-muted">Clicked</div>
                        </div>
                        <div className="bg-security/40 p-2 rounded text-center">
                          <div className="text-lg font-bold">{Math.round((campaign.credentials / campaign.targets) * 100)}%</div>
                          <div className="text-xs text-security-muted">Credentials</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-8 border-security-highlight/30">
                          <BarChart3 className="h-3.5 w-3.5 mr-1" />
                          Results
                        </Button>
                        {campaign.status === 'active' && (
                          <Button size="sm" variant="default" className="h-8 bg-security-danger text-white">
                            Stop
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-security-muted">
                  <Mail className="w-10 h-10 mb-2 opacity-30" />
                  <p className="text-sm">No campaigns created yet</p>
                  <p className="text-xs">Create a campaign to see it here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Email Templates */}
          <Card className="glass-panel border-security-highlight/30">
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Pre-configured phishing templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {templates.map(template => (
                  <div 
                    key={template.id}
                    className={`p-3 rounded-md border cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? 'bg-security-accent/10 border-security-accent' 
                        : 'bg-security-highlight/20 border-security-highlight/30 hover:border-security-accent/50'
                    }`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <h4 className="text-sm font-medium">{template.name}</h4>
                    <p className="text-xs text-security-muted mt-1 mb-2">{template.subject}</p>
                    <p className="text-xs line-clamp-2">{template.preview}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Resources */}
          <Card className="glass-panel border-security-highlight/30">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Educational materials and best practices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a 
                  href="#" 
                  className="flex items-center justify-between p-3 bg-security-highlight/20 rounded-md hover:bg-security-highlight/30 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Resource link clicked');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-security-accent" />
                    <span className="text-sm">Phishing Attack Guide</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-security-muted" />
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center justify-between p-3 bg-security-highlight/20 rounded-md hover:bg-security-highlight/30 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Resource link clicked');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-security-accent" />
                    <span className="text-sm">Social Engineering Techniques</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-security-muted" />
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center justify-between p-3 bg-security-highlight/20 rounded-md hover:bg-security-highlight/30 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Resource link clicked');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-security-accent" />
                    <span className="text-sm">Awareness Training Materials</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-security-muted" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-security-danger/10 border border-security-danger/30 rounded-md">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-security-danger mt-0.5" />
          <div>
            <h3 className="text-security-danger font-semibold mb-1">Legal and Ethical Considerations</h3>
            <p className="text-sm text-security-muted">
              This tool is for educational and authorized security testing only. Always obtain explicit permission before conducting phishing simulations. Never use these tools for malicious purposes or against unauthorized targets.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PhishingSimulator;
