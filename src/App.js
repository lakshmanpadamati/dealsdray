import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import "./App.css";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AuthProvider from "./context/AuthContext";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import Protected from "./context/Protected";  // Your Protected wrapper

// Define your router with nested routes
const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <HomeLayout />
      </AuthProvider>
    ),
    path: "",  // Base path
    children: [
      {
        element: <Auth />,  // Login page route
        index: true,  // Default route when app is loaded
      },
      {
        element: <Protected />,  // Protected wrapper for authenticated routes
        children: [
          {
            element: <Admin />,
            path: "admin",  // Protected admin page
          },
          {
            element: <CreateEmployee />,
            path: "create",  // Protected create employee page
          },
          {
            element: <EmployeeList />,
            path: "employees",  // Protected employee list page
          },
          {
            element: <CreateEmployee />,
            path: "edit/:id",  // Protected edit employee page
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
