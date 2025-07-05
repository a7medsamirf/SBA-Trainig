"use client";
import { useState, useEffect } from "react";

export function setLocalStorageItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(
    new CustomEvent("localStorageChange", { detail: { key, value } })
  );
}

export function useLocalStorageListener(key: string, initialValue: any) {
  if (typeof window === "undefined") {
    return initialValue;
  }
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key) || initialValue;
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (event.detail.key === key) {
        setValue(event.detail.value);
      }
    };

    window.addEventListener("localStorageChange", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, [key]);

  return value;
}
