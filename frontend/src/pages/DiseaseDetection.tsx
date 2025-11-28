import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Leaf, Loader2, Upload } from 'lucide-react';
import { aiAPI } from '@/services/api';  // Use updated api.ts
import { toast } from '@/hooks/use-toast';

interface DiagnosisResult {
  disease_name?: string;
  disease?: string;
  description: string;
  symptoms: string;
  treatment: string;
  prevention: string;
  confidence?: number;
}

const DiseaseDetection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDiagnosis(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast({
        title: 'No Image Selected',
        description: 'Please select an image to analyze',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await aiAPI.diseaseDetection(formData);  // Matches backend /ai/disease-detection/
      setDiagnosis(response.data as DiagnosisResult);
      toast({
        title: 'Analysis Complete',
        description: 'Disease detection results are ready',
      });
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail || 'Failed to analyze image';
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
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Disease Detection</h1>
              <p className="text-muted-foreground">AI-powered crop disease identification</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Plant Image</CardTitle>
              <CardDescription>Take a clear photo of the affected plant part</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Plant preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedImage(null);
                        setPreviewUrl(null);
                        setDiagnosis(null);
                      }}
                    >
                      Choose Different Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-primary hover:underline">Click to upload</span>
                        <span className="text-muted-foreground"> or drag and drop</span>
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={!selectedImage || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Detect Disease'
                )}
              </Button>
            </CardContent>
          </Card>

          {diagnosis && (
            <Card>
              <CardHeader>
                <CardTitle>Disease Detection Result</CardTitle>
                <CardDescription>AI analysis of the uploaded image</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{diagnosis.disease_name || diagnosis.disease}</h3>  // Fixed: Now typed, no underline
                  <p className="text-sm text-muted-foreground mb-2">{diagnosis.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Symptoms:</h4>
                      <p className="text-sm text-muted-foreground">{diagnosis.symptoms}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Recommended Treatment:</h4>
                      <p className="text-sm text-muted-foreground">{diagnosis.treatment}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Prevention:</h4>
                      <p className="text-sm text-muted-foreground">{diagnosis.prevention}</p>
                    </div>

                    {diagnosis.confidence && (
                      <div>
                        <h4 className="font-medium mb-1">Confidence:</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-background rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${diagnosis.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{diagnosis.confidence}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default DiseaseDetection;