# 📚 GymBook - README

¡Bienvenidos a **GymBook**! 🎉 Esta es una aplicación diseñada para gestionar tu gimnasio de manera eficiente y sencilla. A continuación, encontrarás toda la información necesaria para comenzar a usarla.

## 📋 Índice

- [🚀 Características](#-características)
- [📦 Instalación](#-instalación)
- [📧 Configurar MailDev](#-configurar-maildev)
- [🛠️ Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [📖 Uso](#-uso)
- [🧪 Pruebas](#-pruebas)
- [📊 Base de Datos](#-base-de-datos)
- [🤝 Contribuciones](#-contribuciones)
- [📞 Contacto](#-contacto)
- [👥 Personas Implicadas](#-personas-implicadas)

---

## 🚀 Características

- **Registro de Usuarios**: Permite a los usuarios registrarse y gestionar su información personal. 📝
- **Clases y Entrenadores**: Visualiza las clases disponibles y los entrenadores asignados. 🏋️‍♂️
- **Inscripciones**: Los usuarios pueden inscribirse en las clases de su elección. 📅
- **Gestión de Roles**: Administra diferentes roles de usuario (administrador, entrenador, etc.). 👥
- **Configuración de Notificaciones**: Personaliza las preferencias de notificación. 🔔
- **Modo Oscuro**: Cambia a un tema oscuro para una mejor experiencia visual. 🌙

---

## 📦 Instalación

### 🧰 Requisitos Previos

- Java 17 o superior
- Maven
- Node.js y npm (para usar MailDev)

### 🧪 Paso a Paso

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu_usuario/GymBook.git
2. **Navega al directorio del proyecto**:
   `````
   cd GymBook
3. **Instala las dependencias**:

   ````
   mvn install
4. **Ejecuta la aplicación**:

   `````
   mvn spring-boot:run
5. **Accede a la aplicación**:
   Abre tu navegador en `http://localhost:8080`.

---

## 📧 Configurar MailDev

MailDev es un servidor SMTP local que permite simular el envío de correos electrónicos, útil para desarrollo.

### ✅ Instalación (si no lo tienes instalado globalmente):

```
npm install -g maildev
```

*O alternativamente, puedes ejecutarlo directamente con npx sin instalarlo globalmente:*

```bash
npx maildev
```


### 🚀 Ejecución:

Si lo tienes instalado globalmente, simplemente ejecuta:

```bash
maildev
```

### 🌐 Interfaz Web:

Una vez iniciado, accede a la interfaz visual en:

```
http://localhost:1080
```

---

## 🛠️ Tecnologías Utilizadas

### Backend

* Java
* Spring Boot
* JPA (Java Persistence API)
* MySQL

### Frontend

* React
* Axios para las solicitudes HTTP

---

## 📖 Uso

1. **Registro de Usuario**: Dirígete a la página de registro y completa el formulario.
2. **Iniciar Sesión**: Usa tus credenciales para acceder a tu cuenta. 🔑
3. **Reservar Clases**: Navega a la sección de clases y selecciona la que deseas reservar.
4. **Configuración**: Ajusta tus preferencias en la sección de configuración. ⚙️

---

## 🧪 Pruebas Postman

### 🔐 Autenticación

#### Iniciar sesión

## Autenticación
# Iniciar sesión 

* **POST**: `http://localhost:8080/auth/login`

* **Cuerpo (JSON)**:
```json
{
  "email": "ana.garcia@example.com",
  "password": "password123"
}
```

![Image](https://github.com/user-attachments/assets/99b3b2e0-5b6b-4d80-b2e6-53ffa04988fe)

#### Recuperar contraseña (requiere MailDev ejecutándose)
* **POST**: `http://localhost:8080/auth/forgot-password`
* **Cuerpo (JSON)**:

```json
{
  "email": "ana.garcia@example.com"
}
```

![Image](https://github.com/user-attachments/assets/9e8256f3-3b8f-4849-8a2b-bfd01c6230f5)

---

## Usuarios
### 👤 Usuarios

#### Crear usuario

* **POST**: `http://localhost:8080/usuarios`
* **Cuerpo (JSON)**:

```json
{
  "nombre": "Nombre del Usuario",
  "email": "usuario@example.com",
  "password": "tu_contraseña",
  "telefono": "123456789"
}
```
   
![Image](https://github.com/user-attachments/assets/37014dc9-7412-4cf5-8364-07f56782bf7d)

#### Obtener todos los usuarios

* **GET**: `http://localhost:8080/usuarios`

![image](https://github.com/user-attachments/assets/fe2cf014-10eb-4fe8-bab1-c57ece52e925)

#### Obtener usuario por ID

* **GET**: `http://localhost:8080/usuarios/{id}`

![image](https://github.com/user-attachments/assets/20af5f1e-90dd-4325-af8b-d74bd7fd2579)

#### Actualizar usuario

* **PUT**: `http://localhost:8080/usuarios/{id}`
* **Cuerpo (JSON)**:

```json
{
  "nombre": "Nuevo Nombre",
  "email": "nuevo_email@example.com",
  "password": "nueva_contraseña",
  "telefono": "12345678"
}
```
    
![image](https://github.com/user-attachments/assets/670f2d7f-9157-43de-9988-a13d0b1e5331)

#### Eliminar usuario

* **DELETE**: `http://localhost:8080/usuarios/{id}`

![image](https://github.com/user-attachments/assets/88acc9c7-b1a9-470c-b194-c7e55cfc2222)

![image](https://github.com/user-attachments/assets/52948ed6-d2ef-429c-9166-24ba0faef394)

---

### 🧑‍🏫 Entrenadores

#### Obtener todos los entrenadores

* **GET**: `http://localhost:8080/entrenadores`

![image](https://github.com/user-attachments/assets/4f624e73-2ca4-40ed-9795-5aedddfe7999)

#### Obtener entrenador por ID

* **GET**: `http://localhost:8080/entrenadores/{id}`

![image](https://github.com/user-attachments/assets/23d0e3f3-767b-4076-a1b3-fa33f5965ebe)

---

### 🧘 Clases

#### Obtener todas las clases

* **GET**: `http://localhost:8080/clases`

![image](https://github.com/user-attachments/assets/4cef8258-4186-4d48-bd96-d5add4aa5aac)

#### Obtener clase por ID

* **GET**: `http://localhost:8080/clases/{id}`

![image](https://github.com/user-attachments/assets/39c5ca5a-3991-4aee-8e52-15dfd68e09b4)

---

### 🥋 Disciplinas

#### Crear disciplina

* **POST**: `http://localhost:8080/disciplinas`
* **Cuerpo (JSON)**:

```json
{
  "nombre": "Nombre de la Disciplina"
}
```
    
![image](https://github.com/user-attachments/assets/206eb71c-f05d-4d27-b01c-00a18a1fc078)

#### Obtener todas las disciplinas

* **GET**: `http://localhost:8080/disciplinas`

![image](https://github.com/user-attachments/assets/ccb79d4b-14fa-4a39-9cec-d48f2f9c84c9)

---

## 📊 Base de Datos

*La estructura de la base de datos se puede visualizar en el siguiente diagrama:*

![Diagrama de Base de Datos](docs/diagrama_ER_gymbook.PNG)  <!-- añadir imagen de la bd -->


## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva característica'`).
4. Envía un pull request.

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- **GitHub**: [ClaudiaCalero](https://github.com/ClaudiaCalero)
- **GitHub**: [samcrugom](https://github.com/samcrugom)
- **GitHub**: [Jose Moreno](https://github.com/nonim12)
- **GitHub**: [Edward Alban](https://github.com/EdwardInDev)

## 👥 Personas Implicadas

- **Clàudia Calero Duró** - [LinkedIn](https://www.linkedin.com/in/claudia-calero/)
- **Samuel Cruz Gómez** - [LinkedIn](https://es.linkedin.com/in/samuel-cruz-gomez)
- **José Antonio Moreno Marín** - [LinkedIn](https://www.linkedin.com/in/jos%C3%A9-antonio-moreno-mar%C3%ADn-190115335/)
- **Edward Alban** - [LinkedIn](https://www.linkedin.com/in/edward-alban-imbaquingo-02757a32a/)

## 🎉 ¡Gracias por usar GymBook! 

