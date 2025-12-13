import { useState, useRef, useEffect } from "react";
// MediaPipe will be lazy-loaded to avoid increasing initial bundle size
import type { Camera } from "@mediapipe/camera_utils";
import type { FaceDetection as FaceDetectionType } from "@mediapipe/face_detection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { FileText, Play, Trophy, BookOpen, CheckCircle, ArrowLeft } from "lucide-react";

interface ChapterViewProps {
  chapterTitle?: string;
  subjectName?: string;
  onBack?: () => void;
  onComplete?: () => void;
}


export default function ChapterView({
  chapterTitle = "Introduction to Basics",
  subjectName = "Mathematics",
  onBack = () => {},
  onComplete = () => {}
}: ChapterViewProps) {
  // --- Webcam/video attention logic with MediaPipe ---
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const faceDetectionRef = useRef<FaceDetectionType | null>(null);
  const [faceDetected, setFaceDetected] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Start or stop MediaPipe camera when webcamEnabled changes
    const setup = async () => {
      // stop existing if present
      if (cameraRef.current) {
        try { cameraRef.current.stop(); } catch {};
        cameraRef.current = null;
      }
      faceDetectionRef.current = null;

      if (!webcamEnabled) return;
      if (!webcamRef.current) return;

      try {
        const mpFaceDetection = await import('@mediapipe/face_detection');
        const camModule = await import('@mediapipe/camera_utils');

        const fd = new mpFaceDetection.FaceDetection({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
        });

        fd.setOptions({ model: 'short', minDetectionConfidence: 0.5 });
        fd.onResults((results: any) => {
          setFaceDetected(!!results.detections && results.detections.length > 0);
        });

        faceDetectionRef.current = fd;

        const camInst = new camModule.Camera(webcamRef.current, {
          onFrame: async () => {
            if (webcamRef.current && faceDetectionRef.current) {
              await faceDetectionRef.current.send({ image: webcamRef.current });
            }
          },
          width: 160,
          height: 120
        });

        cameraRef.current = camInst;
        cameraRef.current.start();
      } catch (err) {
        console.warn('Failed to initialize MediaPipe camera/face detection', err);
      }
    };

    setup();

    return () => {
      if (cameraRef.current) {
        try { cameraRef.current.stop(); } catch {}
        cameraRef.current = null;
      }
      faceDetectionRef.current = null;
    };
  }, [webcamEnabled]);


  const [activeTab, setActiveTab] = useState("overview");
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    if (!videoRef.current) return;
    if (!faceDetected && isPlaying) {
      videoRef.current.pause();
    }
  }, [faceDetected, isPlaying]);

  const handleSectionComplete = (section: string) => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(section);
    setCompletedSections(newCompleted);
    console.log(`Section completed: ${section}`);
  };

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
    console.log(`Quiz answer: ${questionId} = ${answer}`);
  };
  const handleGamePlay = () => {
    // Simulate game play
    const score = Math.floor(Math.random() * 100) + 50;
    setGameScore(score);
    handleSectionComplete('game');
    console.log(`Game completed with score: ${score}`);
  };

  const progressPercentage = (completedSections.size / 4) * 100;

  //todo: remove mock functionality
  const mockQuizQuestions = [
    {
      id: "q1",
      question: "What is the result of 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: "4"
    },
    {
      id: "q2",
      question: "Which of these is an even number?",
      options: ["7", "9", "8", "11"],
      correct: "8"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <Badge variant="secondary" className="mb-2">{subjectName}</Badge>
              <h1 className="text-2xl font-display font-bold">{chapterTitle}</h1>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Chapter Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-primary-foreground/20" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="gap-2" data-testid="tab-overview">
              <FileText className="h-4 w-4" />
              Overview
              {completedSections.has('overview') && <CheckCircle className="h-3 w-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="video" className="gap-2" data-testid="tab-video">
              <Play className="h-4 w-4" />
              Video
              {completedSections.has('video') && <CheckCircle className="h-3 w-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2" data-testid="tab-quiz">
              <BookOpen className="h-4 w-4" />
              Quiz
              {completedSections.has('quiz') && <CheckCircle className="h-3 w-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="game" className="gap-2" data-testid="tab-game">
              <Trophy className="h-4 w-4" />
              Game
              {completedSections.has('game') && <CheckCircle className="h-3 w-3 text-green-500" />}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Chapter Overview</CardTitle>
                <CardDescription>Study the chapter content to build your foundation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">PDF Content Preview</h3>
                  <div className="space-y-3 text-sm">
                    <p>📚 <strong>Learning Objectives:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
                      <li>Understand basic mathematical concepts</li>
                      <li>Apply problem-solving techniques</li>
                      <li>Practice with real-world examples</li>
                    </ul>
                    <p className="mt-4">📖 <strong>Chapter Contents:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
                      <li>Introduction to topic fundamentals</li>
                      <li>Step-by-step problem solutions</li>
                      <li>Practice exercises and examples</li>
                      <li>Summary and key takeaways</li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      handleSectionComplete('overview');
                      console.log('PDF viewed');
                    }}
                    disabled={completedSections.has('overview')}
                    data-testid="button-view-pdf"
                  >
                    {completedSections.has('overview') ? 'PDF Completed' : 'View Full PDF'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => console.log('Download PDF')}
                    data-testid="button-download-pdf"
                  >
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Lesson</CardTitle>
                <CardDescription>Watch the interactive video to understand the concepts. The video will pause if you are not attentive.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Webcam feed and attention status */}
                  <div className="flex flex-col items-center">
                    <video ref={webcamRef} width={160} height={120} autoPlay muted style={{borderRadius:8, border:'2px solid #ccc', background:'#222'}} />
                    <div className="mt-2 flex items-center gap-2">
                      <label className="text-xs">Webcam:</label>
                      <Button size="sm" variant={webcamEnabled ? "default" : "outline"} onClick={() => setWebcamEnabled(v => !v)} data-testid="button-toggle-webcam">
                        {webcamEnabled ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-center">
                      {faceDetected ? (
                        <span className="text-green-600 font-semibold">You are attentive</span>
                      ) : (
                        <span className="text-red-600 font-semibold">User not detected - video paused</span>
                      )}
                    </div>
                  </div>
                  {/* Video player for science core topic */}
                  <div className="flex-1">
                    <video
                      ref={videoRef}
                      width="100%"
                      controls
                      style={{borderRadius:8, background:'#000', width:'100%', maxHeight:360}}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      data-testid="video-player"
                    >
                      <source src="/animation-vs-physic.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Duration: 15 minutes • Interactive explanations
                  </div>
                  <Button 
                    onClick={() => handleSectionComplete('video')}
                    disabled={completedSections.has('video')}
                    data-testid="button-complete-video"
                  >
                    {completedSections.has('video') ? 'Video Completed' : 'Mark as Watched'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Quiz</CardTitle>
                <CardDescription>Test your understanding with these questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockQuizQuestions.map((question, index) => (
                  <div key={question.id} className="space-y-3">
                    <div className="font-medium">
                      {index + 1}. {question.question}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option) => (
                        <Button
                          key={option}
                          variant={quizAnswers[question.id] === option ? "default" : "outline"}
                          onClick={() => handleQuizAnswer(question.id, option)}
                          className="text-left justify-start"
                          data-testid={`quiz-option-${question.id}-${option}`}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                <Button 
                  onClick={() => {
                    handleSectionComplete('quiz');
                    console.log('Quiz submitted:', quizAnswers);
                  }}
                  disabled={Object.keys(quizAnswers).length < mockQuizQuestions.length || completedSections.has('quiz')}
                  className="w-full"
                  data-testid="button-submit-quiz"
                >
                  {completedSections.has('quiz') ? 'Quiz Completed' : 'Submit Quiz'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="game" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Game</CardTitle>
                <CardDescription>Play the stickman adventure game to reinforce learning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                  <div className="text-center space-y-4">
                    <Trophy className="h-16 w-16 mx-auto" />
                    <h3 className="text-xl font-bold">Stickman Math Adventure</h3>
                    <p>Help stickman solve problems to complete the level!</p>
                    {gameScore > 0 && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">Score: {gameScore}/100</div>
                        <div className="text-sm">🎉 Great job!</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button 
                    onClick={handleGamePlay}
                    size="lg"
                    className="gap-2"
                    data-testid="button-play-game"
                  >
                    <Play className="h-5 w-5" />
                    {gameScore > 0 ? 'Play Again' : 'Start Game'}
                  </Button>
                </div>
                {gameScore > 0 && (
                  <div className="text-center text-muted-foreground text-sm">
                    Game completed! You earned 50 points.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Complete Chapter Button */}
        {progressPercentage === 100 && (
          <Card className="mt-8 border-green-200 bg-green-50 dark:bg-green-950">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                  Chapter Complete!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  You've mastered all sections. Ready for the next challenge?
                </p>
                <Button 
                  onClick={() => {
                    onComplete();
                    console.log('Chapter completed');
                  }}
                  size="lg"
                  data-testid="button-complete-chapter"
                >
                  Complete Chapter & Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}