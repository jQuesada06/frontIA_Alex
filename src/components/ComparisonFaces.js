import axios from 'axios';
import FormData from 'form-data';

const compareFaces = async (img1, img2) => {
    const apiUrl = 'https://api-us.faceplusplus.com/facepp/v3/compare';
    const apiKey = 'AAD2iArzzePb5a7tJ1wfAn2umGTC6S8w';
    const apiSecret = 'co-wAOhjqCyWVEtoqbqR5jOZzkD1SDzp';

    const formData = new FormData();
    formData.append('api_key', apiKey);
    formData.append('api_secret', apiSecret);
    formData.append('image_url1', img1);
    formData.append('image_file2', img2);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('La solicitud no se completó correctamente.');
        }

        const data = await response.json();
        console.log(data.confidence); 
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};

export { compareFaces };