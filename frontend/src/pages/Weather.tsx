import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Cloud, Thermometer, Droplets, Wind } from 'lucide-react'; 
import { aiAPI } from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  rainfall: number;
  forecast: Array<{
    date: string;
    temperature: number;
    rainfall: number;
  }>;
}

interface Recommendation {
  crops: Array<{
    name: string;
    suitability: string;
  }>;
}

const Weather = () => {
  const [location, setLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    if (!location.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a location',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await aiAPI.getWeather('Nairobi');  // Matches backend /ai/weather/?location=
      setWeatherData(response.data.weather as WeatherData);
      setRecommendation(response.data.recommendation as Recommendation);
      toast({
        title: 'Success',
        description: 'Weather data fetched successfully',
      });
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail || 'Failed to fetch weather';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Weather & Crop Recommendations
          </CardTitle>
          <CardDescription>Get weather data and crop recommendations for your location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter location (e.g., Nairobi)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button onClick={fetchWeather} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Weather'}
            </Button>
          </div>

          {weatherData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Temperature</p>
                      <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Humidity</p>
                      <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Wind Speed</p>
                      <p className="text-2xl font-bold">{weatherData.wind_speed} km/h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Rainfall</p>
                      <p className="text-2xl font-bold">{weatherData.rainfall} mm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {recommendation && (
            <Card>
              <CardHeader>
                <CardTitle>Crop Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recommendation.crops?.map((crop: { name: string; suitability: string }, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <span className="font-medium">{crop.name}</span>
                      <span className={`px-2 py-1 rounded text-sm ${crop.suitability === 'High' ? 'bg-green-100 text-green-800' : crop.suitability === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {crop.suitability}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {weatherData?.forecast && (
            <Card>
              <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weatherData.forecast.map((day: { date: string; temperature: number; rainfall: number }, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <span>{day.date}</span>
                      <span>{day.temperature}°C</span>
                      <span>{day.rainfall} mm</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Weather;