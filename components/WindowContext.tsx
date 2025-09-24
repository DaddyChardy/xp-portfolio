import React, { createContext, useState, useCallback, ReactNode, useContext } from 'react';
import type { WindowState, WindowContextType } from '../types';

export const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindowContext must be used within a WindowProvider');
  }
  return context;
};

export const WindowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const bringToFront = useCallback((id: string, windowsArray: WindowState[]) => {
    const windowToFocus = windowsArray.find(w => w.id === id);
    if (!windowToFocus) return windowsArray;
    const otherWindows = windowsArray.filter(w => w.id !== id);
    return [...otherWindows, windowToFocus];
  }, []);

  // Fix: Replaced JSX.Element with React.ReactElement to resolve namespace issue.
  const openWindow = useCallback((id: string, title: string, icon: React.ReactElement, content: React.ReactNode) => {
    setWindows(prevWindows => {
      const existingWindow = prevWindows.find(w => w.id === id);
      if (existingWindow) {
        const updatedWindows = prevWindows.map(w => w.id === id ? { ...w, isMinimized: false, isMinimizing: false } : w);
        return bringToFront(id, updatedWindows);
      }

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      
      const defaultWidth = 640;
      const defaultHeight = 480;

      const width = Math.min(defaultWidth, screenW - 40);
      const height = Math.min(defaultHeight, screenH - 80); // 80 to account for taskbar and some margin

      // Center with some randomness and ensure it's on screen
      const x = Math.max(20, (screenW - width) / 2 + (Math.random() - 0.5) * 50);
      const y = Math.max(20, (screenH - 32 - height) / 2 + (Math.random() - 0.5) * 50);


      const newWindow: WindowState = {
        id,
        title,
        icon,
        content,
        x,
        y,
        width,
        height,
        isMinimized: false,
        isMaximized: false,
      };
      return [...prevWindows, newWindow];
    });
  }, [bringToFront]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isClosing: true } : w))
    );
  }, []);

  const removeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => {
      // Un-minimize the window when focusing
      const updatedWindows = prev.map(w => w.id === id ? { ...w, isMinimized: false, isMinimizing: false, isClosing: false } : w);
      return bringToFront(id, updatedWindows);
    });
  }, [bringToFront]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimizing: true } : w))
    );
  }, []);

  const finishMinimize = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: true, isMinimizing: false } : w))
    );
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows(prev => {
      // Toggling maximize should also focus the window and ensure it's not minimized.
      const windowsWithToggledMaximize = prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized, isMinimized: false, isMinimizing: false } : w));
      return bringToFront(id, windowsWithToggledMaximize);
    });
  }, [bringToFront]);


  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, width, height } : w))
    );
  }, []);


  const value = {
    windows,
    openWindow,
    closeWindow,
    removeWindow,
    focusWindow,
    minimizeWindow,
    finishMinimize,
    toggleMaximize,
    updateWindowPosition,
    updateWindowSize,
  };

  return (
    <WindowContext.Provider value={value}>
      {children}
    </WindowContext.Provider>
  );
};
