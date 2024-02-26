import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Auth from "./components/Auth.jsx";
import { loader as rootLoader } from "./pages/Root.jsx";
import { loader as transferLoader } from "./pages/Transfer.jsx";
import { loader as editLoader } from "./pages/Edit.jsx";
import Home from "./pages/Home.jsx";
import Transactions from "./pages/Transactions.jsx";
import Transfer from "./pages/Transfer.jsx";
import Edit from "./pages/Edit.jsx";
import GlobalError from "./components/GlobalError.jsx";

axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth>
        <Root />
      </Auth>
    ),
    loader: rootLoader,
    errorElement: <GlobalError />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
  {
    path: "/transfer/:userId",
    element: (
      <Auth>
        <Transfer />
      </Auth>
    ),
    loader: transferLoader,
    errorElement: <GlobalError />,
  },
  {
    path: "/edit",
    element: (
      <Auth>
        <Edit />
      </Auth>
    ),
    loader: editLoader,
    errorElement: <GlobalError />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
