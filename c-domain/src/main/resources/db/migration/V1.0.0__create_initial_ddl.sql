create table goods (
    id text not null,
    name text not null,
    description text not null,
    stock text not null,
    price text not null,
    hot boolean not null default false,
    images integer default 0
);