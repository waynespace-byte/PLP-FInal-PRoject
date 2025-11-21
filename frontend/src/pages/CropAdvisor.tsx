import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Brain, Loader2 } from 'lucide-react';
import api from '@/services/api';
import { toast } from '@/hooks/use-toast';

const CropAdvisor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    location: '',
    soil_ph: '',
    rainfall: '',
    temperature: '',
    farm_size: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/ai/crop-recommendation/', formData);
      setRecommendation(response.data);
      toast({
        title: 'Success',
        description: 'Crop recommendation generated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to get recommendation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Crop Advisor</h1>
              <p className="text-muted-foreground">Get intelligent crop recommendations</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Farm Details</CardTitle>
              <CardDescription>Enter your farm information for personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Nairobi, Kenya"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soil-ph">Soil pH</Label>
                  <Input
                    id="soil-ph"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    placeholder="e.g., 6.5"
                    value={formData.soil_ph}
                    onChange={(e) => setFormData({ ...formData, soil_ph: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rainfall">Average Rainfall (mm/year)</Label>
                  <Input
                    id="rainfall"
                    type="number"
                    placeholder="e.g., 1000"
                    value={formData.rainfall}
                    onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Average Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="e.g., 25"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm-size">Farm Size (acres)</Label>
                  <Input
                    id="farm-size"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.farm_size}
                    onChange={(e) => setFormData({ ...formData, farm_size: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Recommendation'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {recommendation && (
            <Card>
              <CardHeader>
                <CardTitle>Recommended Crops</CardTitle>
                <CardDescription>Based on your farm conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendation.crops?.map((crop: any, index: number) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{crop.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{crop.description}</p>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Expected Yield:</span> {crop.yield}</p>
                      <p><span className="font-medium">Best Season:</span> {crop.season}</p>
                      <p><span className="font-medium">Market Price:</span> {crop.price}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default CropAdvisor;
