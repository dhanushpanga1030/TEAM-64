import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Trophy, Star, ChevronRight, Gamepad2 } from "lucide-react";

interface GameData {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  points: number;
  completed: boolean;
  highScore: number;
  thumbnail: string;
}

interface GamesPageProps {
  onGameComplete?: (gameId: string, score: number) => void;
  onBack?: () => void;
}

// Mock Phaser.js game component
const PhaserGameCanvas = ({ gameId, onGameEnd }: { gameId: string; onGameEnd: (score: number) => void }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  const startGame = () => {
    setIsPlaying(true);
    // Simulate game play with random score
    const duration = Math.random() * 3000 + 2000; // 2-5 seconds
    setTimeout(() => {
      const score = Math.floor(Math.random() * 100) + 50;
      setGameScore(score);
      setIsPlaying(false);
      onGameEnd(score);
    }, duration);
  };

  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden relative">
      {!isPlaying && gameScore === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <Gamepad2 className="h-16 w-16 mx-auto" />
            <h3 className="text-xl font-bold">Stickman Math Adventure</h3>
            <p>Help stickman collect numbers and solve equations!</p>
            <Button onClick={startGame} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Play className="h-5 w-5 mr-2" />
              Start Game
            </Button>
          </div>
        </div>
      )}
      
      {isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <div className="animate-bounce">
              <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold">Playing...</h3>
            <p>Stickman is solving problems!</p>
            <div className="flex justify-center">
              <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {gameScore > 0 && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center space-y-4">
            <Trophy className="h-16 w-16 mx-auto text-yellow-300" />
            <h3 className="text-xl font-bold">Game Complete!</h3>
            <div className="text-3xl font-bold">{gameScore}/100</div>
            <p>🎉 Great job solving those problems!</p>
            <Button onClick={() => { setGameScore(0); }} className="bg-white text-blue-600 hover:bg-gray-100">
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function GamesPage({ onGameComplete = () => {}, onBack = () => {} }: GamesPageProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set());

  //todo: remove mock functionality
  const mockGames: GameData[] = [
    {
      id: "math-adventure",
      title: "Stickman Math Adventure",
      subject: "Mathematics",
      difficulty: "Easy",
      description: "Help stickman collect numbers and solve basic math problems while avoiding obstacles.",
      points: 50,
      completed: true,
      highScore: 85,
thumbnail: "📊"
    },
    {
      id: "science-lab",
      title: "Virtual Science Lab",
      subject: "Science",
      difficulty: "Medium",
      description: "Conduct virtual experiments and learn about chemical reactions in a safe environment.",
      points: 75,
      completed: false,
      highScore: 0,
thumbnail: "⚗️"
    },
    {
      id: "coding-blocks",
      title: "Block Coding Challenge",
      subject: "Technology",
      difficulty: "Medium",
      description: "Learn programming concepts by arranging code blocks to solve puzzles.",
      points: 80,
      completed: false,
      highScore: 0,
thumbnail: "💿"
    },
    {
      id: "bridge-builder",
      title: "Bridge Engineering",
      subject: "Engineering",
      difficulty: "Hard",
      description: "Design and build bridges that can withstand different loads and conditions.",
      points: 100,
      completed: false,
      highScore: 0,
thumbnail: "🏗️"
    },
    {
      id: "physics-playground",
      title: "Physics Playground",
      subject: "Science",
      difficulty: "Medium",
      description: "Experiment with physics concepts like gravity, momentum, and energy.",
      points: 70,
      completed: false,
      highScore: 0,
thumbnail: "🔬"
    },
    {
      id: "geometry-quest",
      title: "Geometry Quest",
      subject: "Mathematics",
      difficulty: "Easy",
      description: "Explore shapes and angles in an interactive adventure game.",
      points: 60,
      completed: true,
      highScore: 92,
thumbnail: "📏"
    }
  ];

  const handleGameEnd = (gameId: string, score: number) => {
    const game = mockGames.find(g => g.id === gameId);
    if (game) {
      setCompletedGames(prev => new Set([...Array.from(prev), gameId]));
      onGameComplete(gameId, score);
      console.log(`Game ${gameId} completed with score: ${score}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return 'from-blue-500 to-cyan-500';
      case 'Science': return 'from-green-500 to-emerald-500';
      case 'Technology': return 'from-purple-500 to-violet-500';
      case 'Engineering': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (selectedGame) {
    const game = mockGames.find(g => g.id === selectedGame);
    if (!game) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedGame(null)}
              data-testid="button-back-games"
            >
              ← Back to Games
            </Button>
            <div>
              <h1 className="text-2xl font-display font-bold">{game.title}</h1>
              <p className="text-muted-foreground">{game.description}</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{game.thumbnail}</div>
                  <div>
                    <CardTitle>{game.title}</CardTitle>
                    <CardDescription>{game.subject} • {game.points} points</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
                  {game.completed && (
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      <Trophy className="h-3 w-3 mr-1" />
                      Best: {game.highScore}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <PhaserGameCanvas 
                gameId={game.id} 
                onGameEnd={(score) => handleGameEnd(game.id, score)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const totalGames = mockGames.length;
  const completedCount = mockGames.filter(g => g.completed).length;
  const totalPoints = mockGames.filter(g => g.completed).reduce((sum, g) => sum + g.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold">STEM Games</h1>
              <p className="text-white/90">Learn through interactive gaming experiences</p>
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
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Gamepad2 className="h-8 w-8" />
                <div>
                  <div className="text-2xl font-bold">{completedCount}/{totalGames}</div>
                  <div className="text-sm opacity-90">Games Completed</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-300" />
                <div>
                  <div className="text-2xl font-bold">{totalPoints}</div>
                  <div className="text-sm opacity-90">Points Earned</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-orange-300" />
                <div>
                  <div className="text-2xl font-bold">{Math.round((completedCount / totalGames) * 100)}%</div>
                  <div className="text-sm opacity-90">Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGames.map((game) => (
            <Card 
              key={game.id} 
              className="hover-elevate cursor-pointer transition-all duration-200"
              onClick={() => setSelectedGame(game.id)}
              data-testid={`card-game-${game.id}`}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${getSubjectColor(game.subject)} p-3 mb-4 flex items-center justify-center text-white text-2xl`}>
                  {game.thumbnail}
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{game.title}</CardTitle>
                    <CardDescription className="mt-1">{game.subject}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={getDifficultyColor(game.difficulty)} variant="secondary">
                      {game.difficulty}
                    </Badge>
                    {game.completed && <Badge variant="outline" className="border-green-500 text-green-600 text-xs">✓ Done</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{game.points} points</span>
                  </div>
                  {game.completed && game.highScore > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Best: {game.highScore}/100
                    </div>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}