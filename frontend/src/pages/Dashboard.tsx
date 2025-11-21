import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Cloud, Leaf, ShoppingBag, LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI Crop Advisor',
      description: 'Get intelligent crop recommendations based on weather and soil',
      icon: Brain,
      onClick: () => navigate('/crop-advisor'),
    },
    {
      title: 'Disease Detection',
      description: 'Identify crop diseases using AI-powered image analysis',
      icon: Leaf,
      onClick: () => navigate('/disease-detection'),
    },
    {
      title: 'Marketplace',
      description: 'Buy seeds, fertilizers, and farm equipment',
      icon: ShoppingBag,
      onClick: () => navigate('/marketplace'),
    },
    {
      title: 'Weather Forecast',
      description: 'Get accurate weather predictions for your farm',
      icon: Cloud,
      onClick: () => navigate('/weather'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SmartFarmLink</h1>
                <p className="text-sm text-muted-foreground">Farmer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {user?.first_name} {user?.last_name}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.first_name}!
          </h2>
          <p className="text-muted-foreground">
            Access all your farming tools and insights from one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={feature.onClick}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
