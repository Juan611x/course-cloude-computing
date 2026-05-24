# 1.1 ¿Qué es Cloud Computing?

> *"Cloud computing es la entrega de servicios de TI bajo demanda a través de Internet con precios de pago por uso."*
> — Amazon Web Services

Antes de que existiera la nube, si una empresa quería lanzar una aplicación debía comprar servidores físicos,
instalarlos en un data center propio, contratar personal para mantenerlos, y esperar semanas o meses antes
de tener capacidad operativa. Si el tráfico crecía de golpe, no había nada que hacer: el hardware no escala instantáneamente.

Cloud computing invierte ese modelo por completo. En lugar de comprar infraestructura, la **alquilas** al instante,
la usas lo que necesitas, y la devuelves cuando ya no la necesitas. Es como pasar de comprar un auto a llamar un taxi:
pagas solo por el viaje, no por el mantenimiento, el seguro ni la gasolina en reposo.

---

## Características esenciales del cloud

Según el NIST (National Institute of Standards and Technology), un servicio cloud debe cumplir cinco características:

| Característica | Descripción |
|---|---|
| **On-demand self-service** | El usuario aprovisiona recursos sin intervención humana del proveedor |
| **Broad network access** | Acceso desde cualquier dispositivo con conexión a Internet |
| **Resource pooling** | Los recursos se comparten entre múltiples clientes (multi-tenancy) |
| **Rapid elasticity** | Capacidad que escala hacia arriba o abajo según la demanda, de forma automática |
| **Measured service** | Todo se mide y se cobra según el uso real |

---

## La diferencia entre On-Premise y Cloud

Una analogía útil: imagina que necesitas electricidad para tu empresa.

- **On-Premise** es como instalar tu propia planta eléctrica: tú compras el generador, contratas técnicos
  para mantenerlo, pagas cuando está encendido y cuando está apagado, y si necesitas más potencia debes
  comprar otro generador.

- **Cloud** es como conectarte a la red eléctrica pública: alguien más gestiona toda la infraestructura,
  tú simplemente enchufas lo que necesitas y pagas por los kilovatios que consumes.

```
┌─────────────────────────────────┬─────────────────────────────────┐
│         ON-PREMISE              │            CLOUD                │
├─────────────────────────────────┼─────────────────────────────────┤
│ Compra de hardware              │ Alquiler bajo demanda           │
│ CapEx (gasto de capital)        │ OpEx (gasto operacional)        │
│ Semanas para aprovisionar       │ Minutos para aprovisionar       │
│ Capacidad fija                  │ Elasticidad automática          │
│ Tú gestionas la seguridad física│ El proveedor gestiona el HW     │
│ Depreciación del activo         │ Sin activos que depreciar       │
└─────────────────────────────────┴─────────────────────────────────┘
```

::: info CapEx vs OpEx
**CapEx** (Capital Expenditure) son gastos en activos de larga duración, como comprar un servidor.
**OpEx** (Operational Expenditure) son gastos del día a día, como pagar una suscripción mensual.
Cloud Computing mueve el gasto de TI de CapEx a OpEx, lo que libera capital para el negocio.
:::

---

## Los tres modelos de nube por despliegue

::: tip Dato clave para el examen
AWS te puede preguntar cuál modelo de despliegue aplica en un escenario. La clave es identificar
si hay hardware on-premise involucrado, si es exclusivo de una organización, o si es completamente en la nube.
:::

### Nube Pública (Public Cloud)

La infraestructura es propiedad del proveedor (AWS, Azure, GCP) y está disponible para cualquier cliente.
Cada cliente usa recursos compartidos de forma segura y aislada.

```bash
# Ejemplo: crear una instancia EC2 en la nube pública de AWS
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --key-name mi-llave \
  --region us-east-1
```

### Nube Privada (Private Cloud)

Infraestructura cloud dedicada exclusivamente a una organización. Puede estar en sus propias instalaciones
o en un data center de terceros, pero no se comparte con otros clientes.

::: warning Cuidado con la terminología
Una nube privada **sí es cloud** — tiene las 5 características del NIST. Lo que la diferencia es
que los recursos son exclusivos de una organización. Un servidor dedicado sin auto-scaling y sin
self-service **no** es una nube privada.
:::

### Nube Híbrida (Hybrid Cloud)

Combinación de nube pública y privada (o on-premise) con integración entre ambas. Es el modelo
más común en empresas grandes que tienen sistemas legacy que no pueden migrar inmediatamente.

```
  ON-PREMISE                         AWS CLOUD
┌──────────────┐    AWS Direct     ┌──────────────────────┐
│ Base de datos│◄─── Connect ─────►│ Aplicación web (EC2) │
│  histórica   │   (conexión       │ Cache (ElastiCache)  │
│  (legacy)    │    dedicada)      │ CDN (CloudFront)     │
└──────────────┘                   └──────────────────────┘
```

---

## Los seis beneficios de Cloud según AWS

AWS define 6 ventajas clave que debes conocer (aparecen en el examen Cloud Practitioner):

1. **Cambio de gasto de capital a gasto variable** — Paga solo por lo que consumes.
2. **Economías de escala masivas** — AWS compra hardware en volúmenes que reducen el costo para todos.
3. **Eliminar predicciones de capacidad** — No más over-provisioning ni under-provisioning.
4. **Mayor velocidad y agilidad** — Recursos disponibles en minutos, no semanas.
5. **Eliminar el gasto en operar data centers** — Enfócate en el negocio, no en el hardware.
6. **Globalización en minutos** — Despliega en múltiples regiones del mundo con pocos clics.

::: danger Error conceptual frecuente
Cloud Computing **no** garantiza que tu aplicación será más barata *siempre*. Si tienes cargas de trabajo
estables 24/7 sin variación, el on-premise puede ser más económico a largo plazo. La ventaja del cloud
está en la **elasticidad** y la **velocidad de innovación**, no solo en el precio.
:::

---

## Resumen del capítulo

- Cloud Computing es la entrega de servicios de TI por Internet, con pago por uso.
- Sus cinco características esenciales son: self-service, acceso por red, resource pooling, elasticidad y servicio medido.
- Los modelos de despliegue son: pública, privada e híbrida.
- El principal cambio económico es de CapEx a OpEx.
- AWS ofrece 6 beneficios clave que justifican la adopción de la nube.

---

## Preguntas de repaso

1. ¿Cuáles son las cinco características esenciales del cloud según el NIST?
2. ¿Qué diferencia a una nube privada de una nube pública?
3. ¿En qué escenario una empresa elegiría un modelo híbrido?
4. Explica con tus palabras la diferencia entre CapEx y OpEx en el contexto cloud.
5. ¿Por qué AWS puede ofrecer precios más bajos que operar tu propio data center?
