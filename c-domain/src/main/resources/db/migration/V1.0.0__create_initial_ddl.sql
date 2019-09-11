
create table test_entity (
id bigint DEFAULT nextval(('test_entity_id_seq'::text)::regclass) NOT NULL
);
CREATE SEQUENCE test_entity_id_seq INCREMENT 1 START 1
;