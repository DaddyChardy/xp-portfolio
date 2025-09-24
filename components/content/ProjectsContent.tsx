import React from 'react';
import { PROJECTS, START_MENU_ICONS, getWindowContent } from '../../constants';
import { useWindowContext } from '../WindowContext';

const ProjectsContent: React.FC = () => {
  const { openWindow } = useWindowContext();

  const handleSidebarClick = (id: string) => {
    const windowData = getWindowContent(id);
    if (windowData) {
      openWindow(id, windowData.title, windowData.icon, windowData.content);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-full bg-white">
      {/* Sidebar */}
      <div className="w-full sm:w-48 flex-shrink-0 bg-gradient-to-b from-[#3A74E9] to-[#5487EE] p-2 border-b sm:border-b-0 sm:border-r border-gray-500">
        <div className="bg-white/20 p-2 rounded-sm">
          <h3 className="font-bold text-white text-sm pb-1 mb-2">Other Places</h3>
          <ul className="space-y-1">
            {START_MENU_ICONS.filter(icon => icon.id !== 'projects').map(icon => (
               <li key={icon.id}>
                <button 
                  onClick={() => handleSidebarClick(icon.id)} 
                  className="flex items-center w-full text-left text-white hover:underline"
                >
                  <div className="w-5 h-5 mr-2 flex-shrink-0">{icon.icon}</div>
                  <span className="text-xs">{icon.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <div key={index} className="bg-white border border-gray-300 overflow-hidden transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl">
              <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2">{project.title}</h2>
                <p className="text-gray-700 text-sm mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-black px-5 py-1 text-sm bg-[#ECE9D8] border border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#7F7F7F] border-b-[#7F7F7F] hover:bg-[#E0E0E0] active:border-t-[#7F7F7F] active:border-l-[#7F7F7F] active:border-r-[#FFFFFF] active:border-b-[#FFFFFF]"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContent;
