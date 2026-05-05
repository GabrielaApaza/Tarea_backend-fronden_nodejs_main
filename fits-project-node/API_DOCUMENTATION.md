# 📘 API Documentation - Users Endpoints

## Base URL
```
http://localhost:7000
```

---

## 🔗 Endpoints

### 1. Obtener todos los usuarios
**GET** `/users`

Retorna la lista completa de usuarios registrados.

**Request:**
```http
GET http://localhost:7000/users
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Juan",
    "firstname": "Pérez",
    "email": "juan@example.com",
    "telephone": "123456789",
    "password": "mipassword123",
    "createdAt": "2026-04-28T16:30:00.000Z",
    "updatedAt": "2026-04-28T16:30:00.000Z"
  },
  {
    "id": 2,
    "name": "María",
    "firstname": "García",
    "email": "maria@example.com",
    "telephone": "987654321",
    "password": "password456",
    "createdAt": "2026-04-28T16:35:00.000Z",
    "updatedAt": "2026-04-28T16:35:00.000Z"
  }
]
```

**Error Response:** `500 Internal Server Error`
```json
{
  "message": "Error al obtener usuarios",
  "error": "Descripción del error"
}
```

---

### 2. Obtener usuario por ID
**GET** `/users/:id`

Retorna un usuario específico por su ID.

**Request:**
```http
GET http://localhost:7000/users/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Juan",
  "firstname": "Pérez",
  "email": "juan@example.com",
  "telephone": "123456789",
  "password": "mipassword123",
  "createdAt": "2026-04-28T16:30:00.000Z",
  "updatedAt": "2026-04-28T16:30:00.000Z"
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Usuario no encontrado"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "message": "ID inválido",
  "error": "Descripción del error"
}
```

---

### 3. Crear nuevo usuario
**POST** `/users`

Crea un nuevo usuario en la base de datos.

**Request:**
```http
POST http://localhost:7000/users
Content-Type: application/json

{
  "name": "Juan",
  "firstname": "Pérez",
  "email": "juan@example.com",
  "telephone": "123456789",
  "password": "mipassword123"
}
```

**Body Parameters:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `name` | string | ✅ Sí | Nombre del usuario |
| `firstname` | string | ❌ No | Apellido del usuario |
| `email` | string | ✅ Sí | Correo electrónico |
| `telephone` | string | ❌ No | Número de teléfono |
| `password` | string | ✅ Sí | Contraseña del usuario |

**Response:** `201 Created`
```json
{
  "id": 3,
  "name": "Juan",
  "firstname": "Pérez",
  "email": "juan@example.com",
  "telephone": "123456789",
  "password": "mipassword123",
  "createdAt": "2026-04-28T16:40:00.000Z",
  "updatedAt": "2026-04-28T16:40:00.000Z"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "message": "Error al crear usuario",
  "error": "Descripción del error"
}
```

---

### 4. Actualizar usuario
**PUT** `/users/:id`

Actualiza los datos de un usuario existente.

**Request:**
```http
PUT http://localhost:7000/users/1
Content-Type: application/json

{
  "name": "Juan Carlos",
  "telephone": "111222333"
}
```

**Body Parameters:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `name` | string | ❌ No | Nombre del usuario |
| `firstname` | string | ❌ No | Apellido del usuario |
| `email` | string | ❌ No | Correo electrónico |
| `telephone` | string | ❌ No | Número de teléfono |
| `password` | string | ❌ No | Contraseña del usuario |

> **Nota:** Solo envía los campos que deseas actualizar.

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Juan Carlos",
  "firstname": "Pérez",
  "email": "juan@example.com",
  "telephone": "111222333",
  "password": "mipassword123",
  "createdAt": "2026-04-28T16:30:00.000Z",
  "updatedAt": "2026-04-28T16:45:00.000Z"
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Usuario no encontrado"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "message": "Error al actualizar usuario",
  "error": "Descripción del error"
}
```

---

### 5. Eliminar usuario
**DELETE** `/users/:id`

Elimina un usuario de la base de datos.

**Request:**
```http
DELETE http://localhost:7000/users/1
```

**Response:** `200 OK`
```json
{
  "message": "Usuario eliminado correctamente"
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Usuario no encontrado"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "message": "Error al eliminar usuario",
  "error": "Descripción del error"
}
```

---

## 📋 Códigos de estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | Operación exitosa |
| `201` | Recurso creado exitosamente |
| `400` | Solicitud incorrecta (datos inválidos) |
| `404` | Recurso no encontrado |
| `500` | Error interno del servidor |

---

## 🔧 Notas técnicas

### Base de datos
- **Motor:** PostgreSQL
- **ORM:** Sequelize
- **Tabla:** `users`

### Campos automáticos
Sequelize agrega automáticamente:
- `id`: Entero autoincremental (Primary Key)
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de última actualización

### Formato de fechas
Todas las fechas están en formato ISO 8601:
```
2026-04-28T16:30:00.000Z
```

---

## 🧪 Ejemplos con cURL

### Crear usuario
```bash
curl -X POST http://localhost:7000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan",
    "firstname": "Pérez",
    "email": "juan@example.com",
    "telephone": "123456789",
    "password": "mipassword123"
  }'
```

### Obtener todos los usuarios
```bash
curl http://localhost:7000/users
```

### Obtener usuario por ID
```bash
curl http://localhost:7000/users/1
```

### Actualizar usuario
```bash
curl -X PUT http://localhost:7000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos",
    "telephone": "111222333"
  }'
```

### Eliminar usuario
```bash
curl -X DELETE http://localhost:7000/users/1
```

---

## 🚀 Ejemplos con JavaScript (Fetch API)

### Crear usuario
```javascript
const response = await fetch('http://localhost:7000/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Juan',
    firstname: 'Pérez',
    email: 'juan@example.com',
    telephone: '123456789',
    password: 'mipassword123'
  })
});

const user = await response.json();
console.log(user);
```

### Obtener todos los usuarios
```javascript
const response = await fetch('http://localhost:7000/users');
const users = await response.json();
console.log(users);
```

### Actualizar usuario
```javascript
const response = await fetch('http://localhost:7000/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Juan Carlos',
    telephone: '111222333'
  })
});

const updatedUser = await response.json();
console.log(updatedUser);
```

### Eliminar usuario
```javascript
const response = await fetch('http://localhost:7000/users/1', {
  method: 'DELETE'
});

const result = await response.json();
console.log(result);
```

---

## ⚠️ Consideraciones de seguridad

> **IMPORTANTE:** Esta API actualmente NO implementa:
> - Autenticación
> - Autorización
> - Encriptación de contraseñas
> - Validación de email único
> - Rate limiting
> - CORS configurado

**Recomendaciones para producción:**
1. Implementar JWT o sesiones
2. Hash de contraseñas con bcrypt
3. Validar unicidad de email
4. Configurar CORS apropiadamente
5. Agregar validaciones de entrada

---

**Versión:** 1.0.0  
**Última actualización:** 2026-04-28  
**Base de datos:** PostgreSQL con Sequelize
