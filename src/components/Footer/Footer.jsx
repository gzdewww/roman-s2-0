import React from "react";
import "./Footer.scss";
import Logo from "../../../public/svg/logo.svg?react";
import { BsTelegram } from "react-icons/bs";
import { FaTelegram, FaVk } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-info">
          <Logo />
          <p>Roman's™ All rights reserved.</p>
        </div>
        <div className="footer-contact">
          <a href="https://vk.com/gzdeww" target="_blank">
            <FaTelegram />
          </a>
          <a href="https://t.me/PomaProho" target="_blank">
            <FaVk />
          </a>
        </div>
      </div>
    </footer>
  );
}
