// import { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="bg-green-500 w-full h-full ">hi</div>
      </QueryClientProvider>
    </>
  );
}

export default App;
