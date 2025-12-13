import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock, Star, Flame, Trophy, Lightbulb, Zap, Code, Beaker } from "lucide-react";
import achievementBadge from '@assets/generated_images/Achievement_badge_star_959dc44b.png';

interface SkillBlock {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  unlockRequirement: {
    type: 'points' | 'streak' | 'badges';
    amount: number;
  };
  unlocked: boolean;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

interface BonusRewardsPageProps {
  userStats?: {
    points: number;
    streak: number;
    badges: number;
  };
  onBack?: () => void;
  onSkillBlockClick?: (skillBlockId: string) => void;
}

export default function BonusRewardsPage({ 
  userStats = { points: 1250, streak: 7, badges: 12 },
  onBack = () => {},
  onSkillBlockClick = () => {}
}: BonusRewardsPageProps) {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  //todo: remove mock functionality
  const skillBlocks: SkillBlock[] = [
    {
      id: "science-experiments",
      title: "Science Experiments",
      description: "Conduct virtual laboratory experiments and explore scientific phenomena through interactive simulations.",
      icon: Beaker,
      color: "from-green-500 to-emerald-600",
      unlockRequirement: { type: 'points', amount: 500 },
      unlocked: true,
      progress: 75,
      totalLessons: 12,
      completedLessons: 9
    },
    {
      id: "innovation",
      title: "Innovation Lab",
      description: "Learn design thinking, creative problem solving, and develop innovative solutions to real-world challenges.",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-600",
      unlockRequirement: { type: 'streak', amount: 5 },
      unlocked: true,
      progress: 40,
      totalLessons: 15,
      completedLessons: 6
    },
    {
      id: "iot",
      title: "IoT & Sensors",
      description: "Explore Internet of Things, sensor technology, and learn to build smart connected devices.",
      icon: Zap,
      color: "from-blue-500 to-cyan-600",
      unlockRequirement: { type: 'badges', amount: 8 },
      unlocked: true,
      progress: 20,
      totalLessons: 10,
      completedLessons: 2
    },
    {
      id: "coding",
      title: "Advanced Coding",
      description: "Master programming concepts, algorithms, and build real applications using modern development tools.",
      icon: Code,
      color: "from-purple-500 to-indigo-600",
      unlockRequirement: { type: 'points', amount: 2000 },
      unlocked: false,
      progress: 0,
      totalLessons: 20,
      completedLessons: 0
    }
  ];

  const handleSkillBlockClick = (blockId: string) => {
    const block = skillBlocks.find(b => b.id === blockId);
    if (block && block.unlocked) {
      setSelectedBlock(blockId);
      onSkillBlockClick(blockId);
      console.log(`Skill block clicked: ${blockId}`);
    }
  };

  const getUnlockStatus = (requirement: SkillBlock['unlockRequirement']) => {
    const currentValue = userStats[requirement.type];
    return currentValue >= requirement.amount;
  };

  const getRequirementText = (requirement: SkillBlock['unlockRequirement']) => {
    const typeText = {
      points: 'points',
      streak: 'day streak',
      badges: 'badges'
    }[requirement.type];
    return `${requirement.amount} ${typeText}`;
  };

  const getRequirementIcon = (type: string) => {
    switch (type) {
      case 'points': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'streak': return <Flame className="h-4 w-4 text-orange-500" />;
      case 'badges': return <img src={achievementBadge} alt="Badge" className="h-4 w-4" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold">Bonus Rewards</h1>
              <p className="text-white/90">Unlock special skill blocks with your achievements</p>
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
          
          {/* Current Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-300" />
                <div>
                  <div className="text-2xl font-bold">{userStats.points}</div>
                  <div className="text-sm opacity-90">Total Points</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Flame className="h-8 w-8 text-orange-300" />
                <div>
                  <div className="text-2xl font-bold">{userStats.streak}</div>
                  <div className="text-sm opacity-90">Day Streak</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <img src={achievementBadge} alt="Badge" className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">{userStats.badges}</div>
                  <div className="text-sm opacity-90">Badges Earned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold mb-2">Skill Blocks</h2>
          <p className="text-muted-foreground">Unlock advanced learning modules by earning points, maintaining streaks, and collecting badges</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillBlocks.map((block) => {
            const isUnlocked = getUnlockStatus(block.unlockRequirement);
            const IconComponent = block.icon;
            
            return (
              <Card 
                key={block.id} 
                className={`relative transition-all duration-200 ${
                  isUnlocked 
                    ? 'hover-elevate cursor-pointer' 
                    : 'opacity-75 cursor-not-allowed'
                }`}
                onClick={() => isUnlocked && handleSkillBlockClick(block.id)}
                data-testid={`card-skill-${block.id}`}
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center z-10">
                    <div className="bg-white/90 dark:bg-black/90 rounded-full p-3">
                      <Lock className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${block.color} p-3 flex items-center justify-center text-white`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{block.title}</CardTitle>
                        <CardDescription className="mt-1">{block.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {isUnlocked ? (
                        <Badge variant="default" className="bg-green-500">
                          <Unlock className="h-3 w-3 mr-1" />
                          Unlocked
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          <Lock className="h-3 w-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Unlock Requirement */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      {getRequirementIcon(block.unlockRequirement.type)}
                      <span className="text-sm font-medium">Requires {getRequirementText(block.unlockRequirement)}</span>
                    </div>
                    {isUnlocked ? (
                      <Badge variant="outline" className="border-green-500 text-green-600 text-xs">
                        ✓ Achieved
                      </Badge>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {userStats[block.unlockRequirement.type]}/{block.unlockRequirement.amount}
                      </div>
                    )}
                  </div>
                  
                  {/* Progress (only show if unlocked) */}
                  {isUnlocked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{block.completedLessons}/{block.totalLessons} lessons</span>
                      </div>
                      <Progress value={block.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {Math.round(block.progress)}% complete
                      </div>
                    </div>
                  )}
                  
                  {/* Unlock Progress (only show if locked) */}
                  {!isUnlocked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Unlock Progress</span>
                        <span>{Math.round((userStats[block.unlockRequirement.type] / block.unlockRequirement.amount) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(userStats[block.unlockRequirement.type] / block.unlockRequirement.amount) * 100} 
                        className="h-2" 
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">How to Earn Points:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Complete chapters and quizzes</li>
                  <li>Play STEM games</li>
                  <li>Maintain daily streaks</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">How to Earn Badges:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Excel in specific subjects</li>
                  <li>Complete special challenges</li>
                  <li>Help other students learn</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}