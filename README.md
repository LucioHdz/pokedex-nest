<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo


## 1. Clonar el repositorio

```bash
$ git clone https://github.com/LucioHdz/pokedex-nest.git

$ cd pokedex-nest
```

## 2. Ejecutar
```bash
$ yarn install
```

## 3. Tener Nest CLI instalado

```bash
$ npm i -g @nestjs/cli
```

## 4. Levantar la base de datos

```bash 
docker-compose up -d
```

## 5. Reconstrir la base de datos con la semilla

```postman
(get) http://localhost:3000/api/v2/seed
```


## Sack Usado

* MongoDB
* Nest
