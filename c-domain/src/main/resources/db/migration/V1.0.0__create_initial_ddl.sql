create table goods (
    id bigint DEFAULT nextval(('goods_id_seq'::text)::regclass) NOT NULL primary key,
    code text not null,
    name text not null,
    description text not null,
    stock integer not null,
    price decimal not null,
    hot boolean not null default false,
    images integer default 0--images are hardbuilded in frontend
);
CREATE SEQUENCE goods_id_seq INCREMENT 1 START 1
;

create table category (
    id text not null primary key
);

create table goods_category (
  category text not null,
  goods bigint not null
);
ALTER TABLE goods_category ADD CONSTRAINT PK_goods_category
	PRIMARY KEY (category, goods)
;
ALTER TABLE goods_category ADD CONSTRAINT FK_goods_category_category
	FOREIGN KEY (category) REFERENCES category (id)
;

ALTER TABLE goods_category ADD CONSTRAINT FK_goods_category_goods
	FOREIGN KEY (goods) REFERENCES goods (id)
;
CREATE SEQUENCE c_order_id_seq INCREMENT 1 START 256147
;
