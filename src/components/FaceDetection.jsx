import React, { useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startFaceDetection = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    video.srcObject = stream;

    // Cargar los modelos necesarios
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');

    // Detectar caras y emociones
    video.addEventListener('play', async () => {
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }, 100);
    });
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      <canvas ref={canvasRef} />
      <button onClick={startFaceDetection}>Iniciar Detección</button>
    </div>
  );
};

export default FaceDetection;


