import React, { useState, useEffect } from 'react';
import axios from 'axios';
import wordsToNumbers from 'words-to-numbers';
import './VoiceAssistant.css';


function VoiceAssistant() {
  const [assistantMessage, setAssistantMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const model = async () => {
    let studyTime = null;
    let attendance = null;
    let askingForAttendance = false;
  
    const startRecognition = () => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true; // Enable interim results
  
      recognition.onstart = () => {
        console.log('Voice recognition started');
        if (!askingForAttendance) {
          setAssistantMessage('Tell me the study time.');
        } else {
          setAssistantMessage('Tell me the attendance.');
        }
      };
  
      recognition.onresult = async (event) => {
        const interimTranscript = event.results[0][0].transcript.toLowerCase();
        const finalTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('')
          .toLowerCase();
  
        const number = wordsToNumbers(finalTranscript, { fuzzy: true }); // Convert words to numbers
  
        if (number) {
          if (studyTime === null) {
            studyTime = number;
            console.log(studyTime);
            askingForAttendance = true;;
          } else if (attendance === null) {
            attendance = number;
            console.log(attendance);
            askingForAttendance = false;
            recognition.stop();
          }
  
          // Make the POST request when both variables are not null
          if (studyTime !== null && attendance !== null) {
            
            try {
              const response = await axios.post('/predict', {
                Tiempo_de_estudio: studyTime,
                Asistencia: attendance,
              });
  
              // Maneja la respuesta del servidor de forma asíncrona
              console.log(response.data);
              const prediction = response.data.Prediccion;
              console.log(prediction);
              setAssistantMessage(`The prediction is: ${prediction}`);
              
            } catch (error) {
              // Maneja los errores de la solicitud
              console.error('Error:', error);
            }
          }
        }
      };
  
      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
      };
  
      recognition.onend = () => {
        console.log('Voice recognition ended')
        
          // Restart recognition if studyTime is still null
        if (studyTime === null) {
          setTimeout(() => {
            startRecognition();
          }, 1000); // Start recognition again after 1 second
        };
  
        // Restart recognition if asking for attendance
        if (askingForAttendance) {
          setTimeout(() => {
            startRecognition();
          }, 1000 ); // Start recognition again after 1 second
        }
      };
  
      recognition.start();
    };
  
    startRecognition();
  };
  
  


  const bitcoin = async () => {
    let high_value = null;
    let low_value = null;
    let askingForLow = false;
  
    const startRecognition = () => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true; // Enable interim results
  
      recognition.onstart = () => {
        console.log('Voice recognition started');
        if (!askingForLow) {
          setAssistantMessage('Tell me the high value.');
        } else {
          setAssistantMessage('Tell me the low value.');
        }
      };
  
      recognition.onresult = async (event) => {
        const interimTranscript = event.results[0][0].transcript.toLowerCase();
        const finalTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('')
          .toLowerCase();
  
        const number = wordsToNumbers(finalTranscript, { fuzzy: true }); // Convert words to numbers
  
        if (number) {
          if (high_value === null) {
            high_value = number;
            console.log(high_value);
            askingForLow = true;;
          } else if (low_value === null) {
            low_value = number;
            console.log(low_value);
            askingForLow = false;
            recognition.stop();
          }
  
          // Make the POST request when both variables are not null
          if (high_value !== null && low_value !== null) {
            
            try {
              const response = await axios.post('/predictBitcoin', {
                high_value: high_value,
                low_value: low_value,
              });
  
              // Maneja la respuesta del servidor de forma asíncrona
              console.log(response.data);
              const prediction = response.data.Prediccion;
              console.log(prediction);
              setAssistantMessage(`The prediction is: ${prediction}`);
              
              
            } catch (error) {
              // Maneja los errores de la solicitud
              console.error('Error:', error);
            }
          }
        }
      };
  
      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
      };
  
      recognition.onend = () => {
        console.log('Voice recognition ended')
        
          // Restart recognition if studyTime is still null
        if (high_value === null) {
          setTimeout(() => {
            startRecognition();
          }, 1000); // Start recognition again after 1 second
        };
  
        // Restart recognition if asking for attendance
        if (askingForLow) {
          setTimeout(() => {
            startRecognition();
          }, 1000 ); // Start recognition again after 1 second
        }
      };
  
      recognition.start();
    };
  
    startRecognition();
  };
  






  const bodyFat = async () => {
    let Abdomen = null;
    let Chest = null;
    let askingForChest = false;
  
    const startRecognition = () => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true; // Enable interim results
  
      recognition.onstart = () => {
        console.log('Voice recognition started');
        if (!askingForChest) {
          setAssistantMessage('Tell me the abdomen.');
        } else {
          setAssistantMessage('Tell me the chest.');
        }
      };
  
      recognition.onresult = async (event) => {
        const interimTranscript = event.results[0][0].transcript.toLowerCase();
        const finalTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('')
          .toLowerCase();
  
        const number = wordsToNumbers(finalTranscript, { fuzzy: true }); // Convert words to numbers
  
        if (number) {
          if (Abdomen === null) {
            Abdomen = number;
            console.log(Abdomen);
            askingForChest = true;;
          } else if (Chest === null) {
            Chest = number;
            console.log(Chest);
            askingForChest = false;
            recognition.stop();
          }
  
          // Make the POST request when both variables are not null
          if (Abdomen !== null && Chest !== null) {
            
            try {
              const response = await axios.post('/predictBodyFat', {
                Abdomen: Abdomen,
                Chest: Chest,
              });
  
              // Maneja la respuesta del servidor de forma asíncrona
              console.log(response.data);
              const prediction = response.data.Prediccion;
              console.log(prediction);
              setAssistantMessage(`The prediction is: ${prediction}`);
              
              
            } catch (error) {
              // Maneja los errores de la solicitud
              console.error('Error:', error);
            }
          }
        }
      };
  
      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
      };
  
      recognition.onend = () => {
        console.log('Voice recognition ended')
        
          // Restart recognition if studyTime is still null
        if (Abdomen === null) {
          setTimeout(() => {
            startRecognition();
          }, 1000); // Start recognition again after 1 second
        };
  
        // Restart recognition if asking for attendance
        if (askingForChest) {
          setTimeout(() => {
            startRecognition();
          }, 1000 ); // Start recognition again after 1 second
        }
      };
  
      recognition.start();
    };
  
    startRecognition();
  };





  const covid = async () => {
    let Confirmed  = null;
    let Deaths = null;
    let askingForDeaths = false;
  
    const startRecognition = () => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true; // Enable interim results
  
      recognition.onstart = () => {
        console.log('Voice recognition started');
        if (!askingForDeaths) {
          setAssistantMessage('Tell me the confirmed.');
        } else {
          setAssistantMessage('Tell me the deaths.');
        }
      };
  
      recognition.onresult = async (event) => {
        const interimTranscript = event.results[0][0].transcript.toLowerCase();
        const finalTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('')
          .toLowerCase();
  
        const number = wordsToNumbers(finalTranscript, { fuzzy: true }); // Convert words to numbers
  
        if (number) {
          if (Confirmed  === null) {
            Confirmed  = number;
            console.log(Confirmed );
            askingForDeaths = true;;
          } else if (Deaths === null) {
            Deaths = number;
            console.log(Deaths);
            askingForDeaths = false;
            recognition.stop();
          }
  
          // Make the POST request when both variables are not null
          if (Confirmed  !== null && Deaths !== null) {
            
            try {
              const response = await axios.post('/predictCovid', {
                Confirmed : Confirmed ,
                Deaths: Deaths,
              });
  
              // Maneja la respuesta del servidor de forma asíncrona
              console.log(response.data);
              const prediction = response.data.Prediccion;
              console.log(prediction);
              setAssistantMessage(`The prediction is: ${prediction}`);
              
            } catch (error) {
              // Maneja los errores de la solicitud
              console.error('Error:', error);
            }
          }
        }
      };
  
      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
      };
  
      recognition.onend = () => {
        console.log('Voice recognition ended')
        
          // Restart recognition if studyTime is still null
        if (Confirmed  === null) {
          setTimeout(() => {
            startRecognition();
          }, 1000); // Start recognition again after 1 second
        };
  
        // Restart recognition if asking for attendance
        if (askingForDeaths) {
          setTimeout(() => {
            startRecognition();
          }, 1000 ); // Start recognition again after 1 second
        }
      };
  
      recognition.start();
    };
  
    startRecognition();
  };
  





  const automovil = async () => {
    let present_Price  = null;
    let Kms_Driven = null;
    let askingForKmsDriven = false;
  
    const startRecognition = () => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true; // Enable interim results
  
      recognition.onstart = () => {
        console.log('Voice recognition started');
        if (!askingForKmsDriven) {
          setAssistantMessage('Tell me the present price.');
        } else {
          setAssistantMessage('Tell me the Kms driven.');
        }
      };
  
      recognition.onresult = async (event) => {
        const interimTranscript = event.results[0][0].transcript.toLowerCase();
        const finalTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('')
          .toLowerCase();
  
        const number = wordsToNumbers(finalTranscript, { fuzzy: true }); // Convert words to numbers
  
        if (number) {
          if (present_Price  === null) {
            present_Price  = number;
            console.log(present_Price );
            askingForKmsDriven = true;;
          } else if (Kms_Driven === null) {
            Kms_Driven = number;
            console.log(Kms_Driven);
            askingForKmsDriven = false;
            recognition.stop();
          }
  
          // Make the POST request when both variables are not null
          if (present_Price  !== null && Kms_Driven !== null) {
            
            try {
              const response = await axios.post('/predictAutomovil', {
                present_Price : present_Price ,
                Kms_Driven: Kms_Driven,
              });
  
              // Maneja la respuesta del servidor de forma asíncrona
              console.log(response.data);
              const prediction = response.data.Prediccion;
              console.log(prediction);
              setAssistantMessage(`The prediction is: ${prediction}`);
              
            } catch (error) {
              // Maneja los errores de la solicitud
              console.error('Error:', error);
            }
          }
        }
      };
  
      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
      };
  
      recognition.onend = () => {
        console.log('Voice recognition ended')
        
          // Restart recognition if studyTime is still null
        if (present_Price  === null) {
          setTimeout(() => {
            startRecognition();
          }, 1000); // Start recognition again after 1 second
        };
  
        // Restart recognition if asking for attendance
        if (askingForKmsDriven) {
          setTimeout(() => {
            startRecognition();
          }, 1000 ); // Start recognition again after 1 second
        }
      };
  
      recognition.start();
    };
  
    startRecognition();
  };





  const delay = async () => {
    let DepDelay = null;

    const startRecognition = () => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true; // Enable interim results

      recognition.onstart = () => {
        console.log('Voice recognition started');
        setAssistantMessage('Tell me the delay in minutes.');
      };

      recognition.onresult = async (event) => {
        const finalTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('')
          .toLowerCase();

        const number = wordsToNumbers(finalTranscript, { fuzzy: true }); // Convert words to numbers

        if (number) {
          DepDelay = number;
          console.log(DepDelay);
          recognition.stop();

          // Make the POST request when the variable is not null
          if (DepDelay !== null) {
            try {
              const response = await axios.post('/predictCovidFlightDelay', {
                DepDelay: DepDelay,
              });

              // Handle the server response asynchronously
              console.log(response.data);
              const prediction = response.data.Prediccion;
              console.log(prediction);
              setAssistantMessage(`The prediction is: ${prediction}`);
            } catch (error) {
              // Handle request errors
              console.error('Error:', error);
            }
          }
        }
      };

      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
      };

      recognition.onend = () => {
        console.log('Voice recognition ended');

        // Restart recognition if highValue is still null
        if (DepDelay === null) {
          setTimeout(() => {
            startRecognition();
          }, 1000); // Start recognition again after 1 second
        }
      };

      recognition.start();
    };

    startRecognition();
  };



  






  

  












  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      setIsListening(true);
      const recognition = new window.webkitSpeechRecognition();

      recognition.onstart = () => {
        console.log('Voice recognition started');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();

        if (transcript.includes("hello")) {
        } else if (transcript.includes("model")) {
          model();
        } else if (transcript.includes("bitcoin")) {
          bitcoin();
        } else if (transcript.includes("delay")) {
          delay();     
        } else if (transcript.includes("covid")) {
          covid();   
        } else if (transcript.includes("automovil")) {
          automovil();   
        } else if (transcript.includes("body")) {
          bodyFat();   
        } else if (transcript.includes("alex")) {
          setAssistantMessage("Hello, I am Alex, a virtual assistant that predicts, what would you like to predict?");
        }

        recognition.stop();
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('Voice recognition ended');
      };

      recognition.start();
    } else {
      alert('Voice recognition functionality is not available in this browser.');
    }
  };

  return (
    <div className="container">
      <div className="robot"></div>
      <div className="speech-bubble">
        <div className={`message-container ${assistantMessage ? 'visible' : ''}`}>
          {assistantMessage}
        </div>
      </div>
      <button
        className={`microphone-button ${isListening ? 'listening' : ''}`}
        onClick={startListening}
      >
        <img src="/images/mic.svg" alt="Microphone button" />
      </button>
    </div>
  );
}

export default VoiceAssistant;