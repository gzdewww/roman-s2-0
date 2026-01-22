// src/components/Auth/RegisterForm.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  registerThunk,
  getProfileThunk,
  closeAuthModal,
  switchAuthModalType,
} from "../../store/auth/authSlice";
import Button from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import "./AuthForm.scss";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerThunk({ name, email, password })).unwrap();

      await dispatch(getProfileThunk()).unwrap();
      dispatch(closeAuthModal());
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="auth-form__error">{error}</div>}

      <Input
        label="Имя"
        type="text"
        value={name}
        onChangeValue={setName}
        required
      />

      <Input
        label="E-mail"
        type="email"
        value={email}
        onChangeValue={setEmail}
        required
      />

      <Input
        label="Пароль"
        type="password"
        value={password}
        onChangeValue={setPassword}
        required
      />

      <Button type="submit" className="auth-form__button" disabled={loading}>
        {loading ? "Регистрация..." : "Зарегистрироваться"}
      </Button>

      <div className="auth-form__switch">
        Уже есть аккаунт?{" "}
        <Button
          type="button"
          className="auth-form__link"
          onClick={() => dispatch(switchAuthModalType())}
        >
          Войти
        </Button>
      </div>
    </form>
  );
}
