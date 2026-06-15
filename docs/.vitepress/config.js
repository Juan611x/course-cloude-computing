import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  // ─── Metadatos del libro ────────────────────────────────────────────────────
  title: 'AWS Book',
  description: 'Libro de notas técnicas del curso de Cloud Computing con AWS. Arquitectura, servicios, prácticas y patrones.',
  lang: 'es-ES',

  // ─── Apariencia ────────────────────────────────────────────────────────────
  appearance: 'dark',           // dark | light | auto
  lastUpdated: true,            // muestra "Última actualización" en cada página

  // ─── Head (metadatos HTML) ──────────────────────────────────────────────────
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#FF9900' }],
  ],

  // ─── Tema ──────────────────────────────────────────────────────────────────
  themeConfig: {
    // Logo y título en la barra superior
    logo: '/logo.svg',
    siteTitle: '☁️ AWS Book',

    // ── Barra de navegación superior ─────────────────────────────────────────
    nav: [
      { text: 'Inicio',  link: '/' },
      { text: 'Módulo 1 — Fundamentos', link: '/01-fundaments/01.Introduction' },
      {
        text: 'Recursos AWS',
        items: [
          { text: 'AWS Docs',              link: 'https://docs.aws.amazon.com' },
          { text: 'AWS Free Tier',         link: 'https://aws.amazon.com/free' },
          { text: 'Infraestructura Global',link: 'https://aws.amazon.com/about-aws/global-infrastructure/' },
          { text: 'Calculadora de precios',link: 'https://calculator.aws/pricing/2/home' },
          { text: 'Arquitecturas Ref',     link: 'https://aws.amazon.com/architecture' },
        ]
      }
    ],

    // ── Sidebar (menú lateral — estructura del libro) ─────────────────────────
    sidebar: [
      {
        text: '☁️ Módulo 1 — Fundamentos Cloud',
        collapsed: false,
        items: [
          { text: '01 · Introducción: On-Premise vs Cloud', link: '/01-fundaments/01.Introduction' },
          { text: '02 · Fundamentos de AWS',                link: '/01-fundaments/02.fundamentos AWS' },
          { text: '03 · Servicios de AWS por Categoría',   link: '/01-fundaments/03.servicios' },
          { text: '04 · La Consola de AWS',                link: '/01-fundaments/04.consolaAWS' },
          { text: '05 · La CLI de AWS',                    link: '/01-fundaments/05.comandLine' },
        ]
      },
      {
        text: '🖥️ Módulo 2 — Amazon EC2',
        collapsed: false,
        items: [
          { text: '01 · EC2: Elastic Compute Cloud', link: '/02-InfraestructuraCompute/01.ec2' },
          { text: '02 · Seguridad en EC2',           link: '/02-InfraestructuraCompute/02.security' },
          { text: '03 · Amazon Machine Images',      link: '/02-InfraestructuraCompute/03.AMIs' },
          { text: '04 · UserData y Metadata',        link: '/02-InfraestructuraCompute/04.UserData-Metadata' },
          { text: '05 · Amazon EBS',                 link: '/02-InfraestructuraCompute/05.EBS' },
          { text: '06 · Modelos de Pricing en EC2',  link: '/02-InfraestructuraCompute/06.Pricing' },
        ]
      },
      {
        text: '📌 Referencia Transversal',
        collapsed: true,
        items: [
          { text: 'Gestión de Regiones desde la CLI', link: '/transversal/regiones-cli' },
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
}))
