import React, { useState, useEffect, useRef } from 'react';
import StartMenu from './StartMenu';
import { useWindowContext } from './WindowContext';
import type { WindowState } from '../types';

const Taskbar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { windows, focusWindow, minimizeWindow } = useWindowContext();
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFocusedWindowId = () => {
    if (windows.length === 0) return null;
    const activeWindows = windows.filter(w => !w.isMinimized);
    if(activeWindows.length === 0) return null;
    return activeWindows[activeWindows.length - 1].id;
  }

  const handleTaskbarItemClick = (window: WindowState) => {
    if (window.id === getFocusedWindowId() && !window.isMinimized) {
        minimizeWindow(window.id);
    } else {
        focusWindow(window.id);
    }
  };

  const focusedWindowId = getFocusedWindowId();

  return (
    <div className="h-8 bg-gradient-to-b from-[#245BDB] to-[#3B77E9] w-full flex items-center justify-between shadow-lg border-t border-t-slate-300 select-none z-50">
      <div className="flex items-center h-full flex-1 min-w-0" ref={startMenuRef}>
        <button
          onClick={() => setIsStartMenuOpen(prev => !prev)}
          className={`flex items-center justify-center h-full px-2 text-white bg-gradient-to-b from-[#3CC14A] to-[#27A844] border-r border-t border-[#60D86E] border-l-[#2AA042] border-b-[#208336] rounded-r-lg shadow-md hover:brightness-110 active:brightness-95 ${isStartMenuOpen ? 'brightness-95' : ''}`}
        >
          <span className="font-bold text-lg italic" style={{ fontFamily: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif' }}>start</span>
        </button>
        {isStartMenuOpen && <StartMenu closeMenu={() => setIsStartMenuOpen(false)} />}
        <div className="h-full w-px bg-slate-500 opacity-50 ml-1"></div>
        <div className="flex items-center h-full ml-1 space-x-1 flex-1 min-w-0 overflow-x-auto">
          {windows.map(win => (
            <button
              key={win.id}
              onClick={() => handleTaskbarItemClick(win)}
              className={`flex-shrink-0 flex items-center h-[28px] w-40 px-2 border border-t-[#F2F2F2] border-l-[#F2F2F2] border-r-gray-600 border-b-gray-600 rounded-sm shadow-sm text-xs truncate ${win.id === focusedWindowId && !win.isMinimized ? 'bg-gradient-to-b from-[#1C45B2] to-[#3E6CD5] text-white font-bold' : 'bg-gradient-to-b from-[#3D71E4] to-[#538AEA] text-white'}`}
            >
              <span className="w-4 h-4 mr-1">{win.icon}</span>
              <span className="truncate">{win.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-full bg-gradient-to-b from-[#1483E4] to-[#0F63AD] flex items-center px-2 border-l border-l-slate-400">
        <span className="text-white text-xs">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Taskbar;
