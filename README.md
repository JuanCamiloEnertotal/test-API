<p align="center">
  <a href="https://www.enertotalesp.com/" target="blank"><img src="logo.png" width="200" alt="Enertotal Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Aplicacion realizada en <a href="http://nodejs.org" target="_blank">Node.js</a> para la automatizacion de procesos del Centro de gestion de medida de ENERTOTAL.</p>
    <p align="center">

# Descripción
El frontend esta realizado en REACT en su version 19, a continuacion se describen los pasos a seguir para su despliegue

## 1. Reconstruir modulos de Nodejs.

```bash
$ npm install
```

## 2. Correr aplicacion en modo desarrollo.

```bash
# Configurar variables de entorno
# Renombrar archivo .env.template a .env para desarrollo ó .env.production para produccion

# watch mode
$ npm run dev
```

## 3. Generar build de produccion

```bash
$ npm run build
```

El build de la aplicacion generara una carpeta llamada <b>dist</b> la cual puede ser desplegada mediante IIS, PM2 o mediante cualquier administrador de procesos que soporte Nodejs

Nota: El backend cuenta con la posibilidad de servir contenido estatico, por lo cual es el front puede ser configurado en la carpeta publica expuesta.

## Licencia

[MIT licensed](LICENSE).