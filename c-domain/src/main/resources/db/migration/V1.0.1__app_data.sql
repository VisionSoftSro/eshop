insert into payment_method (code, localized_name) values ('cod', 'Dobírkou');
insert into payment_method (code, localized_name, published) values ('bank_transfer', 'Bankovním převodem', false);



insert into shipping_method (code, shipping_time, price, localized_name) values ('czech_post_hand_delivery', '1-5', 130, 'Česká pošta - balík do ruky');
insert into shipping_method (code, shipping_time, price, localized_name) values ('czech_post_branch_delivery', '1-5', 130, 'Česká pošta - balík na poštu');