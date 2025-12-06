# MemeMarket API - La Bolsa de Memes

Esta es una API REST diseñada con fines educativos para simular una bolsa de valores donde la mercancía que se compra y vende son acciones de memes virales famosos.

El propósito de esta API es permitir interactuar con un sistema de backend funcional, incluyendo: 
1. autenticación de usuarios, 
2. gestión de base de datos y 
3. lógica de transacciones financieras (compra de acciones de Memes).

## Tecnologías Utilizadas

Esta API está construida con la arquitectura MEAN stack (parcialmente, utilizando Node.js/Express y MongoDB) y buenas prácticas de modularidad.

1. Node.js & Express
2. MongoDB (Atlas)
3. Mongoose
4. bcryptjs: para hasheo de contraseñas de usuarios.
5. jsonwebtoken (JWT): autenticación basada en tokens para rutas.
6. dotenv: Gestión de variables de entorno.

## Estructura del Proyecto

El proyecto sigue una estructura modular para separar responsabilidades (MVC - Model-View-Controller)

# Cómo Empezar

1. Requisitos

Node.js (versión 18+)
MongoDB Atlas (o instancia local)
Postman o herramienta similar para probar los endpoints.

2. Instalación de Dependencias
```
npm install
```

3. Configuración del Archivo .env

Asegúrate de haber configurado tu archivo .env en la raíz del proyecto con tu cadena de conexión de MongoDB Atlas y una frase secreta para el JWT.
```
PORT=3000
MONGO_URI=mongodb+srv://<USUARIO>:<PASSWORD>@cluster0.abcde.mongodb.net/mememarket?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_para_firmar_tokens
```

4. Inicializar y Ejecutar

Utiliza nodemon para ejecutar la aplicación en modo desarrollo.
```
npm run dev
```

# Endpoints Principales

Aquí tienes una lista concisa de los endpoints principales de la API MemeMarket, sin formato de tabla:

Autenticación:

POST /api/auth/register (Para crear usuarios)

POST /api/auth/login (Para obtener el token de acceso)

Mercado y Transacciones (Requieren Token):

GET /api/market (Consulta las acciones de memes disponibles)

POST /api/market/buy (Permite comprar acciones de memes)

Información del Usuario (Requieren Token):

GET /api/users/profile (Consulta el saldo y portafolio del usuario autenticado)

GET /api/users/:userId/transactions (Consulta el historial de transacciones de un usuario por su ID)
