import React from "react";
import { Toaster } from "react-hot-toast";

export const CustomToaster = (
  <Toaster
    position="top-center"
    toastOptions={{
      success: {
        style: {
          background: "#363636",
          color: "#fff",
        },
      },
      error: {
        style: {
          background: "#363636",
          color: "#fff",
        },
      },
    }}
  />
);

export const perPage = () => {
  console.log(window.screen.availWidth)
  if (window.screen.availWidth >= 1020) return 12;
  if (480 < window.screen.availWidth && window.screen.availWidth < 1020)
    return 6;
  return 4;
};
