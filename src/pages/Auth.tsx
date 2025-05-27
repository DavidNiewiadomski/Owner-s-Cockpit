
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Building2, Wrench, HardHat, Shield, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the confirmation link!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 border-2 border-orange-500/30 rotate-45 rounded-lg"></div>
        </div>
        <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <HardHat className="w-16 h-16 text-orange-400/20" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: '2s' }}>
          <Wrench className="w-12 h-12 text-blue-400/20 rotate-45" />
        </div>
        <div className="absolute bottom-20 right-32 animate-float" style={{ animationDelay: '0.5s' }}>
          <Shield className="w-14 h-14 text-green-400/20" />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/30 blur-lg rounded-full"></div>
                <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-2xl">
                  <Building2 className="h-12 w-12 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                  Owner's Cockpit
                </h1>
                <p className="text-xl text-gray-300 font-medium">Construction Management Platform</p>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-orange-400" />
                <span>Real-time project monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Advanced security & compliance</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-blue-400" />
                <span>Complete project lifecycle management</span>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-orange-400">500+</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-blue-400">98%</div>
              <div className="text-sm text-gray-400">On Time</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-green-400">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="lg:hidden flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500/30 blur-lg rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 lg:hidden">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                  Owner's Cockpit
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Construction Management Platform
                </CardDescription>
              </div>
              <div className="hidden lg:block">
                <CardTitle className="text-2xl font-bold text-white">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Sign in to your account to continue
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
                  <TabsTrigger 
                    value="signin" 
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 font-medium transition-all"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 font-medium transition-all"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-4 mt-6">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-white font-medium">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 h-11 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-white font-medium">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 h-11 backdrop-blur-sm"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold h-11 shadow-lg hover:shadow-xl transition-all duration-200 border-0" 
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white font-medium">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 h-11 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-white font-medium">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 h-11 backdrop-blur-sm"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold h-11 shadow-lg hover:shadow-xl transition-all duration-200 border-0" 
                      disabled={loading}
                    >
                      {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {error && (
                <Alert variant="destructive" className="bg-red-500/20 border-red-500/30 backdrop-blur-sm">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              {message && (
                <Alert className="bg-green-500/20 border-green-500/30 backdrop-blur-sm">
                  <AlertDescription className="text-green-200">{message}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
