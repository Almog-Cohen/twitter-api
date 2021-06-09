-- Deploy fresh database tables
\i '/docker-entrypoint-initdb.d/tables/tweet.sql'
\i '/docker-entrypoint-initdb.d/tables/likes.sql'
\i '/docker-entrypoint-initdb.d/tables/retweet.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'