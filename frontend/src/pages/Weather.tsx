import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Cloud, Loader2, Sun, CloudRain, Wind, Droplets } from 'lucide-react';
import api from '@/services/api';
import { toast } from '@/hooks/use-toast';

const Weather = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const handleFetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.get(`/ai/weather-forecast/?location=${location}`);
      setWeatherData(response.data);
      toast({
        title: 'Success',
        description: 'Weather forecast loaded successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to fetch weather data',
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
              <Cloud className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Weather Forecast</h1>
              <p className="text-muted-foreground">Get accurate weather predictions for your farm</p>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Location</CardTitle>
            <CardDescription>Get weather forecast for your farm location</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFetchWeather} className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="e.g., Nairobi, Kenya"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Get Forecast'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {weatherData && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Weather</CardTitle>
                <CardDescription>{weatherData.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="h-5 w-5 text-warning" />
                      <span className="text-sm text-muted-foreground">Temperature</span>
                    </div>
                    <p className="text-2xl font-bold">{weatherData.current?.temperature}°C</p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-5 w-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Humidity</span>
                    </div>
                    <p className="text-2xl font-bold">{weatherData.current?.humidity}%</p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="h-5 w-5 text-accent" />
                      <span className="text-sm text-muted-foreground">Wind Speed</span>
                    </div>
                    <p className="text-2xl font-bold">{weatherData.current?.wind_speed} km/h</p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CloudRain className="h-5 w-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Rainfall</span>
                    </div>
                    <p className="text-2xl font-bold">{weatherData.current?.rainfall || 0} mm</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7-Day Forecast</CardTitle>
                <CardDescription>Weather predictions for the next week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weatherData.forecast?.map((day: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <Cloud className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium">{day.date}</p>
                          <p className="text-sm text-muted-foreground">{day.condition}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{day.max_temp}° / {day.min_temp}°</p>
                        <p className="text-sm text-muted-foreground">
                          {day.rainfall > 0 ? `${day.rainfall}mm rain` : 'No rain'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {weatherData.recommendation && (
              <Card>
                <CardHeader>
                  <CardTitle>Farming Recommendation</CardTitle>
                  <CardDescription>Based on weather forecast</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-foreground">{weatherData.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Weather;
