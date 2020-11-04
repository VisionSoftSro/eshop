create table goods (
    id bigint DEFAULT nextval(('goods_id_seq'::text)::regclass) NOT NULL primary key,
    code text not null,
    name text not null,
    description text not null,
    stock integer not null,
    price decimal not null,
    published boolean not null default true,
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


create table payment_method (
  id bigint DEFAULT nextval(('c_payment_method_seq'::text)::regclass) NOT NULL primary key,
  price decimal default 0,
  code text not null,
  localized_name text not null,
  published boolean not null default true
);

CREATE SEQUENCE c_payment_method_seq INCREMENT 1 START 1
;

create table shipping_method (
  id bigint DEFAULT nextval(('c_shipping_method_seq'::text)::regclass) NOT NULL primary key,
  code text not null,
  shipping_time text not null,
  price decimal not null,
  localized_name text not null,
  published boolean not null default true
);

CREATE SEQUENCE c_shipping_method_seq INCREMENT 1 START 1
;

create table c_order (
  id bigint DEFAULT nextval(('c_order_id_seq'::text)::regclass) NOT NULL primary key,
  email text not null,
  status text not null,
  json text,
  address text not null,
  first_name text not null,
  last_name text not null,
  post_code text not null,
  city text not null,
  shipping_method_id bigint not null,
  payment_method_id bigint not null,
  branch_id text
);

create table c_order_goods (
  c_order bigint not null,
  goods bigint not null,
  pcs integer not null
);
ALTER TABLE c_order_goods ADD CONSTRAINT PK_c_order_goods
	PRIMARY KEY (c_order, goods)
;
ALTER TABLE c_order_goods ADD CONSTRAINT FK_c_order_goods_c_order
	FOREIGN KEY (c_order) REFERENCES c_order (id)
;
ALTER TABLE c_order_goods ADD CONSTRAINT FK_c_order_goods_goods
	FOREIGN KEY (goods) REFERENCES goods (id)
;
ALTER TABLE c_order ADD CONSTRAINT FK_c_order_shipment
	FOREIGN KEY (shipping_method_id) REFERENCES shipping_method (id)
;
ALTER TABLE c_order ADD CONSTRAINT FK_c_order_payment
	FOREIGN KEY (payment_method_id) REFERENCES payment_method (id)
;
CREATE SEQUENCE c_order_id_seq INCREMENT 1 START 256147
;


--ceska posta balikovny
