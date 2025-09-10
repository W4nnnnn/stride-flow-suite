import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, LogOut, Printer, Menu, X } from 'lucide-react';
import { AppData, Metrics } from '@/types';
import MetricCards from './MetricCards';

interface HeaderProps {
  data: AppData;
  metrics: Metrics;
  onCycleChange: (cycle: string) => void;
  onStartMonthChange: (month: string) => void;
  startMonth: string;
}

const Header: React.FC<HeaderProps> = ({ 
  data, 
  metrics, 
  onCycleChange, 
  onStartMonthChange, 
  startMonth 
}) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cycles = ['Q1-2025', 'Q2-2025', 'Q3-2025', 'Q4-2025', 'Q1-2026'];

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                Extreme Productivity Management
              </h1>
              <Badge variant="outline" className="text-xs w-fit hidden sm:block">
                Berbasis prinsip Andrew Grove
              </Badge>
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Siklus:</span>
                <Select value={data.cycle} onValueChange={onCycleChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cycles.map(cycle => (
                      <SelectItem key={cycle} value={cycle}>
                        {cycle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Input
                type="month"
                value={startMonth}
                onChange={(e) => onStartMonthChange(e.target.value)}
                className="w-40"
                title="Bulan mulai untuk timeline"
              />
              
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Cetak
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden space-y-3 border-t border-border/60 pt-4">
              <Badge variant="outline" className="text-xs w-fit sm:hidden">
                Berbasis prinsip Andrew Grove
              </Badge>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Siklus:</span>
                  <Select value={data.cycle} onValueChange={onCycleChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cycles.map(cycle => (
                        <SelectItem key={cycle} value={cycle}>
                          {cycle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Input
                  type="month"
                  value={startMonth}
                  onChange={(e) => onStartMonthChange(e.target.value)}
                  className="w-full"
                  title="Bulan mulai untuk timeline"
                />
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrint} className="flex-1">
                    <Printer className="h-4 w-4 mr-2" />
                    Cetak
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="flex-1"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {theme === 'dark' ? 'Light' : 'Dark'}
                  </Button>
                  
                  <Button variant="outline" size="sm" onClick={logout} className="flex-1">
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <MetricCards metrics={metrics} />
      </div>
    </header>
  );
};

export default Header;