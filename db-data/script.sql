-- =========== Creacion de Tablas con llaves primarias =============

create table Cliente (
	id_cliente serial not null primary key,
	usuario varchar(30) not null,
	clave varchar(30) not null,
	UNIQUE(usuario)
);

create table Orden(
	numero integer not null primary key,
	id_cliente serial,
	id_det serial
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
	id_producto serial
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
	marca varchar(50)
);


create table Detalle(
	id_prod serial,
	id_det serial not null primary key,
	numero integer
);

create table Categoria(
	id_cat serial not null primary key,
	nombre varchar(50)
);

-- ========= Definiendo las llaves foraneas ===============

alter table Orden add foreign key(id_cliente) references Cliente(id_cliente);
alter table Orden add foreign key(id_det) references Detalle(id_det);

alter table Comentario add foreign key(id_cliente) references Cliente(id_cliente);
alter table Comentario add foreign key(id_prod) references Producto(id_prod);

alter table Favorito add foreign key(id_cliente) references Cliente(id_cliente);
alter table Favorito add foreign key(id_producto) references Producto(id_prod);

alter table Producto add foreign key(id_cat) references Categoria(id_cat);

alter table Detalle add foreign key(id_prod) references Producto(id_prod);
alter table Detalle add foreign key(numero) references Orden(numero);

-- ========= REGLAS USUARIO ===============

-- alter table Cliente ADD UNIQUE (usuario);
-- alter table Cliente ADD UNIQUE (clave);

-- ========= Insercion =========

-- Insercion Cliente

insert into Cliente(usuario, clave) values ('Jordi','123');
insert into Cliente(usuario, clave) values ('Benjita','321');
insert into Cliente(usuario, clave) values ('Marcos','asd');
insert into Cliente(usuario, clave) values ('Pipenex','hentai');
insert into Cliente(usuario, clave) values ('Martin','bearswim');
insert into Cliente(usuario, clave) values ('test','test');

select * from cliente;

-- Insercion Comentario

insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (1,2,7,'23-10-20','Me gusto bastante, ahora puedo ir a matar a la alianza como se debe');
insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (3,1,8,'23-10-20','Buenisimo, ya puedo matar a esos de la horda como se debe');
insert into Comentario(id_cliente, id_prod, calificacion, fecha, contenido) values (2,1,9,'23-10-20','Alfin jugare como un pandita neutral! :3');

select * from comentario;

-- Insercion Favorito

insert into Favorito(id_cliente, id_producto) values (1,2);
insert into Favorito(id_cliente, id_producto) values (3,1);
insert into Favorito(id_cliente, id_producto) values (2,1);
insert into Favorito(id_cliente, id_producto) values (3,3);

select * from favorito;

-- Insercion Categoria

insert into Categoria(nombre) values ('Fuente de Poder');
insert into Categoria(nombre) values ('Placa Madre');
insert into Categoria(nombre) values ('Tarjeta de Video');
insert into Categoria(nombre) values ('Memoria Ram');

select * from categoria;

-- Insercion Producto

insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca) values (3,'GTX 1060', 10000, 'Perfecta para jugar', 1, 2, 50, 'MSI');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca) values (3,'RTX 1060', 20000, 'Ideal para Ray-Tracing', 0, 1, 60, 'MSI');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca) values (2,'Z390-A PRO', 5000, 'Perfecta para tu PC!', 1, 1, 70, 'MSI');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca) values (3,'GT 1030', 7000, 'Buenisimo para jugar Maicra', 0, 0, 30, 'ASUS');
insert into Producto(id_cat, nombre, precio, caracteristicas, nventas, nfavoritos, puntaje, marca) values (1,'ROG-STRIX-750G ', 18000, 'No necesitas mas energia!', 3, 0, 75, 'ASUS');

select * from producto;

-- ============== Consultas =================

-- Ver Lista de usuarios

select usuario 
from cliente;

-- Ver los favoritos de otros usuarios

select p.nombre
from Producto p, Favorito f, Cliente c
where c.usuario = 'Marcos' and c.id_cliente = f.id_cliente and f.id_producto = p.id_prod;
-- En este caso se buscan los favoritos del usuario 'Marcos'


-- Producto que mas gente ha puesto en favoritos

select nombre
from Producto
where nfavoritos = (select max(nfavoritos) from Producto);

-- Comparar Puntaje de 2 componentes por Nombre de producto (Deben ser de misma categoria)

select nombre, puntaje
from Producto
where ( nombre = 'GTX 1060' or nombre = 'RTX 2060') and ((select id_cat from producto where nombre = 'GTX 1060') = (select id_cat from producto where nombre = 'RTX 2060'));
-- En este ejemplo se compara la 'GTX 1060' con la 'RTX 2060' , en caso de que los productos no tengan la misma categoria no retorna nada


-- Buscar producto con solo Cierta parte del nombre a medida que se escribe

select nombre
from producto
where nombre like('GT%');
-- En este caso se comienza a escribir 'GT' , como resultado a la 'GTX 1060' y la 'GT 1030'

--Comparar Precios de componentes
select nombre, precio
from producto
where nombre = 'GTX 1060' or nombre = 'RTX 2060';
-- En este caso se usaron la 'GTX 1060' y la 'RTX 2060' como referencias

-- Filtros por Precio o Marca

-- Existen 3 casos, que coloque limite de precios, de marca o ambos, esto lo elige el sistema que accede a la base de datos

-- Caso Solo Marca
select nombre, marca, precio
from producto
where marca = 'MSI';

-- Caso por Precios
select nombre, marca, precio
from producto
where precio >=(0) and precio <=(15000); 

-- Ambos Casos
select nombre, marca, precio
from producto
where (precio >=(0) and precio <= (15000)) and marca = 'MSI';



-- Producto mas vendido por categoria (solo uno)
select distinct on (p.id_cat) 
	c.nombre as categoria, p.nombre, p.marca, p.precio
from producto p, categoria c
where c.id_cat = p.id_cat
order by p.id_cat;

-- Categoria mas relevante ( Mayor numero de favoritos )
select max(t.nombre)
from (select c.nombre, sum(p.nfavoritos) sumfav
	 from categoria c
	 join producto p on c.id_cat = p.id_cat
	 group by c.nombre) t;

-- Filtrar comentarios por los mas populares ( Las mejores calificadas )
select cl.usuario, p.nombre, co.calificacion, co.fecha, co.contenido
from cliente cl, producto p, comentario co
where cl.id_cliente = co.id_cliente and co.id_prod = p.id_prod
order by co.calificacion DESC;
