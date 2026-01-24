"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  User, Mail, Lock, Phone, Calendar as CalendarIcon, 
  Upload, ArrowLeft, ArrowRight, Check, Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SignupData } from "@/services/types/auth";


export default function Signup() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    dob: "",
    email: "",
    phone: "",
    username: "",
    avatar: "",
    interests: [],
    password: ""
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  const interestsOptions = ["Dating", "Food", "Extrovert", "Travel", "Music", "Tech"];

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleFinalSubmit = async () => {
    try {
      await signup(formData);
      // Success toast is handled by our Global API Interceptor
    } catch (err) {
      // Local error handling if needed
    }
  };

  const updateField = (field: keyof SignupData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* 🟢 Interactive Progress Header */}
      <div className="w-full max-w-md mb-8 text-center space-y-4">
        <h1 className="text-3xl font-black tracking-tighter">JOIN PLATFORM<span className="text-primary">.</span></h1>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span>Step {step}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      <Card className="w-full max-w-md border-border bg-background/50 backdrop-blur-xl shadow-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            
            {/* STEP 1: Personal */}
            {step === 1 && (
              <div className="space-y-6">
                <HeaderSection icon={<User size={20}/>} title="Personal Basics" />
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label className="font-bold">Full Name</Label>
                    <Input 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="font-bold">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start font-normal rounded-xl">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dob ? format(new Date(formData.dob), "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0"><Calendar mode="single" onSelect={(d) => updateField("dob", d?.toISOString())} /></PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Contact */}
            {step === 2 && (
              <div className="space-y-6">
                <HeaderSection icon={<Mail size={20}/>} title="Contact Details" />
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label className="font-bold">Email Address</Label>
                    <Input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label className="font-bold">Phone Number</Label>
                    <Input type="tel" placeholder="+1 234 567 890" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Identity */}
            {step === 3 && (
              <div className="space-y-6">
                <HeaderSection icon={<Sparkles size={20}/>} title="Account Identity" />
                <div className="flex flex-col items-center gap-4 py-2">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={formData.avatar} />
                    <AvatarFallback className="text-2xl font-bold">{formData.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <Input type="file" className="hidden" id="avatar-up" onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => updateField("avatar", reader.result);
                    if(e.target.files?.[0]) reader.readAsDataURL(e.target.files[0]);
                  }} />
                  <Button variant="link" onClick={() => document.getElementById('avatar-up')?.click()}>Change Photo</Button>
                </div>
                <div className="grid gap-2">
                  <Label className="font-bold">Username</Label>
                  <Input placeholder="johndoe123" value={formData.username} onChange={(e) => updateField("username", e.target.value)} />
                </div>
              </div>
            )}

            {/* STEP 4: Interests & Password */}
            {step === 4 && (
              <div className="space-y-6">
                <HeaderSection icon={<Lock size={20}/>} title="Final Touch" />
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label className="font-bold text-xs uppercase text-muted-foreground">Select Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      {interestsOptions.map(opt => (
                        <Badge 
                          key={opt}
                          variant={formData.interests.includes(opt) ? "default" : "outline"}
                          className="cursor-pointer px-3 py-1 text-sm rounded-full"
                          onClick={() => {
                            const exists = formData.interests.includes(opt);
                            updateField("interests", exists ? formData.interests.filter(i => i !== opt) : [...formData.interests, opt]);
                          }}
                        >
                          {opt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="font-bold">Create Password</Label>
                    <Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-10">
            {step > 1 && (
              <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            <Button 
              className="flex-[2] h-12 rounded-xl font-bold shadow-lg shadow-primary/20" 
              onClick={step === totalSteps ? handleFinalSubmit : handleNext}
              disabled={isLoading}
            >
              {step === totalSteps ? (
                isLoading ? "Creating..." : "Complete Signup"
              ) : (
                <>Next Step <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground">
        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
      </p>
    </div>
  );
}

function HeaderSection({ icon, title }: { icon: any, title: string }) {
  return (
    <div className="flex items-center gap-3 pb-2 border-b border-border/50">
      <div className="p-2 bg-primary/10 text-primary rounded-lg">{icon}</div>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
    </div>
  );
}