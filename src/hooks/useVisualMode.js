import React, { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

    if (replace === true) {
      setMode(newMode);
      setHistory( prev => ([...prev.slice(0, -1), newMode]) );
    } else {
      setMode(newMode);
      setHistory( prev => ([...prev, newMode]) );
    }
  };


  const back = () => {
    
    if (history.length > 1) {
      setHistory(prev => {
        const historyCopy = prev.slice(0, -1);
        setMode(historyCopy[historyCopy.length - 1]);
        return historyCopy;
      })
    }
  };

  return { mode, transition, back };

} 