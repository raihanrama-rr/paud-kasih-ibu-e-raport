-- Schema for PAUD Kasih Ibu e-Raport
create table profiles (
  id uuid references auth.users(id) on delete cascade,
  full_name text,
  role text check (role in ('admin','guru','ortu')) not null,
  kelas text,
  created_at timestamptz default now(),
  primary key (id)
);

create table siswa (
  id serial primary key,
  nisn text unique not null,
  nama text not null,
  tanggal_lahir date not null,
  kelas text check (kelas in ('A','B')) not null,
  tahun_ajaran text not null
);

create table tahun_ajaran (
  id serial primary key,
  label text unique not null,
  aktif boolean default false
);

create table semester (
  id serial primary key,
  tahun_ajaran_id int references tahun_ajaran(id) on delete cascade,
  nama text not null,
  aktif boolean default false
);

create table report (
  id serial primary key,
  siswa_id int references siswa(id) on delete cascade,
  guru_id uuid references profiles(id),
  tahun_ajaran text not null,
  semester text not null,
  finalized boolean default false,
  created_at timestamptz default now()
);

create table report_aspects (
  id serial primary key,
  report_id int references report(id) on delete cascade,
  aspek text not null,
  deskripsi text,
  created_at timestamptz default now()
);

create table report_photos (
  id serial primary key,
  report_id int references report(id) on delete cascade,
  storage_path text not null,
  caption text,
  uploaded_at timestamptz default now()
);