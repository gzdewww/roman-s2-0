// src/components/AddressModal/AddressModal.tsx
import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import "./AddressModal.scss";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (address: string) => void;
}

export default function AddressModal({
  isOpen,
  onClose,
  onSuccess,
}: AddressModalProps) {
  const [address, setAddress] = useState("");
  const [entrance, setEntrance] = useState("");
  const [apartment, setApartment] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullAddress = `ул. ${address}${entrance ? `, подъезд ${entrance}` : ""}${apartment ? `, кв. ${apartment}` : ""}`;
    onSuccess(fullAddress);

    // Очищаем форму
    setAddress("");
    setEntrance("");
    setApartment("");
    setComment("");
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="address-modal">
        <h2 className="address-modal__title">Добавить новый адрес</h2>

        <form className="address-modal__form" onSubmit={handleSubmit}>
          <div className="address-modal__field">
            <label className="address-modal__label">Улица и дом *</label>
            <Input
              type="text"
              value={address}
              onChangeValue={setAddress}
              placeholder="ул. Ленина, д. 10"
              required
            />
          </div>

          <div className="address-modal__row">
            <div className="address-modal__field">
              <label className="address-modal__label">Подъезд</label>
              <Input
                type="text"
                value={entrance}
                onChangeValue={setEntrance}
                placeholder="1"
              />
            </div>

            <div className="address-modal__field">
              <label className="address-modal__label">Квартира</label>
              <Input
                type="text"
                value={apartment}
                onChangeValue={setApartment}
                placeholder="25"
              />
            </div>
          </div>

          <div className="address-modal__field">
            <label className="address-modal__label">
              Комментарий для курьера
            </label>
            <textarea
              className="address-modal__textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Код домофона 25К, последний этаж"
              rows={3}
            />
          </div>

          <div className="address-modal__buttons">
            <Button type="button" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">Сохранить адрес</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
