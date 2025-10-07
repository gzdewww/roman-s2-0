import { Route, Routes } from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import { useCart } from "./hooks/useCart";

import About from "./pages/About/About";
import Menu from "./pages/Menu/Menu";
import NotFound from "./pages/NotFound/NotFound";

import "./App.scss";
import Delivery from "./pages/Delivery/Delivery";
import Summary from "./pages/Summary/Summary";

function App() {
  const menu = [
    {
      id: 1,
      name: 'Ромовая баба "Виктория"',
      price: 399,
      calories: 310, // классическая ромовая баба: 250–350 ккал/100 г
      weight: 120, // ~120 г стандартный кусочек
      description:
        "Нежный бисквит, пропитанный ромовым сиропом, с тонким сладким акцентом и лёгкой воздушной текстурой.",
      photo: "/images/rum.jpg",
    },
    {
      id: 2,
      name: 'Ролл фирменный "Софья"',
      price: 499,
      calories: 220, // ролл на 6–8 кусочков: 200–250 ккал
      weight: 180, // средний ролл весит 160–200 г
      description:
        "Изысканное сочетание свежих овощей и отборной рыбы, завернутое в аккуратный ролл с утончённым балансом текстур.",
      photo: "/images/rolls.jpg",
    },
    {
      id: 3,
      name: 'Бургер фирменный "Константин"',
      price: 799,
      calories: 680, // бургер с котлетой 150–200 г: 600–750 ккал
      weight: 320, // вес вместе с булочкой и овощами
      description:
        "Сочная котлета в обрамлении свежих овощей и фирменного соуса, собранная в мягкую булочку, дарит насыщенный и благородный вкус.",
      photo: "/images/burger.jpg",
    },
    {
      id: 4,
      name: 'Картофель фаршированный "Роман"',
      price: 459,
      calories: 420, // фаршированный картофель: 350–450 ккал
      weight: 250, // одна крупная половинка запечённого картофеля
      description:
        "Запечённый до золотистой корочки картофель с деликатной начинкой и тянущимся сыром, раскрывающий глубину вкуса в каждом кусочке.",
      photo: "/images/potato.jpg",
    },
    {
      id: 5,
      name: 'Пицца "Вкусни"',
      price: 999,
      calories: 1850, // пицца целиком: 1600–2000 ккал
      weight: 1050, // стандартная пицца 30 см
      description:
        "Тонкое тесто с румяной корочкой, нежный сыр и ароматный соус в сочетании с щедрой начинкой создают гармонию вкусов, достойную классики.",
      photo: "/images/pizza.jpg",
    },
    {
      id: 6,
      name: 'Чизкейк "Анастасия"',
      price: 429,
      calories: 420, // порция чизкейка: 380–450 ккал
      weight: 150, // стандартный кусочек
      description:
        "Десерт с бархатистой кремовой текстурой и лёгкими ванильными оттенками, оставляющий изысканное послевкусие.",
      photo: "/images/cheesecake.jpg",
    },
    {
      id: 7,
      name: 'Панкейки "Терем"',
      price: 539,
      calories: 620, // 3–4 панкейка с маслом/сиропом
      weight: 260, // стопка из 3–4 штук
      description:
        "Пышные и воздушные панкейки с золотистой корочкой и тонкой сладостью, элегантно сочетающиеся с ягодами, сиропом или сливочным кремом.",
      photo: "/images/pancakes.jpg",
    },
  ];

  const { cart, addToCart, removeFromCart, updateCart, clearCart } = useCart();

  return (
    <>
      <Header
        menu={menu}
        cart={cart}
        removeFromCart={removeFromCart}
        updateCart={updateCart}
        clearCart={clearCart}
      />

      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <Menu
                menu={menu}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateCart={updateCart}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <Menu
                menu={menu}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateCart={updateCart}
              />
            }
          />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/about" element={<About />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
