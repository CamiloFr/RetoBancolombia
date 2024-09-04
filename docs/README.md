# Prueba técnica Bancolombia

## Negocio

En los últimos años, Colombia ha experimentado un notable aumento en la llegada de turistas extranjeros. Esta tendencia se debe a diversos factores, la promoción de Colombia como destino turístico, y la creciente popularidad de sus diversas atracciones naturales, culturales e históricas. Desde las maravillosas ciudades como Medellín, Bogotá, Barranquilla, Cali y Cartagena hasta los impresionantes paisajes naturales de la Amazonía y las playas paradisíacas de la costa Caribe, Colombia ofrece una variedad única de experiencias para los visitantes.

Sin embargo, a pesar de este crecimiento en el turismo, muchos extranjeros y turistas locales enfrentan desafíos al intentar encontrar información completa y confiable sobre los lugares que desean visitar. La falta de una plataforma centralizada que ofrezca información detallada sobre ciudades, departamentos, y puntos turísticos específicos puede resultar en una experiencia de viaje menos enriquecedora. Los visitantes a menudo deben recurrir a múltiples fuentes para planificar sus viajes, lo cual puede ser confuso y consumir tiempo.

Es por esto que, el accesso a la información completa y actualizada puede ser crucial para que los extranjeros y hasta los mismos compatriotas; con el fin de tener una oferta variada de sitios para explorar, visitar y conocer historia en cada rincon de Colombia. 

### Propuesta

Desarrollar una aplicación web centrada en el turismo en Colombia que no solo responde a la creciente demanda de información por parte de los turistas extranjeros y locales, si no que también posiciona al país como un destino moderno y accesible en la era digital. Esta plataforma no solo enriquecerá la experiencia de viaje de los usuarios, sino que también promoverá el crecimiento económico y cultural sostenible del país al destacar la riqueza y diversidad de sus destinos. Al facilitar el acceso a la información y mejorar la experiencia de los visitantes, la aplicación contribuirá significativamente a consolidar la imagen de Colombia como un destino turístico de primer nivel a nivel mundial.

## Diseño e implementación

### Objetivo general
El objetivo principal de esta aplicación web es proporcionar a turistas extranjeros y locales una plataforma centralizada, fácil de usar y rica en información, que les permita explorar, planificar y disfrutar de sus viajes por Colombia. La aplicación ofrecerá detalles sobre ciudades, departamentos y lugares turísticos, todo en un solo lugar. Esto ayudará a mejorar la experiencia de los visitantes y fomentará el turismo sostenible y el desarrollo económico local.

### Estructura de la información
- Sitios turísticos: La aplicación cuenta con una API que nos provee toda la base de datos de sitios turisticos, categorizado por ciudades, departamentos y cada una cuenta con fotos relevantes del sitio e información de interes.
- Areas naturales: La aplicación cuenta con una API que nos provee toda la base de datos de las areas naturales de colombia, categorizado por ciudades, departamentos y cada uno con fotos relevantes del sitio e información de interes.

### Implementación técnica

#### Arquitectura de la aplicación
Ver la imagen adjunta en la carpeta docs/SoluciónRetoBancolombia.jpg del repositorio.

#### Control de versiones
*Descripción*: Git es muy bueno para el control de versiones y uno de los mas usado.

*Flujo de trabajo*: trunk based, fomentando el desarrollo en una rama prinicipal (trunk), excelente para integración continua y despliegues automaticos.

*Versionado*: Tags en Git para marcar las versiones más importantes o que salgan de cara al cliente.

*Integración Continua y Despliegue Continuo*: En este caso Azure DevOps nos nos permite automatizar los processos de construcción, pruebas y despliegue.

*Documentación y registro de Cambios*: Mantener un archivo CHANGELOG.md en el repositorio el cual documentarias los cambios en cada versión.

#### Backend
*Tecnología*: AWS Lambda (Node.js).

*Descripción*: Dado el volumen de peticiones y la naturaleza de las operaciones (consultas, obtención y actualización de datos), se optó por una implementación serverless. Esta desarrollado con Node.js y TypeScript permitiendo un tipado estático que ayude a prevenir errores en tiempo de compilación, mejorando la calidad del código y facilitando el mantenimiento a largo plazo. La estructura de archivos se encuentra con Clean Architecture lo cual nos permitirá una clara separación de responsabilidades, donde la lógica de negocio está desacoplada de los detalles de la infraestructura y del framework.

#### Frontend
*Tecnología*: Angular.

*Descripción*: Debido a que tiene TypeScript de uso nativo, mejora la detección de errores en tiempo de compilación, mantenibilidad, escalabilidad del código y promueve un desarrollo mas seguro y eficiente. Tambien su estructura y consistencia lo hace facil de trabajar en este caso se utiliza mediante el enfoque Feature by Component (standalone), lo cual permite un desacoplamiento y modularidad en el desarrollo. Este modelo tambien permite tener componentes con estrictamente lo necesario para funcionar, eliminando dependencias innecesarias en una rama de componentes mediante modulos.

#### Bases de datos
*Tecnología*: DynamoDB

*Descripción*: Debido a su capacidad para manejar cargas de trabajo con baja latencia con un esquema flexible la hace ideal para este tipo de aplicaciones.

#### Modelo de datos
La base de datos consta de la información necesaria para que el usuario se registre, autentique y pueda visualizar sus datos básicos. Por tanto, el modelo presentado es básico pero dirigido a posible crecimiento en la aplicación web.

El modelo para satisfacer las necesidades del usuario son:

| PK         | SK         | Name   | Phone  | Country | City  | Password |
| :---:      | :---:      | :---:  | :---:  |  :---:  | :---: |  :---:   |
| USER#email | TYPE#type  | Name   | Phone  | Country | City  | Password |

#### Proceso para realizar el deployment
**AWS Lambda** para el deployment realizado en este recurso, debemos tener en cuenta que debemos realizar una carga de archivos en un .zip el cual debe contener la información necesaria para funcionar. Por ende, una vez finalizada la etapa de desarrollo, procedemos a realizar en la cmd *npm run build* para que typescript nos realice un empaquetado en el directorio dist/ como lo tenemos configurado en el archivo tsconfig.json. Una vez finalizado el proceso de empaquetado procedemos a borrar la carpeta node_modules, y luego a ejecutar el comando *npm instal-production* lo cual nos generará otra instalación con solo los paquetes necesarios para que nuestra aplicación funcione correctamente.
Cuando termine la instalación procedemos a comprimir la carpeta dist, node_modules y archivo package.json en un archivo .zip.

**Angular** para el deployment realizado en el recurso de **AWS S3** debemos realizar el comando *npm run build* en el cual angular se encargará de realizar todo el proceso de empaquetado de nuestra aplicación. Una vez finalice en el directorio se encontrará una carpeta dist/ la cual contiene todos los archivos necesarios.
Abrimos el Bucket S3 al cual ya le hemos configurado los permisos necesarios para tener un sitio estatico, cargamos solo los archivos y la carpeta assets.

**DynamoDB** para la conexión con *AWS Lambda* solo fue necesario utilizar el paquete oficial de AWS *@aws-sdk* y configurar las policies para que la *AWS Lambda* pueda escribir, editar, obtener y eliminar de la tabla dynamo creada.

#### Servicios en la nube
El uso de los servicios en la nube (AWS) como Lambda para tener el backend (serverless), DynamoDB para la base de datos, garantizando una alta disponibilidad y escalabilidad, S3 para el almacenamiento de nuestra página web.

### Integraciones
#### API
[API Colombia](https://api-colombia.com/) es la elegida para consultar toda la información sobre Colombia, la cual nos provee un swagger para facilitar la consulta de la información de manera didactica y así aplicar en nuestra interfaz gráfica sin ninguna dificultad. 
