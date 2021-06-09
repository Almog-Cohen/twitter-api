BEGIN TRANSACTION;

INSERT into likes (post_id, username, timestamp) values (1, 'almog', 1623096571764);
INSERT into likes (post_id, username, timestamp) values (1, 'shir', 1623096571777);

INSERT into retweet (post_id, username, timestamp) values (1, 'david', 16230965718647);
INSERT into retweet (post_id, username, timestamp) values (1, 'daniel', 162309365718647);
INSERT into retweet (post_id, username, timestamp) values (2, 'daniel', 16230965718647);
INSERT into retweet (post_id, username, timestamp) values (3, 'daniel', 16230965718646);
INSERT into retweet (post_id, username, timestamp) values (1, 'shir', 16230965718877);
INSERT into retweet (post_id, username, timestamp) values (2, 'shir', 16230965718877);
INSERT into retweet (post_id, username, timestamp) values (2, 'Roi', 16230965718877);

INSERT into tweet (username, text, timestamp) values ('shir', 'This is un bealivable tweet' , 1623096571355);
INSERT into tweet (username, text, timestamp) values ('shir', 'Sounds great' , 1623096571355);
INSERT into tweet (username, text, timestamp) values ('vered', 'Hello' , 1623096579955);

COMMIT;