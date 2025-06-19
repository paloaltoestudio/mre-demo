import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainRouter } from "./Routers/MainRouter.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainRouter />
      {/* Comentar el devtools para produccion */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>
);
