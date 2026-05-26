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
- Integración frontend-backend
- Deploy frontend en Vercel
- Deploy backend en DigitalOcean App Platform
- Logs básicos de aplicación
- Healthchecks de contenedores
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
│   ├── app/
│   ├── .env.example
│   ├── .env.local              # No se sube a GitHub
│   ├── package.json
│   └── README.md
│
├── core-api/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env                    # No se sube a GitHub
│   ├── .env.example
│   ├── .gitignore
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
- Despliegue activo en Vercel
- Variable pública configurada para consumir el backend
- Consume el endpoint `GET /status` de `core-api`
- Muestra el estado del backend en la interfaz

### Backend — `core-api`

- Microservicio creado con Node.js + Express
- API funcional localmente
- API desplegada públicamente en DigitalOcean App Platform
- Contenerizado con Docker
- Ejecutado localmente mediante Docker Compose
- Variables de entorno configuradas mediante `.env` local y variables cloud
- Archivo `.env.example` disponible como plantilla segura
- Middleware básico de logging implementado con `console.log`
- CORS configurado para permitir consumo desde frontend
- Healthcheck configurado localmente en `docker-compose.yml`
- Contenedor local validado con estado `healthy`

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
- CORS

### DevOps / Cloud

- Git
- GitHub
- Docker
- Docker Compose
- Vercel
- DigitalOcean App Platform
- Kubernetes, próximamente
- Terraform, próximamente
- Ansible, próximamente
- Observabilidad avanzada, próximamente

---

## 🌐 Arquitectura actual

### Arquitectura local

```bash
Usuario
  ↓
http://localhost:3000
  ↓
cloudops-portal
  ↓
http://localhost:4000/status
  ↓
core-api en Docker
```

### Arquitectura en cloud

```bash
Usuario
  ↓
Vercel
cloudops-portal
  ↓
NEXT_PUBLIC_CORE_API_URL
  ↓
DigitalOcean App Platform
core-api
  ↓
GET /status
```

Backend público actual:

```bash
https://whale-app-6iffy.ondigitalocean.app
```

Endpoints públicos:

```bash
https://whale-app-6iffy.ondigitalocean.app/health
https://whale-app-6iffy.ondigitalocean.app/status
```

---

## 🔗 Integración Frontend → Backend

El frontend `cloudops-portal` ya se comunica con el backend `core-api`.

La variable utilizada en Next.js es:

```env
NEXT_PUBLIC_CORE_API_URL=http://localhost:4000
```

En local, esta variable debe vivir en:

```bash
cloudops-portal/.env.local
```

Para producción en Vercel, esta variable debe configurarse desde la plataforma de Vercel con el valor público de DigitalOcean:

```env
NEXT_PUBLIC_CORE_API_URL=https://whale-app-6iffy.ondigitalocean.app
```

También debe existir una plantilla segura en:

```bash
cloudops-portal/.env.example
```

con un valor de referencia:

```env
NEXT_PUBLIC_CORE_API_URL=http://localhost:4000
```

El frontend consume actualmente:

```bash
GET /status
```

Respuesta esperada:

```json
{
  "service": "core-api",
  "status": "running"
}
```

> Nota: en producción no se debe usar `localhost:4000`, porque Vercel no puede consumir servicios que solo existen en la máquina local. En producción se usa la URL pública del backend desplegado en DigitalOcean.

---

## 🚀 Deploy actual

### Frontend en Vercel

Frontend desplegado en Vercel:

```bash
https://cloudops-portal.vercel.app/
```

La variable de entorno de producción en Vercel debe ser:

```env
NEXT_PUBLIC_CORE_API_URL=https://whale-app-6iffy.ondigitalocean.app
```

Después de cambiar una variable `NEXT_PUBLIC_` en Vercel, se debe hacer redeploy para que Next.js tome el nuevo valor durante el build.

### Backend en DigitalOcean App Platform

Backend desplegado en DigitalOcean App Platform:

```bash
https://whale-app-6iffy.ondigitalocean.app
```

Variables configuradas en DigitalOcean:

```env
NODE_ENV=production
PORT=3000
```

Configuración principal del servicio:

```bash
Tipo de recurso: Web Service
Estrategia de build: Dockerfile
Puerto HTTP público: 3000
Contenedores: 1
Tamaño inicial: 512 MB RAM / 1 vCPU compartida
```

Pruebas públicas:

```bash
curl https://whale-app-6iffy.ondigitalocean.app/health
curl https://whale-app-6iffy.ondigitalocean.app/status
```

---

## 🐳 Dockerización de `core-api`

El backend `core-api` cuenta con:

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

El proyecto cuenta con un archivo `docker-compose.yml` en la raíz:

```bash
cloud-ops-lab/docker-compose.yml
```

Configuración actual recomendada:

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
    env_file:
      - ./core-api/.env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

### ¿Qué hace este archivo?

- Lee la configuración del servicio `core-api`
- Construye la imagen usando `core-api/Dockerfile`
- Asigna el tag `core-api:dev`
- Crea el contenedor `core-api-container`
- Mapea el puerto `4000` de la máquina local al puerto `3000` del contenedor
- Lee variables desde `./core-api/.env`
- Configura un healthcheck contra `/health`
- Reinicia el servicio automáticamente salvo que se detenga manualmente

---

## ⚙️ Variables de entorno

### Backend local

En `core-api/index.js` se utiliza:

```js
const PORT = process.env.PORT || 3000;
```

Y desde `docker-compose.yml` se carga el archivo:

```yaml
env_file:
  - ./core-api/.env
```

El archivo local `core-api/.env` contiene:

```env
PORT=3000
NODE_ENV=development
```

Este archivo no debe subirse a GitHub.

La plantilla segura `core-api/.env.example` sí debe subirse:

```env
PORT=3000
NODE_ENV=development
```

### Backend en DigitalOcean

En DigitalOcean App Platform las variables se configuran en la plataforma:

```env
NODE_ENV=production
PORT=3000
```

### Frontend local

En `cloudops-portal/.env.local`:

```env
NEXT_PUBLIC_CORE_API_URL=http://localhost:4000
```

### Frontend en Vercel

En Vercel:

```env
NEXT_PUBLIC_CORE_API_URL=https://whale-app-6iffy.ondigitalocean.app
```

### Diferencia importante

```bash
PORT=3000
```

Define el puerto interno donde Express escucha dentro del contenedor o en DigitalOcean.

```yaml
ports:
  - "4000:3000"
```

Mapea el puerto `4000` de la máquina local hacia el puerto `3000` del contenedor.

---

## 🩺 Healthcheck

El servicio `core-api` tiene un healthcheck configurado en Docker Compose:

```yaml
healthcheck:
  test: ["CMD", "wget", "-qO-", "http://localhost:3000/health"]
  interval: 30s
  timeout: 5s
  retries: 3
  start_period: 10s
```

Este healthcheck se ejecuta dentro del contenedor, por eso usa:

```bash
http://localhost:3000/health
```

No usa `localhost:4000`, porque el puerto `4000` existe en la máquina local. Dentro del contenedor, la API escucha en el puerto `3000`.

Para validar el estado:

```bash
docker ps
```

Resultado esperado:

```bash
Up ... (healthy)
```

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

Los logs `GET /health` aparecen frecuentemente porque Docker ejecuta el healthcheck de manera periódica.

---

## 🌍 CORS

El backend tiene CORS configurado para permitir que el frontend pueda consumir la API desde otro origen.

Ejemplo:

```js
const cors = require('cors');

app.use(cors());
```

Esto permite que el frontend en Vercel pueda consumir el backend desplegado en DigitalOcean.

Más adelante se puede endurecer esta configuración para permitir solo orígenes específicos, por ejemplo:

```js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://cloudops-portal.vercel.app'
  ]
}));
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

Durante esta fase se reforzaron conceptos clave de Docker, cloud y arquitectura local:

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
`.env` guarda valores locales reales y `.env.example` documenta qué variables necesita el proyecto.

### Logs

La aplicación escribe logs con `console.log`, Docker los captura y se consultan con `docker compose logs`.

### Healthcheck

Docker verifica periódicamente si el contenedor está saludable consultando el endpoint `/health`.

### CORS

Permite que el frontend pueda consumir una API que vive en otro origen, dominio o puerto.

### Integración frontend-backend

El frontend consume el endpoint `/status` del backend para mostrar el estado real del microservicio.

### Deploy cloud

El frontend vive en Vercel y el backend vive en DigitalOcean App Platform.

---

## 🧪 Pruebas de API

### Pruebas locales

Con el contenedor levantado, probar:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/status
```

POST test:

```bash
curl -X POST http://localhost:4000/test \
  -H "Content-Type: application/json" \
  -d '{"message":"testing from docker compose"}'
```

### Pruebas en DigitalOcean

```bash
curl https://whale-app-6iffy.ondigitalocean.app/health
curl https://whale-app-6iffy.ondigitalocean.app/status
```

POST test:

```bash
curl -X POST https://whale-app-6iffy.ondigitalocean.app/test \
  -H "Content-Type: application/json" \
  -d '{"message":"testing from digitalocean"}'
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

Crear archivo `.env.local`:

```bash
cp .env.example .env.local
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

Estado: avanzado.

### Fase 2 — Docker e integración local

- Crear Dockerfile para `core-api`
- Crear `.dockerignore`
- Construir imagen Docker del backend
- Ejecutar microservicio en contenedor
- Agregar Docker Compose
- Configurar variables de entorno
- Agregar logs básicos por request
- Agregar healthcheck
- Conectar frontend con backend localmente
- Preparar entorno local reproducible

Estado: avanzado.

### Fase 2.5 — Backend público en cloud

- Desplegar `core-api` en DigitalOcean App Platform
- Configurar variables de entorno en DigitalOcean
- Validar endpoints públicos `/health` y `/status`
- Conectar Vercel con el backend público
- Confirmar frontend consumiendo backend en producción

Estado: completado.

### Fase 3 — Microservicios

- Separar servicios por dominio
- Crear servicio de usuarios
- Crear servicio de autenticación
- Implementar API Gateway básico

### Fase 4 — Cloud avanzado

- Crear cluster Kubernetes con DOKS
- Configurar Load Balancer
- Preparar manifiestos Kubernetes
- Publicar imágenes en un registry
- Automatizar despliegues

### Fase 5 — DevOps real

- Implementar CI/CD completo
- Automatizar despliegues
- Configurar logs y métricas
- Agregar monitoreo
- Manejar variables de entorno y secretos
- Añadir prácticas básicas de DevSecOps

---

## 📊 Avance estimado del proyecto

```bash
Proyecto completo CloudOps Lab: 40% - 45%
```

Avance por fases:

```bash
FASE 1 — Base del proyecto: 90%
FASE 2 — Docker: 85%
FASE 2.5 — Backend público: 90%
FASE 3 — Microservicios: 5%
FASE 4 — Kubernetes / Cloud avanzado: 5%
FASE 5 — CI/CD / Monitoring / Security: 10%
```

---

## 🧭 Próximos pasos técnicos

Siguientes mejoras recomendadas:

- Ajustar CORS para permitir únicamente orígenes autorizados
- Manejar estados de carga y error en el frontend
- Mejorar logs con formato estructurado
- Documentar arquitectura inicial con diagrama
- Preparar `docker-compose` para múltiples servicios
- Agregar base de datos en contenedor
- Preparar primer microservicio adicional
- Publicar imagen Docker en un registry
- Migrar progresivamente hacia Kubernetes en DigitalOcean

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

## 📌 Repositorios relacionados

Frontend:

```bash
https://github.com/Darkreach2023/cloudops-portal
```

Backend:

```bash
https://github.com/Darkreach2023/cloudops-core-api
```

---

## 👨‍💻 Autor

Proyecto desarrollado por **César Ramírez** como parte de su laboratorio personal de arquitectura cloud, DevOps y microservicios.
