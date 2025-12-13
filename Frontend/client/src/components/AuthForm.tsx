import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

interface AuthFormProps {
  onAuthSuccess?: (userType: 'student' | 'teacher', userData: any) => void;
}

export default function AuthForm({ onAuthSuccess = () => {} }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    grade: "",
    school: "",
    rollNo: "",
    subjects: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${activeTab} submitted:`, { userType, ...formData });
    
    // Mock successful auth
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      type: userType,
      name: formData.name || "Demo User",
      email: formData.email || "demo@example.com",
      ...(userType === 'student' ? {
        grade: formData.grade || "6",
        school: formData.school || "Demo School"
      } : {
        rollNo: formData.rollNo || "T001",
        subjects: formData.subjects || "Mathematics, Science"
      })
    };
    
    onAuthSuccess(userType, userData);
  };

  const grades = Array.from({ length: 7 }, (_, i) => (i + 6).toString());

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-primary">Sankalp EduPlay</h1>
          <p className="text-muted-foreground">Interactive STEM Learning Platform</p>
          <div className="flex justify-center">
            <LanguageSelector />
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <div className="flex gap-2 justify-center">
              <Button
                variant={userType === 'student' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUserType('student')}
                className="gap-2"
                data-testid="button-student-type"
              >
                <GraduationCap className="h-4 w-4" />
                Student
              </Button>
              <Button
                variant={userType === 'teacher' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUserType('teacher')}
                className="gap-2"
                data-testid="button-teacher-type"
              >
                <Users className="h-4 w-4" />
                Teacher
              </Button>
            </div>
            
            <div className="text-center">
              <CardTitle>Welcome {userType === 'student' ? 'Student' : 'Teacher'}!</CardTitle>
              <CardDescription>
                {userType === 'student' 
                  ? 'Access interactive STEM learning modules'
                  : 'Monitor student progress and analytics'
                }
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
                <TabsTrigger value="register" data-testid="tab-register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      data-testid="input-password"
                    />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-login">
                    Login as {userType}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      data-testid="input-name"
                    />
                  </div>
                  
                  {userType === 'student' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="grade">Class/Grade</Label>
                        <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                          <SelectTrigger data-testid="select-grade">
                            <SelectValue placeholder="Select your class" />
                          </SelectTrigger>
                          <SelectContent>
                            {grades.map(grade => (
                              <SelectItem key={grade} value={grade}>Class {grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="school">School Name</Label>
                        <Input
                          id="school"
                          placeholder="Your school name"
                          value={formData.school}
                          onChange={(e) => handleInputChange('school', e.target.value)}
                          data-testid="input-school"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="rollNo">Teacher Roll No.</Label>
                        <Input
                          id="rollNo"
                          placeholder="T001"
                          value={formData.rollNo}
                          onChange={(e) => handleInputChange('rollNo', e.target.value)}
                          data-testid="input-roll-no"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subjects">Subjects Taught</Label>
                        <Input
                          id="subjects"
                          placeholder="Mathematics, Science, etc."
                          value={formData.subjects}
                          onChange={(e) => handleInputChange('subjects', e.target.value)}
                          data-testid="input-subjects"
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      data-testid="input-reg-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      data-testid="input-reg-password"
                    />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-register">
                    Register as {userType}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}