import { useEffect, useState } from 'react';
import { useDemo } from '../store/DemoContext';

const messages = [
  'Reading your document...',
  'Finding the important parts...',
  'Simplifying the words...',
  'Checking for actions you need to take...',
  'Almost done...'
];

export default function ProcessingScreen() {
  const { setView } = useDemo();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % messages.length);
    }, 1200);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setView('document');
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [setView]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold text-white mb-2">We are working on your document</h2>
      <p className="text-cyan-400 text-lg" role="status" aria-live="polite">{messages[index]}</p>
      <p className="mt-6 text-slate-400 text-sm max-w-md text-center">
        No need to do anything. We will show you the simplified version in a few seconds.
      </p>
    </div>
  );
}
