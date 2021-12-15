-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql.metropolia.fi
-- Generation Time: Dec 15, 2021 at 11:03 PM
-- Server version: 10.5.12-MariaDB
-- PHP Version: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dungtra`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_to_favorite`
--

CREATE TABLE `add_to_favorite` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `favorite_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `add_to_favorite`
--

INSERT INTO `add_to_favorite` (`user_id`, `post_id`, `favorite_timestamp`) VALUES
(1, 71, '2021-12-15 21:01:51'),
(2, 61, '2021-12-15 20:02:44'),
(2, 65, '2021-12-15 20:29:48'),
(25, 69, '2021-12-15 20:36:03'),
(26, 58, '2021-12-15 19:57:09'),
(27, 58, '2021-12-15 20:44:18'),
(27, 59, '2021-12-15 20:54:08'),
(27, 60, '2021-12-15 20:42:22'),
(27, 61, '2021-12-15 20:29:00');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(0, 'other'),
(1, 'home decor'),
(2, 'interior design'),
(3, 'idea/inspiration');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `comment_date` timestamp NULL DEFAULT current_timestamp(),
  `edited_date` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `user_id`, `post_id`, `content`, `comment_date`, `edited_date`) VALUES
(56, 27, 58, 'I would definitely love to share this view with my family <3', '2021-12-15 20:44:45', NULL),
(55, 25, 69, 'Looks expensive!', '2021-12-15 20:44:31', NULL),
(54, 27, 72, 'Wow this is gorgeos!', '2021-12-15 20:43:58', NULL),
(50, 2, 61, 'Nice things', '2021-12-15 20:01:29', NULL),
(51, 2, 62, 'Merry Christmas!!!!', '2021-12-15 20:04:53', NULL),
(52, 27, 61, 'This is nice!', '2021-12-15 20:27:04', NULL),
(53, 27, 60, 'This is nice! I like this style', '2021-12-15 20:42:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `following`
--

CREATE TABLE `following` (
  `user_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `following_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `following`
--

INSERT INTO `following` (`user_id`, `following_id`, `following_timestamp`) VALUES
(1, 4, '2021-12-15 19:35:52'),
(1, 25, '2021-12-15 21:01:57'),
(2, 25, '2021-12-15 20:01:09'),
(2, 26, '2021-12-15 20:04:26'),
(25, 2, '2021-12-15 20:32:41'),
(25, 26, '2021-12-15 20:32:06'),
(25, 27, '2021-12-15 20:31:59'),
(26, 2, '2021-12-15 20:03:01'),
(26, 25, '2021-12-15 19:59:32'),
(27, 2, '2021-12-15 20:54:12');

-- --------------------------------------------------------

--
-- Table structure for table `insign_user`
--

CREATE TABLE `insign_user` (
  `user_id` int(11) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `profile_picture` text NOT NULL,
  `bio` text DEFAULT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `insign_user`
--

INSERT INTO `insign_user` (`user_id`, `username`, `email`, `password`, `profile_picture`, `bio`, `role_id`) VALUES
(1, 'admin', 'admin@metropolia.fi', '$2a$12$RX8I7CONLy6QD1OCzAKLl.THWz1oc1smoMPosmfljj5XEYKVlFsX2', '8c6fc1c7a743bb12e158833b16231ab9', 'Something here', 0),
(2, 'Dung', 'dung@metropolia.fi', '$2a$12$g.MBnGEKJGgyAxamwIcq6.cMTFVwNPk4pUFLiUwG1iqFlHwDofR0W', 'f24b4533d07d014a06c25a980cd1efdb', NULL, 2),
(25, 'Tamas', 'tamas@metropolia.fi', '$2a$12$Xc.raen7T5GJ1aSzfqWttedS7vCmbhn0nmiPYJuAyL2gNA63DruZK', 'c6669bf11e9aaea6efa7a5839457851c', NULL, 2),
(26, 'annie', 'annie@gmail.com', '$2a$12$vnM5HmXGwJxUacyZ7ifUZ.au54mG40IBL8k7ASiE7zdS./obVAkh.', '49ebf3eb1e0b9079729c87fb0770681c', NULL, 1),
(27, 'Tina', 'tina@gmail.com', '$2a$12$hKHDU6BstNSRYtj.MeB9XuP9ojiVrMiJQZfKR8lyLJh0Pv7ZLljnC', 'b16d05d063872b0419722ce042058b1d', 'Hi I am Tina - a professional designer with 7 years of experience in home decor. The reason I am here is to share my works and get to know more people who share the same interests', 2);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `like_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`user_id`, `post_id`, `like_timestamp`) VALUES
(2, 59, '2021-12-15 20:03:15'),
(2, 61, '2021-12-15 20:01:35'),
(2, 62, '2021-12-15 20:04:36'),
(25, 66, '2021-12-15 20:29:14'),
(25, 69, '2021-12-15 20:36:04'),
(25, 70, '2021-12-15 20:32:54'),
(25, 72, '2021-12-15 20:39:32'),
(26, 58, '2021-12-15 19:59:48'),
(27, 58, '2021-12-15 20:44:20'),
(27, 60, '2021-12-15 20:42:21'),
(27, 72, '2021-12-15 20:42:55');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL,
  `author` int(11) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `description` text NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `style_id` int(11) DEFAULT NULL,
  `location` text DEFAULT NULL,
  `posted_date` timestamp NULL DEFAULT current_timestamp(),
  `edited_date` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `author`, `title`, `image`, `description`, `category_id`, `style_id`, `location`, `posted_date`, `edited_date`) VALUES
(65, 26, 'Set Up a Cozy Reading Spot', '651c387224a6309c99f3362cd3377ddd', 'No designated reading nook? No problem. If your home doesn\'t have any leftover real estate to convert into a reading nook, design your formal living room to serve double duty as a cozy lounge area. Here, Heidi Caillier strategically chose furniture with fabrics and shapes that are both sophisticated and homey, perfect for entertaining or unwinding alone.', 2, 5, 'Turku', '2021-12-15 20:10:58', NULL),
(66, 25, 'Luxurious Backyard from Kips Bay Dallas Showhouse', 'cbf66861a41344702435de6a01d0ec63', 'Inspired by the Italian gardens of Villa Caprarola, each piece and plant was selected to create dramatic tension and visual interest. In contrast, planning the next idle pastime.', 3, 1, 'Dallas', '2021-12-15 20:12:26', NULL),
(58, 25, 'Nancy Creek Guesthouse and Pool', 'b330ea7a8663d690ff255afc52c1dcde', 'South view of pool and guest house. Erica George Dines Photography\r\nLarge minimalist backyard rectangular and stone natural pool house photo in Atlanta', 3, 6, 'Atlanta', '2021-12-15 19:57:02', NULL),
(59, 2, 'My favorite corner', '16badb307cb34b512cc9df9c11f2f2be', 'small bed room with white theme', 1, 4, 'Finland', '2021-12-15 19:58:58', NULL),
(60, 26, 'Small Home Designs Under 50 Square Meters', 'ddab781d8330dc0246eb56befccbf9d5', 'These homes make the most of their compact layouts – each one is smaller than 50 square meters in size, yet packs an abundance of unique personality. Whether you\'re dreaming of a small home to call your own, or just want to make the most of what you already have, these spaces demonstrate how creative constraints can lead to inspiring breakthroughs. In fact, many adventurous souls who could otherwise afford spacious abodes are opting for a more streamlined lifestyle by choosing cozy apartments like these. It goes beyond practicality – the tiny home movement is part minimalism, part environmentalism, and part genuine curiosity. Use these ideas next time you need to spruce up a small space.\r\n\r\nTalented designers Piotr Matuszek and Gosia Czarny gave this small-scale apartment a bright and spacious makeover. The clients were a young couple who inherited the property from their grandmother – and at only 20 sq. meters, it required a near-total structural transformation to make the space feel large enough for two.\r\n\r\nOne side of the room pops with cool graphic-printed wallpaper, and the other shines brightly with glossy white paneling. An abundance of integrated storage is a must-have for a space as tiny as this one.\r\n\r\nThe stylish chair is a refurbished Chierowski design that originally belonged to the client’s grandmother – an important piece of nostalgia, and perhaps one of the few features left over from the renovation. Grandmother must have had fantastic taste in furniture. The matching sofa is a contemporary interpretation of the iconic 366 design.', 2, 4, 'Finland', '2021-12-15 19:59:18', NULL),
(63, 26, 'Two Homes that Utilize Lush Blue Accents', 'a40de5f379b4f4dcf9987819db00d299', 'There is no single color palette that makes a home beautiful, welcoming, or stylish. However, there is no denying that the right shade of blue can make a room feel just a bit calmer. Bringing with it the context of water, nature, and life, blue is easy to incorporate in nearly every type of decor. In these two homes, blue is used as a beautiful accent while neutral tones and other colors work to set off the blue and create a harmonious feeling for the entirety of the home.\r\n\r\n', 3, 2, 'Espoo', '2021-12-15 20:02:36', NULL),
(57, 26, 'Luxe Home Interiors With Staple Accent Colours', 'ffc46e3c5065ee50607b4a4afe508a57', 'Glossy white marble, gold fixtures, and high-end furniture all come together to instil a sense of enviable luxe into these large living spaces, bedroom designs and chic bathrooms. What makes each home design stand out though, is one solid staple accent colour that is utilised to create cohesivity between the open plan living zones, from scatter cushions in lavish lounges to upholstered dining chairs and plush bedroom accessories. The colourful elements work to enrich the intricacies of the interiors, which include custom-made feature walls of stone, textured gypsum, mirrored glass, classic moulding, and sumptuous upholstery. Grand modern chandeliers create a magical glow in each area, brightly illuminating the bespoke look.\r\n\r\nLustrous gold tables shine across the living room of our first luxe home interior design, alongside luxury gold home accessories and designer wall lights. A deep green accent colour is established in plump scatter cushions across the sofa and carries through in mature indoor plants.', 2, 4, 'Helsinki', '2021-12-15 19:56:59', NULL),
(56, 26, 'Small and Large Concrete Interiors', 'c298fd230caed9a954c43da04ad16be4', 'We’re showing two ends of the size scale for industrial style concrete themed interiors here. Our first is a particularly large two story home with three double bedrooms to boast of, and a few colourful accent colours to brighten the mood. The other is a much smaller home with a single level studio apartment layout, and is tinted with a more muted colour palette. Both of these strong interior schemes feature raw grey concrete decor stretching across their walls and ceilings. Exposed ducting and electrical wires streak the rugged rooms. In contrast, the furniture is high-end with sleek edges and smooth finishes. Modern artwork and plants bring in personality and life.\r\n\r\n', 2, 4, 'Espoo', '2021-12-15 19:54:32', NULL),
(64, 26, 'Deeply Rustic Interiors Meet Boho & Nomadic Melds', 'bd1b33958eba631ddba558b81d55cab8', 'Raw wood grain, rattan weaves, and a host of prominent textures fill these three deeply rustic interiors with a tactile decor experience and a truly mesmerising visual feast. The dramatic rustic aesthetic is met by lesser boho & nomadic melds to form transitional moments. Modern linear furniture silhouettes and curved decor accessories introduce flashes of contemporary styling. A rustic colour palette of peaceful beiges and browns fashion a warm and cosy atmosphere with a hint of intimacy and romance. Plentiful indoor plants bring in naturally uplifting greenery. Bare concrete decor and stone elements add sturdy weight and a comforting feeling of permanence within the fickle modern world.', 1, 6, 'Lahti', '2021-12-15 20:09:32', NULL),
(61, 25, 'Templeton Hills', '8fdb9d12d0c4c5dc53f830af04ff1c72', 'Photo of a modern landscaping in San Luis Obispo', 3, 6, 'San Luis', '2021-12-15 19:59:58', NULL),
(62, 26, '51 Christmas Mantel Decor Ideas for a Festive Holiday Display', '516d230d2fb7b698451c0fd9c48e7340', 'While the tree may try to steal the show, the mantel can be the heart of holiday warmth within an interior – and it just so happens to be a convenient stage on which to arrange a gorgeous medley of festive decorations. In this post, we\'ve collected our favorite holiday accents that are totally perfect for the fireplace mantel, pieces sure to suit any style and every budget. Whether your holiday style leans traditional or ultra-modern, there\'s something here for everyone. Don\'t have a mantel? Most of these Christmas decorations boast versatile appeal and would look just as fabulous on a table, shelf, or even a wide windowsill.', 1, 5, 'Rovaniemi', '2021-12-15 20:01:02', NULL),
(67, 26, '25 Kitchen Paint Colors That Are Full of Charm', 'a2abdc79ad2bdf17c9d8f4a136027336', 'The kitchen is the heart of the home. It\'s where your family gathers to prepare dinner, the main spot for entertaining, and recently, might even be the place where you help your kids tackle homework. Considering that it\'s a high-traffic, multifunctional space, there\'s no reason why it shouldn\'t stand out. One of the best ways to elevate your space is with the right color scheme.\r\n\r\nWhether you\'re partial to classic neutrals or energetic hues, there\'s the perfect paint shade for you. Click through for 25 of our favorite kitchen paint colors to bring more style to your cooking space once and for all.', 1, 4, 'Finland', '2021-12-15 20:12:52', NULL),
(68, 27, 'Brilliant Home Office Ideas to Boost Your Creativity and Productivity', '9e4bd95b7ac9b23ef172da6e0aa9e090', 'Just about anyone can benefit from having a functional workspace to tackle their to-do list, make headway on a creative project, or simply catch up on some reading. Luckily, when it comes to home office design schemes, the possibilities are endless. You can transform an unused closet with a few space-saving design tricks or go bold by outfitting an entire room with graphic wallpaper, standout furniture, and colorful accessories.\r\n\r\nWhether you love nothing more than rustic decor or prefer a modern aesthetic, look no further than our roundup of 30 brilliant home office ideas. This collection of images is filled with more than enough inspiration to upgrade your own home office with the right color palette, affordable furniture, and decorative accents.', 2, 2, 'Budapest', '2021-12-15 20:17:18', NULL),
(69, 27, 'Don\'t Be Afraid of Black Paint', '504a82f1f032d1983f8dd4c2337a8a2f', 'FARROW & BALL\r\nThe soft black paint color in this bedroom makes it feel special and intimate in ways you\'d never be able to achieve with a lighter hue (this specific shade is Farrow & Ball Railings). The eclectic furniture lends itself nicely to the darkness, too, adding a more lived in and homey vibe.', 3, 3, 'Austria', '2021-12-15 20:22:09', NULL),
(70, 27, 'Christmas Decoration Ideas to Make Your Home Picture-Perfect for the Holiday', 'af8eab55752a58a4b0500e3987531e27', 'Christmas is the time to let your creativity shine. This year, deck the halls with these eye-catching Christmas decoration ideas. As you work your way through this list, you\'ll find all the inspiration you need to add cheer to each and every corner of your home — both indoors and out. Get ideas for every aesthetic, color palette and budget, whether you\'re looking for cheery door decorations to welcome family and friends, table settings fit for a holiday feast or full-on festive mantel displays.\r\n\r\nWhile we\'re all for giving your entire house the North Pole treatment (check out these Christmas-worthy living rooms), there are so many small ways to make a big impact, like adding a few homemade ornaments to your tree or dressing your staircase with shades of red and green. Big or small, all of these DIY ideas are bound to make your house — and everyone in it — merry and bright all season long. (And hey, if you really want to get in the holly, jolly spirit, try your hand at these Christmas crafts, too.)', 2, 5, 'Helsinki', '2021-12-15 20:24:05', NULL),
(71, 25, 'Night Lights in Tampa', '5f9329f7220046af7033503ef0711e8d', 'Glistening waters surround this well-appointed outdoor retreat highlighted by a bespoke infinity pool, spa and waterfall features. A custom designed 19’ x 38’ tile encircled pool. From the Florida family’s home, the outdoor space delivers a seamless view linking the water features to the glass-like waters of the Gulf of Mexico.', 1, 6, 'Tampa', '2021-12-15 20:35:44', NULL),
(72, 25, 'Hot Spring Spas', '3db5999b1b0b258445d5fe2c2e79dca1', 'A beautiful addition to your backyard space. Inspiration for a mediterranean pool remodel in San Diego', 3, 7, 'San Diego', '2021-12-15 20:39:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(0, 'admin'),
(1, 'user'),
(2, 'professional/designer');

-- --------------------------------------------------------

--
-- Table structure for table `style`
--

CREATE TABLE `style` (
  `style_id` int(11) NOT NULL,
  `style_name` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `style`
--

INSERT INTO `style` (`style_id`, `style_name`) VALUES
(0, 'other'),
(1, 'contemporary'),
(2, 'minimalist'),
(3, 'industrial'),
(4, 'scandinavian'),
(5, 'traditional'),
(6, 'modern'),
(7, 'mediterranean'),
(8, 'tropical'),
(9, 'victorian');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_to_favorite`
--
ALTER TABLE `add_to_favorite`
  ADD PRIMARY KEY (`user_id`,`post_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `following`
--
ALTER TABLE `following`
  ADD PRIMARY KEY (`user_id`,`following_id`);

--
-- Indexes for table `insign_user`
--
ALTER TABLE `insign_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`user_id`,`post_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `author` (`author`),
  ADD KEY `style_id` (`style_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `style`
--
ALTER TABLE `style`
  ADD PRIMARY KEY (`style_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `insign_user`
--
ALTER TABLE `insign_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
