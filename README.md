El presente repositorio contiene todo lo necesario para instanciar y correr la pagina web PC-FORGE.

Requisitos:

- Docker
- Docker-compose
- Git


Guia de uso:

Para montar el proyecto usar los siguientes comandos:

```sh
$ git clone https://github.com/Oscurt/PCForge
$ cd PcForge/
$ docker network create web
```

Necesitamos checkear la IP asignara a la red, podemos usar el siguiente comando:

```sh
$ docker network inspect web
```

En el apartado subnet saldra la ip de "web", debemos usar todos los digitos menos el ultimo para modificar el host de db.js por xxx.xxx.xxx.2 (siendo los primeros digitos los primeros de la red web), luego seguiremos con el paso final para montar la web:

```sh
$ docker-compose up --build -d
```

IMPORTANTE: la configuracion usa el puerto 80 (sitio web), 3001 (servidor), 5432 (postgres) y 8080 (pgadmin).
