import { useEffect } from "react";
import DishCard from "../../components/DishCard/DishCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchDishes } from "../../store/dishes/dishesSlice";
import "./Menu.scss";

export default function Menu() {
  const dishes = useAppSelector((state) => state.dishes.items);
  const dispatch = useAppDispatch();

  const getDishes = async () => {
    await dispatch(fetchDishes());
  };

  useEffect(() => {
    getDishes();
  }, []);

  return (
    <div className="content__menu" role="list">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
