import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function ImageCapture({ setImage, setImageUrl }) {
  const [open, setOpen] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    if (mediaStream) {
      if (!cameraActive) {
        // Si la cámara está inactiva pero aún hay una transmisión de video, detenemos la transmisión.
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
        setMediaStream(null);
      }
    }
  }, [cameraActive, mediaStream]);

  const openCamera = () => {
    setCameraActive(true);
    setOpen(true);
    const constraints = {
      video: { facingMode: 'environment' },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const videoElement = document.getElementById('camera-video');
        videoElement.srcObject = stream;
        videoElement.play();
        setMediaStream(stream);
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
        setOpen(false);
        setCameraActive(false);
      });
  };

  const takePhoto = () => {
    const videoElement = document.getElementById('camera-video');
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convierte la imagen a un objeto Blob
    canvas.toBlob((blob) => {
      // Crea un objeto File a partir del Blob
      const file = new File([blob], 'captured_image.png', { type: 'image/png' }); // Cambia 'image/jpeg' según el formato que desees

      setImageDataUrl(URL.createObjectURL(blob));
      setImageUrl(URL.createObjectURL(blob));
      setImage(file);
      setOpen(false);
      setCameraActive(false); // Detenemos la cámara al tomar la foto.
    }, 'image/png'); // Cambia 'image/jpeg' según el formato que desees
  };

  const handleClose = () => {
    setOpen(false);
    setCameraActive(false); // Detenemos la cámara al cerrar el diálogo.
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={openCamera}>
        {imageDataUrl ? "Change photo" : "Open camera"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Take a picture</DialogTitle>
        <DialogContent>
          <video
            id="camera-video"
            autoPlay
            playsInline
            muted
            style={{ width: '100%', maxWidth: '400px' }}
          ></video>
        </DialogContent>
        <DialogActions>
          <Button onClick={takePhoto} variant="contained" color="primary">
            Take photo
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ImageCapture;