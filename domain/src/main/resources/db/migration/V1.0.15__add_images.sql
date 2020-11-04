
create table goods_image (
  image text not null,
  goods bigint not null
);
ALTER TABLE goods_image ADD CONSTRAINT PK_goods_image
	PRIMARY KEY (image, goods)
;

ALTER TABLE goods_image ADD CONSTRAINT FK_goods_image_goods
	FOREIGN KEY (goods) REFERENCES goods (id)
;
