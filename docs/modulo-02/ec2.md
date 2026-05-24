# 2.1 Amazon EC2 — Elastic Compute Cloud

**Amazon EC2** (Elastic Compute Cloud, nube de cómputo elástico) es el servicio de servidores virtuales
de AWS. Es el pilar del cómputo en la nube y el servicio más fundamental de toda la plataforma.

La idea es simple: en lugar de comprar un servidor físico, lanzas una **instancia** EC2 — una máquina
virtual que corre en la infraestructura de AWS. La enciendes cuando la necesitas, la apagas cuando no,
y pagas solo por el tiempo que estuvo corriendo, con precisión de segundos.

---

## Anatomía de una instancia EC2

Cuando lanzas una instancia EC2, defines cuatro elementos fundamentales:

```
┌────────────────────────────────────────────────────┐
│                 INSTANCIA EC2                      │
│                                                    │
│  1. AMI (Sistema Operativo + Software base)        │
│     └─ Amazon Linux 2, Ubuntu 22.04, Windows...   │
│                                                    │
│  2. Instance Type (CPU + RAM + Red)                │
│     └─ t3.micro, m5.large, c6i.xlarge...          │
│                                                    │
│  3. EBS Volume (Disco duro virtual)                │
│     └─ SSD gp3, io2, o magnético st1              │
│                                                    │
│  4. Security Group (Firewall virtual)              │
│     └─ Reglas de entrada/salida por puerto         │
└────────────────────────────────────────────────────┘
```

---

## Familias de instancias

AWS organiza sus instancias en **familias** según su propósito. El nombre de la familia te dice
para qué está optimizada:

| Familia | Código | Optimizada para | Caso de uso |
|---|---|---|---|
| General Purpose | `t3`, `m6i` | Balance CPU/RAM | Webservers, apps pequeñas |
| Compute Optimized | `c6i`, `c7g` | CPU de alto rendimiento | Procesamiento batch, gaming |
| Memory Optimized | `r6i`, `x2idn` | Mucha RAM | Bases de datos in-memory, SAP |
| Storage Optimized | `i3`, `d3` | I/O de disco alto | Data warehouses, NoSQL |
| Accelerated Computing | `p4`, `g5` | GPUs | Machine Learning, video rendering |

### Nomenclatura de tipos de instancia

```
    m  5  .  x  l  a  r  g  e
    │  │     │            │
    │  │     │            └─ Tamaño: nano, micro, small, medium, large, xlarge, 2xlarge...
    │  │     └─ Atributos opcionales: a=AMD, g=ARM Graviton, n=networking alto
    │  └─ Generación (número más alto = más nuevo y eficiente)
    └─ Familia: m=general, c=compute, r=memory, i=storage, p/g=GPU
```

::: tip Instancias Graviton (ARM)
Las instancias con sufijo `g` (como `m6g`, `c7g`) usan procesadores ARM Graviton diseñados por AWS.
Son hasta un 40% más baratas que sus equivalentes x86 y ofrecen mejor rendimiento por dólar.
Si tu aplicación es compatible con ARM (la mayoría de apps modernas lo son), úsalas.
:::

---

## Modelos de precios

Aquí es donde está el mayor potencial de ahorro. AWS ofrece cuatro modelos:

### 1. On-Demand (bajo demanda)
Paga por segundo, sin compromisos. El precio más alto, pero la máxima flexibilidad.
Ideal para desarrollo, pruebas, o cargas impredecibles.

### 2. Reserved Instances (instancias reservadas)
Compromiso de 1 o 3 años a cambio de descuentos de hasta el **72%**.

```
On-Demand t3.medium:  $0.0416/hora
Reserved  t3.medium:  $0.0255/hora  (ahorro: ~39% con 1 año)
Reserved  t3.medium:  $0.0163/hora  (ahorro: ~61% con 3 años)
```

### 3. Spot Instances
Usas capacidad sobrante de AWS a precios hasta **90% más baratos**, pero AWS puede interrumpirla
con 2 minutos de aviso si necesita el recurso. Solo para cargas tolerantes a interrupciones.

::: warning ¿Cuándo NO usar Spot?
Nunca uses Spot para bases de datos productivas, sesiones de usuario activas, o cualquier proceso
que no pueda detenerse y reanudarse sin consecuencias. Sí úsalas para: renderizado, procesamiento
de datos, entrenamiento de ML, batch jobs.
:::

### 4. Savings Plans
Similar a Reserved pero más flexible: te comprometes a un gasto mínimo por hora (ej: $10/hora)
y AWS te da descuento en cualquier instancia que uses hasta ese monto, independiente del tipo o región.

---

## Lanzar una instancia con AWS CLI

```bash
# Lanzar una instancia EC2 básica
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \       # Amazon Linux 2023
  --instance-type t3.micro \
  --key-name mi-llave \
  --security-group-ids sg-0abc123def456 \
  --subnet-id subnet-0abc123 \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=web-server-01}]' \
  --region us-east-1

# Ver el estado de tus instancias
aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=web-server-01" \
  --query "Reservations[*].Instances[*].[InstanceId,State.Name,PublicIpAddress]" \
  --output table

# Conectarse por SSH (Linux/Mac)
ssh -i "mi-llave.pem" ec2-user@<IP-publica>

# Detener (no eliminar) la instancia
aws ec2 stop-instances --instance-ids i-0abc1234567890

# Terminar (eliminar) la instancia
aws ec2 terminate-instances --instance-ids i-0abc1234567890
```

---

## User Data: inicialización automática

El **User Data** es un script que EC2 ejecuta automáticamente la primera vez que arranca una instancia.
Sirve para instalar software, configurar el servidor, y dejar todo listo sin SSH manual.

```bash
#!/bin/bash
# User Data: instala Nginx automáticamente al lanzar la instancia

yum update -y
yum install -y nginx

# Crear una página de bienvenida personalizada
cat > /usr/share/nginx/html/index.html <<'EOF'
<!DOCTYPE html>
<html>
  <head><title>Mi servidor AWS</title></head>
  <body>
    <h1>¡Servidor EC2 configurado automáticamente!</h1>
    <p>Región: us-east-1 | Tipo: t3.micro</p>
  </body>
</html>
EOF

systemctl start nginx
systemctl enable nginx

echo "Setup completado: $(date)" >> /var/log/userdata.log
```

::: info User Data y los costos
EC2 no te cobra extra por User Data. El costo es solo el tiempo de ejecución del script durante
el arranque de la instancia, que ya estás pagando de todas formas.
:::

---

## Metadata de la instancia (IMDS)

Desde dentro de una instancia EC2, puedes consultar información sobre ella misma a través del
**Instance Metadata Service** (IMDS), sin necesidad de credenciales:

```bash
# Dentro de la instancia EC2:

# Obtener el ID de la instancia
curl http://169.254.169.254/latest/meta-data/instance-id

# Obtener la región
curl http://169.254.169.254/latest/meta-data/placement/region

# Obtener el tipo de instancia
curl http://169.254.169.254/latest/meta-data/instance-type

# Obtener la IP privada
curl http://169.254.169.254/latest/meta-data/local-ipv4
```

::: danger IMDSv1 vs IMDSv2 — Seguridad crítica
La versión 1 (IMDSv1) es vulnerable a ataques SSRF (Server-Side Request Forgery). Siempre configura
tus instancias para usar **IMDSv2**, que requiere un token de sesión previo:
```bash
# IMDSv2: obtener token primero
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

# Usar el token en las consultas
curl -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/instance-id
```
:::
