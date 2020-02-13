insert into payment_method (code, localized_name, price) values ('cod', 'Dobírkou', 30);
insert into payment_method (code, localized_name) values ('bank_transfer', 'Bankovním převodem');

insert into shipping_method (code, shipping_time, price, localized_name) values ('czech_post', '1-5', 90, 'Česká pošta - Balík na poštu');
insert into shipping_method (code, shipping_time, price, localized_name) values ('zasilkovna', '1-5', 50, 'Zásilkovna');

insert into category(id) values ('party');
insert into category(id) values ('gift');
