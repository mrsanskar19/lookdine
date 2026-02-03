<<<<<<< HEAD
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
=======
import { Link, useNavigate, useLocation } from "react-router-dom";
>>>>>>> 094e5ef (Updated project code)
=======
import { Link, useNavigate, useLocation } from "react-router-dom";
>>>>>>> 0895931 (Initial project setup)
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  identifier: z.string().min(1, "Username or Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const location = useLocation();
>>>>>>> 094e5ef (Updated project code)
=======
  const location = useLocation();
>>>>>>> 0895931 (Initial project setup)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      // Logic: Determine if input is email or username
      const payload = {
        [values.identifier.includes("@") ? "email" : "username"]: values.identifier,
        password: values.password,
      };

      await login(payload as any);
<<<<<<< HEAD
<<<<<<< HEAD
      toast({ title: "Welcome back!", description: "Redirecting to your dashboard..." });
      navigate("/");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
=======
=======
>>>>>>> 0895931 (Initial project setup)
      toast({ title: "Welcome back!", description: "Login successful!" });
      
      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || "/profile";
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({ 
        variant: "destructive", 
        title: "Login Failed", 
        description: error.message || "Invalid credentials. Please try again." 
      });
<<<<<<< HEAD
>>>>>>> 094e5ef (Updated project code)
=======
>>>>>>> 0895931 (Initial project setup)
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground animate-in fade-in duration-500">
      
      {/* 🟢 Interactive Left Side: Hero */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-primary">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692"
          alt="Auth Hero"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 scale-105 hover:scale-100 transition-transform duration-1000"
        />
        <div className="relative z-10 flex flex-col justify-center p-16 text-white">
          <h1 className="text-6xl font-black tracking-tighter mb-4">PLATFORM<span className="text-accent">.</span></h1>
          <p className="text-lg opacity-80 max-w-md">Manage your hotels and users with our high-clarity dashboard interface.</p>
        </div>
        <div className="absolute bottom-10 left-16 z-10 text-xs opacity-50 text-white">
          © 2026 YourBrand. Powered by CTO Systems.
        </div>
      </div>

      {/* 🔵 Right Side: Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-[400px] space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">Sign In</h2>
              <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Username or Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. admin or admin@example.com" 
                          className="h-12 rounded-xl focus:ring-primary shadow-sm"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-bold">Password</FormLabel>
                        <Link to="/forgot-password" handle-redirect="true" className="text-xs font-semibold text-primary hover:underline">Forgot?</Link>
                      </div>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="h-12 rounded-xl shadow-sm"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl text-md font-bold transition-all active:scale-[0.98]" 
                  disabled={isLoading}
                >
                  {isLoading ? <span className="flex gap-2 items-center"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Authenticating</span> : "Continue"}
                </Button>
              </form>
            </Form>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                New to us?
              </span>
            </div>

            <Button variant="outline" asChild className="w-full h-12 rounded-xl border-2 font-bold hover:bg-accent transition-colors">
              <Link to="/signup">Create an Account</Link>
            </Button>
          </div>
        </div>

        {/* 🏢 Bottom Links */}
        <footer className="p-8 border-t bg-muted/30">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/policy" className="hover:text-primary transition-colors">Policy</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}