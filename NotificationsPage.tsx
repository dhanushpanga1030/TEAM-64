import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, BellRing, CheckCircle, Clock, Trophy, Users, BookOpen, MessageSquare, Settings, Trash2 } from "lucide-react";

interface Notification {
  id: string;
  type: 'achievement' | 'assignment' | 'system' | 'social' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

interface NotificationSettings {
  achievements: boolean;
  assignments: boolean;
  reminders: boolean;
  social: boolean;
  system: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  dailyDigest: boolean;
}

interface NotificationsPageProps {
  userType: 'student' | 'teacher';
  onBack?: () => void;
  onNotificationAction?: (notificationId: string, action: string) => void;
}

export default function NotificationsPage({
  userType = 'student',
  onBack = () => {},
  onNotificationAction = () => {}
}: NotificationsPageProps) {
  const [activeTab, setActiveTab] = useState("all");

  //todo: remove mock functionality
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "New Achievement Unlocked!",
      message: "Congratulations! You've earned the 'Math Master' badge for completing all algebra chapters with 90%+ scores.",
      timestamp: "2024-09-18T14:30:00Z",
      read: false,
      priority: "high"
    },
    {
      id: "2",
      type: "assignment",
      title: "New Chapter Available",
      message: "A new chapter 'Advanced Geometry' has been added to your Mathematics course.",
      timestamp: "2024-09-18T13:15:00Z",
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      type: "reminder",
      title: "Daily Streak Reminder",
      message: "Don't forget to complete your daily learning activity to maintain your 7-day streak!",
      timestamp: "2024-09-18T12:00:00Z",
      read: true,
      priority: "medium"
    },
    {
      id: "4",
      type: "social",
      title: "Leaderboard Update",
      message: "You've moved up to rank #2 in your class! Keep learning to reach the top.",
      timestamp: "2024-09-18T10:45:00Z",
      read: true,
      priority: "low"
    },
    {
      id: "5",
      type: "system",
      title: "New Features Available",
      message: "Check out the new IoT & Sensors skill block now available in Bonus Rewards!",
      timestamp: "2024-09-17T16:20:00Z",
      read: true,
      priority: "low"
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    achievements: true,
    assignments: true,
    reminders: true,
    social: true,
    system: true,
    emailNotifications: false,
    pushNotifications: true,
    dailyDigest: true
  });

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    onNotificationAction(notificationId, 'read');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    console.log('All notifications marked as read');
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    onNotificationAction(notificationId, 'delete');
  };

  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === activeTab);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'assignment': return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'reminder': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'social': return <Users className="h-5 w-5 text-green-500" />;
      case 'system': return <Settings className="h-5 w-5 text-purple-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    console.log(`Setting ${key} updated to:`, value);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold flex items-center gap-3">
                <BellRing className="h-8 w-8" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {unreadCount} unread
                  </Badge>
                )}
              </h1>
              <p className="text-white/90">Stay updated with your learning progress and platform updates</p>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  onClick={markAllAsRead}
                  className="border-white/20 text-white hover:bg-white/10"
                  data-testid="button-mark-all-read"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
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
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="all" data-testid="tab-all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" data-testid="tab-unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="achievement" data-testid="tab-achievement">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="assignment" data-testid="tab-assignment">
              Learning
            </TabsTrigger>
            <TabsTrigger value="social" data-testid="tab-social">
              Social
            </TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-settings">
              Settings
            </TabsTrigger>
          </TabsList>

          {['all', 'unread', 'achievement', 'assignment', 'social', 'reminder', 'system'].map(tabValue => (
            <TabsContent key={tabValue} value={tabValue}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-500" />
                    {tabValue === 'all' ? 'All Notifications' : 
                     tabValue === 'unread' ? 'Unread Notifications' :
                     `${tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} Notifications`}
                  </CardTitle>
                  <CardDescription>
                    {getFilteredNotifications().length} notification{getFilteredNotifications().length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getFilteredNotifications().length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No notifications found</p>
                      </div>
                    ) : (
                      getFilteredNotifications().map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-4 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                            notification.read ? 'bg-muted/30' : 'bg-card shadow-sm'
                          } transition-all hover-elevate`}
                          data-testid={`notification-${notification.id}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {notification.title}
                                  </h3>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                                <p className={`text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {notification.type}
                                  </Badge>
                                  {notification.priority === 'high' && (
                                    <Badge variant="destructive" className="text-xs">
                                      High Priority
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  data-testid={`button-mark-read-${notification.id}`}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-muted-foreground hover:text-destructive"
                                data-testid={`button-delete-${notification.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-500" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Customize which notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Types</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="achievements" className="text-sm font-medium">
                            Achievement Notifications
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Get notified when you earn badges and complete milestones
                          </p>
                        </div>
                        <Switch 
                          id="achievements"
                          checked={settings.achievements}
                          onCheckedChange={(checked) => updateSetting('achievements', checked)}
                          data-testid="switch-achievements"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="assignments" className="text-sm font-medium">
                            Learning Updates
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            New chapters, assignments, and course updates
                          </p>
                        </div>
                        <Switch 
                          id="assignments"
                          checked={settings.assignments}
                          onCheckedChange={(checked) => updateSetting('assignments', checked)}
                          data-testid="switch-assignments"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="reminders" className="text-sm font-medium">
                            Daily Reminders
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Streak reminders and study suggestions
                          </p>
                        </div>
                        <Switch 
                          id="reminders"
                          checked={settings.reminders}
                          onCheckedChange={(checked) => updateSetting('reminders', checked)}
                          data-testid="switch-reminders"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="social" className="text-sm font-medium">
                            Social Updates
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Leaderboard changes and peer achievements
                          </p>
                        </div>
                        <Switch 
                          id="social"
                          checked={settings.social}
                          onCheckedChange={(checked) => updateSetting('social', checked)}
                          data-testid="switch-social"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="system" className="text-sm font-medium">
                            System Notifications
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Platform updates and maintenance notices
                          </p>
                        </div>
                        <Switch 
                          id="system"
                          checked={settings.system}
                          onCheckedChange={(checked) => updateSetting('system', checked)}
                          data-testid="switch-system"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold">Delivery Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications" className="text-sm font-medium">
                          Push Notifications
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Real-time notifications in your browser
                        </p>
                      </div>
                      <Switch 
                        id="pushNotifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                        data-testid="switch-push"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications" className="text-sm font-medium">
                          Email Notifications
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Important updates sent to your email
                        </p>
                      </div>
                      <Switch 
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                        data-testid="switch-email"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dailyDigest" className="text-sm font-medium">
                          Daily Digest
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Summary of daily activities and achievements
                        </p>
                      </div>
                      <Switch 
                        id="dailyDigest"
                        checked={settings.dailyDigest}
                        onCheckedChange={(checked) => updateSetting('dailyDigest', checked)}
                        data-testid="switch-digest"
                      />
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