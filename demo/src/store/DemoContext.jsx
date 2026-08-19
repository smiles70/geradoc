import { createContext, useContext, useState } from 'react';

const DemoContext = createContext();

export function DemoProvider({ children }) {
  const [view, setView] = useState('landing');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [simplificationLevel, setSimplificationLevel] = useState('standard');
  const [completedActions, setCompletedActions] = useState(new Set());
  const [persona, setPersona] = useState('senior');
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);

  const markActionComplete = (id) => {
    setCompletedActions(prev => new Set([...prev, id]));
  };

  const value = {
    view, setView,
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
