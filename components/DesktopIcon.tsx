import React from 'react';

interface DesktopIconProps {
  id: string;
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  onDoubleClick: () => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
    id, title, icon, onDoubleClick, isSelected, onSelect
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <div
      className="flex flex-col items-center justify-start space-y-1 w-24 h-24 cursor-pointer p-2"
      onDoubleClick={onDoubleClick}
      onClick={handleClick}
      tabIndex={0}
    >
      <div className={`w-12 h-12 flex items-center justify-center rounded ${isSelected ? 'bg-blue-500 bg-opacity-30' : ''}`}>
        {React.cloneElement(icon, { className: 'w-10 h-10' })}
      </div>
      <p className={`text-white text-xs text-center px-1 py-0.5 rounded-sm ${isSelected ? 'bg-blue-800' : ''}`}>{title}</p>
    </div>
  );
};

export default DesktopIcon;
