# 1.3 Infraestructura Global de AWS

AWS opera la red de infraestructura en la nube más grande del mundo. Entender cómo está organizada
geográficamente es clave para diseñar sistemas resilientes, con baja latencia y que cumplan
requisitos de soberanía de datos.

---

## Los tres niveles geográficos

```
                        🌍 MUNDO
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       Región           Región           Región
     (us-east-1)     (eu-west-1)    (ap-southeast-1)
          │
    ┌─────┼─────┐
    │     │     │
   AZ1   AZ2   AZ3      ← Availability Zones (Zonas de disponibilidad)
    │
 ┌──┴──┐
DC1  DC2              ← Data Centers físicos dentro de la AZ
```

---

## Regiones (Regions)

Una **Region** (región) es una ubicación geográfica independiente que contiene múltiples Availability Zones.
AWS tiene más de 30 regiones activas alrededor del mundo y sigue expandiéndose.

Cada región es **completamente aislada** de las demás. Los datos que pones en `us-east-1` (Norte de Virginia)
no se mueven automáticamente a `eu-west-1` (Irlanda) a menos que tú lo configures explícitamente.
Esto es fundamental para el cumplimiento de regulaciones como el GDPR europeo.

### ¿Cómo elegir una región?

::: tip Cuatro factores clave para elegir región
1. **Cumplimiento normativo** — ¿Tu país exige que los datos residan en un territorio específico?
2. **Latencia** — Elige la región más cercana a tus usuarios finales.
3. **Disponibilidad de servicios** — No todos los servicios de AWS están en todas las regiones.
4. **Costo** — Los precios varían entre regiones (us-east-1 suele ser la más barata).
:::

```bash
# Ver todas las regiones disponibles con la CLI de AWS
aws ec2 describe-regions --output table

# Resultado esperado:
# -----------------------------------------------
# |              DescribeRegions                |
# +------------------+--------------------------+
# |    RegionName    |       Endpoint           |
# +------------------+--------------------------+
# |  ap-south-1      | ec2.ap-south-1...        |
# |  eu-north-1      | ec2.eu-north-1...        |
# |  us-east-1       | ec2.us-east-1...         |
# +------------------+--------------------------+
```

---

## Availability Zones (AZ)

Una **Availability Zone** (zona de disponibilidad) es uno o más data centers físicos dentro de
una región, con alimentación eléctrica, refrigeración y redes propias e independientes.

La distancia entre AZs dentro de una región es suficiente para que un desastre natural no afecte
más de una a la vez, pero lo suficientemente corta para mantener latencia de red menor a 1ms entre ellas.

| Región | Código | AZs disponibles |
|---|---|---|
| US East (N. Virginia) | `us-east-1` | 6 AZs |
| EU (Ireland) | `eu-west-1` | 3 AZs |
| South America (São Paulo) | `sa-east-1` | 3 AZs |
| Asia Pacific (Singapore) | `ap-southeast-1` | 3 AZs |

::: warning Nombre vs ID de una AZ
`us-east-1a` para tu cuenta puede ser un data center diferente al `us-east-1a` de otra cuenta.
AWS randomiza el mapeo de nombres para distribuir la carga. Si necesitas coordinación entre cuentas,
usa el **AZ ID** (por ejemplo `use1-az1`) que sí es consistente entre cuentas.
:::

### Diseño multi-AZ: la regla de oro

Nunca despliegues una aplicación crítica en una sola AZ. El patrón estándar es distribuir las
instancias entre al menos dos AZs detrás de un Load Balancer:

```
Internet
    │
    ▼
┌──────────────────────────────────────┐
│     Application Load Balancer        │
└──────┬───────────────────┬───────────┘
       │                   │
  AZ us-east-1a       AZ us-east-1b
  ┌────────────┐      ┌────────────┐
  │  EC2 #1   │      │  EC2 #2   │
  └────────────┘      └────────────┘
  ┌────────────┐      ┌────────────┐
  │  RDS Prim │      │  RDS Stand │
  │  (activa) │─────►│   (by)    │
  └────────────┘      └────────────┘
```

Si `us-east-1a` cae completamente, el Load Balancer redirige todo el tráfico a `us-east-1b`
de forma automática. La base de datos hace failover al standby. La aplicación sigue viva.

---

## Edge Locations y CloudFront

Además de las regiones y AZs, AWS opera más de **400 Edge Locations** alrededor del mundo.
No son regiones completas, sino puntos de presencia más pequeños que acercan el contenido a los usuarios finales.

El servicio principal que usa las Edge Locations es **Amazon CloudFront** (CDN — Content Delivery Network,
red de distribución de contenidos).

```
  Usuario en Madrid               Usuario en Tokio
         │                               │
         ▼                               ▼
  Edge Location Madrid          Edge Location Tokio
  (caché local del contenido)   (caché local del contenido)
         │                               │
         └───────────────┬───────────────┘
                         ▼
                   Región us-east-1
                   (origen del contenido)
```

::: info ¿Por qué importa?
Sin CloudFront, cada usuario del mundo haría requests al servidor de origen en us-east-1.
Con CloudFront, el contenido estático (imágenes, videos, JS, CSS) se cachea en el Edge Location
más cercano al usuario. Latencia mínima, costo de transferencia reducido.
:::

---

## Resumen visual completo

```
AWS Global Infrastructure
├── Región: us-east-1 (N. Virginia)
│   ├── AZ: us-east-1a  →  Data Centers: DC-1, DC-2
│   ├── AZ: us-east-1b  →  Data Centers: DC-3, DC-4
│   └── AZ: us-east-1c  →  Data Centers: DC-5, DC-6
│
├── Región: eu-west-1 (Irlanda)
│   ├── AZ: eu-west-1a
│   ├── AZ: eu-west-1b
│   └── AZ: eu-west-1c
│
└── Edge Locations (400+)
    ├── Madrid, España
    ├── Tokio, Japón
    ├── São Paulo, Brasil
    └── ... (distribuidas globalmente)
```
