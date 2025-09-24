
import React from 'react';
import type { IconInfo, Project } from './types';
import ResumeContent from './components/content/ResumeContent';
import ProjectsContent from './components/content/ProjectsContent';
import AboutMeContent from './components/content/AboutMeContent';

// SVG Icons
export const FolderIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
        <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
    </svg>
);

export const DocumentIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#fff" d="M37,45H11c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h18l11,11v28C40,43.7,38.7,45,37,45z"/>
        <path fill="#B0BEC5" d="M29,3h1v12c0,0.6,0.4,1,1,1h12v-1L29,3z"/>
        <path fill="#CFD8DC" d="M29,3l11,11H30c-0.6,0-1-0.4-1-1V3z"/>
        <path fill="#1976D2" d="M14,23h20v2H14V23zM14,29h20v2H14V29zM14,35h20v2H14V35z"/>
    </svg>
);

export const UserIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#4FC3F7" d="M24,24c4.4,0,8-3.6,8-8s-3.6-8-8-8s-8,3.6-8-8S19.6,24,24,24z M24,44c-6.8,0-13-2.6-13-6 c0-3.3,5.8-6,13-6s13,2.7,13,6C37,41.4,30.8,44,24,44z"/>
    </svg>
);

export const HelpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
    <path fill="#FFC107" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/>
    <path fill="#212121" d="M24,33.5c-1.381,0-2.5,1.119-2.5,2.5s1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5S25.381,33.5,24,33.5z M25.4,29.4c-0.5,0.7-1.4,1.1-2.4,1.1c-1.3,0-2.5-0.7-3.1-1.8c-0.6-1.1-0.4-2.5,0.5-3.4c0.9-0.9,2.1-1.4,3.3-1.4c0.6,0,1.2,0.1,1.7,0.4l1.2-3.4c-1-0.5-2.2-0.8-3.4-0.8c-3.3,0-6.1,1.8-7.5,4.6c-1.4,2.8-0.8,6.1,1.5,8.1c2.3,2,5.6,2.5,8.4,1.4c2.8-1.1,4.6-3.8,4.6-6.9c0-1.2-0.3-2.4-0.8-3.4L25.4,29.4z"/>
  </svg>
);

export const RecycleBinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}><path fill="#90A4AE" d="M20,13h8v2h-8V13z M22,18h4v2h-4V18z"/><path fill="#CFD8DC" d="M30.5,10.6l-2.9-3.7C27.2,6.4,26.6,6,26,6h-4c-0.6,0-1.2,0.4-1.6,0.9l-2.9,3.7C16.9,11.5,16,12.7,16,14v1h16v-1C32,12.7,31.1,11.5,30.5,10.6z"/><path fill="#B0BEC5" d="M30,15H18c-2.2,0-4,1.8-4,4v15c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V19C34,16.8,32.2,15,30,15z"/><path fill="#455A64" d="M19,34c0,0.6,0.4,1,1,1h8c0.6,0,1-0.4,1-1v-9h-2v8h-6v-8h-2V34z"/></svg>
);


export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
    <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"/>
    <path fill="#FFF" d="M12 19H17V36H12zM14.5 12.5A2.5 2.5 0 0 1 12 15a2.5 2.5 0 0 1-2.5-2.5A2.5 2.5 0 0 1 14.5 10a2.5 2.5 0 0 1 0 2.5zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19c3.578,0,6.261,2.35,6.261,7.274L36,36L36,36z"/>
  </svg>
);

export const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
    <path fill="#333" d="M24,4C12.95,4,4,12.95,4,24c0,8.84,5.73,16.34,13.67,19.01 c1,0.19,1.36-0.43,1.36-0.96c0-0.47-0.02-1.72-0.03-3.38c-5.56,1.21-6.74-2.68-6.74-2.68c-0.91-2.31-2.22-2.92-2.22-2.92 c-1.81-1.24,0.14-1.21,0.14-1.21c2,0.14,3.06,2.05,3.06,2.05c1.78,3.06,4.67,2.18,5.81,1.67c0.18-1.3,0.7-2.18,1.27-2.68 c-4.43-0.5-9.08-2.22-9.08-9.86c0-2.18,0.78-3.96,2.05-5.36c-0.21-0.5-0.89-2.54,0.2-5.29c0,0,1.68-0.54,5.49,2.05 C21.6,13.23,22.8,13,24,13s2.4,0.23,3.54,0.67c3.81-2.59,5.49-2.05,5.49-2.05c1.09,2.75,0.41,4.79,0.2,5.29 c1.27,1.4,2.05,3.18,2.05,5.36c0,7.66-4.66,9.35-9.1,9.85c0.72,0.62,1.35,1.85,1.35,3.72c0,2.69-0.02,4.86-0.02,5.52 c0,0.53,0.36,1.16,1.37,0.96C38.27,40.34,44,32.84,44,24C44,12.95,35.05,4,24,4z"/>
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
    <path fill="#3B5998" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"/>
    <path fill="#FFF" d="M34.5,24h-4V19c0-1,1-1,1-1h3v-5h-4c-4,0-5,2-5,5v5h-3v5h3v12h5V29h4L34.5,24z"/>
  </svg>
);

export const DESKTOP_ICONS: IconInfo[] = [
  { id: 'aboutMe', title: 'About Me', icon: <UserIcon /> },
  { id: 'resume', title: 'My Resume', icon: <DocumentIcon /> },
  { id: 'projects', title: 'My Projects', icon: <FolderIcon /> },
  { id: 'recycleBin', title: 'Recycle Bin', icon: <RecycleBinIcon /> },
];

export const START_MENU_ICONS: IconInfo[] = [
  { id: 'aboutMe', title: 'About Me', icon: <UserIcon /> },
  { id: 'resume', title: 'My Resume', icon: <DocumentIcon /> },
  { id: 'projects', title: 'My Projects', icon: <FolderIcon /> },
];

export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: <LinkedInIcon />,
    url: 'https://www.linkedin.com/in/richard-cubero-598374230/',
  },
  {
    id: 'github',
    title: 'GitHub',
    icon: <GitHubIcon />,
    url: 'https://github.com/DaddyChardy',
  },
  {
    id: 'facebook',
    title: 'Facebook',
    icon: <FacebookIcon />,
    url: 'https://www.facebook.com/realchardyfor3',
  },
];

export const getWindowContent = (id: string) => {
  switch (id) {
    case 'aboutMe':
      return {
        title: 'About Me',
        icon: <UserIcon className="w-4 h-4" />,
        content: <AboutMeContent />,
      };
    case 'resume':
      return {
        title: 'My Resume',
        icon: <DocumentIcon className="w-4 h-4" />,
        content: <ResumeContent />,
      };
    case 'projects':
      return {
        title: 'My Projects',
        icon: <FolderIcon className="w-4 h-4" />,
        content: <ProjectsContent />,
      };
    case 'recycleBin':
        return {
            title: 'Recycle Bin',
            icon: <RecycleBinIcon className="w-4 h-4" />,
            content: <div className="p-4 text-gray-800">This folder is empty.</div>,
        };
    case 'help':
        return {
            title: 'Help and Support Center',
            icon: <HelpIcon className="w-4 h-4" />,
            content: <div className="p-8 text-gray-800">
                <h1 className="text-2xl font-bold mb-4">Help and Support</h1>
                <p>Welcome to my Windows XP-themed portfolio!</p>
                <p className="mt-2">You can open applications by double-clicking the icons on the desktop or clicking them in the Start Menu.</p>
                <p className="mt-2">You can drag windows, resize them, and rearrange icons on the desktop.</p>
            </div>,
        };
    default:
      return null;
  }
}

export const PROJECTS: Project[] = [
  {
    title: 'PSA Website Clone',
    description: 'A functional clone of the Philippine Statistics Authority (PSA) website, developed to replicate its key features and data presentation. This project showcases skills in frontend development and UI replication.',
    imageUrl: 'https://picsum.photos/seed/project7/300/200',
    link: 'https://ojtreqpsa.vercel.app/',
  },
  {
    title: 'Infobot: Smart Division Assistant',
    description: 'The official AI Chatbot for DepEd Tandag City Division. It provides updates on new memorandums, features advanced document search, and offers institutional insights through an intelligent chat interface.',
    imageUrl: 'https://picsum.photos/seed/project5/300/200',
    link: 'https://infobot-web-mu.vercel.app/',
  },
  {
    title: 'AIssistant',
    description: 'Master coding with AI-powered guidance and real-time feedback. Features separate interfaces for students (AI chat, learning materials, quizzes) and instructors (content creation, analytics).',
    imageUrl: 'https://picsum.photos/seed/project6/300/200',
    link: 'https://aissistant-pi.vercel.app/',
  },
];