// src/components/Auth/LoginForm.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  loginThunk,
  closeAuthModal,
  switchAuthModalType,
} from "../../store/auth/authSlice";
import Button from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import "./AuthForm.scss";
import { fetchProfileThunk } from "../../store/users/usersSlice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // отправляем логин — thunk кладёт token в localStorage
      await dispatch(loginThunk({ email, password })).unwrap();
      // проверяем токен и получаем профиль
      await dispatch(fetchProfileThunk());
      // закрываем модалку
      dispatch(closeAuthModal());
    } catch (err: any) {
      // errors уже попадут в auth.error через extraReducers,
      // но можно дополнительно логировать/показывать кастомно:
      console.error("Login error:", err);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="auth-form__error">{error}</div>}

      <Input
        label="Email"
        type="email"
        className="auth-form__input"
        value={email}
        onChangeValue={setEmail}
        required
      />

      <Input
        label="Password"
        type="password"
        className="auth-form__input"
        value={password}
        onChangeValue={setPassword}
        required
      />

      <Button type="submit" className="auth-form__button" disabled={loading}>
        {loading ? "Загрузка..." : "Логин"}
      </Button>

      <div className="auth-form__switch">
        Нет аккаунта?{" "}
        <Button
          type="button"
          className="auth-form__link"
          onClick={() => dispatch(switchAuthModalType())}
        >
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
}
