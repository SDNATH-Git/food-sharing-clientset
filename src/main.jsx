import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import { RouterProvider } from "react-router";
import router from "./Routers/Router";
import AuthProvider from "./Provider/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loder from "./components/Loder";

//Loader contion
function App() {
  const [isLoading, setIsLoading] = useState(true);  // ✅ state এর নাম আলাদা

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Loder />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <RouterProvider router={router} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

//Loader contion

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
