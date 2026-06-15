import { useEffect } from 'react';

const BACKEND_URL = 'https://atomicabackend.onrender.com/';
const PING_INTERVAL = 15 * 60 * 1000; // 15 minutes

export default function WakeBackend() {
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        await fetch(BACKEND_URL, { cache: 'no-store' });
      } catch (error) {
        console.error('Error waking backend:', error);
      }
    };

    // Ping immediately on load, then keep it awake every 15 minutes.
    wakeUpBackend();
    const intervalId = setInterval(wakeUpBackend, PING_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return null;
}