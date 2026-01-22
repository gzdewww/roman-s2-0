import React from "react";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <div className="content__not-found">
      <img className="not-found__image" src="/svg/404.svg" alt="" />
      <h1 className="not-found__title">Страница не найдена</h1>
    </div>
  );
}
