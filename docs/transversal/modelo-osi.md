# Modelo OSI: La Referencia de las Redes

Cuando se trabaja con servicios de red en AWS — load balancers, security groups, VPCs,
protocolos — es inevitable encontrarse con frases como "opera en capa 4" o "trabaja a nivel
de aplicación". Todas esas referencias apuntan al mismo modelo: el **modelo OSI**.

## ¿Qué es y de dónde viene?

En los años 70, cada fabricante de hardware de red —IBM, DEC, Honeywell— desarrollaba sus
propios protocolos de comunicación propietarios. Un equipo de IBM no podía hablar con uno de
DEC sin middleware específico. La falta de estándares era un problema real para cualquier
organización que necesitara conectar sistemas de distintos fabricantes.

La ISO (_International Organization for Standardization_) publicó en 1984 el **modelo de
referencia OSI** (_Open Systems Interconnection_), un marco conceptual que divide la
comunicación entre sistemas en siete capas independientes. Cada capa tiene una responsabilidad
específica y se comunica únicamente con la capa inmediatamente superior e inferior.

El modelo OSI no es un protocolo en sí — es un _modelo de referencia_. Ningún sistema
implementa las siete capas exactamente tal y como las describe la especificación. En la
práctica, la internet moderna usa el modelo TCP/IP, que colapsa algunas de esas capas. Pero
el vocabulario del modelo OSI se sigue usando universalmente para describir en qué nivel
opera cada protocolo o servicio, y AWS lo usa explícitamente en su documentación.

## Las siete capas

### Capa 1 — Física

La capa más baja. Se ocupa de la transmisión de bits crudos sobre un medio físico: voltajes
eléctricos en un cable de cobre, pulsos de luz en fibra óptica, ondas de radio en wifi.
Aquí no hay concepto de paquetes ni direcciones — solo señales.

**Ejemplos:** cables Ethernet (Cat5e, Cat6), fibra óptica, antenas WiFi, USB, Bluetooth.

---

### Capa 2 — Enlace de datos

Organiza los bits de la capa física en tramas (_frames_) y gestiona la comunicación entre
dispositivos dentro de la misma red local. Es la capa que da sentido a las direcciones MAC
(_Media Access Control_) — los identificadores físicos únicos de cada tarjeta de red.

También gestiona la detección de errores de transmisión dentro de esa red local.

**Ejemplos:** Ethernet (el protocolo, no el cable), switches de red, Wi-Fi (IEEE 802.11),
direcciones MAC.

---

### Capa 3 — Red

Introduce el concepto de **direccionamiento lógico** (las direcciones IP) y el
**enrutamiento**: la capacidad de enviar paquetes a través de múltiples redes hasta llegar
al destino. Es la capa que decide _el camino_ que tomará un paquete entre su origen y su
destino, aunque ese camino cruce docenas de routers intermedios.

**Ejemplos:** IP (IPv4, IPv6), ICMP (el protocolo detrás del comando `ping`), routers,
**Gateway Load Balancer de AWS (GWLB)**.

---

### Capa 4 — Transporte

Gestiona la comunicación extremo a extremo entre dos aplicaciones. Introduce los conceptos
de **puertos** (para identificar qué aplicación dentro de un host recibe el tráfico) y de
**segmentación** (dividir datos grandes en segmentos manejables).

Los dos protocolos principales son:
- **TCP** (_Transmission Control Protocol_): orientado a conexión, garantiza entrega
  ordenada y sin errores. Más lento, más fiable.
- **UDP** (_User Datagram Protocol_): sin conexión, sin garantías de entrega. Más rápido,
  ideal para streaming, videojuegos, DNS, VoIP.

**Ejemplos:** TCP, UDP, TLS (que opera sobre TCP), **Network Load Balancer de AWS (NLB)**.

---

### Capa 5 — Sesión

Gestiona el establecimiento, mantenimiento y cierre de sesiones de comunicación entre
aplicaciones. Es la capa que permite que una sesión se recupere si la conexión se interrumpe
temporalmente.

En la práctica moderna, esta capa está casi completamente absorbida por TCP y los protocolos
de aplicación. Es raro encontrarla mencionada de forma aislada.

**Ejemplos:** NetBIOS, RPC, APIs de sesión en WebSockets.

---

### Capa 6 — Presentación

Responsable de la **traducción, cifrado y compresión** de los datos. Se encarga de que lo
que envía una aplicación en un formato específico pueda ser interpretado correctamente por
la aplicación receptora, independientemente de las diferencias de representación interna.

El cifrado TLS/SSL técnicamente pertenece aquí (aunque en la práctica se implementa en capa
4 o 7 según el contexto).

**Ejemplos:** SSL/TLS (cifrado), codificación de caracteres (UTF-8, ASCII), compresión
(gzip, zlib), formatos de serialización (JSON, XML, Protobuf).

---

### Capa 7 — Aplicación

La capa más cercana al usuario final. No se refiere a las aplicaciones en sí, sino a los
protocolos que usan esas aplicaciones para comunicarse. HTTP, SMTP, DNS, FTP — todos operan
en capa 7 y entienden el significado del contenido que transportan.

Es la capa donde un load balancer puede tomar decisiones inteligentes basadas en el
_contenido_ de las peticiones: la URL, las cabeceras HTTP, las cookies, el host, el método.

**Ejemplos:** HTTP, HTTPS, WebSocket, gRPC, DNS, SMTP, FTP, SSH,
**Application Load Balancer de AWS (ALB)**.

---

## Cómo identificar a qué capa pertenece algo

Una regla práctica que funciona en la mayoría de los casos:

| Si opera con... | Probablemente es capa... |
|---|---|
| Señales físicas, cables, voltajes | 1 — Física |
| Direcciones MAC, switches, tramas Ethernet | 2 — Enlace |
| Direcciones IP, subredes, routers, `ping` | 3 — Red |
| Puertos, TCP/UDP, conexiones, TLS | 4 — Transporte |
| Sesiones, autenticación de sesión | 5 — Sesión |
| Cifrado, encoding, compresión | 6 — Presentación |
| HTTP, DNS, SMTP, URLs, cabeceras, cookies | 7 — Aplicación |

La regla más simple: si puede _leer el contenido_ del mensaje (URL, cabeceras, cuerpo HTTP),
opera en capa 7. Si solo ve IPs y puertos sin entender el contenido, es capa 3-4.

## El modelo OSI en AWS

En el contexto específico de AWS los tres load balancers mapean directamente a capas del
modelo:

```
Capa 7 — Aplicación  →  Application Load Balancer (ALB)
Capa 4 — Transporte  →  Network Load Balancer (NLB)
Capa 3 — Red         →  Gateway Load Balancer (GWLB)
```

Los Security Groups operan en capas 3-4 (IP + puerto). Las VPCs y las subredes son
conceptos de capa 3. Las interfaces de red (ENIs) son capa 2-3.

Entender en qué capa opera cada servicio te permite saber inmediatamente qué tipo de
decisiones puede tomar y qué información tiene disponible para hacerlas.
