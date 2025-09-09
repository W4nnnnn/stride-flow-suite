import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import ProductivityDashboard from './ProductivityDashboard';

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <ProductivityDashboard />;
};

export default Index;
