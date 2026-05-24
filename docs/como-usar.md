# Cómo usar este libro

Este libro digital es el resultado de tomar notas estructuradas durante el curso de Cloud Computing con AWS.
No es un resumen de la documentación oficial, sino una **reescritura didáctica** con ejemplos propios,
analogías y comparaciones que hacen los conceptos más fáciles de retener.

## Estructura del contenido

Cada módulo sigue esta estructura interna:

```
Módulo N — Nombre del módulo
├── N.1  Concepto principal
├── N.2  Profundización con ejemplos
├── N.3  Caso práctico / laboratorio
└── N.4  Resumen y preguntas clave
```

## Convenciones visuales

A lo largo del libro encontrarás distintos tipos de bloques que señalan información de distinta naturaleza:

::: info Concepto
Definición formal o explicación neutral de un término o servicio.
:::

::: tip Buena práctica
Recomendaciones de AWS Well-Architected Framework o patrones de la industria.
:::

::: warning Atención
Puntos donde es fácil cometer errores, o donde AWS cobra más de lo esperado si no se configura bien.
:::

::: danger Cuidado
Configuraciones que pueden generar problemas de seguridad o pérdida de datos si se hacen incorrectamente.
:::

## Cómo correr el libro en local

Necesitas **Node.js 18+** instalado. Luego:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Juan611x/course-cloude-computing.git
cd course-cloude-computing

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo (con hot-reload)
npm run dev
```

Abre `http://localhost:5173` en tu navegador. Cualquier cambio en los archivos `.md` se refleja instantáneamente sin recargar la página.

## Recursos complementarios

| Recurso | URL | Para qué sirve |
|---|---|---|
| AWS Documentation | [docs.aws.amazon.com](https://docs.aws.amazon.com) | Referencia oficial de cada servicio |
| AWS Free Tier | [aws.amazon.com/free](https://aws.amazon.com/free) | Practicar sin costo |
| AWS Architecture Center | [aws.amazon.com/architecture](https://aws.amazon.com/architecture) | Diagramas de referencia |
| AWS Well-Architected | [wa.aws.amazon.com](https://wa.aws.amazon.com) | Pilares de buena arquitectura |
| CloudFormation Docs | [docs.aws.amazon.com/cloudformation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) | IaC con AWS |
