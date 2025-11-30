import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Thermometer, Droplets, Wind, Tractor } from 'lucide-react';
import { aiAPI, farmAPI } from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
}

interface Farm {
  id: string;
  name: string;
  location: string;
  size: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [farms, setFarms] = useState<Farm[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access');  // Add: Check for token
      if (!token) {
        navigate('/auth');  // Add: Redirect if no token
        return;
      }
      try {
        const [weatherResponse, farmsResponse] = await Promise.all([
          aiAPI.getWeather('Nairobi'),  // Default location
          farmAPI.getFarms(),
        ]);
        setWeatherData(weatherResponse.data.weather as WeatherData);
        setFarms(farmsResponse.data as Farm[]);
      } catch (error: unknown) {
        if ((error as any).response?.status === 401) {
          navigate('/auth');  // Add: Redirect on token expiry
        }
        const errorMessage = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail || 'Failed to load dashboard data';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weatherData && (
          <>
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
          </>
        )}

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Tractor className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Total Farms</p>
                <p className="text-2xl font-bold">{farms?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {farms && farms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Farms</CardTitle>
            <CardDescription>Manage your farm locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farms.map((farm: Farm) => (
                <div key={farm.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{farm.name}</h3>
                    <p className="text-sm text-muted-foreground">{farm.location} - {farm.size} acres</p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crop Advisor</CardTitle>
            <CardDescription>Get personalized crop recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Go to Crop Advisor</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disease Detection</CardTitle>
            <CardDescription>Upload images to detect plant diseases</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Go to Disease Detection</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketplace</CardTitle>
            <CardDescription>Buy and sell agricultural products</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Go to Marketplace</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;