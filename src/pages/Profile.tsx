
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, LogIn, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  // Mock user state - in a real app this would come from authentication
  const [user, setUser] = useState<null | { name: string; email: string }>(null);
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  
  // Registration form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const { toast } = useToast();
  
  // Handle login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle registration form input changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle login submission
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Missing information",
        description: "Please fill all the required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Mock login - in a real app this would call an API
    setUser({
      name: "John Doe",
      email: loginForm.email,
    });
    
    toast({
      title: "Logged in successfully!",
      description: "Welcome back to TrashTrack Treasure Trove.",
    });
  };
  
  // Handle registration submission
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      toast({
        title: "Missing information",
        description: "Please fill all the required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // Mock registration - in a real app this would call an API
    setUser({
      name: registerForm.name,
      email: registerForm.email,
    });
    
    toast({
      title: "Registration successful!",
      description: "Welcome to TrashTrack Treasure Trove.",
    });
  };
  
  // Handle logout
  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Logged out successfully",
    });
  };
  
  // If user is logged in, show profile
  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback className="bg-eco-green text-white text-xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="mt-6 w-full">
                      <Button onClick={handleLogout} variant="outline" className="w-full">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <FileText className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium">First Report</p>
                        <p className="text-xs text-gray-500">Submitted your first waste report</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-eco-green-light p-2 rounded-full mr-3">
                        <User className="h-4 w-4 text-eco-green" />
                      </div>
                      <div>
                        <p className="font-medium">Early Adopter</p>
                        <p className="text-xs text-gray-500">Joined the platform in its early stages</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                    </div>
                    <Button className="bg-eco-green hover:bg-eco-green/90">
                      Update Profile
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Activity Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <span className="block text-2xl font-bold">12</span>
                      <span className="text-sm text-gray-500">Waste Images</span>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <span className="block text-2xl font-bold">8</span>
                      <span className="text-sm text-gray-500">Reports</span>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <span className="block text-2xl font-bold">235</span>
                      <span className="text-sm text-gray-500">Eco-Coins</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <footer className="bg-white py-6">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>© 2025 TrashTrack Treasure Trove. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // If user is not logged in, show login/register forms
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <LogIn className="h-12 w-12 mx-auto text-eco-green mb-2" />
            <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
            <p className="text-gray-600">Sign in to access your profile and track your eco-coins</p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs text-eco-green hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-eco-green hover:bg-eco-green/90">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input
                        id="register-name"
                        name="name"
                        value={registerForm.name}
                        onChange={handleRegisterChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="register-confirm-password">Confirm Password</Label>
                      <Input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-eco-green hover:bg-eco-green/90">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
      
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 TrashTrack Treasure Trove. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
