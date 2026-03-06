# 💎 Jewerly Store — Backend API

API REST para una tienda de joyería en línea, construida con **Node.js**, **Express 5** y **MongoDB** (Mongoose). Incluye autenticación JWT, control de acceso por roles, y módulos para gestión de productos, categorías, colecciones, carrito de compras y lista de favoritos.

---

## 🛠️ Tecnologías

| Tecnología               | Versión | Propósito                        |
| ------------------------ | ------- | -------------------------------- |
| **Node.js**              | 20+     | Runtime (ES Modules)             |
| **Express**              | 5.x     | Framework HTTP                   |
| **Mongoose**             | 9.x     | ODM para MongoDB                 |
| **JWT**                  | 9.x     | Autenticación con tokens         |
| **bcrypt**               | 6.x     | Hash de contraseñas              |
| **CORS**                 | 2.x     | Manejo de políticas cross-origin |
| **Google Generative AI** | 0.24.x  | Integración con IA generativa    |

---

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   ├── global.config.js      # Roles y constantes globales
│   │   └── mongo.config.js       # Conexión a MongoDB
│   ├── controllers/
│   │   ├── auth.controller.js    # Login y renovación de token
│   │   ├── cart.controller.js    # Lógica del carrito
│   │   ├── category.controller.js
│   │   ├── collection.controller.js
│   │   ├── favorite.controller.js # Lógica de favoritos
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── helpers/
│   │   ├── bcrypt.helper.js      # Encriptación de contraseñas
│   │   ├── jwt.helper.js         # Generación y verificación de JWT
│   │   └── password.helper.js    # Validación de contraseñas
│   ├── middlewares/
│   │   ├── authentication.middleware.js  # Verificación de token JWT
│   │   ├── authorization.middleware.js   # Verificación de roles
│   │   └── without-role.middleware.js    # Acceso sin rol (registro)
│   ├── models/
│   │   ├── Cart.model.js
│   │   ├── Category.model.js
│   │   ├── collection.model.js
│   │   ├── Favorite.model.js
│   │   ├── Product.model.js
│   │   └── User.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── cart.route.js
│   │   ├── category.route.js
│   │   ├── collection.route.js
│   │   ├── favorite.route.js
│   │   ├── products.route.js
│   │   └── user.route.js
│   ├── services/
│   │   ├── cart.service.js
│   │   ├── category.service.js
│   │   ├── collection.service.js
│   │   ├── favorite.service.js
│   │   ├── product.service.js
│   │   └── user.service.js
│   └── index.js                  # Punto de entrada del servidor
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/) v20 o superior
- [MongoDB](https://www.mongodb.com/) (local o Atlas)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/guerrrerotolozar/Jewerly-Store-Backend.git
cd Jewerly-Store-Backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
#    Copiar el archivo de ejemplo y completar los valores
cp .env.example .env
```

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3030
DB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<database>
JWT_SEED=tu_clave_secreta_para_jwt
```

### Iniciar el servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3030/api/v1`

---

## 🔐 Sistema de Roles

La API implementa un sistema de control de acceso basado en roles:

| Rol            | Descripción   | Permisos principales                                           |
| -------------- | ------------- | -------------------------------------------------------------- |
| `admin`        | Administrador | CRUD completo de usuarios, productos, categorías y colecciones |
| `collaborator` | Colaborador   | Crear, editar y eliminar productos, categorías y colecciones   |
| `registered`   | Registrado    | Acceso de lectura a recursos                                   |
| `cliente`      | Cliente       | Carrito de compras y lista de favoritos                        |

> Los nuevos usuarios registrados reciben automáticamente los roles `registered` y `cliente`.

---

## 📡 Endpoints de la API

Base URL: `/api/v1`

### 🔑 Autenticación (`/auth`)

| Método | Ruta                | Descripción             | Autenticación    |
| ------ | ------------------- | ----------------------- | ---------------- |
| `POST` | `/auth/login`       | Iniciar sesión          | ❌ Pública       |
| `POST` | `/auth/register`    | Registrar nuevo usuario | ❌ Pública       |
| `GET`  | `/auth/renew-token` | Renovar token JWT       | ✅ Cualquier rol |

---

### 👤 Usuarios (`/user`)

> Solo accesible por administradores.

| Método   | Ruta            | Descripción               |
| -------- | --------------- | ------------------------- |
| `POST`   | `/user`         | Crear usuario             |
| `GET`    | `/user`         | Listar todos los usuarios |
| `GET`    | `/user/:idUser` | Obtener usuario por ID    |
| `PATCH`  | `/user/:idUser` | Actualizar usuario        |
| `DELETE` | `/user/:idUser` | Eliminar usuario          |

---

### 📦 Productos (`/product`)

| Método   | Ruta                   | Descripción                       | Roles               |
| -------- | ---------------------- | --------------------------------- | ------------------- |
| `GET`    | `/product`             | Listar todos los productos        | Pública             |
| `GET`    | `/product/category`    | Productos agrupados por categoría | Pública             |
| `GET`    | `/product/:idProducts` | Obtener producto por ID           | Pública             |
| `POST`   | `/product`             | Crear producto                    | Admin, Collaborator |
| `PATCH`  | `/product/:idProducts` | Actualizar producto               | Admin, Collaborator |
| `DELETE` | `/product/:idProducts` | Eliminar producto                 | Admin               |

---

### 🏷️ Categorías (`/category`)

| Método   | Ruta                    | Descripción              | Roles               |
| -------- | ----------------------- | ------------------------ | ------------------- |
| `GET`    | `/category`             | Listar categorías        | Cualquier rol       |
| `GET`    | `/category/:idcategory` | Obtener categoría por ID | Cualquier rol       |
| `POST`   | `/category`             | Crear categoría          | Admin, Collaborator |
| `DELETE` | `/category/:idcategory` | Eliminar categoría       | Admin, Collaborator |

---

### 🗂️ Colecciones (`/collection`)

| Método   | Ruta                        | Descripción              | Roles               |
| -------- | --------------------------- | ------------------------ | ------------------- |
| `GET`    | `/collection`               | Listar colecciones       | Cualquier rol       |
| `GET`    | `/collection/:idcollection` | Obtener colección por ID | Cualquier rol       |
| `POST`   | `/collection`               | Crear colección          | Admin, Collaborator |
| `DELETE` | `/collection/:idcollection` | Eliminar colección       | Admin, Collaborator |

---

### 🛒 Carrito de Compras (`/cart`)

> Requiere autenticación y rol `cliente`.

| Método   | Ruta               | Descripción                   | Body                      |
| -------- | ------------------ | ----------------------------- | ------------------------- |
| `GET`    | `/cart`            | Obtener carrito del usuario   | —                         |
| `POST`   | `/cart`            | Agregar producto al carrito   | `{ productId, quantity }` |
| `PATCH`  | `/cart/:productId` | Actualizar cantidad           | `{ quantity }`            |
| `DELETE` | `/cart/:productId` | Eliminar producto del carrito | —                         |
| `DELETE` | `/cart`            | Vaciar carrito completo       | —                         |

---

### ❤️ Favoritos (`/favorite`)

> Requiere autenticación y rol `cliente`.

| Método   | Ruta                   | Descripción                  | Body            |
| -------- | ---------------------- | ---------------------------- | --------------- |
| `GET`    | `/favorite`            | Obtener lista de favoritos   | —               |
| `POST`   | `/favorite`            | Agregar producto a favoritos | `{ productId }` |
| `DELETE` | `/favorite/:productId` | Eliminar de favoritos        | —               |
| `DELETE` | `/favorite`            | Vaciar lista de favoritos    | —               |

---

## 🧩 Arquitectura

El proyecto sigue una arquitectura por capas:

```
Request → Route → Middleware(s) → Controller → Service → Model → MongoDB
```

- **Routes** — Definen los endpoints y encadenan middlewares.
- **Middlewares** — Autenticación (JWT) y autorización (roles).
- **Controllers** — Reciben la petición, validan datos y delegan al servicio.
- **Services** — Contienen la lógica de negocio y consultas a la base de datos.
- **Models** — Esquemas de Mongoose que definen la estructura de los documentos.

---

## 👥 Autores

- **Ronald Zinedine Guerrero Toloza** — [guerrerotoloza.ro@gmail.com](mailto:guerrerotoloza.ro@gmail.com)
- **Felipe Cardenas** — [felipecas097@gmail.com](mailto:felipecas097@gmail.com)
- **Juan Carlos Jimenez Gutierrez** — [jangojes@gmail.com](mailto:jangojes@gmail.com)

---

## 📄 Licencia

Este proyecto está bajo la licencia **ISC**.
