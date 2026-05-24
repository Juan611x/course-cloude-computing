# 1.2 Modelos de Servicio: IaaS, PaaS y SaaS

Los servicios cloud se clasifican en tres capas según cuánto de la infraestructura gestiona el proveedor
y cuánto gestiona el cliente. Entender esto es fundamental para saber **qué te toca a ti** y qué le toca
a AWS en cada servicio que uses.

---

## La pirámide de abstracción

Piensa en los modelos de servicio como capas de una pizza:

```
                    ┌──────────────┐
                    │     SaaS     │  ← Cliente solo consume la app
                    │  (Software)  │
                ┌───┴──────────────┴───┐
                │        PaaS          │  ← Cliente gestiona el código
                │    (Plataforma)      │
            ┌───┴──────────────────────┴───┐
            │            IaaS              │  ← Cliente gestiona el OS y arriba
            │       (Infraestructura)      │
        ┌───┴──────────────────────────────┴───┐
        │            On-Premise                │  ← Cliente gestiona TODO
        └──────────────────────────────────────┘
```

A medida que subes en la pirámide, **ganas simplicidad** pero **pierdes control**.

---

## IaaS — Infrastructure as a Service

El proveedor ofrece cómputo, almacenamiento y redes virtualizados. El cliente gestiona desde el
sistema operativo hacia arriba: instala software, configura el OS, gestiona parches y seguridad a nivel de instancia.

**Analogía:** Es como alquilar un terreno con los cimientos ya hechos. Tú construyes la casa (OS, middleware, app).

**En AWS:**
- **Amazon EC2** — máquinas virtuales
- **Amazon EBS** — discos virtuales
- **Amazon VPC** — redes privadas virtuales

```python
# Ejemplo: lanzar una instancia EC2 con boto3 (SDK de Python para AWS)
import boto3

ec2 = boto3.resource('ec2', region_name='us-east-1')

instancia = ec2.create_instances(
    ImageId='ami-0c55b159cbfafe1f0',   # Amazon Linux 2
    MinCount=1,
    MaxCount=1,
    InstanceType='t2.micro',
    KeyName='mi-llave-ssh',
    TagSpecifications=[{
        'ResourceType': 'instance',
        'Tags': [{'Key': 'Name', 'Value': 'mi-servidor-web'}]
    }]
)

print(f"Instancia creada: {instancia[0].id}")
```

::: tip Cuándo usar IaaS
Cuando necesitas control total sobre el sistema operativo, cuando migras aplicaciones legacy sin
modificar ("lift and shift"), o cuando tienes requerimientos muy específicos de configuración.
:::

---

## PaaS — Platform as a Service

El proveedor gestiona la infraestructura **y** el entorno de ejecución. El cliente solo sube su código
y datos. No hay que preocuparse por OS, parches, runtime ni escalado de la plataforma.

**Analogía:** Es como rentar un departamento amueblado. Tú llegas con tu ropa (el código) y ya vives.

**En AWS:**
- **AWS Elastic Beanstalk** — deploy de aplicaciones sin gestionar servidores
- **AWS Lambda** — funciones sin servidor (Function as a Service)
- **Amazon RDS** — base de datos gestionada

```yaml
# Ejemplo: archivo de configuración de Elastic Beanstalk (elasticbeanstalk.yml)
option_settings:
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
    PORT: 3000
  aws:autoscaling:launchconfiguration:
    InstanceType: t3.micro
  aws:elasticbeanstalk:environment:
    LoadBalancerType: application
```

::: warning Menos control, menos responsabilidad
En PaaS no puedes acceder directamente al servidor. Si necesitas instalar una librería del sistema
operativo, ese modelo no es para ti. Por eso, muchas empresas combinan IaaS y PaaS.
:::

---

## SaaS — Software as a Service

El proveedor gestiona absolutamente todo: infraestructura, plataforma **y** la aplicación completa.
El usuario solo la usa a través del navegador o una app.

**Analogía:** Es como ir a un restaurant. No te preocupas por la cocina, los ingredientes ni los platos.
Simplemente pides y comes.

**Ejemplos en el ecosistema AWS/cloud:**
- **Amazon WorkMail** — email corporativo
- **Amazon Chime** — videoconferencias
- **Salesforce** — CRM (no es de AWS, pero corre sobre AWS)
- **Gmail, Office 365** — ejemplos generales de SaaS

---

## Comparativa completa

| Capa | On-Premise | IaaS | PaaS | SaaS |
|---|---|---|---|---|
| Aplicación | Cliente | Cliente | **Cliente** | Proveedor |
| Datos | Cliente | Cliente | **Cliente** | Proveedor |
| Runtime | Cliente | Cliente | Proveedor | Proveedor |
| Middleware | Cliente | Cliente | Proveedor | Proveedor |
| Sistema Operativo | Cliente | **Cliente** | Proveedor | Proveedor |
| Virtualización | Cliente | Proveedor | Proveedor | Proveedor |
| Servidores físicos | Cliente | Proveedor | Proveedor | Proveedor |
| Almacenamiento | Cliente | Proveedor | Proveedor | Proveedor |
| Redes | Cliente | Proveedor | Proveedor | Proveedor |

> **En negrita**: la capa de transición donde cambia el responsable.

::: info Modelo de responsabilidad compartida
Esta tabla es la base del **Shared Responsibility Model** de AWS, uno de los conceptos más
evaluados en las certificaciones. AWS es responsable de la seguridad "de" la nube (hardware,
hipervisor, red global); el cliente es responsable de la seguridad "en" la nube (datos, IAM, configuración).
:::
