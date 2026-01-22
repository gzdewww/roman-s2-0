import { Route, Routes } from "react-router";
import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";

import About from "./pages/About/About.js";
import Delivery from "./pages/Delivery/Delivery.js";
import Menu from "./pages/Menu/Menu.js";
import NotFound from "./pages/NotFound/NotFound.js";
import Summary from "./pages/Summary/Summary.js";

import "./App.scss";
import Modal from "./UI/Modal/Modal.js";
import LoginForm from "./components/Auth/LoginForm.js";
import RegisterForm from "./components/Auth/RegisterForm.js";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks.js";
import Profile from "./pages/Profile/Profile.js";
import Restaurants from "./pages/Restaurants/Restaurants.js";
import { closeAuthModal } from "./store/auth/authSlice.js";

function App() {
  const isAuthModalOpen = useAppSelector((state) => state.auth.modalOpen);
  const authModalType = useAppSelector((state) => state.auth.modalType);

  const dispatch = useAppDispatch();

  return (
    <>
      <Header />

      <div className="content">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/about" element={<About />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      {isAuthModalOpen && (
        <Modal onClose={() => dispatch(closeAuthModal())}>
          {authModalType === "login" ? <LoginForm /> : <RegisterForm />}
        </Modal>
      )}

      <Footer />
    </>
  );
}

export default App;
