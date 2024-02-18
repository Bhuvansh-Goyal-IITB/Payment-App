import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Auth from "./components/Auth.jsx";
import { loader as dashboardLoader } from "./pages/Root.jsx";
import { loader as homeLoader } from "./pages/Home.jsx";
import { loader as transactionsLoader } from "./pages/Transactions.jsx";
import { loader as transferLoader } from "./pages/Transfer.jsx";
import { loader as editLoader } from "./pages/Edit.jsx";
import Home from "./pages/Home.jsx";
import Transactions from "./pages/Transactions.jsx";
import Transfer from "./pages/Transfer.jsx";
import Edit from "./pages/Edit.jsx";

axios.defaults.baseURL = import.meta.env.BACKEND_URL || "http://localhost:3000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth>
        <Root />
      </Auth>
    ),
    loader: dashboardLoader,
    children: [
      {
        path: "",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "transactions",
        element: <Transactions />,
        loader: transactionsLoader,
      },
    ],
  },
  {
    path: "/transfer/:userId",
    element: <Transfer />,
    loader: transferLoader,
  },
  {
    path: "edit",
    element: <Edit />,
    loader: editLoader,
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
