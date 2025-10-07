import React from "react";

export default function Summary() {
  return (
    <div className="content__summary">
      <div className="summary__delivery">
        <h1>Способ доставки</h1>
        <div className="dropdown">
          <button type="button">
            <span id="order-delivery" className="dropdown-value"></span>
            <span className="dropdown-arrow">▼</span>
          </button>
          <div className="dropdown-options">
            <a href="#">Курьером</a>
            <a href="#">Самовывоз</a>
          </div>
        </div>
        <h1>Адрес</h1>
        <div className="dropdown">
          <button type="button">
            <span id="order-address" className="dropdown-value"></span>
            <span className="dropdown-arrow">▼</span>
          </button>
          <div className="dropdown-options">
            <a href="#">Адрес2</a>
            <a href="#">Адрес3</a>
            <a id="add-address" href="#">
              Добавить адрес
            </a>
          </div>
        </div>
      </div>
      <div className="content-summary-paymethods">
        <h1>Итого:</h1>
        <p className="content-summary-paymethods-total">
          <span className="content-summary-paymethods-total-value">0</span> р.
        </p>
        <h1>Способ оплаты</h1>
        <div className="dropdown">
          <button type="button">
            <span id="order-paymethods" className="dropdown-value">
              Картой курьеру
            </span>
            <span className="dropdown-arrow">▼</span>
          </button>
          <div className="dropdown-options"></div>
        </div>
        <button className="content-summary-paymethods-button" type="button">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
