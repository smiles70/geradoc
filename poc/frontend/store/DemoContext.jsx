import { createContext, useContext, useState } from 'react';

const DemoContext = createContext();

export function DemoProvider({ children }) {
  const [view, setViewState] = useState('landing');
  const [, setHistory] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [simplificationLevel, setSimplificationLevel] = useState('standard');
  const [completedActions, setCompletedActions] = useState(new Set());
  const [persona, setPersona] = useState('senior');
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);

  const setView = (nextView) => {
    setViewState(current => {
      if (current !== nextView) setHistory(previous => [...previous, current]);
      return nextView;
    });
  };

  const goBack = () => {
    setHistory(previous => {
      if (!previous.length) {
        setViewState('landing');
        return previous;
      }
      const next = [...previous];
      setViewState(next.pop());
      return next;
    });
  };

  const resetDemo = () => {
    setHistory([]);
    setViewState('landing');
    setSelectedDoc(null);
    setCompletedActions(new Set());
  };

  const markActionComplete = (id) => {
    setCompletedActions(previous => new Set([...previous, id]));
  };

  const value = {
    view, setView, goBack, resetDemo,
    selectedDoc, setSelectedDoc,
    simplificationLevel, setSimplificationLevel,
    completedActions, setCompletedActions, markActionComplete,
    persona, setPersona,
    fontSize, setFontSize,
    highContrast, setHighContrast,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export const useDemo = () => useContext(DemoContext);
