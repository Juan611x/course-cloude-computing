# ☁️ Cloud Computing con AWS — Libro de Notas

Libro técnico digital con notas del curso de Cloud Computing con AWS.
Construido con [VitePress](https://vitepress.dev/) — sin base de datos, sin backend, solo archivos Markdown.

## Correr en local

**Requisitos:** Node.js 18+

```bash
git clone https://github.com/Juan611x/course-cloude-computing.git
cd course-cloude-computing
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## Estructura del proyecto

```
course-cloude-computing/
├── docs/
│   ├── .vitepress/
│   │   └── config.js        ← Configuración: sidebar, nav, tema
│   ├── modulo-01/           ← Capítulos del módulo 1
│   ├── modulo-02/           ← Capítulos del módulo 2
│   ├── index.md             ← Portada del libro
│   ├── como-usar.md         ← Guía de uso
│   └── referencia.md        ← Cheat sheet
├── package.json
└── README.md
```

## Publicar en GitHub Pages

```bash
npm run build    # genera docs/.vitepress/dist/
```

Configura GitHub Actions con el workflow de VitePress para deploy automático.
