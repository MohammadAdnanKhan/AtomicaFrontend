import { useEffect } from 'react';

export default function WakeBackend() {
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        await fetch('https://atomicabackend.onrender.com/');
      } catch (error) {
        console.error("Error waking backend:", error);
      }
    };

    wakeUpBackend();
  }, []);

  return null; 
}