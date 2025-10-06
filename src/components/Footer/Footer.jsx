import "./Footer.scss";
import Logo from "../../../public/svg/logo.svg?react";
import { FaTelegram, FaVk } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__info">
          <Logo />
          <p>Roman's™ All rights reserved.</p>
        </div>
        <div className="footer__contacts">
          <a
            className="footer__contacts-link"
            href="https://vk.com/gzdeww"
            target="_blank"
          >
            <FaVk />
          </a>
          <a
            className="footer__contacts-link"
            href="https://t.me/gzdeww"
            target="_blank"
          >
            <FaTelegram />
          </a>
        </div>
      </div>
    </footer>
  );
}
