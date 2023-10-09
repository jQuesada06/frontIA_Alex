const startListening = (timeoutInSeconds) => {
    const recognition = new webkitSpeechRecognition();
  
    return new Promise((resolve, reject) => {
      recognition.lang = 'en-US'; // Establece el idioma en inglés
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };
  
      recognition.onerror = (event) => {
        reject(event.error);
      };
  
      recognition.onend = () => {
        reject('No se detectaron resultados de voz.');
      };
  
      recognition.start();
  
      setTimeout(() => {
        recognition.stop();
        reject('La escucha de voz ha sido detenida debido al tiempo de espera.');
      }, timeoutInSeconds * 1000); // Convierte segundos a milisegundos
  
      // También puedes detener la escucha manualmente llamando a `recognition.stop()`
    });
  }

export {startListening}