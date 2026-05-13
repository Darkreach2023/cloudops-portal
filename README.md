Frontend principal del proyecto **CloudOps Lab**, una plataforma de laboratorio enfocada en arquitectura cloud, DevOps, microservicios y prácticas modernas de despliegue.

Este portal está construido con **Next.js** y forma parte de una arquitectura más grande donde el frontend se comunica con microservicios backend como `core-api`.

---

## 📌 Descripción del proyecto

**CloudOps Lab** es un laboratorio práctico de arquitectura cloud y DevOps diseñado para simular un entorno de producción real.

El objetivo del proyecto es aprender y dominar conceptos de nivel senior mediante implementación práctica:

- Arquitectura basada en microservicios
- Frontend desacoplado
- APIs backend con Node.js y Express
- Despliegue en la nube
- CI/CD
- Contenedores con Docker
- Kubernetes
- Observabilidad
- Seguridad básica DevSecOps

---

## 🏗️ Estructura general del laboratorio

```bash
cloud-ops-lab/
├── cloudops-portal/   # Frontend Next.js
└── core-api/          # Backend Node.js + Express
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
- Endpoints disponibles:
  - `GET /health`
  - `GET /status`
  - `POST /test`
- Corre localmente en el puerto `3000`
- Próximo paso: contenerización con Docker

---

## 🧱 Stack tecnológico

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

### Backend

- Node.js
- Express.js

### DevOps / Cloud

- Git
- GitHub
- Vercel
- Docker
- Kubernetes, próximamente
- DigitalOcean, próximamente
- Terraform, próximamente
- Ansible, próximamente

---

## 🌐 Deploy

Frontend desplegado en Vercel:

```bash
https://cloudops-portal.vercel.app/
```

---

## ⚙️ Instalación local

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

## 📂 Scripts disponibles

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

### Fase 2 — Docker

- Crear Dockerfile para `core-api`
- Construir imagen Docker del backend
- Ejecutar microservicio en contenedor
- Preparar entorno local reproducible

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

## 🧠 Objetivo profesional

Este proyecto busca funcionar como un portafolio técnico orientado a roles como:

- DevOps Engineer
- Cloud Engineer
- Site Reliability Engineer
- Backend Engineer
- Platform Engineer
- Cloud Security Engineer

El enfoque principal es construir una plataforma realista, escalable y mantenible, aplicando buenas prácticas de arquitectura de software y operación cloud.

---

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

