create table a_user (
    id bigint DEFAULT nextval(('user_id_seq'::text)::regclass) NOT NULL,
    enabled boolean not null default false,
    email text not null,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE SEQUENCE user_id_seq INCREMENT 1 START 1;

create table roles (
    a_user bigint not null,
    role text not null
);

alter table roles add CONSTRAINT fk_user_role FOREIGN KEY (a_user)
      REFERENCES a_user (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;


create table my_table (
    id bigint DEFAULT nextval(('my_table_id_seq'::text)::regclass) NOT NULL,
    note text not null
);

CREATE SEQUENCE my_table_id_seq INCREMENT 1 START 1;