# CloudOps Lab

Laboratorio práctico de arquitectura cloud, DevOps, microservicios y despliegue moderno.

**CloudOps Lab** es un proyecto personal diseñado para simular una plataforma tipo producción, donde se integran frontend, backend, contenedores, automatización, observabilidad y despliegue cloud.

Actualmente el proyecto está dividido en dos componentes principales:

```bash
cloud-ops-lab/
├── cloudops-portal/      # Frontend Next.js
├── core-api/             # Backend Node.js + Express
└── docker-compose.yml    # Orquestación local con Docker Compose
```

---

## 📌 Descripción del proyecto

El objetivo de **CloudOps Lab** es aprender y dominar arquitectura cloud y DevOps mediante práctica real, construyendo una plataforma progresiva con enfoque profesional.

El proyecto busca cubrir conceptos como:

- Arquitectura basada en microservicios
- Frontend desacoplado
- Backend con Node.js y Express
- Contenedores con Docker
- Orquestación local con Docker Compose
- Variables de entorno
- Logs básicos de aplicación
- CI/CD
- Kubernetes
- Observabilidad
- Seguridad básica DevSecOps
- Infraestructura como código

---

## 🏗️ Estructura general del laboratorio

```bash
cloud-ops-lab/
├── cloudops-portal/
│   └── Frontend construido con Next.js
│
├── core-api/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── package-lock.json
│   └── index.js
│
└── docker-compose.yml
```

---

## 🚀 Estado actual

### Frontend — `cloudops-portal`

- Aplicación creada con Next.js
- Proyecto conectado a GitHub
- Despliegue inicial en Vercel
- Base lista para construir el dashboard CloudOps

### Backend — `core-api`

- Microservicio creado con Node.js + Express
- API funcional localmente
- Contenerizado con Docker
- Ejecutado correctamente mediante Docker Compose
- Variables de entorno configuradas desde `docker-compose.yml`
- Middleware básico de logging implementado con `console.log`

Endpoints disponibles:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Verifica que la API esté funcionando |
| GET | `/status` | Devuelve el estado del servicio |
| POST | `/test` | Recibe datos JSON de prueba |

---

## 🧱 Stack tecnológico

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint
- Vercel

### Backend

- Node.js
- Express.js

### DevOps / Cloud

- Git
- GitHub
- Docker
- Docker Compose
- Vercel
- Kubernetes, próximamente
- DigitalOcean, próximamente
- Terraform, próximamente
- Ansible, próximamente
- Observabilidad, próximamente

---

## 🐳 Dockerización de `core-api`

El backend `core-api` ya cuenta con:

```bash
core-api/
├── Dockerfile
└── .dockerignore
```

### Imagen Docker

La imagen de desarrollo se construye con el tag:

```bash
core-api:dev
```

Comando manual para construir la imagen desde `core-api/`:

```bash
docker build -t core-api:dev .
```

### Ejecutar manualmente el contenedor

```bash
docker run --name core-api-container -p 4000:3000 core-api:dev
```

Esto significa:

```bash
localhost:4000  ->  contenedor:3000
```

La API queda disponible en:

```bash
http://localhost:4000
```

---

## 🧩 Docker Compose

El proyecto ya cuenta con un archivo `docker-compose.yml` en la raíz:

```bash
cloud-ops-lab/docker-compose.yml
```

Configuración actual:

```yaml
services:
  core-api:
    build:
      context: ./core-api
      dockerfile: Dockerfile
    image: core-api:dev
    container_name: core-api-container
    ports:
      - "4000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=development
    restart: unless-stopped
```

### ¿Qué hace este archivo?

- Construye la imagen usando `core-api/Dockerfile`
- Asigna el tag `core-api:dev`
- Crea el contenedor `core-api-container`
- Mapea el puerto `4000` de la máquina local al puerto `3000` del contenedor
- Inyecta variables de entorno al contenedor
- Reinicia el servicio automáticamente salvo que se detenga manualmente

---

## ⚙️ Variables de entorno

El puerto interno del backend ya no está fijo directamente en el código.

En `index.js` se utiliza:

```js
const PORT = process.env.PORT || 3000;
```

Y desde `docker-compose.yml` se inyecta:

```yaml
environment:
  - PORT=3000
  - NODE_ENV=development
```

Esto permite separar la configuración del código.

### Diferencia importante

```bash
PORT=3000
```

Define el puerto interno donde Express escucha dentro del contenedor.

```yaml
ports:
  - "4000:3000"
```

Mapea el puerto `4000` de la máquina local hacia el puerto `3000` del contenedor.

---

## 📋 Middleware de logs

Se agregó un middleware básico para registrar cada petición HTTP que llega a la API:

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

Este middleware permite observar en logs qué endpoints están siendo consumidos.

Ejemplo:

```bash
GET /health
GET /status
POST /test
```

Los logs no se guardan en un archivo dentro del proyecto.  
`console.log` escribe en la salida estándar del proceso Node.js y Docker captura esa salida.

Se pueden consultar con:

```bash
docker compose logs -f core-api
```

O directamente con el nombre del contenedor:

```bash
docker logs -f core-api-container
```

---

## ▶️ Comandos principales con Docker Compose

Todos estos comandos deben ejecutarse desde la raíz del proyecto:

```bash
cd cloud-ops-lab
```

### Levantar el proyecto

```bash
docker compose up
```

### Levantar en segundo plano

```bash
docker compose up -d
```

### Reconstruir imagen y levantar contenedor

Usar cuando cambia el código, el `Dockerfile` o dependencias:

```bash
docker compose down
docker compose up --build
```

O en segundo plano:

```bash
docker compose down
docker compose up -d --build
```

### Ver servicios activos

```bash
docker compose ps
```

### Ver logs del servicio

```bash
docker compose logs -f core-api
```

### Ver últimas líneas de logs

```bash
docker compose logs --tail=30 -f core-api
```

### Detener sin borrar contenedores

```bash
docker compose stop
```

### Volver a iniciar contenedores detenidos

```bash
docker compose start
```

### Detener y borrar contenedores/red de Compose

```bash
docker compose down
```

---

## 🧠 Conceptos aprendidos

Durante esta fase se reforzaron conceptos clave de Docker:

### Imagen

Una imagen es una plantilla construida a partir del `Dockerfile`.

Ejemplo:

```bash
core-api:dev
```

### Contenedor

Un contenedor es una instancia en ejecución de una imagen.

Ejemplo:

```bash
core-api-container
```

### Dockerfile

Define cómo construir la imagen del backend.

### `.dockerignore`

Define qué archivos no deben entrar al contexto de construcción de Docker.

### Docker Compose

Permite definir y ejecutar servicios desde un archivo YAML, evitando escribir manualmente todos los comandos `docker build` y `docker run`.

### Variables de entorno

Permiten separar configuración del código.

### Logs

La aplicación escribe logs con `console.log`, Docker los captura y se consultan con `docker compose logs`.

---

## 🧪 Pruebas de API

Con el contenedor levantado, probar:

### Health check

```bash
curl http://localhost:4000/health
```

### Status

```bash
curl http://localhost:4000/status
```

### POST test

```bash
curl -X POST http://localhost:4000/test \
  -H "Content-Type: application/json" \
  -d '{"message":"testing from docker compose"}'
```

---

## 🌐 Deploy

Frontend desplegado en Vercel:

```bash
https://cloudops-portal.vercel.app/
```

---

## ⚙️ Instalación local del frontend

Clonar el repositorio:

```bash
git clone https://github.com/Darkreach2023/cloudops-portal.git
```

Entrar al proyecto:

```bash
cd cloudops-portal
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir en el navegador:

```bash
http://localhost:3000
```

---

## 📂 Scripts disponibles del frontend

Ejecutar entorno de desarrollo:

```bash
npm run dev
```

Construir aplicación para producción:

```bash
npm run build
```

Ejecutar aplicación en modo producción:

```bash
npm run start
```

Ejecutar revisión de código:

```bash
npm run lint
```

---

## 🎯 Roadmap del proyecto

### Fase 1 — Base del proyecto

- Crear frontend con Next.js
- Conectar repositorio a GitHub
- Desplegar frontend en Vercel
- Crear backend base con Node.js + Express

Estado: completado parcialmente.

### Fase 2 — Docker

- Crear Dockerfile para `core-api`
- Crear `.dockerignore`
- Construir imagen Docker del backend
- Ejecutar microservicio en contenedor
- Agregar Docker Compose
- Configurar variables de entorno
- Agregar logs básicos por request
- Preparar entorno local reproducible

Estado: en progreso avanzado.

### Fase 3 — Microservicios

- Separar servicios por dominio
- Crear servicio de usuarios
- Crear servicio de autenticación
- Implementar API Gateway básico

### Fase 4 — Cloud

- Desplegar servicios en DigitalOcean
- Crear cluster Kubernetes con DOKS
- Configurar Load Balancer
- Preparar manifiestos Kubernetes

### Fase 5 — DevOps real

- Implementar CI/CD completo
- Automatizar despliegues
- Configurar logs y métricas
- Agregar monitoreo
- Manejar variables de entorno y secretos
- Añadir prácticas básicas de DevSecOps

---

## 🧭 Próximos pasos técnicos

Siguientes mejoras recomendadas:

- Agregar `healthcheck` en `docker-compose.yml`
- Crear archivo `.env` para variables de entorno
- Mejorar logs con formato estructurado
- Documentar arquitectura inicial
- Preparar `docker-compose` para múltiples servicios
- Agregar base de datos en contenedor
- Preparar primer microservicio adicional

---

## 🧑‍💻 Perfil profesional objetivo

Este proyecto está orientado a desarrollar habilidades para roles como:

- DevOps Engineer
- Cloud Engineer
- Site Reliability Engineer
- Backend Engineer
- Platform Engineer
- Cloud Security Engineer

El enfoque principal es construir una plataforma realista, escalable y mantenible, aplicando buenas prácticas de arquitectura de software, operación cloud y automatización.

---
##healthcheck
.env
.env.example
env_file
variable fuera de YAML

## 📌 Repositorios relacionados

Frontend:

```bash
https://github.com/Darkreach2023/cloudops-portal
```

Backend:

```bash
core-api
```

---

## 👨‍💻 Autor

Proyecto desarrollado por **César Ramírez** como parte de su laboratorio personal de arquitectura cloud, DevOps y microservicios.
