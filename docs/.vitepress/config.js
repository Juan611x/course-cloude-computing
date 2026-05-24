import { defineConfig } from 'vitepress'

export default defineConfig({
  // ─── Metadatos del libro ────────────────────────────────────────────────────
  title: 'Cloud Computing con AWS',
  description: 'Libro de notas técnicas del curso de Cloud Computing con AWS. Arquitectura, servicios, prácticas y patrones.',
  lang: 'es-ES',

  // ─── Apariencia ────────────────────────────────────────────────────────────
  appearance: 'dark',           // dark | light | auto
  lastUpdated: true,            // muestra "Última actualización" en cada página

  // ─── Head (metadatos HTML) ──────────────────────────────────────────────────
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#FF9900' }],  // naranja AWS
  ],

  // ─── Tema ──────────────────────────────────────────────────────────────────
  themeConfig: {
    // Logo y título en la barra superior
    logo: '/logo.svg',
    siteTitle: '☁️ AWS Book',

    // ── Barra de navegación superior ─────────────────────────────────────────
    nav: [
      { text: 'Inicio',    link: '/' },
      { text: 'Módulos',   link: '/modulo-01/intro' },
      { text: 'Referencia rápida', link: '/referencia' },
      {
        text: 'Recursos',
        items: [
          { text: 'AWS Docs',         link: 'https://docs.aws.amazon.com' },
          { text: 'AWS Free Tier',    link: 'https://aws.amazon.com/free' },
          { text: 'Arquitecturas Ref',link: 'https://aws.amazon.com/architecture' },
        ]
      }
    ],

    // ── Sidebar (menú lateral — estructura del libro) ─────────────────────────
    sidebar: [
      {
        text: '📖 Introducción',
        collapsed: false,
        items: [
          { text: 'Bienvenida',               link: '/' },
          { text: 'Cómo usar este libro',     link: '/como-usar' },
          { text: 'Referencia rápida',        link: '/referencia' },
        ]
      },
      {
        text: '☁️ Módulo 1 — Fundamentos Cloud',
        collapsed: false,
        items: [
          { text: '1.1 ¿Qué es Cloud Computing?', link: '/modulo-01/intro' },
          { text: '1.2 Modelos de servicio',       link: '/modulo-01/modelos-servicio' },
          { text: '1.3 Infraestructura Global AWS', link: '/modulo-01/infraestructura' },
        ]
      },
      {
        text: '🖥️ Módulo 2 — Cómputo en AWS',
        collapsed: true,
        items: [
          { text: '2.1 Amazon EC2',        link: '/modulo-02/ec2' },
          { text: '2.2 Auto Scaling',      link: '/modulo-02/auto-scaling' },
          { text: '2.3 Lambda (Serverless)', link: '/modulo-02/lambda' },
        ]
      },
      {
        text: '🗄️ Módulo 3 — Almacenamiento',
        collapsed: true,
        items: [
          { text: '3.1 Amazon S3',  link: '/modulo-03/s3' },
          { text: '3.2 EBS y EFS',  link: '/modulo-03/ebs-efs' },
        ]
      },
    ],

    // ── Social / GitHub ───────────────────────────────────────────────────────
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Juan611x/course-cloude-computing' }
    ],

    // ── Búsqueda full-text ────────────────────────────────────────────────────
    search: {
      provider: 'local'
    },

    // ── Pie de página ─────────────────────────────────────────────────────────
    footer: {
      message: 'Notas personales del curso — Contenido con fines educativos.',
      copyright: '© 2026 Juan · Cloud Computing con AWS'
    },

    // ── Editar en GitHub ──────────────────────────────────────────────────────
    editLink: {
      pattern: 'https://github.com/Juan611x/course-cloude-computing/edit/main/docs/:path',
      text: 'Editar esta página en GitHub'
    },

    // ── Textos de navegación ──────────────────────────────────────────────────
    docFooter: {
      prev: '← Anterior',
      next: 'Siguiente →'
    },

    outline: {
      label: 'En esta página',
      level: [2, 3]
    },

    lastUpdated: {
      text: 'Última actualización',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
  }
})
