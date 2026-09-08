# Mooenz Portfolio

**Mooenz Portfolio** es el portafolio personal de **José Manuel Montaño Saenz** (alias **Mooenz**), Desarrollador Frontend especializado en ecommerce (React · Next.js · TypeScript).
Sitio en producción: <https://www.mooenz.me>

Desarrollado con **Astro**, **TailwindCSS**, **TypeScript**, **JavaScript** y **GSAP**.  
Este proyecto funciona como mi **carta de presentación profesional**, donde muestro mis habilidades, experiencia y los proyectos en los que he trabajado. Está orientado tanto a posibles empleadores como a clientes que deseen conocer mi trabajo como desarrollador web.

---

## 🚀 Objetivo del Proyecto

Crear un espacio claro, atractivo y bien estructurado donde presentar:

- Mis habilidades como desarrollador.
- Mi experiencia laboral.
- Proyectos destacados.
- Enlaces profesionales (GitHub y LinkedIn).
- Mi currículum vitae actualizado.

---

## 📌 Contenido del Portafolio

La portada (`index`) incluye:

- **Quién soy:** breve presentación.
- **Cargo o rol profesional.**
- **Enlaces sociales:** GitHub y LinkedIn.
- **Experiencia laboral.**
- **Proyectos destacados.**
- **Currículum vitae descargable.**

Además hay páginas de apoyo (`/about`, `/contact`, `/privacy`, `404`) y dos
representaciones legibles por máquinas generadas en tiempo de build: `/llms.txt`
y `/index.md` (esta última también servida en `/` vía `Accept: text/markdown`).

Toda la información personal del sitio sale de **una única fuente**: el CV en
`CV.md` / `public/cv.yaml`, volcado a las constantes de `src/constants/`. Si
cambia el CV, hay que actualizar esas constantes; nada del contenido de la
portada, del JSON-LD o de `llms.txt` se escribe a mano dos veces.

---

## 🛠️ Tecnologías

- **Astro.js**
- **TailwindCSS**
- **TypeScript**
- **JavaScript**
- **GSAP** (animaciones)
- Despliegue en **Vercel**

---

## 🧩 Instalación y Desarrollo Local

Clona el repositorio:

```bash
git clone https://github.com/Mooenz/portfolio

cd portfolio

pnpm install

pnpm run dev

pnpm run build
```

---

## 📂 Estructura del Proyecto

```md
/
├── CV.md
├── cv-for-rendercv.yml
├── public/
│ ├── cv.yaml
│ └── documents/
├── src/
│ ├── components/
│ ├── constants/
│ ├── layouts/
│ ├── pages/
│ ├── sections/
│ ├── styles/
│ └── utilities/
├── test/
├── middleware.ts
├── package.json
├── astro.config.mjs
├── vercel.json
└── tsconfig.json
```

- `public/`: Archivos estáticos como imágenes, fuentes, el CV en PDF y `cv.yaml`.
- `src/components/`: Componentes reutilizables de la interfaz.
- `src/constants/`: Datos del portafolio (`personal-info`, `experience`, `projects`, `skills`, `seo`). Fuente única de la información personal, tomada del CV.
- `src/layouts/`: Plantillas de diseño y datos estructurados JSON-LD.
- `src/pages/`: Páginas del portafolio (`index`, `about`, `contact`, `privacy`, `404`) y las rutas generadas `llms.txt.ts` e `index.md.ts`.
- `src/sections/`: Secciones específicas de la página principal.
- `src/styles/`: Archivos de estilos globales y configuraciones de TailwindCSS.
- `src/utilities/`: Funciones auxiliares, incluidos los generadores de `/llms.txt` y `/index.md`.
- `test/`: Pruebas de preparación para agentes de IA sobre la salida de `astro build` (`pnpm test`).
- `middleware.ts`: Negociación de contenido (`Accept: text/markdown`) y 404 en Markdown.
- `CV.md`, `cv-for-rendercv.yml`, `public/cv.yaml`: Fuente del CV en tres formatos (lectura, renderizado y datos).
- `package.json`: Dependencias y scripts del proyecto.
- `astro.config.mjs`: Configuración de Astro.
- `vercel.json`: Cabeceras, redirecciones y control de indexación en Vercel.
- `tsconfig.json`: Configuración de TypeScript.

---

## 📸 Demo / Capturas

🔗 Enlace en vivo: [Mooenz.me](https://www.mooenz.me/)

🖼️ Screenshots del portafolio: ![Imagen web Porfolio Mooenz.me](https://www.mooenz.me/images/web.webp)

---

## 🧾 Licencia

Este proyecto tiene licencia MIT, lo que significa que cualquier persona puede usar, modificar o distribuir el código, siempre que mantenga nota de la licencia original.

---

## 📬 Contacto

GitHub: [@Mooenz](https://github.com/Mooenz)
LinkedIn: [@mooenz](https://www.linkedin.com/in/mooenz/)
