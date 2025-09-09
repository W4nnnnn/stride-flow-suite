import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Sun, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(credentials.username, credentials.password);
    
    if (!success) {
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: "Username atau password tidak valid.",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="w-10 h-10"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <Card className="w-full max-w-md panel-glass">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent-mint rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent-mint rounded-full" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Extreme Productivity</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Masuk ke sistem manajemen produktivitas
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
                className="h-11"
              />
            </div>

            <div className="bg-accent-amber/10 border border-accent-amber/20 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-accent-amber flex-shrink-0 mt-0.5" />
              <div className="text-sm text-accent-amber">
                <strong>Demo Login:</strong><br />
                Username: admin<br />
                Password: admin123
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-primary to-accent-mint hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? 'Memuat...' : 'Masuk'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;