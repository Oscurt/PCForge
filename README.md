El presente repositorio contiene todo lo necesario para instanciar y correr la pagina web PC-FORGE.

Requisitos:

- Docker
- Docker-compose
- Git


Guia de uso:

Para montar la base de datos usaremos los siguientes comandos:

```sh
$ git clone https://github.com/Oscurt/PCForge
$ cd PcForge/
$ docker-compose up --build -d
```
IMPORTANTE: la configuracion usa el puerto 3000, 5432 y 8080.