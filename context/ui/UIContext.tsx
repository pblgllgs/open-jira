import { createContext } from 'react';

interface ContextProps {
  sideMenuOpen: boolean;

  openSideMenu: () => void;
  closeSideMenu: () => void;

  isAddingEntry: boolean;
  setIsAddingEntry: (status: boolean) => void;

  isDragging: boolean;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);