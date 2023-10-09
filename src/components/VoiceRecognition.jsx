import React, { useState } from 'react';
import { startListening } from './Startlisteng';

function VoiceRecognition() {
  const [result, setResult] = useState('');


  const startNexo = () => {
    startListening(5) // Escucha durante 10 segundos
      .then((result) => {
        console.log('Texto escuchado:', result);
        setResult(result)
        if (result.includes('predict') && result.includes('price') && result.includes('avocado')) {
          // Realizar la acción deseada cuando se reconoce el comando
          console.log("Comando reconocido: 'Predict Price Avocado'");
          // Puedes ejecutar una función específica o mostrar un mensaje
          // Aquí puedes agregar más lógica según tu necesidad
        }else {
          
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  const predicPriceAvocado = () => {

  }

  return (
    <div>
      <button onClick={startNexo}>Iniciar Escucha</button>
      <p>Texto escuchado: {result}</p>
    </div>
  );
}

export default VoiceRecognition;