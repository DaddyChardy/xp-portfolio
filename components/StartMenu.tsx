import React from 'react';
import { START_MENU_ICONS, getWindowContent, SOCIAL_LINKS, UserIcon, HelpIcon } from '../constants';
import { useWindowContext } from './WindowContext';


const StartMenu: React.FC<{closeMenu: () => void}> = ({closeMenu}) => {
  const { openWindow } = useWindowContext();

  const handleItemClick = (id: string) => {
    const content = getWindowContent(id);
    if(content) {
      openWindow(id, content.title, content.icon, content.content);
    }
    closeMenu();
  };

  const handleHelpClick = () => {
    const content = getWindowContent('help');
    if (content) {
        openWindow('help', content.title, content.icon, content.content);
    }
    closeMenu();
  }

  return (
    <div className="absolute bottom-8 left-0 w-[90vw] sm:w-80 h-[80vh] sm:h-96 bg-gradient-to-b from-[#245BDB] to-[#3B77E9] rounded-tr-lg shadow-2xl border-r border-b border-black flex flex-col">
      {/* Header */}
      <div className="flex items-center p-2 bg-[#255EDD] shadow-inner">
        <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center border border-gray-300">
          <UserIcon className="w-10 h-10" />
        </div>
        <span className="ml-3 text-white font-bold text-lg">Welcome po!!</span>
      </div>

      {/* Body */}
      <div className="flex-grow flex min-h-0">
        {/* Left Panel */}
        <div className="w-1/2 bg-white p-2 overflow-y-auto">
            {START_MENU_ICONS.map((item) => (
               <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="flex items-center w-full p-2 hover:bg-blue-500 hover:text-white rounded-sm text-left"
               >
                  <div className="w-8 h-8 mr-2 flex-shrink-0">{item.icon}</div>
                  <span className="font-semibold">{item.title}</span>
               </button>
            ))}
        </div>

        {/* Right Panel */}
        <div className="w-1/2 bg-[#D6E3F4] p-2 space-y-2 overflow-y-auto">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full p-2 hover:bg-blue-500/20 rounded-sm text-left"
            >
              <div className="w-8 h-8 mr-2 flex-shrink-0">{item.icon}</div>
              <span className="font-semibold text-gray-800">{item.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end p-2 bg-gradient-to-b from-[#245BDB] to-[#3B77E9] border-t border-t-slate-500">
        <button onClick={handleHelpClick} className="flex items-center text-white">
          <HelpIcon className="w-6 h-6 mr-1" />
          <span>Help and Support</span>
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
