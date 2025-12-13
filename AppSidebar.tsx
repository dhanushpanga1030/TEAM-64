import { 
  BookOpen, 
  Gamepad2, 
  Trophy, 
  Users, 
  User, 
  Bell, 
  Settings, 
  Award,
  Home,
  LogOut,
  GraduationCap,
  BarChart3,
  FileDown
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserData {
  id: string;
  type: 'student' | 'teacher';
  name: string;
  email: string;
  grade?: string;
  school?: string;
  avatar?: string;
}

interface AppSidebarProps {
  userData: UserData;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  unreadNotifications?: number;
}

export function AppSidebar({ 
  userData, 
  currentPage, 
  onNavigate, 
  onLogout,
  unreadNotifications = 0 
}: AppSidebarProps) {
  const isStudent = userData.type === 'student';


  type NavItem = {
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    description: string;
    badge?: number;
  };

  const studentNavItems: NavItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      description: 'Your learning home'
    },
    {
      id: 'games',
      title: 'STEM Games',
      icon: Gamepad2,
      description: 'Interactive learning games'
    },
    {
      id: 'bonus-rewards',
      title: 'Bonus Rewards',
      icon: Award,
      description: 'Unlock skill blocks'
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      icon: Trophy,
      description: 'Compare with classmates'
    }
  ];

  const teacherNavItems: NavItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      description: 'Teaching overview'
    },
    {
      id: 'analytics',
      title: 'Student Analytics',
      icon: BarChart3,
      description: 'Track student progress'
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: FileDown,
      description: 'Generate and download reports'
    }
  ];

  const commonNavItems = [
    {
      id: 'profile',
      title: 'Profile',
      icon: User,
      description: 'Manage your profile'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'View your notifications',
      badge: unreadNotifications > 0 ? unreadNotifications : undefined
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      description: 'Customize your experience'
    }
  ];

  const navItems = isStudent ? studentNavItems : teacherNavItems;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-display font-bold truncate">
              Sankalp EduPlay
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              {isStudent ? 'Student Portal' : 'Teacher Portal'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* User Profile Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="text-sm">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userData.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {isStudent ? `Class ${userData.grade}` : 'Teacher'}
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>
            {isStudent ? 'Learning' : 'Teaching'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentPage === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.description}
                    data-testid={`nav-${item.id}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {commonNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentPage === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.description}
                    data-testid={`nav-${item.id}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              tooltip="Sign out of your account"
              data-testid="nav-logout"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}