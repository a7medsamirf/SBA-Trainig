"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DialogContextType {
  openDialog: (key: string, data?: any) => void;
  closeDialog: () => void;
  dismissDialog: (key: string) => void;
  isDialogDismissed: (key: string) => boolean;
  activeDialog: string | null;
  dialogData: any;
  addDialogData: (data: any) => void;
  removeDismissedDialog: (key: string) => void;
  resetDismissedDialogs: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [dialogData, setDialogData] = useState<any>(null);
  const [dismissedDialogs, setDismissedDialogs] = useState<Set<string>>(
    new Set()
  );

  const openDialog = (key: string, data?: any) => {
    setActiveDialog(key);
    setDialogData(data || null);
  };

  const closeDialog = () => {
    setActiveDialog(null);
    setDialogData(null);
  };

  const dismissDialog = (key: string) => {
    setDismissedDialogs((prev) => new Set([...prev, key]));
    closeDialog();
  };

  const isDialogDismissed = (key: string) => {
    return dismissedDialogs.has(key);
  };

  const removeDismissedDialog = (key: string) => {
    setDismissedDialogs((prev) => new Set([...prev].filter((k) => k !== key)));
  };

  const resetDismissedDialogs = () => {
    setDismissedDialogs(new Set());
  };

  const addDialogData = (data: any) => {
    setDialogData((prevData: any) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <DialogContext.Provider
      value={{
        activeDialog,
        openDialog,
        closeDialog,
        dismissDialog,
        isDialogDismissed,
        dialogData,
        addDialogData,
        removeDismissedDialog,
        resetDismissedDialogs,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
