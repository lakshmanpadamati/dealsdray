import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import "./App.css";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AuthProvider from "./context/AuthContext";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";
import Protected from "./context/Protected"; 


const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <HomeLayout />
      </AuthProvider>
    ),
    path: "", 
    children: [
      {
        element: <Auth />,  
        index: true,  
      },
      {
        element: <Protected />,  
        children: [
          {
            element: <Admin />,
            path: "admin", 
          },
          {
            element: <CreateEmployee />,
            path: "create",  
          },
          {
            element: <EmployeeList />,
            path: "employees",  
          },
          {
            element: <CreateEmployee />,
            path: "edit/:id", 
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
