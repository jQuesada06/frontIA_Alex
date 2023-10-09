import React, { useState } from 'react';
import { TextField, Button, Paper, Grid, Avatar, Alert } from '@mui/material';
import ImageCapture from '../../components/CameraCapture';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from '../../firebase/config';
import { collection, addDoc, query, where, getDocs } from "@firebase/firestore";
import { toast } from "react-toastify";
import SpinnerOverlay from '../../components/Spinner';
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadImage = async () => {
    if (!photo) {
      toast.error("Select a file first", {
        autoClose: 3000,
      });
      return;
    }
    const timestamp = new Date().getTime(); // Obtiene la marca de tiempo actual en milisegundos
    const imageName = `${timestamp}_${email}`;
    const ebooksRef = ref(storage, `users/${imageName}`)
    try {
      await uploadBytes(ebooksRef, photo);

      // Obtiene la URL de descarga del archivo subido
      const downloadURL = await getDownloadURL(ebooksRef);
      return downloadURL;
    } catch (error) {
      toast.error("Error loading image", {
        autoClose: 3000,
      });
    }
  };

  const handleRegister = async () => {

    setLoading(true)
    const q = query(collection(db, "users"), where("email", "==", email));
    const user = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const userData = doc.data()
      user.push(userData);
    });

    const collectionRef = collection(db, "users");

    if (user.length === 0) {
      try {
        const url = await uploadImage();

        const user = {
          email: email,
          password: password,
          urlPhoto: url
        };
        await addDoc(collectionRef, user);
        toast.success("Registered Successfully", {
          autoClose: 3000,
        });
        navigate("/");
        return;
      } catch (error) {
        console.log(error)
        toast.error("There was an error adding", {
          autoClose: 3000,
        });
      }
    }
    else {
      toast.error("User already exists", {
        autoClose: 3000,
      });
      setLoading(false)
      return
    };
    setLoading(false)
    clearFields();
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setPhotoDataUrl(null);
    setPhoto(null);
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      {loading && <SpinnerOverlay />}
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px' }}>
        <Grid container style={{ display: 'flex', gap: '30px', flexDirection: 'row', alignItems: "center", justifyContent: "center" }} >
          <Avatar alt="User Photo" src={photoDataUrl} sx={{ width: 150, height: 150, marginBottom: 2 }} />
          <ImageCapture setImage={setPhoto} setImageUrl={setPhotoDataUrl}></ImageCapture>
        </Grid>
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Check in
        </Button>

      </Paper>
    </Grid>
  );
}

export default Register;