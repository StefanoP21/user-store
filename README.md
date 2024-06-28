# Proyecto UserStore - Clean Architecture

Aplicación RESTful para la gestión de usuarios.

### Instalación

Clona el repositorio y navega hasta el directorio:

```bash
git clone https://github.com/StefanoP21/user-store.git
```

### Instala las dependencias:

```bash
npm install
```

### Variables de Entorno

Cree un archivo .env y .env.test en la carpeta raíz de su proyecto y añada sus variables. Consulte .env.template para obtener ayuda.

### Levantar las Bases de Datos

Para levantar las bases de datos, ejecute:

```bash
docker-compose up -d
```

### Ejecución en modo de desarrollo

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```bash
npm run dev
```

### Ejecución de las pruebas

Para iniciar las pruebas de la aplicación, ejecuta:

```bash
npm run test
# or with watch
npm run test:watch
# or with coverage
npm run test:coverage
```

### Ejecución en modo de producción

Para construir la aplicación para producción, ejecuta:

```bash
npm run build
# and then
npm start
```

### Tecnologías

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDb](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Docker](https://www.docker.com/)

### Autor

- [Stefano Palomino](https://github.com/StefanoP21)
