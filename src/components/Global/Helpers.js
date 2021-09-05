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
