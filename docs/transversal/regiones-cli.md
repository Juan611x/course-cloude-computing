# Gestión de Regiones desde la CLI

AWS CLI opera siempre en una región específica. A diferencia de la consola web —donde la región
es visible en la barra superior y puedes cambiarla con un clic— la CLI trabaja silenciosamente
con la región configurada por defecto. Si no la verificas antes de crear un recurso, puedes
terminar con instancias, security groups o buckets en el lugar equivocado.

## Verificar la región activa

```bash
aws configure get region
```

También puedes ver toda la configuración activa de una vez:

```bash
aws configure list
```

```
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key     ****************XXXX shared-credentials-file
secret_key     ****************XXXX shared-credentials-file
    region                eu-west-1      config-file    ~/.aws/config
```

La columna **Type** indica de dónde viene el valor. `config-file` significa que está en
`~/.aws/config`; `env` significa que viene de una variable de entorno (tiene precedencia).

## Cambiar la región

**Forma permanente** — actualiza `~/.aws/config`:

```bash
aws configure set region eu-west-1
```

**Forma temporal para un solo comando** — usa el flag `--region`:

```bash
aws ec2 describe-instances --region us-east-1
```

**Forma temporal para toda la sesión** — variable de entorno (tiene precedencia sobre el config):

```bash
# Linux / macOS
export AWS_DEFAULT_REGION=eu-west-1

# Windows PowerShell
$env:AWS_DEFAULT_REGION = "eu-west-1"
```

::: tip Precedencia de configuración
Cuando hay valores en múltiples lugares, AWS CLI los aplica en este orden (el primero gana):

1. Flag `--region` en el comando
2. Variable de entorno `AWS_DEFAULT_REGION`
3. Perfil activo en `~/.aws/config`
4. Perfil `default` en `~/.aws/config`
:::

## Listado de regiones disponibles

Para ver todas las regiones habilitadas en tu cuenta:

```bash
aws ec2 describe-regions --output table
```

```
----------------------------------------------------------
|                     DescribeRegions                    |
+----------------------------+---------------------------+
|         Endpoint           |        RegionName         |
+----------------------------+---------------------------+
|  ec2.us-east-1.amazonaws.com     |  us-east-1         |
|  ec2.eu-west-1.amazonaws.com     |  eu-west-1         |
|  ec2.ap-southeast-1.amazonaws.com|  ap-southeast-1    |
|  ...                             |  ...               |
+----------------------------+---------------------------+
```

## Error común: RequestExpired

Si al ejecutar un comando ves este error:

```
An error occurred (RequestExpired) when calling the ... operation:
Request has expired.
```

**No es un problema de región** — es que el reloj de tu máquina está desincronizado con los
servidores de AWS (diferencia mayor a 5 minutos). AWS rechaza requests con timestamps viejos
como medida de seguridad.

**Solución en Windows:**

```powershell
# Forzar sincronización del reloj
w32tm /resync /force
```

**Solución en Linux / macOS:**

```bash
sudo ntpdate pool.ntp.org
# o con systemd:
sudo timedatectl set-ntp true
```
