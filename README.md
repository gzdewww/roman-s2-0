# Описание

Проект представляет собой веб-приложение для заказа блюд в ресторанах. В нем реализована авторизация и регистрация пользователей, возможность просматривать меню ресторанов, добавлять блюда в корзину, оформлять заказы и просматривать историю заказов.

## Технологии

Проект разработан с использованием следующих технологий:

- **Frontend**: React, TypeScript, Vite, SCSS, React Router, Redux Toolkit, Axios, React Icons, SVGR
- **Backend**: Spring Boot, Java, Maven, JPA, Hibernate, PostgreSQL, JWT, Spring Security, Lombok, MapStruct, ModelMapper
- **Common**: VS Code, ESLint, Prettier

## Установка и запуск

### Frontend

1. Клонируйте репозиторий: git clone https://github.com/gzdewww/romans2-0.git
2. Перейдите в директорию проекта: cd romans2-0/frontend
3. Установите зависимости: npm install
4. Запустите проект: npm run dev

### Backend

1. Клонируйте репозиторий: git clone https://github.com/gzdewww/romans2-0.git
2. Перейдите в директорию проекта: cd romans2-0/backend
3. Установите зависимости: mvn install
4. Запустите проект: mvn spring-boot:run

## Использование

1. Запустите frontend и backend.
2. Перейдите на страницу регистрации и зарегистрируйтесь.
3. Перейдите на страницу авторизации и войдите.
4. Просмотрите меню ресторанов и добавьте блюда в корзину.
5. Перейдите в корзину и оформите заказ.
6. Просмотрите историю ваших заказов.


## Контракт

GET /api/restaurants — список ресторанов

POST /api/restaurants — создать ресторан (201)

GET /api/restaurants/{id} — получить ресторан

GET /api/restaurants/{id}/menus — меню ресторана

GET /api/menus/{id} — получить меню

POST /api/menus — создать меню (передать restaurantId и опц. dishIds)

POST /api/menus/{id}/dishes — прикрепить блюдо к меню (body: { "dishId": 12 })

DELETE /api/menus/{id}/dishes/{dishId} — убрать блюдо из меню

GET /api/dishes/{id} — получить блюдо

POST /api/dishes — создать блюдо (передать menuIds если нужно)

PUT /api/dishes/{id} — обновить блюдо