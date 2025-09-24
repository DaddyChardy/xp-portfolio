import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useWindowContext } from './WindowContext';

interface WindowProps {
  id: string;
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
  isMaximized: boolean;
  zIndex: number;
  isClosing?: boolean;
  isMinimizing?: boolean;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  initialX,
  initialY,
  initialWidth,
  initialHeight,
  isMaximized,
  zIndex,
  isClosing,
  isMinimizing,
}) => {
  const {
    closeWindow,
    removeWindow,
    minimizeWindow,
    finishMinimize,
    focusWindow,
    toggleMaximize,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowContext();

  const windowRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isClosing) {
      setIsMounted(false); // Trigger fade-out animation
      const timer = setTimeout(() => removeWindow(id), 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing, id, removeWindow]);

  useEffect(() => {
    if (isMinimizing) {
      setIsMounted(false); // Trigger fade-out animation
      const timer = setTimeout(() => finishMinimize(id), 300);
      return () => clearTimeout(timer);
    }
  }, [isMinimizing, id, finishMinimize]);

  const startPointerMove = useCallback((
    e: React.MouseEvent | React.TouchEvent,
    onMove: (dx: number, dy: number, moveEvent: MouseEvent | TouchEvent) => void,
    onEnd: (dx: number, dy: number, endEvent: MouseEvent | TouchEvent) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const isTouchEvent = 'touches' in e.nativeEvent;
    const startX = isTouchEvent ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const startY = isTouchEvent ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;

    const handlePointerMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const moveY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const dx = moveX - startX;
      const dy = moveY - startY;
      onMove(dx, dy, moveEvent);
    };

    const handlePointerUp = (endEvent: MouseEvent | TouchEvent) => {
        const endX = 'changedTouches' in endEvent ? endEvent.changedTouches[0].clientX : endEvent.clientX;
        const endY = 'changedTouches' in endEvent ? endEvent.changedTouches[0].clientY : endEvent.clientY;
        const dx = endX - startX;
        const dy = endY - startY;
        onEnd(dx, dy, endEvent);

        if (isTouchEvent) {
            document.removeEventListener('touchmove', handlePointerMove as EventListener);
            document.removeEventListener('touchend', handlePointerUp as EventListener);
        } else {
            document.removeEventListener('mousemove', handlePointerMove as EventListener);
            document.removeEventListener('mouseup', handlePointerUp as EventListener);
        }
    };
    
    if (isTouchEvent) {
        document.addEventListener('touchmove', handlePointerMove as EventListener, { passive: false });
        document.addEventListener('touchend', handlePointerUp as EventListener);
    } else {
        document.addEventListener('mousemove', handlePointerMove as EventListener);
        document.addEventListener('mouseup', handlePointerUp as EventListener);
    }
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isMaximized || !windowRef.current) return;
    focusWindow(id);

    const outline = document.createElement('div');
    outline.style.position = 'absolute';
    outline.style.left = `${initialX}px`;
    outline.style.top = `${initialY}px`;
    outline.style.width = `${initialWidth}px`;
    outline.style.height = `${initialHeight}px`;
    outline.style.border = '2px dashed #0831D9';
    outline.style.zIndex = '9999';
    outline.style.pointerEvents = 'none';

    const windowContainer = windowRef.current.parentElement;
    if (!windowContainer) return;
    windowContainer.appendChild(outline);
    
    startPointerMove(e, (dx, dy) => {
        const newX = initialX + dx;
        const newY = initialY + dy;
        outline.style.left = `${newX}px`;
        outline.style.top = `${newY}px`;
    }, (dx, dy) => {
        if (outline.parentElement) {
            outline.parentElement.removeChild(outline);
        }
        const newX = initialX + dx;
        const newY = initialY + dy;

        // Constrain window position
        const taskbarHeight = 32;
        const titlebarHeight = 28;
        const constrainedX = Math.max(-initialWidth + 50, Math.min(newX, window.innerWidth - 50));
        const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - taskbarHeight - titlebarHeight));
        
        updateWindowPosition(id, constrainedX, constrainedY);
    });
  }, [isMaximized, id, focusWindow, startPointerMove, initialX, initialY, initialWidth, initialHeight, updateWindowPosition]);

  const handleResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!windowRef.current) return;
    focusWindow(id);

    startPointerMove(e, (dx, dy) => {
        if (!windowRef.current) return;
        const newWidth = Math.max(250, initialWidth + dx);
        const newHeight = Math.max(150, initialHeight + dy);
        windowRef.current.style.width = `${newWidth}px`;
        windowRef.current.style.height = `${newHeight}px`;
    }, (dx, dy) => {
        const newWidth = Math.max(250, initialWidth + dx);
        const newHeight = Math.max(150, initialHeight + dy);
        updateWindowSize(id, newWidth, newHeight);
    });
  }, [id, focusWindow, startPointerMove, initialWidth, initialHeight, updateWindowSize]);

  // --- SVG Icon Components for Buttons ---
  const MinimizeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-[7px]">
        <path d="M4 16H14" stroke="white" strokeWidth="3" strokeLinecap="square"/>
    </svg>
  );

  const MaximizeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-[7px]">
      <path d="M4 4H14V14H4V4Z" stroke="white" strokeWidth="2.5" strokeLinejoin="miter"/>
    </svg>
  );

  const RestoreIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-[7px]">
        <path d="M7 4H17V11H14" stroke="white" strokeWidth="2.5" strokeLinejoin="miter"/>
        <path d="M4 7H14V17H4V7Z" stroke="white" strokeWidth="2.5" strokeLinejoin="miter"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-[6px]">
      <path d="M4 4L16 16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M16 4L4 16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );

  const windowClasses = `
    absolute flex flex-col bg-[#ECE9D8] rounded-t-lg 
    border border-t-[#0831D9] border-l-[#0831D9] border-r-black border-b-black 
    shadow-[5px_5px_5px_rgba(0,0,0,0.5)]
    transition-all duration-300 ease-in-out
    ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
  `;

  const style: React.CSSProperties = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% - 2rem)',
        zIndex: zIndex,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s'
      }
    : {
        top: `${initialY}px`,
        left: `${initialX}px`,
        width: `${initialWidth}px`,
        height: `${initialHeight}px`,
        zIndex: zIndex,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s, opacity 0.3s, transform 0.3s'
      };

  return (
    <div
      ref={windowRef}
      className={windowClasses}
      style={style}
      onMouseDown={() => focusWindow(id)}
      onTouchStart={() => focusWindow(id)}
    >
      <div
        className="h-7 bg-gradient-to-b from-[#0055E3] to-[#367BFF] rounded-t-md flex items-center justify-between px-1"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onDoubleClick={() => toggleMaximize(id)}
      >
        <div 
          className={`flex items-center flex-grow min-w-0 ${!isMaximized ? 'cursor-grab' : 'cursor-default'}`}
        >
          <div className="w-5 h-5 mr-1 flex-shrink-0">{icon}</div>
          <span className="text-white font-bold text-sm truncate select-none">{title}</span>
        </div>
        <div className="flex items-center space-x-1 flex-shrink-0 ml-1">
          {/* Minimize Button */}
          <button
            aria-label="Minimize"
            onMouseDown={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
            className="w-6 h-6 flex items-center justify-center border-t border-l border-white border-r-gray-700 border-b-gray-700 rounded-sm font-sans text-white bg-[#2D64E2] hover:brightness-110 active:brightness-95 active:border-t-gray-700 active:border-l-gray-700 active:border-r-white active:border-b-white"
          >
            <MinimizeIcon />
          </button>
          {/* Maximize/Restore Button */}
          <button
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
            onMouseDown={(e) => {
              e.stopPropagation();
              toggleMaximize(id);
            }}
            className="w-6 h-6 flex items-center justify-center border-t border-l border-white border-r-gray-700 border-b-gray-700 rounded-sm font-sans text-white bg-[#2D64E2] hover:brightness-110 active:brightness-95 active:border-t-gray-700 active:border-l-gray-700 active:border-r-white active:border-b-white"
          >
            {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
          </button>
          {/* Close Button */}
          <button
            aria-label="Close"
            onMouseDown={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            className="w-6 h-6 flex items-center justify-center border-t border-l border-white border-r-gray-700 border-b-gray-700 rounded-sm font-sans text-white bg-[#E22D2D] hover:brightness-110 active:brightness-95 active:border-t-gray-700 active:border-l-gray-700 active:border-r-white active:border-b-white"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="p-0.5 bg-[#ECE9D8] flex-grow min-h-0">
        <div className="w-full h-full bg-white border border-gray-500 overflow-y-auto">
          {children}
        </div>
      </div>
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        />
      )}
    </div>
  );
};

export default Window;