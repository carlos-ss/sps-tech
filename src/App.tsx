// import { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { RouterProvider } from "react-router";
import router from "./router";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
