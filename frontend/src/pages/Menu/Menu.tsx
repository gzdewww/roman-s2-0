import { useEffect } from "react";
import DishCard from "../../components/DishCard/DishCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchDishes } from "../../store/dishes/dishesSlice";
import "./Menu.scss";
import Spinner from "../../UI/Spinner/Spinner";

export default function Menu() {
  const dishesState = useAppSelector((state) => state.dishes);
  const dispatch = useAppDispatch();

  const getDishes = async () => {
    await dispatch(fetchDishes());
  };

  useEffect(() => {
    getDishes();
  }, []);

  return (
    <>
      {dishesState.loading ? (
        <Spinner />
      ) : (
        <div className="content__menu" role="list">
          {dishesState.items.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </>
  );
}
