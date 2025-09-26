
import React, { useState } from 'react';
import DesktopIcon from './DesktopIcon';
import { DESKTOP_ICONS, getWindowContent, ClippyIcon } from '../constants';
import { useWindowContext } from './WindowContext';

const Desktop: React.FC = () => {
  const { openWindow } = useWindowContext();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconDoubleClick = (id: string) => {
    const content = getWindowContent(id);
    if(content) {
      openWindow(id, content.title, content.icon, content.content);
    }
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  }
  
  const handleChatbotDoubleClick = () => {
      const content = getWindowContent('chatbot');
      if (content) {
          openWindow('chatbot', content.title, content.icon, content.content);
      }
  }

  return (
    <div 
        className="flex-grow w-full h-full p-4 relative"
        onClick={handleDesktopClick}
    >
        <div className="flex flex-col flex-wrap h-full content-start">
            {DESKTOP_ICONS.map((icon) => (
              <DesktopIcon
                key={icon.id}
                id={icon.id}
                title={icon.title}
                icon={icon.icon}
                onDoubleClick={() => handleIconDoubleClick(icon.id)}
                isSelected={selectedIcon === icon.id}
                onSelect={setSelectedIcon}
              />
            ))}
        </div>

        {/* Chatbot Icon */}
        <div
            className="absolute bottom-4 right-4 flex flex-col items-center justify-start space-y-1 w-24 h-24 cursor-pointer p-2 group"
            onDoubleClick={handleChatbotDoubleClick}
            title="Chat with my assistant!"
        >
            <div className="w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-110">
                <ClippyIcon />
            </div>
            <p className="text-white text-xs text-center px-1 py-0.5 rounded-sm group-hover:bg-blue-800">Clippy</p>
        </div>
    </div>
  );
};

export default Desktop;