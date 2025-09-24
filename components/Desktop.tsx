import React, { useState } from 'react';
import DesktopIcon from './DesktopIcon';
import { DESKTOP_ICONS, getWindowContent } from '../constants';
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

  return (
    <div 
        className="flex-grow w-full h-full p-4"
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
    </div>
  );
};

export default Desktop;
