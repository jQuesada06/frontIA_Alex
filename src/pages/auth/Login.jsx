import React, { useState, CSSProperties } from 'react';
import { TextField, Button, Paper, Grid, Avatar, Alert, Typography } from '@mui/material';
import ImageCapture from '../../components/CameraCapture';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';
import { compareFaces } from '../../components/ComparisonFaces';
import SpinnerOverlay from '../../components/Spinner';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';


function Login({ setLogged }) {
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [loading, setLoading] = useState(false);


    const login = async () => {


        if (!photo) {
            toast.error('Select an image', {
                position: "top-right", // Posición de la notificación (puedes personalizarla)
                autoClose: 3000, // Tiempo en milisegundos para que la notificación se cierre automáticamente (3 segundos en este caso)
            });
            return
        }
        setLoading(true);
        const q = query(collection(db, "users"), where("email", "==", email));
        const user = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const userData = doc.data()
            user.push(userData);
        });

        if (user.length === 0) {
            toast.error('That email does not exist', {
                position: "top-right", // Posición de la notificación (puedes personalizarla)
                autoClose: 3000, // Tiempo en milisegundos para que la notificación se cierre automáticamente (3 segundos en este caso)
            });
        }
        else {
            const data = await compareFaces(user[0].urlPhoto, photo)
            if (data.confidence > 85) {
                localStorage.setItem("isLogged", "true");
                toast.success('Successfully logged in', {
                    position: "top-right", // Posición de la notificación (puedes personalizarla)
                    autoClose: 3000, // Tiempo en milisegundos para que la notificación se cierre automáticamente (3 segundos en este caso)
                });
                setLogged(true);
                clearFields();
            } else {
                toast.error('Invalid biometrics', {
                    position: "top-right", // Posición de la notificación (puedes personalizarla)
                    autoClose: 3000, // Tiempo en milisegundos para que la notificación se cierre automáticamente (3 segundos en este caso)
                });

            }
            console.log(data)
            console.log(data.confidence)
        }
        setLoading(false)
    }

    const clearFields = () => {
        setEmail("");
        setPhotoUrl(null);
        setPhoto(null);
    }

    const handleRegister = () => {

    }

    return (
        <Grid container style={{ height: '100vh', gap: '20px', justifyContent: "center", alignItems: "center" }}>
            {loading && <SpinnerOverlay />}
            <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', padding: '20px', width: '400px', maxWidth: '600px', maxHeight: '400px', alignItems: "center", justifyContent: "center" }} >
                <Grid container style={{ display: 'flex', gap: '30px', flexDirection: 'row', alignItems: "center", justifyContent: "center" }} >
                    <Avatar alt="User Photo" src={photoUrl} sx={{ width: 150, height: 150, marginBottom: 2 }} />
                    <ImageCapture setImage={setPhoto} setImageUrl={setPhotoUrl} ></ImageCapture>
                </Grid>
                <TextField
                    label="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={login} >
                    Analyze
                </Button>
                <p>
                    You do not have an account? <NavLink to="/register">Check in</NavLink>
                </p>
            </Paper>
        </Grid>
    );
};

export default Login;