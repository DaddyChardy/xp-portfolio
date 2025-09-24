import React from 'react';
import Window from './Window';
import { useWindowContext } from './WindowContext';

const WindowManager: React.FC = () => {
    const { windows } = useWindowContext();

    return (
        <>
            {windows.map((win, index) =>
                !win.isMinimized && (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        icon={win.icon}
                        initialX={win.x}
                        initialY={win.y}
                        initialWidth={win.width}
                        initialHeight={win.height}
                        isMaximized={win.isMaximized}
                        zIndex={5 + index}
                        isClosing={win.isClosing}
                        isMinimizing={win.isMinimizing}
                    >
                        {win.content}
                    </Window>
                )
            )}
        </>
    );
};

export default WindowManager;
