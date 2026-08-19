import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const DemoContext = createContext();
const SESSION_KEY = 'claritydoc-poc-session';

function readSession() {
  try {
    return JSON.parse(window.localStorage.getItem(SESSION_KEY)) || {};
  } catch {
    return {};
  }
}

export function DemoProvider({ children }) {
  const saved = readSession();
  const [view, setViewState] = useState(saved.view || 'landing');
  const [, setHistory] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(saved.selectedDoc || null);
  const [simplificationLevel, setSimplificationLevel] = useState(saved.simplificationLevel || 'standard');
  const [completedActions, setCompletedActions] = useState(new Set(saved.completedActions || []));
  const [persona, setPersona] = useState(saved.persona || 'senior');
  const [fontSize, setFontSize] = useState(saved.fontSize || 'medium');
  const [highContrast, setHighContrast] = useState(Boolean(saved.highContrast));

  useEffect(() => {
    try {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify({
        view: view === 'processing' ? 'dashboard' : view,
        selectedDoc,
        simplificationLevel,
        completedActions: [...completedActions],
        persona,
        fontSize,
        highContrast,
      }));
    } catch {
    }
  }, [view, selectedDoc, simplificationLevel, completedActions, persona, fontSize, highContrast]);

  const setView = useCallback((nextView) => {
    setViewState(current => {
      if (current !== nextView) setHistory(previous => [...previous, current]);
      return nextView;
    });
  }, []);

  const goBack = useCallback(() => {
    setHistory(previous => {
      if (!previous.length) {
        setViewState('landing');
        return previous;
      }
      const next = [...previous];
      let destination = next.pop();
      while (destination === 'processing' && next.length) destination = next.pop();
      if (destination === 'processing') destination = 'dashboard';
      setViewState(destination || 'landing');
      return next;
    });
  }, []);

  const resetDemo = useCallback(() => {
    setHistory([]);
    setViewState('landing');
    setSelectedDoc(null);
    setCompletedActions(new Set());
    window.localStorage.removeItem(SESSION_KEY);
  }, []);

  const markActionComplete = useCallback((id) => {
    setCompletedActions(previous => new Set([...previous, id]));
  }, []);

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
