import React from 'react';

export interface WindowState {
  id: string;
  title: string;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve namespace issue.
  icon: React.ReactElement;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosing?: boolean;
  isMinimizing?: boolean;
}

export interface WindowContextType {
  windows: WindowState[];
  // Fix: Replaced JSX.Element with React.ReactElement to resolve namespace issue.
  openWindow: (id: string, title: string, icon: React.ReactElement, content: React.ReactNode) => void;
  closeWindow: (id: string) => void;
  removeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  finishMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export interface IconInfo {
  id: string;
  title: string;
  // Fix: Updated icon type to allow passing a className prop, which fixes a type error with React.cloneElement.
  icon: React.ReactElement<{ className?: string }>;
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}
