"use client";

import { createContext, useContext, useEffect, useState } from "react";
// import { BreadCrumbItem } from "@/models";

interface Props {
  toggle?: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  handleToggleMenu: () => void;
  showAlert?: (message: string, type: string) => void;
  hideAlert?: () => void;
  alert?: {
    show: boolean;
    message: string;
    type?: "success" | "error" | "warning" | "info" | undefined | string;
  };
}

const initialState: Props = {
  toggle: false,
  closeMenu: (): void | undefined => {},
  openMenu: (): void | undefined => {},
  handleToggleMenu: (): void | undefined => {},
  showAlert: (): void | undefined => {},
  hideAlert: (): void | undefined => {},
  alert: { show: false, message: "", type: "success" },
};
interface AlertProps {
  show: boolean;
  message: string;
  type?: "success" | "error" | "warning" | "info" | undefined | string;
}
export const ToggleLayoutContext = createContext<Props>(initialState);

export const ToggleLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toggle, setToggle] = useState<boolean>(true);

  //alert success message
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    message: "",
    type: "success",
  });

  const showAlert = (message: string, type: string) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "" }), 5000);
  };

  const hideAlert = () => {
    setAlert({ show: false, message: "" });
  };

  const handleToggleMenu = () => {
    setToggle((prev) => !prev);
  };

  const closeMenu = () => {
    setToggle(false);
  };

  const openMenu = () => {
    setToggle(true);
  };

  return (
    <ToggleLayoutContext.Provider
      value={{
        alert,
        showAlert,
        hideAlert,
        toggle,
        closeMenu,
        openMenu,
        handleToggleMenu,
      }}
    >
      {children}
    </ToggleLayoutContext.Provider>
  );
};

export const useToggleLayoutContext = () => useContext(ToggleLayoutContext);
