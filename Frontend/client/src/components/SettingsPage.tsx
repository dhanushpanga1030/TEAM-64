import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Settings, User, Shield, Database, Palette, Globe, Bell, Trash2, Download, Upload } from "lucide-react";

interface UserSettings {
  profile: {
    language: string;
    theme: 'light' | 'dark' | 'auto';
    timezone: string;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    showOnLeaderboard: boolean;
    shareProgress: boolean;
    dataCollection: boolean;
  };
  notifications: {
    emailEnabled: boolean;
    pushEnabled: boolean;
    digestFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    reduceMotion: boolean;
    screenReader: boolean;
  };
  data: {
    autoBackup: boolean;
    dataRetention: '1year' | '2years' | '5years' | 'forever';
    exportFormat: 'json' | 'csv' | 'pdf';
  };
}

interface SettingsPageProps {
  userType: 'student' | 'teacher';
  onBack?: () => void;
  onSave?: (settings: UserSettings) => void;
  onDeleteAccount?: () => void;
}

export default function SettingsPage({
  userType = 'student',
  onBack = () => {},
  onSave = () => {},
  onDeleteAccount = () => {}
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  //todo: remove mock functionality
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      language: 'english',
      theme: 'light',
      timezone: 'Asia/Kolkata'
    },
    privacy: {
      profileVisibility: 'public',
      showOnLeaderboard: true,
      shareProgress: true,
      dataCollection: true
    },
    notifications: {
      emailEnabled: false,
      pushEnabled: true,
      digestFrequency: 'daily',
      quietHours: {
        enabled: true,
        start: '22:00',
        end: '08:00'
      }
    },
    accessibility: {
      fontSize: 'medium',
      highContrast: false,
      reduceMotion: false,
      screenReader: false
    },
    data: {
      autoBackup: true,
      dataRetention: '2years',
      exportFormat: 'json'
    }
  });

  const updateSetting = (category: keyof UserSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const updateNestedSetting = (category: keyof UserSettings, nested: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [nested]: {
          ...(prev[category] as any)[nested],
          [key]: value
        }
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    onSave(settings);
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    // Reset to default settings
    setSettings({
      profile: { language: 'english', theme: 'light', timezone: 'Asia/Kolkata' },
      privacy: { profileVisibility: 'public', showOnLeaderboard: true, shareProgress: true, dataCollection: true },
      notifications: { emailEnabled: false, pushEnabled: true, digestFrequency: 'daily', quietHours: { enabled: true, start: '22:00', end: '08:00' } },
      accessibility: { fontSize: 'medium', highContrast: false, reduceMotion: false, screenReader: false },
      data: { autoBackup: true, dataRetention: '2years', exportFormat: 'json' }
    });
    setHasUnsavedChanges(false);
    console.log('Settings reset to defaults');
  };

  const handleExportData = () => {
    console.log(`Exporting data in ${settings.data.exportFormat} format`);
    // In real app, this would trigger a download
  };

  const handleImportData = () => {
    console.log('Opening file picker for data import');
    // In real app, this would open a file picker
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold flex items-center gap-3">
                <Settings className="h-8 w-8" />
                Settings
                {hasUnsavedChanges && (
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-200">
                    Unsaved Changes
                  </Badge>
                )}
              </h1>
              <p className="text-white/90">Customize your {userType} experience</p>
            </div>
            <div className="flex gap-2">
              {hasUnsavedChanges && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="border-white/20 text-white hover:bg-white/10"
                    data-testid="button-reset-settings"
                  >
                    Reset
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="bg-white text-slate-600 hover:bg-gray-100"
                    data-testid="button-save-settings"
                  >
                    Save Changes
                  </Button>
                </>
              )}
              <Button 
                variant="outline" 
                onClick={onBack}
                className="border-white/20 text-white hover:bg-white/10"
                data-testid="button-back-dashboard"
              >
                ← Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="profile" data-testid="tab-profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="privacy" data-testid="tab-privacy">
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" data-testid="tab-notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="accessibility" data-testid="tab-accessibility">
              <Palette className="h-4 w-4 mr-2" />
              Accessibility
            </TabsTrigger>
            <TabsTrigger value="data" data-testid="tab-data">
              <Database className="h-4 w-4 mr-2" />
              Data & Backup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Language & Region
                </CardTitle>
                <CardDescription>
                  Configure your language preferences and regional settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Interface Language</Label>
                    <Select 
                      value={settings.profile.language} 
                      onValueChange={(value) => updateSetting('profile', 'language', value)}
                    >
                      <SelectTrigger id="language" data-testid="select-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="odia">ଓଡ଼ିଆ (Odia)</SelectItem>
                        <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={settings.profile.timezone} 
                      onValueChange={(value) => updateSetting('profile', 'timezone', value)}
                    >
                      <SelectTrigger id="timezone" data-testid="select-timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">IST (UTC+5:30)</SelectItem>
                        <SelectItem value="Asia/Mumbai">Mumbai (UTC+5:30)</SelectItem>
                        <SelectItem value="Asia/Chennai">Chennai (UTC+5:30)</SelectItem>
                        <SelectItem value="Asia/Bhubaneswar">Bhubaneswar (UTC+5:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme Preference</Label>
                  <Select 
                    value={settings.profile.theme} 
                    onValueChange={(value) => updateSetting('profile', 'theme', value)}
                  >
                    <SelectTrigger id="theme" data-testid="select-theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="auto">Auto (System)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choose your preferred color scheme for the interface
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Privacy & Visibility
                </CardTitle>
                <CardDescription>
                  Control who can see your profile and learning progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <Select 
                      value={settings.privacy.profileVisibility} 
                      onValueChange={(value) => updateSetting('privacy', 'profileVisibility', value)}
                    >
                      <SelectTrigger id="profileVisibility" data-testid="select-profile-visibility">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can view</SelectItem>
                        <SelectItem value="friends">Friends - Only classmates</SelectItem>
                        <SelectItem value="private">Private - Only me</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showOnLeaderboard" className="text-sm font-medium">
                        Show on Leaderboard
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Display your ranking and scores on class leaderboards
                      </p>
                    </div>
                    <Switch 
                      id="showOnLeaderboard"
                      checked={settings.privacy.showOnLeaderboard}
                      onCheckedChange={(checked) => updateSetting('privacy', 'showOnLeaderboard', checked)}
                      data-testid="switch-show-leaderboard"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="shareProgress" className="text-sm font-medium">
                        Share Learning Progress
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Allow teachers to view your detailed progress
                      </p>
                    </div>
                    <Switch 
                      id="shareProgress"
                      checked={settings.privacy.shareProgress}
                      onCheckedChange={(checked) => updateSetting('privacy', 'shareProgress', checked)}
                      data-testid="switch-share-progress"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dataCollection" className="text-sm font-medium">
                        Anonymous Analytics
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Help improve the platform with anonymous usage data
                      </p>
                    </div>
                    <Switch 
                      id="dataCollection"
                      checked={settings.privacy.dataCollection}
                      onCheckedChange={(checked) => updateSetting('privacy', 'dataCollection', checked)}
                      data-testid="switch-data-collection"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-500" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailEnabled" className="text-sm font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Receive important updates via email
                      </p>
                    </div>
                    <Switch 
                      id="emailEnabled"
                      checked={settings.notifications.emailEnabled}
                      onCheckedChange={(checked) => updateSetting('notifications', 'emailEnabled', checked)}
                      data-testid="switch-email-notifications"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushEnabled" className="text-sm font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Get real-time notifications in your browser
                      </p>
                    </div>
                    <Switch 
                      id="pushEnabled"
                      checked={settings.notifications.pushEnabled}
                      onCheckedChange={(checked) => updateSetting('notifications', 'pushEnabled', checked)}
                      data-testid="switch-push-notifications"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="digestFrequency">Daily Digest Frequency</Label>
                    <Select 
                      value={settings.notifications.digestFrequency} 
                      onValueChange={(value) => updateSetting('notifications', 'digestFrequency', value)}
                    >
                      <SelectTrigger id="digestFrequency" data-testid="select-digest-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="quietHoursEnabled" className="text-sm font-medium">
                          Quiet Hours
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Disable notifications during specified hours
                        </p>
                      </div>
                      <Switch 
                        id="quietHoursEnabled"
                        checked={settings.notifications.quietHours.enabled}
                        onCheckedChange={(checked) => updateNestedSetting('notifications', 'quietHours', 'enabled', checked)}
                        data-testid="switch-quiet-hours"
                      />
                    </div>
                    
                    {settings.notifications.quietHours.enabled && (
                      <div className="grid grid-cols-2 gap-4 ml-6">
                        <div className="space-y-2">
                          <Label htmlFor="quietStart">Start Time</Label>
                          <Input 
                            id="quietStart"
                            type="time"
                            value={settings.notifications.quietHours.start}
                            onChange={(e) => updateNestedSetting('notifications', 'quietHours', 'start', e.target.value)}
                            data-testid="input-quiet-start"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quietEnd">End Time</Label>
                          <Input 
                            id="quietEnd"
                            type="time"
                            value={settings.notifications.quietHours.end}
                            onChange={(e) => updateNestedSetting('notifications', 'quietHours', 'end', e.target.value)}
                            data-testid="input-quiet-end"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-500" />
                  Accessibility Options
                </CardTitle>
                <CardDescription>
                  Customize the interface for better accessibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select 
                      value={settings.accessibility.fontSize} 
                      onValueChange={(value) => updateSetting('accessibility', 'fontSize', value)}
                    >
                      <SelectTrigger id="fontSize" data-testid="select-font-size">
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium (Default)</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="highContrast" className="text-sm font-medium">
                        High Contrast Mode
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch 
                      id="highContrast"
                      checked={settings.accessibility.highContrast}
                      onCheckedChange={(checked) => updateSetting('accessibility', 'highContrast', checked)}
                      data-testid="switch-high-contrast"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reduceMotion" className="text-sm font-medium">
                        Reduce Motion
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Minimize animations and transitions
                      </p>
                    </div>
                    <Switch 
                      id="reduceMotion"
                      checked={settings.accessibility.reduceMotion}
                      onCheckedChange={(checked) => updateSetting('accessibility', 'reduceMotion', checked)}
                      data-testid="switch-reduce-motion"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="screenReader" className="text-sm font-medium">
                        Screen Reader Support
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Enhanced support for assistive technologies
                      </p>
                    </div>
                    <Switch 
                      id="screenReader"
                      checked={settings.accessibility.screenReader}
                      onCheckedChange={(checked) => updateSetting('accessibility', 'screenReader', checked)}
                      data-testid="switch-screen-reader"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Manage your data backup, export, and retention settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoBackup" className="text-sm font-medium">
                        Automatic Backup
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically backup your learning progress
                      </p>
                    </div>
                    <Switch 
                      id="autoBackup"
                      checked={settings.data.autoBackup}
                      onCheckedChange={(checked) => updateSetting('data', 'autoBackup', checked)}
                      data-testid="switch-auto-backup"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention Period</Label>
                    <Select 
                      value={settings.data.dataRetention} 
                      onValueChange={(value) => updateSetting('data', 'dataRetention', value)}
                    >
                      <SelectTrigger id="dataRetention" data-testid="select-data-retention">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="5years">5 Years</SelectItem>
                        <SelectItem value="forever">Forever</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="exportFormat">Export Format</Label>
                    <Select 
                      value={settings.data.exportFormat} 
                      onValueChange={(value) => updateSetting('data', 'exportFormat', value)}
                    >
                      <SelectTrigger id="exportFormat" data-testid="select-export-format">
                        <SelectValue placeholder="Select export format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON (Detailed)</SelectItem>
                        <SelectItem value="csv">CSV (Spreadsheet)</SelectItem>
                        <SelectItem value="pdf">PDF (Report)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Actions</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        variant="outline" 
                        onClick={handleExportData}
                        className="gap-2"
                        data-testid="button-export-data"
                      >
                        <Download className="h-4 w-4" />
                        Export My Data
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleImportData}
                        className="gap-2"
                        data-testid="button-import-data"
                      >
                        <Upload className="h-4 w-4" />
                        Import Data
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
                    <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-destructive">
                            Delete Account
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Permanently delete your account and all associated data
                          </p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              className="gap-2"
                              data-testid="button-delete-account-trigger"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove all your data from our servers including:
                                <br />• Learning progress and achievements
                                <br />• Personal profile information
                                <br />• Game scores and statistics
                                <br />• All uploaded content
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={onDeleteAccount}
                                className="bg-destructive hover:bg-destructive/90"
                                data-testid="button-confirm-delete"
                              >
                                Yes, delete my account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}