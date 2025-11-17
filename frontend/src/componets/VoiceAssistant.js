import React, { useState } from 'react';
import api from '../services/api';

const VoiceAssistant = () => {
  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        const formData = new FormData();
        formData.append('audio', e.data);
        api.post('/voice/', formData).then((res) => alert('Response: ' + res.data.transcript));
      };
      recorder.start();
      setRecording(true);
      setTimeout(() => {
        recorder.stop();
        setRecording(false);
      }, 5000);
    } catch (error) {
      alert('Microphone access denied');
    }
  };

  return (
    <button onClick={startRecording} disabled={recording} className="bg-red-500 text-white p-2 rounded">
      {recording ? 'Recording...' : 'Voice Query'}
    </button>
  );
};

export default VoiceAssistant;