CREATE TABLE `insign_user` (
  `user_id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `profile_picture` text NOT NULL,
  `bio` text,
  `role_id` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `insign_user`(`user_id`, `username`, `email`, `password`, `profile_picture`, `role_id`) VALUES
('1', 'admin', 'admin@metropolia.fi', 'admin', 'http://placekitten.com/400/300', '0'),
('2', 'Dung', 'dung@metropolia.fi', '1234', 'http://placekitten.com/400/300', '1'),
('3', 'An', 'an@metropolia.fi', '123456', 'http://placekitten.com/400/300', '2'),
('4', 'Tamas', 'tamas@metropolia.fi', '123456', 'http://placekitten.com/400/300', '2');

CREATE TABLE `post` (
  `post_id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `author` int,
  `title` text,
  `image` text,
  `description` text NOT NULL,
  `category_id` int,
  `style_id` int,
  `location` text,
  `posted_date` timestamp,
  `edited_date` timestamp
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `post` (`author`, `title`, `image`, `description`, `category_id`, `style_id`, `location`, `posted_date`, `edited_date`) VALUES 
('1', 'Some nice thing to post', 'http://placekitten.com/400/300', 'Nice cat', '0', '0', 'Finland', '2021-12-02', '2021-12-01');

CREATE TABLE `likes` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `comment` (
  `comment_id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `post_id` int,
  `content` text,
  `comment_date` timestamp,
  `edited_date` timestamp
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `add_to_favorite` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`)
);

CREATE TABLE `following` (
  `user_id` int,
  `following_id` int,
  PRIMARY KEY (`user_id`, `following_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `role` (
  `role_id` int NOT NULL PRIMARY KEY,
  `role_name` varchar(50)
);

INSERT INTO `role`(`role_id`, `role_name`) VALUES 
(0, 'admin'),
(1, 'user'),
(2, 'professional/designer');


CREATE TABLE `style` (
  `style_id` int PRIMARY KEY,
  `style_name` varchar(50)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `style`(`style_id`, `style_name`) VALUES 
(0, 'other'),
(1, 'contemporary'),
(2, 'minimalist'),
(3, 'industrial'),
(4, 'scandinavian'),
(5, 'traditional'),
(6, 'modern');

CREATE TABLE `category` (
  `category_id` int PRIMARY KEY,
  `category_name` varchar(50)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `category`(`category_id`, `category_name`) VALUES 
(0, 'other'),
(1, 'home decor'),
(2, 'interior design'),
(3, 'idea/inspiration');

ALTER TABLE `post` ADD FOREIGN KEY (`author`) REFERENCES `user` (`user_id`);
ALTER TABLE `post` ADD FOREIGN KEY (`style_id`) REFERENCES `style` (`style_id`);
ALTER TABLE `post` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`user_id`) REFERENCES `insign_user` (`user_id`);
ALTER TABLE `comment` ADD FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`);

ALTER TABLE `insign_user` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `insign_user` (`user_id`);
ALTER TABLE `likes` ADD FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`);

ALTER TABLE `add_to_favorite` ADD FOREIGN KEY (`user_id`) REFERENCES `insign_user` (`user_id`);
ALTER TABLE `add_to_favorite` ADD FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`);