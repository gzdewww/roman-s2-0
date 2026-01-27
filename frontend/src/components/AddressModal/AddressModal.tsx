import React, { useState, useCallback } from "react";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import "./AddressModal.scss";
import { addAddress } from "../../api/userApi";
import type { Address } from "../../types/address";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddressModal({ isOpen, onClose }: AddressModalProps) {
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [entrance, setEntrance] = useState<string>("");
  const [comment, setComment] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!street.trim() || !building.trim()) {
        // Поля `street` и `building` обязательны
        return;
      }

      // Преобразуем строки в числа
      const addressData: Address = {
        street: street.trim(),
        building: Number(building),
        apartment: apartment.trim() ? Number(apartment) : undefined,
        floor: floor.trim() ? Number(floor) : undefined,
        entrance: entrance.trim() ? Number(entrance) : undefined,
        comment: comment.trim() || undefined,
      };

      // Отправляем объект, совместимый с DTO
      // Предположим, `addAddress` принимает `Omit<Address, 'id'>`
      addAddress(addressData);

      // Сброс формы
      setStreet("");
      setBuilding("");
      setApartment("");
      setFloor("");
      setEntrance("");
      setComment("");
      onClose();
    },
    [street, building, apartment, floor, entrance, comment, onClose],
  );

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} aria-labelledby="address-modal-title">
      <div className="address-modal">
        <h2 id="address-modal-title" className="address-modal__title">
          Добавить новый адрес
        </h2>

        <form className="address-modal__form" onSubmit={handleSubmit}>
          <div className="address-modal__field">
            <label className="address-modal__label" htmlFor="street-input">
              Улица *
            </label>
            <Input
              id="street-input"
              type="text"
              value={street}
              onChangeValue={setStreet}
              placeholder="Ленина"
              required
            />
          </div>

          <div className="address-modal__field">
            <label className="address-modal__label" htmlFor="building-input">
              Дом *
            </label>
            <Input
              id="building-input"
              type="number"
              value={building}
              onChangeValue={setBuilding}
              placeholder="10"
              required
              min={1}
            />
          </div>

          <div className="address-modal__row">
            <div className="address-modal__field">
              <label className="address-modal__label" htmlFor="entrance-input">
                Подъезд
              </label>
              <Input
                id="entrance-input"
                type="number"
                value={entrance}
                onChangeValue={setEntrance}
                placeholder="2"
                min={1}
              />
            </div>

            <div className="address-modal__field">
              <label className="address-modal__label" htmlFor="apartment-input">
                Квартира
              </label>
              <Input
                id="apartment-input"
                type="number"
                value={apartment}
                onChangeValue={setApartment}
                placeholder="56"
                min={1}
              />
            </div>

            <div className="address-modal__field">
              <label className="address-modal__label" htmlFor="floor-input">
                Этаж
              </label>
              <Input
                id="floor-input"
                type="number"
                value={floor}
                onChangeValue={setFloor}
                placeholder="5"
                min={1}
              />
            </div>
          </div>

          <div className="address-modal__field">
            <label className="address-modal__label" htmlFor="comment-input">
              Комментарий для курьера
            </label>
            <textarea
              id="comment-input"
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
            <Button type="submit" disabled={!street.trim() || !building.trim()}>
              Сохранить адрес
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
