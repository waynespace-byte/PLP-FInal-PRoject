from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from .models import Diagnosis
from .serializers import DiagnosisSerializer

class CropAdvisorView(APIView):
    def post(self, request):
        soil_ph = request.data.get('soil_ph')
        size_ha = request.data.get('size_ha')
        # Mock rules-based + ML
        recommendations = {"crops": ["maize"], "yield": 5.0, "irrigation": "weekly"}
        return Response(recommendations)

class DiseaseDetectionView(APIView):
    def post(self, request):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'error': 'Image required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            model = tf.keras.models.load_model('ai_models/tf_disease_classifier/sample_weights.h5')
            img = Image.open(io.BytesIO(image_file.read())).resize((224, 224))
            img_array = np.array(img) / 255.0
            prediction = model.predict(np.expand_dims(img_array, axis=0))
            label = np.argmax(prediction)
            confidence = prediction[0][label]
            recommendations = {"pesticide": "Organic Neem Oil", "steps": ["Isolate plant", "Apply spray"]}
            diagnosis = Diagnosis.objects.create(
                farmer=request.user, image_url='', predicted_label=f'Disease {label}',
                confidence=confidence, recommendations=recommendations
            )
            serializer = DiagnosisSerializer(diagnosis)
            return Response(serializer.data)
        except:
            # Mock fallback
            diagnosis = Diagnosis.objects.create(
                farmer=request.user, image_url='', predicted_label='Unknown',
                confidence=0.5, recommendations={'suggestion': 'Consult expert'}
            )
            serializer = DiagnosisSerializer(diagnosis)
            return Response(serializer.data)