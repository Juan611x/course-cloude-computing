# Referencia Rápida — AWS Cheat Sheet

Página de consulta rápida con los comandos, conceptos y servicios más usados del curso.
Ideal para repasar antes de un examen o durante un laboratorio práctico.

---

## Comandos AWS CLI más usados

### Configuración inicial
```bash
# Configurar credenciales y región por defecto
aws configure

# Ver la configuración actual
aws configure list

# Usar un perfil específico (para múltiples cuentas)
aws s3 ls --profile cuenta-produccion
```

### EC2
```bash
aws ec2 describe-instances --output table
aws ec2 start-instances   --instance-ids i-xxxx
aws ec2 stop-instances    --instance-ids i-xxxx
aws ec2 terminate-instances --instance-ids i-xxxx
aws ec2 describe-images   --owners amazon --filters "Name=name,Values=amzn2-ami-hvm*"
```

### S3
```bash
aws s3 ls                                          # listar buckets
aws s3 ls s3://mi-bucket/                          # listar contenido
aws s3 cp archivo.txt s3://mi-bucket/              # subir archivo
aws s3 cp s3://mi-bucket/archivo.txt .             # bajar archivo
aws s3 sync ./local/ s3://mi-bucket/carpeta/       # sincronizar carpeta
aws s3 rb s3://mi-bucket --force                   # eliminar bucket con contenido
```

### IAM
```bash
aws iam list-users
aws iam list-roles
aws iam get-user
aws iam create-user --user-name juan-dev
aws iam attach-user-policy \
  --user-name juan-dev \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
```

---

## Servicios clave por categoría

### Cómputo
| Servicio | Para qué sirve |
|---|---|
| **EC2** | Máquinas virtuales (IaaS) |
| **Lambda** | Funciones serverless, pago por ejecución |
| **ECS** | Contenedores Docker gestionados |
| **EKS** | Kubernetes gestionado |
| **Elastic Beanstalk** | PaaS para deploy de apps sin gestionar infra |
| **Lightsail** | VPS simplificado para proyectos pequeños |

### Almacenamiento
| Servicio | Para qué sirve |
|---|---|
| **S3** | Objetos (archivos) con durabilidad 11 nines |
| **EBS** | Disco para instancias EC2 (block storage) |
| **EFS** | Sistema de archivos compartido entre instancias |
| **S3 Glacier** | Archivado de largo plazo, costo mínimo |
| **Storage Gateway** | Puente entre on-premise y S3 |

### Bases de Datos
| Servicio | Motor | Tipo |
|---|---|---|
| **RDS** | MySQL, PostgreSQL, Oracle, SQL Server, MariaDB | Relacional gestionado |
| **Aurora** | MySQL/PostgreSQL compatible (más rápido) | Relacional gestionado |
| **DynamoDB** | Propio de AWS | NoSQL clave-valor |
| **ElastiCache** | Redis / Memcached | In-memory cache |
| **Redshift** | SQL columnar | Data Warehouse |
| **DocumentDB** | MongoDB compatible | Documental |

### Redes
| Servicio | Para qué sirve |
|---|---|
| **VPC** | Red privada virtual, tu espacio aislado en AWS |
| **Route 53** | DNS gestionado con health checks |
| **CloudFront** | CDN global con 400+ edge locations |
| **API Gateway** | Publicar y gestionar APIs REST/WebSocket |
| **ELB / ALB / NLB** | Load Balancers (capa 7 / capa 4) |
| **Direct Connect** | Conexión física dedicada entre on-premise y AWS |

### Seguridad
| Servicio | Para qué sirve |
|---|---|
| **IAM** | Usuarios, roles y políticas de acceso |
| **KMS** | Gestión de claves de cifrado |
| **WAF** | Web Application Firewall |
| **Shield** | Protección contra DDoS |
| **GuardDuty** | Detección de amenazas con ML |
| **Secrets Manager** | Almacenamiento seguro de credenciales |

---

## Modelo de Responsabilidad Compartida

```
┌────────────────────────────────────────────────────┐
│            RESPONSABILIDAD DEL CLIENTE             │
│                                                    │
│  • Datos del cliente                               │
│  • Gestión de plataforma, aplicaciones, IAM        │
│  • Configuración del sistema operativo             │
│  • Cifrado de datos en tránsito y en reposo        │
│  • Configuración de red y firewall                 │
├────────────────────────────────────────────────────┤
│            RESPONSABILIDAD DE AWS                  │
│                                                    │
│  • Hardware y infraestructura física               │
│  • Hipervisor y virtualización                     │
│  • Regiones, AZs y Edge Locations                  │
│  • Seguridad física de los data centers            │
│  • Software gestionado de los servicios AWS        │
└────────────────────────────────────────────────────┘
```

---

## Límites de servicio importantes

::: warning Soft limits vs Hard limits
Los **soft limits** pueden aumentarse abriendo un ticket de soporte. Los **hard limits** son
absolutos y no pueden cambiarse (ej: el tamaño máximo de un objeto en S3 es 5TB, siempre).
:::

| Recurso | Límite por defecto | ¿Aumentable? |
|---|---|---|
| Instancias EC2 On-Demand (por región) | 32 vCPUs | ✅ Sí |
| Buckets S3 (por cuenta) | 100 | ✅ Sí (hasta 1000) |
| Tamaño máximo objeto S3 | 5 TB | ❌ No |
| Tablas DynamoDB (por región) | 2,500 | ✅ Sí |
| Funciones Lambda (por región) | 1,000 concurrentes | ✅ Sí |
| VPCs por región | 5 | ✅ Sí |

---

## Fórmulas de costo rápidas

```
Costo EC2 On-Demand  = precio/hora × horas de uso
Costo S3             = (GB almacenados × precio/GB) + (requests × precio/10k) + (GB transferidos salida × precio/GB)
Costo Lambda         = (número de invocaciones × precio) + (GB-segundo × precio)
Ahorro Reserved vs On-Demand ≈ 40% (1 año) / 60% (3 años)
Ahorro Spot vs On-Demand     ≈ 50-90% (varía según disponibilidad)
```
