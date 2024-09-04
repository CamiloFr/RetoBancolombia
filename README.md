# RetoBancolombia
Para que el proyecto funcione en local se deben instalar las dependencias, *npm instal* en ambos casos *"frontend, microservice"*, no se tienen configuradas variables de entorno por lo tanto esta listo para probar y usar.

En el caso de microservice en el archivo *run.js* puede servir para activar la función de la Lambda y ejecutarla con *node run.js*, cabe destacar que para este proceso se debe tener una instancia en Docker con DynamoDB con la tabla creada, y en el archivo *config.ts* angregar el endpoint al que se asignó la imagen de Docker (normalmente *"http://localhost:8000"*)

Toda la documentación con respecto al proyecto se encuentra el la carpeta docs/