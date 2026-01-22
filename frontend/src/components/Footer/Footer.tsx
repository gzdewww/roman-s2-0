import "./Footer.scss";
import Logo from "../../../public/svg/logo.svg?react";
import { FaTelegram, FaVk } from "react-icons/fa6";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__nav">
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="footer__link" to="/menu">
                Меню
              </Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/delivery">
                Доставка и оплата
              </Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/restaurants">
                Рестораны
              </Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link" to="/about">
                О нас
              </Link>
            </li>
          </ul>

          <div className="footer__contacts">
            <a
              aria-label="Ссылка на ВК"
              className="footer__contacts-link"
              href="https://vk.com/gzdeww"
              target="_blank"
              rel="noreferrer"
            >
              <FaVk />
            </a>
            <a
              aria-label="Ссылка на Телеграм"
              className="footer__contacts-link"
              href="https://t.me/gzdeww"
              target="_blank"
              rel="noreferrer"
            >
              <FaTelegram />
            </a>
          </div>
        </div>

        <div className="footer__logo">
          <Logo className="footer__logo-icon" />
          <p className="footer__copyright">Roman's™ All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
