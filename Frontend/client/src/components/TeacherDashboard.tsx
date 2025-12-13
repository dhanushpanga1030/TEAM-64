import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, TrendingDown, Download, AlertTriangle, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TeacherData {
  name: string;
  rollNo: string;
  subjects: string[];
}

interface StudentProgress {
  id: string;
  name: string;
  grade: string;
  completedChapters: { [subject: string]: number };
  totalChapters: { [subject: string]: number };
  scores: { [subject: string]: number };
  weakAreas: string[];
  lastActive: string;
}

interface TeacherDashboardProps {
  teacherData?: TeacherData;
  onDownloadReport?: (classGrade: string) => void;
}

export default function TeacherDashboard({
  teacherData = {
    name: "Dr. Rajesh Kumar",
    rollNo: "T001",
    subjects: ["Mathematics", "Science", "Technology"]
  },
  onDownloadReport = () => {}
}: TeacherDashboardProps) {
  const [selectedClass, setSelectedClass] = useState("8");
  const [selectedSubject, setSelectedSubject] = useState("all");

  //todo: remove mock functionality
  const mockStudents: StudentProgress[] = [
    {
      id: "1",
      name: "Priya Sharma",
      grade: "8",
      completedChapters: { math: 9, science: 7, technology: 4, engineering: 2 },
      totalChapters: { math: 12, science: 15, technology: 10, engineering: 8 },
      scores: { math: 85, science: 78, technology: 65, engineering: 45 },
      weakAreas: ["Engineering Basics"],
      lastActive: "2 hours ago"
    },
    {
      id: "2",
      name: "Arjun Patel",
      grade: "8",
      completedChapters: { math: 11, science: 12, technology: 6, engineering: 3 },
      totalChapters: { math: 12, science: 15, technology: 10, engineering: 8 },
      scores: { math: 92, science: 88, technology: 72, engineering: 58 },
      weakAreas: ["Technology Applications"],
      lastActive: "1 day ago"
    },
    {
      id: "3",
      name: "Sneha Reddy",
      grade: "8",
      completedChapters: { math: 8, science: 10, technology: 5, engineering: 1 },
      totalChapters: { math: 12, science: 15, technology: 10, engineering: 8 },
      scores: { math: 76, science: 82, technology: 58, engineering: 32 },
      weakAreas: ["Math Problem Solving", "Engineering Design"],
      lastActive: "3 hours ago"
    },
    {
      id: "4",
      name: "Kiran Singh",
      grade: "8",
      completedChapters: { math: 10, science: 8, technology: 7, engineering: 4 },
      totalChapters: { math: 12, science: 15, technology: 10, engineering: 8 },
      scores: { math: 88, science: 74, technology: 80, engineering: 68 },
      weakAreas: ["Science Concepts"],
      lastActive: "5 hours ago"
    }
  ];

  const classGrades = ["6", "7", "8", "9", "10", "11", "12"];
  const subjects = ["all", "math", "science", "technology", "engineering"];

  const getFilteredStudents = () => {
    return mockStudents.filter(student => student.grade === selectedClass);
  };

  const getClassAnalytics = () => {
    const students = getFilteredStudents();
    const subjects = ["math", "science", "technology", "engineering"];
    
    return subjects.map(subject => {
      const avgProgress = students.reduce((acc, student) => 
        acc + (student.completedChapters[subject] / student.totalChapters[subject]) * 100, 0
      ) / students.length;
      
      const avgScore = students.reduce((acc, student) => acc + student.scores[subject], 0) / students.length;
      
      return {
        subject: subject.charAt(0).toUpperCase() + subject.slice(1),
        progress: Math.round(avgProgress),
        score: Math.round(avgScore)
      };
    });
  };

  const getPerformanceData = () => {
    const students = getFilteredStudents();
    const excellent = students.filter(s => Object.values(s.scores).reduce((a, b) => a + b, 0) / 4 >= 80).length;
    const good = students.filter(s => {
      const avg = Object.values(s.scores).reduce((a, b) => a + b, 0) / 4;
      return avg >= 60 && avg < 80;
    }).length;
    const needsHelp = students.filter(s => Object.values(s.scores).reduce((a, b) => a + b, 0) / 4 < 60).length;
    
    return [
      { name: 'Excellent (80%+)', value: excellent, color: '#22c55e' },
      { name: 'Good (60-79%)', value: good, color: '#f59e0b' },
      { name: 'Needs Help (<60%)', value: needsHelp, color: '#ef4444' }
    ];
  };

  const handleDownloadReport = () => {
    onDownloadReport(selectedClass);
    console.log(`Downloading report for Class ${selectedClass}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold">Teacher Dashboard</h1>
              <p className="text-primary-foreground/90">Welcome back, {teacherData.name}</p>
              <div className="flex gap-2 mt-2">
                {teacherData.subjects.map(subject => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-32" data-testid="select-class">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  {classGrades.map(grade => (
                    <SelectItem key={grade} value={grade}>Class {grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={handleDownloadReport}
                className="gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="button-download-report"
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Class Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getFilteredStudents().length}</div>
              <div className="text-xs text-muted-foreground">Class {selectedClass}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5% from last week
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-muted-foreground">Students online</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Attention Needed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-xs text-muted-foreground">Students struggling</div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Average progress and scores by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getClassAnalytics()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#3b82f6" name="Progress %" />
                  <Bar dataKey="score" fill="#10b981" name="Score %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Performance Distribution</CardTitle>
              <CardDescription>Overall performance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getPerformanceData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {getPerformanceData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {getPerformanceData().map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}: {item.value} students</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>Student Progress Details</CardTitle>
            <CardDescription>Individual student performance and weak areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getFilteredStudents().map((student) => {
                const avgScore = Object.values(student.scores).reduce((a, b) => a + b, 0) / 4;
                const avgProgress = Object.values(student.completedChapters).reduce((acc, chapters, index) => {
                  const totalChapters = Object.values(student.totalChapters)[index];
                  return acc + (chapters / totalChapters) * 100;
                }, 0) / 4;
                
                return (
                  <div key={student.id} className="border rounded-lg p-4 hover-elevate">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{student.name}</h3>
                          <Badge variant={avgScore >= 80 ? "default" : avgScore >= 60 ? "secondary" : "destructive"}>
                            {Math.round(avgScore)}% avg
                          </Badge>
                          {student.weakAreas.length > 0 && (
                            <Badge variant="outline" className="text-orange-600">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Needs attention
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last active: {student.lastActive}
                        </div>
                        {student.weakAreas.length > 0 && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Weak areas: </span>
                            <span className="text-orange-600">{student.weakAreas.join(", ")}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 min-w-48">
                        <div className="flex justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{Math.round(avgProgress)}%</span>
                        </div>
                        <Progress value={avgProgress} className="h-2" />
                        <div className="grid grid-cols-4 gap-1 text-xs">
                          {Object.entries(student.completedChapters).map(([subject, completed]) => (
                            <div key={subject} className="text-center">
                              <div className="font-medium">{subject.charAt(0).toUpperCase()}</div>
                              <div className="text-muted-foreground">
                                {completed}/{student.totalChapters[subject]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}