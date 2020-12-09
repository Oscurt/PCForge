-- =========== Creacion de Tablas con llaves primarias =============

create table Cliente (
	id_cliente serial not null primary key,
	usuario varchar(30) not null,
	clave varchar(30) not null,
	UNIQUE(usuario)
);

create table Comentario(
	id_cliente serial,
	id_prod serial,
	calificacion integer,
	fecha date,
	contenido varchar(150)
);

create table Favorito(
	id_cliente serial,
	id_prod serial
);

create table Producto(
	id_prod serial not null primary key,
	id_cat serial,
	nombre varchar(50),
	precio integer,
	caracteristicas varchar(100),
	nventas integer,
	nfavoritos integer,
	puntaje integer,
	marca varchar(50),
	image varchar(50)
);

create table Categoria(
	id_cat serial not null primary key,
	nombre varchar(50)
);

-- ========= Definiendo las llaves foraneas ===============

alter table Comentario add foreign key(id_cliente) references Cliente(id_cliente);
alter table Comentario add foreign key(id_prod) references Producto(id_prod);

alter table Favorito add foreign key(id_cliente) references Cliente(id_cliente);
alter table Favorito add foreign key(id_prod) references Producto(id_prod);

alter table Producto add foreign key(id_cat) references Categoria(id_cat);


-- ========= REGLAS USUARIO ===============

-- alter table Cliente ADD UNIQUE (usuario);
-- alter table Cliente ADD UNIQUE (clave);

-- ========= Insercion =========

-- Insercion Cliente

insert into Cliente(usuario, clave) values ('Jordi','12345');
insert into Cliente(usuario, clave) values ('Benjita','54321');
insert into Cliente(usuario, clave) values ('Marcos','asdef');
insert into Cliente(usuario, clave) values ('Pipenex','hentai');
insert into Cliente(usuario, clave) values ('Martin','bearswim');
insert into Cliente(usuario, clave) values ('tests','tests');


-- Insercion Categoria

insert into Categoria(nombre) values ('Fuente de Poder');
insert into Categoria(nombre) values ('Placa Madre');
insert into Categoria(nombre) values ('Tarjeta de Video');
insert into Categoria(nombre) values ('Memoria Ram');
insert into Categoria(nombre) values ('Perifericos');
insert into Categoria(nombre) values ('Procesador');


-- Insercion Producto

insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (3,'GTX 1060', 10000, 'Perfecta para jugar', 1, 2, 50, 'MSI','images/p1.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (3,'RTX 2060', 20000, 'Ideal para Ray-Tracing', 0, 1, 60, 'MSI','images/p2.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (2,'Z390-A PRO', 5000, 'Perfecta para tu PC!', 1, 1, 70, 'MSI','images/p3.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (3,'GT 1030', 7000, 'Buenisimo para jugar Maicra', 0, 0, 30, 'ASUS','images/p4.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (1,'ROG-STRIX-750G ', 18000, 'No necesitas mas energia!', 3, 0, 75, 'ASUS','images/p5.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (4,'Kingston HyperX Predator RGB',55000, 'Nunca necesitaras mas!', 2,5,70,'Kingston','images/p6.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (5,'Razer Viper Ultimate', 5000, 'Perfecto en presicion', 0,4, 60, 'RAZER', 'images/p7.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (5, 'Razer Huntsman Elite', 6000, 'Teclado Mecanico perfecto!', 2, 3, 80, 'RAZER', 'images/p8.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (5, 'Logitech G935 Wireless 7.1', 4500, 'Vive el Surround con Wireless', 1, 1, 90, 'Logitech', 'images/p9.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (5, 'ASUS ROG Strix XG49VQ', 10000, 'Que mas se puede pedir?!', 0, 5, 85, 'ASUS', 'images/p10.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (6, 'Intel Core i9-9960X', 50000, 'Renderiza hasta peliculas!', 0, 4, 90, 'Intel', 'images/p11.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (6, 'AMD Ryzen Threadripper 3990X', 100000, 'Renderiza hasta la vida real!', 0, 15, 91, 'AMD', 'images/p12.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (6, 'Intel Celeron G1820', 100, 'El procesador de una tostadora', 2, 0, 10, 'Intel', 'images/p13.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (4,'CT8G4DFS824A', 30000, 'Rum Rum velocidad por monton', 8, 0, 60, 'Crucial','images/p14.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (4,'HyperX Fury RGB HX430C15FB3A/8', 35000, 'Rum Rum velocidad por mas aun monton', 2, 9, 89, 'Kingston','images/p15.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (2,'F1A75-M LE', 5000, 'sin RGB asi que no da fps', 0, 0, 47, 'Asus','images/p16.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (2,'B450M', 70000, 'Tiene un bonito diseño, asi que debe de ser buena... quizas', 10, 6, 91, 'Gigabyte','images/p17.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (1,'RX-600AC-V ', 60000, '600W con un certificado 80plus, ay papa que maquinola', 0, 0, 54, 'Raidmax','images/p18.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (1,'SuperNOVA 850 GA', 120000, '850W con un certificado 80plus GOLD, si quieres poner algo bueno esta es la eleccion', 5, 4, 90, 'EVGA','images/p19.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (3,'RTX 3090', 2000000, 'Apenas le corre el Maicra', 0, 0, 1, 'MSI','images/p20.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (2,'A520M S2H', 70000, 'No tiene rgb, pero eso no quita que se vea bien', 0, 3, 87, 'Gigabyte','images/p27.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (2,'H110M PRO-VH', 70000, 'Mas barato que el kilo de palta', 3, 5, 65, 'MSI','images/p26.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (1,'GP-650', 9049, 'Le podria dar energia a un refrigerador', 3, 2, 51, 'Gamemax','images/p25.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (1,'PSAZ-650W', 200, '650W a tan poca plata que se podria decir que es un robo', 4, 4, 69, 'Azza','images/p24.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (3,'RX 5600 XT', 203700, 'Ropita, pantalon, zapatooooo', 4, 10, 82, 'MSI','images/p23.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (3,'RX 5700 XT', 500000, 'Buenarda. QUE ES MARTES CHAVALES', 12, 6, 90, 'ASRock','images/p22.png');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca, image) values (3,'RX 5700 XT', 400000, 'Buenarda. QUE ES VIERNES CHAVALES', 10, 4, 94, 'MSI','images/p21.png');

-- Insercion Comentario

insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (1,27,7,'2020-12-01','Me gusto bastante, ahora puedo ir a matar a la alianza como se debe');
insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (3,1,8,'2020-12-20','Buenisimo, ya puedo matar a esos de la horda como se debe');
insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (2,1,9,'2020-12-20','Alfin jugare como un pandita neutral! :3');

insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (1,27,7,'2020-12-01','Me gusto bastante, ahora puedo ir a matar a la alianza como se debe');
insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (3,26,8,'2020-12-20','Buenisimo, ya puedo matar a esos de la horda como se debe');
insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (2,26,9,'2020-12-20','Alfin jugare como un pandita neutral! :3');

insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (5,1,7,'2020-12-01','CHAVALEE QUE ES VIERNES');
insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (3,12,8,'2020-12-20','Buenisimo, ya puedo matar a esos de la horda como se debe');
insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (2,12,9,'2020-12-20','Alfin jugare como un pandita neutral! :3');

-- Insercion Favorito

insert into Favorito(id_cliente, id_prod) values (1,2);
insert into Favorito(id_cliente, id_prod) values (3,1);
insert into Favorito(id_cliente, id_prod) values (2,1);
insert into Favorito(id_cliente, id_prod) values (3,3);

