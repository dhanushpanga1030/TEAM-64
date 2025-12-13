import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, Crown, Star, TrendingUp, Users, Flame } from "lucide-react";
import achievementBadge from '@assets/generated_images/Achievement_badge_star_959dc44b.png';

interface LeaderboardEntry {
  id: string;
  name: string;
  grade: string;
  points: number;
  dailyPoints: number;
  weeklyPoints: number;
  rank: number;
  previousRank: number;
  badges: number;
  streak: number;
  avatar?: string;
  specialBadges: string[];
}

interface LeaderboardProps {
  currentUserId?: string;
  onBack?: () => void;
}

export default function Leaderboard({ 
  currentUserId = "current-user",
  onBack = () => {}
}: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState("daily");

  //todo: remove mock functionality
  const mockLeaderboard: LeaderboardEntry[] = [
    {
      id: "user-1",
      name: "Arjun Patel",
      grade: "8",
      points: 2150,
      dailyPoints: 95,
      weeklyPoints: 450,
      rank: 1,
      previousRank: 2,
      badges: 18,
      streak: 12,
      specialBadges: ["Math Master", "Science Star"]
    },
    {
      id: "current-user",
      name: "Priya Sharma",
      grade: "8",
      points: 1850,
      dailyPoints: 87,
      weeklyPoints: 380,
      rank: 2,
      previousRank: 1,
      badges: 15,
      streak: 8,
      specialBadges: ["Quick Learner"]
    },
    {
      id: "user-3",
      name: "Kiran Singh",
      grade: "8",
      points: 1720,
      dailyPoints: 82,
      weeklyPoints: 350,
      rank: 3,
      previousRank: 4,
      badges: 14,
      streak: 6,
      specialBadges: ["Engineering Pro"]
    },
    {
      id: "user-4",
      name: "Sneha Reddy",
      grade: "8",
      points: 1650,
      dailyPoints: 78,
      weeklyPoints: 320,
      rank: 4,
      previousRank: 3,
      badges: 12,
      streak: 5,
      specialBadges: []
    },
    {
      id: "user-5",
      name: "Rahul Kumar",
      grade: "8",
      points: 1580,
      dailyPoints: 75,
      weeklyPoints: 290,
      rank: 5,
      previousRank: 5,
      badges: 11,
      streak: 4,
      specialBadges: ["Consistent"]
    },
    {
      id: "user-6",
      name: "Ananya Das",
      grade: "8",
      points: 1450,
      dailyPoints: 71,
      weeklyPoints: 275,
      rank: 6,
      previousRank: 7,
      badges: 10,
      streak: 3,
      specialBadges: []
    },
    {
      id: "user-7",
      name: "Vikram Joshi",
      grade: "8",
      points: 1420,
      dailyPoints: 68,
      weeklyPoints: 260,
      rank: 7,
      previousRank: 6,
      badges: 9,
      streak: 7,
      specialBadges: ["Streak Master"]
    },
    {
      id: "user-8",
      name: "Meera Nair",
      grade: "8",
      points: 1380,
      dailyPoints: 65,
      weeklyPoints: 245,
      rank: 8,
      previousRank: 8,
      badges: 8,
      streak: 2,
      specialBadges: []
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-orange-500" />;
      default: return <div className="h-6 w-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</div>;
    }
  };

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) {
      return <div className="flex items-center text-green-600 text-xs">
        <TrendingUp className="h-3 w-3 mr-1" />
        +{previous - current}
      </div>;
    } else if (current > previous) {
      return <div className="flex items-center text-red-600 text-xs">
        <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
        -{current - previous}
      </div>;
    }
    return <div className="text-xs text-muted-foreground">-</div>;
  };

  const getPointsForTab = (entry: LeaderboardEntry, tab: string) => {
    switch (tab) {
      case 'daily': return entry.dailyPoints;
      case 'weekly': return entry.weeklyPoints;
      case 'all-time': return entry.points;
      default: return entry.points;
    }
  };

  const getSortedLeaderboard = (tab: string) => {
    return [...mockLeaderboard].sort((a, b) => getPointsForTab(b, tab) - getPointsForTab(a, tab));
  };

  const currentUser = mockLeaderboard.find(user => user.id === currentUserId);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold">Leaderboard</h1>
              <p className="text-white/90">See how you rank against your classmates</p>
            </div>
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-white/20 text-white hover:bg-white/10"
              data-testid="button-back-dashboard"
            >
              ← Back to Dashboard
            </Button>
          </div>
          
          {/* Current User Stats */}
          {currentUser && (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-white/20">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback className="bg-white/20 text-white">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{currentUser.name}</h3>
                      <p className="text-sm text-white/80">Your Current Rank</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">#{currentUser.rank}</div>
                    <div className="text-sm">{getRankChange(currentUser.rank, currentUser.previousRank)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{currentUser.points}</div>
                    <div className="text-sm text-white/80">Total Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="daily" data-testid="tab-daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly" data-testid="tab-weekly">Weekly</TabsTrigger>
            <TabsTrigger value="all-time" data-testid="tab-all-time">All Time</TabsTrigger>
          </TabsList>

          {['daily', 'weekly', 'all-time'].map(tabValue => (
            <TabsContent key={tabValue} value={tabValue}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    {tabValue === 'daily' ? 'Daily' : tabValue === 'weekly' ? 'Weekly' : 'All Time'} Rankings
                  </CardTitle>
                  <CardDescription>
                    {tabValue === 'daily' && 'Points earned today'}
                    {tabValue === 'weekly' && 'Points earned this week'}
                    {tabValue === 'all-time' && 'Total points earned'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getSortedLeaderboard(tabValue).map((entry, index) => {
                      const displayRank = index + 1;
                      const isCurrentUser = entry.id === currentUserId;
                      
                      return (
                        <div 
                          key={entry.id} 
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                            isCurrentUser 
                              ? 'bg-primary/5 border-primary/20 shadow-sm' 
                              : 'hover:bg-muted/50'
                          }`}
                          data-testid={`leaderboard-entry-${entry.id}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center min-w-[2rem]">
                              {getRankIcon(displayRank)}
                            </div>
                            
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={entry.avatar} />
                              <AvatarFallback className="text-sm">
                                {entry.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className={`font-semibold ${
                                  isCurrentUser ? 'text-primary' : ''
                                }`}>
                                  {entry.name}
                                </h3>
                                {isCurrentUser && (
                                  <Badge variant="outline" className="text-xs">You</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Class {entry.grade}</span>
                                <span className="flex items-center gap-1">
                                  <img src={achievementBadge} alt="Badge" className="h-3 w-3" />
                                  {entry.badges}
                                </span>
                                <span className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  {entry.streak}
                </span>
                                {entry.specialBadges.length > 0 && (
                                  <div className="flex gap-1">
                                    {entry.specialBadges.map(badge => (
                                      <Badge key={badge} variant="secondary" className="text-xs">
                                        {badge}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              {getPointsForTab(entry, tabValue)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              points
                            </div>
                            {tabValue === 'all-time' && (
                              <div className="text-xs mt-1">
                                {getRankChange(entry.rank, entry.previousRank)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Special Achievements */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Special Achievements
            </CardTitle>
            <CardDescription>Unlock these special badges by reaching certain ranks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg">
                <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">Champion</h4>
                <p className="text-xs text-muted-foreground">Rank #1 for 7 days</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950 rounded-lg">
                <Medal className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">Elite</h4>
                <p className="text-xs text-muted-foreground">Top 3 for 14 days</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg">
                <Award className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-700 dark:text-orange-300">Rising Star</h4>
                <p className="text-xs text-muted-foreground">Climb 5+ ranks in a week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}