--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE images (
    id integer NOT NULL,
    file_name text NOT NULL,
    lat real NOT NULL,
    lng real DEFAULT '0'::real NOT NULL,
    user_id integer
);


ALTER TABLE images OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE images_id_seq OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE images_id_seq OWNED BY images.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE knex_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE knex_migrations_id_seq OWNED BY knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE knex_migrations_lock (
    is_locked integer
);


ALTER TABLE knex_migrations_lock OWNER TO postgres;

--
-- Name: sticker; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sticker (
    id integer NOT NULL,
    image_url text NOT NULL,
    description text NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    size text,
    user_id integer
);


ALTER TABLE sticker OWNER TO postgres;

--
-- Name: sticker_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sticker_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sticker_id_seq OWNER TO postgres;

--
-- Name: sticker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sticker_id_seq OWNED BY sticker.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone,
    rating integer DEFAULT 0
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- Name: user_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_image (
    id integer NOT NULL,
    user_id integer,
    image_id integer,
    thumb integer DEFAULT 1
);


ALTER TABLE user_image OWNER TO postgres;

--
-- Name: user_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_image_id_seq OWNER TO postgres;

--
-- Name: user_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_image_id_seq OWNED BY user_image.id;


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images ALTER COLUMN id SET DEFAULT nextval('images_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY knex_migrations ALTER COLUMN id SET DEFAULT nextval('knex_migrations_id_seq'::regclass);


--
-- Name: sticker id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sticker ALTER COLUMN id SET DEFAULT nextval('sticker_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: user_image id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_image ALTER COLUMN id SET DEFAULT nextval('user_image_id_seq'::regclass);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY images (id, file_name, lat, lng, user_id) FROM stdin;
169	d9948431cb3d4c692a582a20bb6b1704	11.5356569	104.909805	2
170	138015904182b6f41ee38a0804f89288	11.5356483	104.909782	2
\.


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('images_id_seq', 172, true);


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY knex_migrations (id, name, batch, migration_time) FROM stdin;
3	20161215142600_fix_date_column.js	1	2018-12-25 04:02:26.901-08
6	201812280211555_user_image.js	2	2018-12-29 08:06:26.95-08
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('knex_migrations_id_seq', 6, true);


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY knex_migrations_lock (is_locked) FROM stdin;
0
\.


--
-- Data for Name: sticker; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY sticker (id, image_url, description, quantity, size, user_id) FROM stdin;
1	http://devstickers.com/assets/img/cat/angular2.png	Angular 2 Logo	5	M	2
2	http://devstickers.com/assets/img/cat/ruby.png	Ruby Logo	20	L	1
3	http://devstickers.com/assets/img/cat/handlebars-js.png	Handlebars Logo	10	S	2
4	http://devstickers.com/assets/img/cat/reddit.png	Reddit Logo	3	M	1
\.


--
-- Name: sticker_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sticker_id_seq', 4, true);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "user" (id, email, password, is_active, created_at, rating) FROM stdin;
8	sample@gmail.com	$2b$10$RDIxtFDRDgBQX7OD0ANAfufqSxzTKNWx3a1aXnVQ0h82LYWlgKPPm	t	2019-01-03 19:15:56.437-08	0
2	hello@cjr.co.de	$2b$10$RDIxtFDRDgBQX7OD0ANAfufqSxzTKNWx3a1aXnVQ0h82LYWlgKPPm	t	2018-12-25 06:47:01.609-08	5
5	test2@gmail.com	$2b$10$RDIxtFDRDgBQX7OD0ANAfufqSxzTKNWx3a1aXnVQ0h82LYWlgKPPm	t	2018-12-26 00:37:14.906-08	0
6	test1@gmail.com	$2b$10$RDIxtFDRDgBQX7OD0ANAfufqSxzTKNWx3a1aXnVQ0h82LYWlgKPPm	t	2018-12-26 00:38:18.97-08	0
7	test3@gmail.com	$2b$10$RDIxtFDRDgBQX7OD0ANAfufqSxzTKNWx3a1aXnVQ0h82LYWlgKPPm	t	2018-12-26 01:19:45.861-08	0
1	berto.ort@gmail.com	$2b$10$RDIxtFDRDgBQX7OD0ANAfufqSxzTKNWx3a1aXnVQ0h82LYWlgKPPm	t	2018-12-25 06:47:01.609-08	0
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_id_seq', 8, true);


--
-- Data for Name: user_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_image (id, user_id, image_id, thumb) FROM stdin;
\.


--
-- Name: user_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_image_id_seq', 1, false);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: sticker sticker_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sticker
    ADD CONSTRAINT sticker_pkey PRIMARY KEY (id);


--
-- Name: user user_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- Name: user_image user_image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_image
    ADD CONSTRAINT user_image_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: images images_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- Name: sticker sticker_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sticker
    ADD CONSTRAINT sticker_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;


--
-- Name: user_image user_image_image_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_image
    ADD CONSTRAINT user_image_image_id_foreign FOREIGN KEY (image_id) REFERENCES images(id);


--
-- Name: user_image user_image_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_image
    ADD CONSTRAINT user_image_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- PostgreSQL database dump complete
--

