import { createBrowserRouter, RouterProvider } from "react-router";

import About from "./pages/About/About.js";
import Delivery from "./pages/Delivery/Delivery.js";
import Menu from "./pages/Menu/Menu.js";
import NotFound from "./pages/NotFound/NotFound.js";
import Summary from "./pages/Summary/Summary.js";

import { useEffect } from "react";
import "./App.scss";
import RootLayout from "./components/RootLayout.js";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks.js";
import Manager from "./pages/Manager/Manager.js";
import Profile from "./pages/Profile/Profile.js";
import Restaurants from "./pages/Restaurants/Restaurants.js";
import { logout, openAuthModal } from "./store/auth/authSlice.js";
import { fetchProfileThunk } from "./store/users/usersSlice.js";

const router = createBrowserRouter([
  {
    element: <RootLayout />, // ← Layout теперь внутри роутера
    children: [
      { index: true, Component: Menu },
      { path: "menu", Component: Menu },
      { path: "delivery", Component: Delivery },
      { path: "restaurants", Component: Restaurants },
      { path: "about", Component: About },
      { path: "summary", Component: Summary },
      { path: "profile", Component: Profile },
      { path: "manager", Component: Manager },
      { path: "*", Component: NotFound },
    ],
  },
]);
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(fetchProfileThunk()).catch(() => {
      dispatch(logout());
      dispatch(openAuthModal("login"));
    });
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
