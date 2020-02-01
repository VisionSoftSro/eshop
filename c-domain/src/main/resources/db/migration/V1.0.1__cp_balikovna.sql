
CREATE TABLE cp_branches (
  id bigint DEFAULT nextval(('cp_branches_id_seq'::text)::regclass) NOT NULL primary key,
  zip text NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  kind text NOT NULL,
  lat decimal(10,2) NOT NULL,
  lng decimal(10,2) NOT NULL,
  city text NOT NULL,
  city_part text NOT NULL

);
CREATE SEQUENCE cp_branches_id_seq INCREMENT 1 START 1
;

CREATE TABLE cp_days (
  id bigint DEFAULT nextval(('cp_days_id_seq'::text)::regclass) NOT NULL primary key,
  name text NOT NULL
);
CREATE SEQUENCE cp_days_id_seq INCREMENT 1 START 1
;

CREATE TABLE cp_opening_hours (
  id bigint DEFAULT nextval(('cp_opening_hours_id_seq'::text)::regclass) NOT NULL primary key,
  branch_id bigint NOT NULL,
  days_id bigint NOT NULL,
  open_from text NOT NULL,
  open_to text NOT NULL
);
CREATE SEQUENCE cp_opening_hours_id_seq INCREMENT 1 START 1
;
ALTER TABLE cp_opening_hours ADD CONSTRAINT PK_cp_opening_cp_branches
  FOREIGN KEY (branch_id) REFERENCES cp_branches (id)
;
ALTER TABLE cp_opening_hours ADD CONSTRAINT PK_cp_opening_hours_cp_days
  FOREIGN KEY (days_id) REFERENCES cp_days (id)
;