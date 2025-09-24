
import React from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import { WindowProvider } from './components/WindowContext';
import WindowManager from './components/WindowManager';

const App: React.FC = () => {
  return (
    <WindowProvider>
      <div 
        className="w-screen h-screen overflow-hidden flex flex-col"
      >
        <Desktop />
        <WindowManager />
        <Taskbar />
      </div>
    </WindowProvider>
  );
};

export default App;