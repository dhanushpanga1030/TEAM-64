import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { User, Award, Calendar, BookOpen, Trophy, Star, Edit3, Camera } from "lucide-react";
import achievementBadge from '@assets/generated_images/Achievement_badge_star_959dc44b.png';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  grade: string;
  school: string;
  joinDate: string;
  avatar?: string;
  bio?: string;
  interests: string[];
  achievements: Achievement[];
  stats: {
    totalPoints: number;
    currentStreak: number;
    longestStreak: number;
    chaptersCompleted: number;
    gamesPlayed: number;
    badgesEarned: number;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ProfilePageProps {
  userType: 'student' | 'teacher';
  onBack?: () => void;
  onSave?: (profileData: Partial<UserProfile>) => void;
}

export default function ProfilePage({
  userType = 'student',
  onBack = () => {},
  onSave = () => {}
}: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  //todo: remove mock functionality
  const mockProfile: UserProfile = {
    id: "user-123",
    name: userType === 'student' ? "Priya Sharma" : "Dr. Rajesh Kumar",
    email: userType === 'student' ? "priya.sharma@school.edu" : "rajesh.kumar@school.edu",
    grade: userType === 'student' ? "8" : "Teacher",
    school: "Sankalp Rural School",
    joinDate: "2024-08-15",
    bio: userType === 'student' 
      ? "I love learning science and mathematics! My favorite subjects are chemistry and algebra. I want to become an engineer someday."
      : "Experienced educator with 10 years of teaching experience in STEM subjects. Passionate about making learning engaging for rural students.",
    interests: userType === 'student' 
      ? ["Science Experiments", "Mathematics", "Engineering", "Innovation"]
      : ["Educational Technology", "Student Analytics", "Curriculum Development"],
    achievements: [
      {
        id: "first-chapter",
        title: "First Steps",
        description: "Completed your first chapter",
        icon: "target",
        earnedDate: "2024-09-01",
        rarity: "common"
      },
      {
        id: "week-streak",
        title: "Week Warrior",
        description: "Maintained a 7-day learning streak",
        icon: "flame",
        earnedDate: "2024-09-10",
        rarity: "rare"
      },
      {
        id: "math-master",
        title: "Math Master",
        description: "Completed all mathematics chapters with 90%+ scores",
        icon: "calculator",
        earnedDate: "2024-09-15",
        rarity: "epic"
      }
    ],
    stats: {
      totalPoints: 1250,
      currentStreak: 7,
      longestStreak: 12,
      chaptersCompleted: 34,
      gamesPlayed: 18,
      badgesEarned: 15
    }
  };

  const [profileData, setProfileData] = useState(mockProfile);

  const handleSave = () => {
    setIsEditing(false);
    onSave(profileData);
    console.log('Profile saved:', profileData);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      case 'common': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold">Profile</h1>
              <p className="text-white/90">{userType === 'student' ? 'Manage your learning profile' : 'Manage your teaching profile'}</p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="border-white/20 text-white hover:bg-white/10"
                    data-testid="button-cancel-edit"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    data-testid="button-save-profile"
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  className="border-white/20 text-white hover:bg-white/10 gap-2"
                  data-testid="button-edit-profile"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="text-2xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      data-testid="button-change-avatar"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input 
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="text-center"
                        data-testid="input-name"
                      />
                      <Input 
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="text-center text-sm"
                        data-testid="input-email"
                      />
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-xl">{profileData.name}</CardTitle>
                      <CardDescription>{profileData.email}</CardDescription>
                    </>
                  )}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <Badge variant="secondary">
                    {userType === 'student' ? `Class ${profileData.grade}` : 'Teacher'}
                  </Badge>
                  <Badge variant="outline">
                    {profileData.school}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Bio</Label>
                  {isEditing ? (
                    <Textarea 
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="mt-1"
                      rows={3}
                      data-testid="textarea-bio"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{profileData.bio}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Member Since</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(profileData.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements" data-testid="tab-achievements">Achievements</TabsTrigger>
                <TabsTrigger value="interests" data-testid="tab-interests">Interests</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {userType === 'student' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Learning Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Total Points</span>
                            <span className="text-2xl font-bold text-yellow-600">{profileData.stats.totalPoints}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Current Streak</span>
                            <span className="text-2xl font-bold text-orange-600">{profileData.stats.currentStreak} days</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Longest Streak</span>
                            <span className="text-lg font-semibold">{profileData.stats.longestStreak} days</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Chapters Completed</span>
                            <span className="text-2xl font-bold text-blue-600">{profileData.stats.chaptersCompleted}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Games Played</span>
                            <span className="text-2xl font-bold text-purple-600">{profileData.stats.gamesPlayed}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Badges Earned</span>
                            <span className="text-lg font-semibold">{profileData.stats.badgesEarned}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Completed "Introduction to Algebra" chapter</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Played "Stickman Math Adventure" game</p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Earned "Week Warrior" achievement</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-purple-500" />
                      Your Achievements
                    </CardTitle>
                    <CardDescription>Badges and milestones you've earned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {profileData.achievements.map((achievement) => (
                        <div 
                          key={achievement.id} 
                          className={`p-4 rounded-lg bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-2xl flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                              {achievement.icon === 'target' && <Trophy className="h-5 w-5" />}
                              {achievement.icon === 'flame' && <Star className="h-5 w-5" />}
                              {achievement.icon === 'calculator' && <Award className="h-5 w-5" />}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{achievement.title}</h3>
                              <p className="text-xs opacity-90">{achievement.description}</p>
                            </div>
                            <Badge variant="outline" className="border-white/20 text-white text-xs">
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <p className="text-xs opacity-75">
                            Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interests" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-500" />
                      Your Interests
                    </CardTitle>
                    <CardDescription>
                      {isEditing ? 'Add or remove your learning interests' : 'Topics you\'re passionate about'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-sm px-3 py-1"
                          data-testid={`interest-${index}`}
                        >
                          {interest}
                          {isEditing && (
                            <button 
                              onClick={() => {
                                const newInterests = profileData.interests.filter((_, i) => i !== index);
                                setProfileData(prev => ({ ...prev, interests: newInterests }));
                              }}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            const newInterest = prompt('Enter new interest:');
                            if (newInterest) {
                              setProfileData(prev => ({ 
                                ...prev, 
                                interests: [...prev.interests, newInterest] 
                              }));
                            }
                          }}
                          data-testid="button-add-interest"
                        >
                          + Add Interest
                        </Button>
                      )}
                    </div>
                    {!isEditing && profileData.interests.length === 0 && (
                      <p className="text-muted-foreground text-sm">No interests added yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}