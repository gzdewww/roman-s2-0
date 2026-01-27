import type { Address } from "../types/address";

export const formatAddress = (address: Address): string => {
  if (!address || !address.street) return "Адрес не указан";
  return `${address.street}, ${address.building}, кв.${address.apartment}, этаж ${address.floor}, подъезд ${address.entrance}`;
};

export const formatAddressShort = (address: Address): string => {
  if (!address || !address.street) return "Адрес не указан";
  return `${address.street}, ${address.building}`;
};
