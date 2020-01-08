insert into payment_method (code, localized_name, price) values ('cod', 'Dobírkou', 30);
insert into payment_method (code, localized_name, published) values ('bank_transfer', 'Bankovním převodem', false);



insert into shipping_method (code, shipping_time, price, localized_name) values ('czech_post', '1-5', 33, 'Česká pošta');
insert into shipping_method (code, shipping_time, price, localized_name) values ('zasilkovna', '1-5', 50, 'Zásilkovna');

insert into category(id) values ('party');
insert into category(id) values ('gift');