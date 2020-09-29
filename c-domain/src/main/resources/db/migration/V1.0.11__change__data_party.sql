update goods set published = false where id in (select goods from goods_category where category = 'party');
update goods set published = true where code = 'party-34' or code = 'party-35';
insert into goods (code, name, description, hot, images, stock, price) values ('party-40', 'Party box pro kluky  -  1 rok ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla jedna v modré barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10ks<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký modrý fóliový balónek ve tvaru čísla jedna.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Foliový balónek ve tvaru Olafa z pohádky Ledové království.<br/>Velikost: 43 x 77 cm<br/><br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Ovečka<br/>Velikost: 58 x 44 cm<br/><br/>---------------------------------<br/><br/>', false, 8, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));
insert into goods (code, name, description, hot, images, stock, price) values ('party-41', 'Party box pro holky  -  2 roky ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla dva v růžové barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10 ks<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký červený fóliový balónek ve tvaru čísla dva.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Velký foliový balónek ve tvaru jednorožce.<br/>Velikost: 60 x 60 cm<br/><br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Slon<br/>Velikost: 80 x 45 cm<br/><br/>---------------------------------<br/><br/>', false, 8, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));
insert into goods (code, name, description, hot, images, stock, price) values ('party-42', 'Party box pro kluky  -  5 let ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla pět v modré barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10 ks.<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký modrý fóliový balónek ve tvaru čísla pět.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Velký foliový balónek ve tvaru Mickey Mouse.<br/>Velikost: 110 cm<br/><br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Dinosaurus<br/>Velikost: 80 x 42 cm<br/>---------------------------------<br/>', false, 8, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));
insert into goods (code, name, description, hot, images, stock, price) values ('party-43', 'Party box pro holky  -  3 roky ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla tři v růžové barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10 ks<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký červený fóliový balónek ve tvaru čísla tři.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Velký foliový balónek ve tvaru jednorožce.<br/>Velikost: 60 x 60 cm<br/><br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Žirafa<br/>Velikost: 91 x 39 cm<br/><br/>---------------------------------<br/><br/>', false, 8, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));
insert into goods (code, name, description, hot, images, stock, price) values ('party-44', 'Party box pro holky  -  4 roky ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla čtyři v růžové barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10 ks<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký červený fóliový balónek ve tvaru čísla čtyři.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Velký foliový balónek ve tvaru Minnie Mouse.<br/>Velikost: 110 x 64 cm <br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Jednorožec<br/>Velikost: 88 x 60 cm<br/><br/>---------------------------------<br/><br/>', false, 8, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));
insert into goods (code, name, description, hot, images, stock, price) values ('party-45', 'Party box pro kluky  -  4 roky ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla čtyři v modré barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10 ks.<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký modrý fóliový balónek ve tvaru čísla čtyři.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Velký foliový balónek ve tvaru Mickey Mouse.<br/>Velikost: 110 cm<br/><br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Dinosaurus<br/>Velikost: 80 x 42 cm<br/>---------------------------------<br/><br/>', false, 8, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));
insert into goods (code, name, description, hot, images, stock, price) values ('party-47', 'Party box pro holky  -  5 let ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla pět v růžové barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10 ks<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký červený fóliový balónek ve tvaru čísla pět.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Velký foliový balónek ve tvaru Minnie Mouse.<br/>Velikost: 110 x 64 cm <br/><br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Jednorožec<br/>Velikost: 88 x 60 cm<br/><br/>---------------------------------<br/><br/>', false, 8, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));
insert into goods (code, name, description, hot, images, stock, price) values ('party-48', 'Party box pro kluky  -  2 roky ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla dva v modré barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10 ks.<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký modrý fóliový balónek ve tvaru čísla dva.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Velký foliový balónek ve tvaru Olafa z pohádky Ledové království.<br/>Velikost: 43 x 77 cm<br/><br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Panda.<br/>Velikost: 62 x 42 cm<br/>---------------------------------<br/><br/>', false, 8, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));
insert into goods (code, name, description, hot, images, stock, price) values ('party-49', 'Party box pro holky  -  1 rok ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla jedna v růžové barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10ks<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký červený fóliový balónek ve tvaru čísla jedna.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Velký foliový balónek ve tvaru jednorožce.<br/>Velikost: 60 x 60 cm<br/><br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Zajíček<br/>Velikost: 62 x 60 cm<br/><br/>---------------------------------<br/><br/>', false, 7, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));
insert into goods (code, name, description, hot, images, stock, price) values ('party-50', 'Party box pro kluky  -  3 roky ', '<br/><br/>Tento PARTY BOX obsahuje:<br/><br/><br/>Dortová svíčka ve tvaru čísla tři v modré barvě.<br/><br/>---------------------------------------<br/><br/>Dortové svíčky - barevné s proužky 10 ks.<br/><br/>------------------------------------------<br/><br/>5 kusů barevných frkaček.<br/><br/>-------------------------------------<br/><br/>Velký modrý fóliový balónek ve tvaru čísla tři.<br/>Velikost: 81 cm<br/><br/>---------------------<br/><br/>Velký foliový balónek ve tvaru Olafa z pohádky Ledové království.<br/>Velikost: 43 x 77 cm<br/><br/>-------------------------------------------<br/><br/>Barevný mix 10 kusů nafukovacích balónků<br/>+ 10 plastových tyček na balónky.<br/><br/>--------------------------<br/><br/>Chodící balónek - Tučňák<br/>Velikost: 50 x 41 cm<br/>---------------------------------<br/><br/>', false, 8, 2, 320);
insert into goods_category(category, goods) values ('party', currval('goods_id_seq'));