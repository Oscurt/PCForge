-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: r; Type: TABLE; Schema: public; Owner: tin
--

CREATE TABLE public.r (
    a integer NOT NULL,
    b integer,
    c integer
);


ALTER TABLE public.r OWNER TO tin;

--
-- Name: s; Type: TABLE; Schema: public; Owner: tin
--

CREATE TABLE public.s (
    c integer NOT NULL,
    d character varying(200),
    e integer
);


ALTER TABLE public.s OWNER TO tin;

--
-- Name: t; Type: TABLE; Schema: public; Owner: tin
--

CREATE TABLE public.t (
    f character(1) NOT NULL,
    g character varying(200)
);


ALTER TABLE public.t OWNER TO tin;

--
-- Name: u; Type: TABLE; Schema: public; Owner: tin
--

CREATE TABLE public.u (
    e integer NOT NULL,
    h character varying(200),
    i character varying(80)
);


ALTER TABLE public.u OWNER TO tin;

--
-- Data for Name: r; Type: TABLE DATA; Schema: public; Owner: tin
--

COPY public.r (a, b, c) FROM stdin;
1	2	3
2	3	4
3	4	5
4	5	6
5	6	7
\.


--
-- Data for Name: s; Type: TABLE DATA; Schema: public; Owner: tin
--

COPY public.s (c, d, e) FROM stdin;
3	Pectoriano	9
6	Yo soy el impostor	27
5	Secico	18
\.


--
-- Data for Name: t; Type: TABLE DATA; Schema: public; Owner: tin
--

COPY public.t (f, g) FROM stdin;
a	Que es viernes, chavales!
b	El viejo leeeeento para corregir...
c	Temuco, capital del folklore
d	La natación la llea
\.


--
-- Data for Name: u; Type: TABLE DATA; Schema: public; Owner: tin
--

COPY public.u (e, h, i) FROM stdin;
27	Crackers con quesos (ahumado)	Guide
9	Pucha que están wenos los nachos Pancho Villa (con salsa Tarí)	Pretoriano, el estratega
31	Pizza del papayón, locooooo	Zorojuro
88	Viernes rulz	23 hola 46
\.


--
-- Name: r r_pkey; Type: CONSTRAINT; Schema: public; Owner: tin
--

ALTER TABLE ONLY public.r
    ADD CONSTRAINT r_pkey PRIMARY KEY (a);


--
-- Name: s s_pkey; Type: CONSTRAINT; Schema: public; Owner: tin
--

ALTER TABLE ONLY public.s
    ADD CONSTRAINT s_pkey PRIMARY KEY (c);


--
-- Name: t t_pkey; Type: CONSTRAINT; Schema: public; Owner: tin
--

ALTER TABLE ONLY public.t
    ADD CONSTRAINT t_pkey PRIMARY KEY (f);


--
-- Name: u u_pkey; Type: CONSTRAINT; Schema: public; Owner: tin
--

ALTER TABLE ONLY public.u
    ADD CONSTRAINT u_pkey PRIMARY KEY (e);


--
-- PostgreSQL database dump complete
--
