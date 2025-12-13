import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Trophy, Flame, Star, ChevronRight } from "lucide-react";
import mathIcon from '@assets/generated_images/Math_subject_icon_2132343f.png';
import scienceIcon from '@assets/generated_images/Science_subject_icon_f930a1ef.png';
import techIcon from '@assets/generated_images/Technology_subject_icon_1ad9102d.png';
import engineeringIcon from '@assets/generated_images/Engineering_subject_icon_cca7845c.png';
import heroImage from '@assets/generated_images/Educational_hero_illustration_f65cfb68.png';
import achievementBadge from '@assets/generated_images/Achievement_badge_star_959dc44b.png';
import streakIcon from '@assets/generated_images/Streak_fire_icon_f98af0b9.png';

interface StudentData {
  name: string;
  grade: string;
  points: number;
  streak: number;
  badges: number;
}

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  totalChapters: number;
  completedChapters: number;
  description: string;
}

interface StudentDashboardProps {
  studentData?: StudentData;
  onSubjectClick?: (subjectId: string) => void;
  onChapterClick?: (subjectId: string, chapterId: string) => void;
}

//todo: remove mock functionality
const mockSubjects: Subject[] = [
  {
    id: "math",
    name: "Mathematics",
    icon: mathIcon,
    color: "from-blue-500 to-cyan-500",
    progress: 75,
    totalChapters: 12,
    completedChapters: 9,
    description: "Numbers, Algebra, Geometry"
  },
  {
    id: "science",
    name: "Science",
    icon: scienceIcon,
    color: "from-green-500 to-emerald-500",
    progress: 60,
    totalChapters: 15,
    completedChapters: 9,
    description: "Physics, Chemistry, Biology"
  },
  {
    id: "technology",
    name: "Technology",
    icon: techIcon,
    color: "from-purple-500 to-violet-500",
    progress: 40,
    totalChapters: 10,
    completedChapters: 4,
    description: "Computer Science, Digital Skills"
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: engineeringIcon,
    color: "from-orange-500 to-red-500",
    progress: 30,
    totalChapters: 8,
    completedChapters: 2,
    description: "Design, Building, Problem Solving"
  }
];

export default function StudentDashboard({
  studentData = {
    name: "Priya Sharma",
    grade: "8",
    points: 1250,
    streak: 7,
    badges: 12
  },
  onSubjectClick = () => {},
  onChapterClick = () => {}
}: StudentDashboardProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(subjectId);
    onSubjectClick(subjectId);
    console.log(`Subject clicked: ${subjectId}`);
  };

  const handleChapterClick = (subjectId: string, chapterTitle: string) => {
    onChapterClick(subjectId, chapterTitle);
    console.log(`Chapter clicked: ${chapterTitle} in ${subjectId}`);
  };

  const getChaptersForSubject = (subjectId: string) => {
    //todo: remove mock functionality
    const chapters = [
      { id: "1", title: "Introduction to Basics", completed: true, hasVideo: true, hasQuiz: true, hasGame: true },
      { id: "2", title: "Core Concepts", completed: true, hasVideo: true, hasQuiz: true, hasGame: false },
      { id: "3", title: "Advanced Topics", completed: false, hasVideo: true, hasQuiz: false, hasGame: true },
      { id: "4", title: "Practical Applications", completed: false, hasVideo: false, hasQuiz: false, hasGame: false },
    ];
    return chapters;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-display font-bold">Welcome back, {studentData.name}!</h1>
                <p className="text-primary-foreground/90">Class {studentData.grade} • Continue your learning journey</p>
              </div>
              
              {/* Gamification Stats */}
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="font-semibold">{studentData.points}</span>
                  <span className="text-sm opacity-90">Points</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <img src={streakIcon} alt="Streak" className="h-5 w-5" />
                  <span className="font-semibold">{studentData.streak}</span>
                  <span className="text-sm opacity-90">Day Streak</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <img src={achievementBadge} alt="Badge" className="h-5 w-5" />
                  <span className="font-semibold">{studentData.badges}</span>
                  <span className="text-sm opacity-90">Badges</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img src={heroImage} alt="Learning" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedSubject ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold mb-2">Your STEM Subjects</h2>
              <p className="text-muted-foreground">Choose a subject to start learning</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockSubjects.map((subject) => (
                <Card 
                  key={subject.id} 
                  className="hover-elevate cursor-pointer transition-all duration-200 border-0 shadow-md"
                  onClick={() => handleSubjectClick(subject.id)}
                  data-testid={`card-subject-${subject.id}`}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${subject.color} p-3 mb-4`}>
                      <img src={subject.icon} alt={subject.name} className="w-full h-full object-contain" />
                    </div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription>{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{subject.completedChapters}/{subject.totalChapters} chapters</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedSubject(null)}
                data-testid="button-back-subjects"
              >
                ← Back to Subjects
              </Button>
              <div>
                <h2 className="text-2xl font-display font-bold">
                  {mockSubjects.find(s => s.id === selectedSubject)?.name} Chapters
                </h2>
                <p className="text-muted-foreground">Choose a chapter to start learning</p>
              </div>
            </div>

            <div className="grid gap-4">
              {getChaptersForSubject(selectedSubject).map((chapter, index) => (
                <Card 
                  key={chapter.id} 
                  className={`hover-elevate transition-all duration-200 ${
                    chapter.completed ? 'border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          chapter.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {chapter.completed ? '✓' : index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{chapter.title}</CardTitle>
                          <div className="flex gap-2 mt-2">
                            {chapter.hasVideo && (
                              <Badge variant="secondary" className="text-xs">
                                <Play className="h-3 w-3 mr-1" />Video
                              </Badge>
                            )}
                            {chapter.hasQuiz && (
                              <Badge variant="secondary" className="text-xs">
                                <BookOpen className="h-3 w-3 mr-1" />Quiz
                              </Badge>
                            )}
                            {chapter.hasGame && (
                              <Badge variant="secondary" className="text-xs">
                                <Trophy className="h-3 w-3 mr-1" />Game
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleChapterClick(selectedSubject, chapter.title)}
                        disabled={index > 0 && !getChaptersForSubject(selectedSubject)[index - 1].completed}
                        data-testid={`button-chapter-${chapter.id}`}
                      >
                        {chapter.completed ? 'Review' : 'Start'}
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}