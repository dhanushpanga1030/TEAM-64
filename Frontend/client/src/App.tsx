import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/not-found";
import AuthForm from "@/components/AuthForm";
import StudentDashboard from "@/components/StudentDashboard";
import ChapterView from "@/components/ChapterView";
import TeacherDashboard from "@/components/TeacherDashboard";
import GamesPage from "@/components/GamesPage";
import BonusRewardsPage from "@/components/BonusRewardsPage";
import Leaderboard from "@/components/Leaderboard";
import ProfilePage from "@/components/ProfilePage";
import NotificationsPage from "@/components/NotificationsPage";
import SettingsPage from "@/components/SettingsPage";
import VideoPlayer from "@/components/VideoPlayer";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";

interface UserData {
  id: string;
  type: 'student' | 'teacher';
  name: string;
  email: string;
  grade?: string;
  school?: string;
  rollNo?: string;
  subjects?: string;
}

type AppPage = 'dashboard' | 'games' | 'bonus-rewards' | 'leaderboard' | 'profile' | 'notifications' | 'settings' | 'analytics' | 'reports' | 'chapter-view' | 'video-player';
type AppState = 'auth' | 'main-app';

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <div>Welcome to Sankalp EduPlay</div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentChapter, setCurrentChapter] = useState<{subjectId: string, chapterTitle: string} | null>(null);
  const [unreadNotifications] = useState(3); // Mock unread count

  const handleAuthSuccess = (userType: 'student' | 'teacher', data: any) => {
    setUserData(data);
    setCurrentPage('dashboard');
    setAppState('main-app');
  };

  const handleSubjectClick = (subjectId: string) => {
    console.log(`Subject selected: ${subjectId}`);
  };

  const handleChapterClick = (subjectId: string, chapterTitle: string) => {
    setCurrentChapter({ subjectId, chapterTitle });
    setCurrentPage('chapter-view');
  };

  const handleBackToDashboard = () => {
    setCurrentChapter(null);
    setCurrentPage('dashboard');
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page as AppPage);
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentChapter(null);
    setCurrentPage('dashboard');
    setAppState('auth');
    console.log('User logged out');
  };

  const renderMainContent = () => {
    if (!userData) return <div>Loading...</div>;

    const isStudent = userData.type === 'student';

    switch (currentPage) {
      case 'dashboard':
        return isStudent ? (
          <StudentDashboard 
            studentData={{
              name: userData.name,
              grade: userData.grade || '8',
              points: 1250,
              streak: 7,
              badges: 12
            }}
            onSubjectClick={handleSubjectClick}
            onChapterClick={handleChapterClick}
          />
        ) : (
          <TeacherDashboard 
            teacherData={{
              name: userData.name,
              rollNo: userData.rollNo || 'T001',
              subjects: userData.subjects ? userData.subjects.split(', ') : ['Mathematics', 'Science']
            }}
            onDownloadReport={(classGrade) => {
              console.log(`Download report for class: ${classGrade}`);
            }}
          />
        );
      
      case 'games':
        return isStudent ? (
          <GamesPage 
            onGameComplete={(gameId, score) => console.log(`Game ${gameId} completed with score: ${score}`)}
            onBack={() => setCurrentPage('dashboard')}
          />
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Games Not Available</h2>
            <p className="text-muted-foreground">Games are only available for students.</p>
          </div>
        );
      
      case 'bonus-rewards':
        return isStudent ? (
          <BonusRewardsPage 
            userStats={{ points: 1250, streak: 7, badges: 12 }}
            onBack={() => setCurrentPage('dashboard')}
            onSkillBlockClick={(blockId) => console.log(`Skill block clicked: ${blockId}`)}
          />
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Bonus Rewards Not Available</h2>
            <p className="text-muted-foreground">Bonus rewards are only available for students.</p>
          </div>
        );
      
      case 'leaderboard':
        return isStudent ? (
          <Leaderboard 
            currentUserId="current-user"
            onBack={() => setCurrentPage('dashboard')}
          />
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Student Leaderboard</h2>
            <p className="text-muted-foreground">View your students' rankings and achievements.</p>
            {/* Could add teacher view of leaderboard here */}
          </div>
        );
      
      case 'profile':
        return (
          <ProfilePage 
            userType={userData.type}
            onBack={() => setCurrentPage('dashboard')}
            onSave={(profileData) => console.log('Profile saved:', profileData)}
          />
        );
      
      case 'notifications':
        return (
          <NotificationsPage 
            userType={userData.type}
            onBack={() => setCurrentPage('dashboard')}
            onNotificationAction={(id, action) => console.log(`Notification ${id} ${action}`)}
          />
        );
      
      case 'settings':
        return (
          <SettingsPage 
            userType={userData.type}
            onBack={() => setCurrentPage('dashboard')}
            onSave={(settings) => console.log('Settings saved:', settings)}
            onDeleteAccount={() => {
              console.log('Account deletion requested');
              handleLogout();
            }}
          />
        );
      
      case 'analytics':
        return !isStudent ? (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Student Analytics</h2>
            <p className="text-muted-foreground">Detailed analytics and progress tracking for your students will be available here.</p>
          </div>
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Analytics Not Available</h2>
            <p className="text-muted-foreground">Analytics are only available for teachers.</p>
          </div>
        );
      
      case 'reports':
        return !isStudent ? (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <p className="text-muted-foreground">Generate and download detailed reports for your classes and students.</p>
          </div>
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Reports Not Available</h2>
            <p className="text-muted-foreground">Reports are only available for teachers.</p>
          </div>
        );
      
      case 'chapter-view':
        return (
          <ChapterView 
            chapterTitle={currentChapter?.chapterTitle}
            subjectName={currentChapter?.subjectId}
            onBack={handleBackToDashboard}
            onComplete={() => {
              console.log('Chapter completed, returning to dashboard');
              handleBackToDashboard();
            }}
          />
        );
      
      case 'video-player':
        return (
          <VideoPlayer 
            videoSrc="C:\Users\killi\OneDrive\Quantitative\OneDrive\Desktop\sankalp(gamified learning platform)\sankalp\client\public\assets\lesson.mp4"
            title="Lesson Video"
            onBack={() => setCurrentPage('dashboard')}
          />
        );
      
      default:
        return <div>Page not found</div>;
    }
  };

  const renderContent = () => {
    switch (appState) {
      case 'auth':
        return <AuthForm onAuthSuccess={handleAuthSuccess} />;
      
      case 'main-app':
        if (!userData) return <div>Loading...</div>;
        
        return (
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <AppSidebar 
                userData={userData}
                currentPage={currentPage}
                onNavigate={handleNavigation}
                onLogout={handleLogout}
                unreadNotifications={unreadNotifications}
              />
              <SidebarInset className="flex flex-col flex-1">
                <header className="flex items-center justify-between p-2 border-b">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div className="flex gap-2">
                    <LanguageSelector />
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-1 overflow-auto">
                  {renderMainContent()}
                </main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        );
      
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen">
          {renderContent()}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
