--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.6

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

CREATE DATABASE dbtrack;
--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE subscriptions (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer NOT NULL,
    "subscriptionId" integer NOT NULL
);


ALTER TABLE subscriptions OWNER TO postgres;

--
-- Name: tracks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tracks (
    id integer NOT NULL,
    title character varying(255),
    url character varying(255),
    platform character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE tracks OWNER TO postgres;

--
-- Name: tracks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tracks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tracks_id_seq OWNER TO postgres;

--
-- Name: tracks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tracks_id_seq OWNED BY tracks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: tracks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tracks ALTER COLUMN id SET DEFAULT nextval('tracks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY subscriptions ("createdAt", "updatedAt", "userId", "subscriptionId") FROM stdin;
2018-06-13 14:11:51.329+02	2018-06-13 14:11:51.329+02	1	2
\.


--
-- Data for Name: tracks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY tracks (id, title, url, platform, "createdAt", "updatedAt", "userId") FROM stdin;
1	Friday night	toto	youtube	2018-06-12 19:47:24.424+02	2018-06-12 19:47:24.424+02	1
2	Friday night	toto	youtube	2018-06-13 14:23:40.025+02	2018-06-13 14:23:40.025+02	2
3	King Kong	toto	youtube	2018-06-13 14:24:01.179+02	2018-06-13 14:24:01.179+02	2
\.


--
-- Name: tracks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tracks_id_seq', 3, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id, username, password, "createdAt", "updatedAt") FROM stdin;
1	ziika	$2a$10$jc9kxFI7RKi4h.TsqwwrP.PJxVf7ugm2ayhLVxlJ7sAnR3CUCes5G	2018-06-12 19:46:59.126+02	2018-06-12 19:46:59.126+02
2	ziikb	$2a$10$EFJNzXpcLNxc6tu2E54zwOpiU46D3Hz97VIQVmBtZvS3Ag4CfGixS	2018-06-13 14:08:48.817+02	2018-06-13 14:08:48.817+02
3	Louis	$2a$10$/oDNShRuswMcTzBhxnunROwbVHyRz.rE3b1hcRGeF.1FFKihA.i3O	2018-06-13 16:27:11.404+02	2018-06-13 16:27:11.404+02
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_seq', 3, true);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY ("userId", "subscriptionId");


--
-- Name: tracks tracks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tracks
    ADD CONSTRAINT tracks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_subscriptionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscriptions
    ADD CONSTRAINT "subscriptions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: subscriptions subscriptions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscriptions
    ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tracks tracks_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tracks
    ADD CONSTRAINT "tracks_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

