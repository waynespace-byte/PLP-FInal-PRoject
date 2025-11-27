import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, Brain, ShoppingBag, Cloud, TrendingUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SmartFarmLink</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Login
              </Button>
              <Button onClick={() => navigate('/auth')}>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Empowering Farmers with{' '}
              <span className="text-primary">Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered farming insights, weather predictions, disease detection,
              and market access - all in one platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/auth')}>
                Start Farming Smarter
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI Crop Advisor',
                description: 'Get intelligent crop recommendations based on soil, weather, and market conditions',
              },
              {
                icon: Leaf,
                title: 'Disease Detection',
                description: 'Identify crop diseases instantly using AI-powered image analysis',
              },
              {
                icon: ShoppingBag,
                title: 'Marketplace',
                description: 'Access quality seeds, fertilizers, and farm equipment with M-Pesa payments',
              },
              {
                icon: Cloud,
                title: 'Weather Forecast',
                description: 'Accurate weather predictions to plan your farming activities',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of farmers already using SmartFarmLink to increase
              productivity and profitability
            </p>
            <Button size="lg" onClick={() => navigate('/auth')}>
              Create Your Account
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 SmartFarmLink. Empowering African Farmers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;