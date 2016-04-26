/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var Review = mongoose.model('Reviews');



var userSeed = [
    {
        username: 'Admin',
        email: 'admin@me.com',
        password: '123',
        isAdmin: true,
        role: 'Admin',
        firstName: 'Jennifer',
        lastName: 'Rittwiger',
        avatar: '/assets/images/user1.jpg'
    },
    {
        username: 'Cassandra',
        email: 'me@me.com',
        password: '123',
        isAdmin: false,
        role: 'Seller',
        firstName: 'Cassandra',
        lastName: 'Redding',
        avatar: '/assets/images/user2.jpg'
    },
    {
        username: 'Alyx',
        email: 'me1@me.com',
        password: '123',
        isAdmin: false,
        role: 'Customer',
        firstName: 'Alyx',
        lastName: 'Bookman',
        avatar: '/assets/images/user3.jpg'
    },
    {
        username: 'Erik',
        email: 'me2@me.com',
        password: '123',
        isAdmin: false,
        role: 'Customer',
        firstName: 'Erik',
        lastName: 'Huntington',
        avatar: '/assets/images/user4.jpg'
    },
    {
        username: 'Jon',
        email: 'me3@me.com',
        password: '123',
        isAdmin: false,
        role: 'Seller',
        firstName: 'Jon',
        lastName: 'Russel',
        avatar: '/assets/images/user5.jpg'
    },
    {
        username: 'Ryan',
        email: 'me4@me.com',
        password: '123',
        isAdmin: false,
        role: 'Customer',
        firstName: 'Ryan',
        lastName: 'Callahan',
        avatar: '/assets/images/user6.jpg'
    }
];

var orderSeed = [
    {
        sessionId: 'OblUqs2K95KldfV3oV1EEZnMUZjUJeY8',
        status: 'cart',
        products: []
    },
    {
        sessionId: 'DBHDEZMz3d3eXQA7q9G1g9Nln9KoeSXN',
        status: 'cart',
        products: []
    },
    {
        sessionId: 'DBHDEZMz3d3eXQA7q9G1g9Nln9KoeSXN',
        status: 'complete',
        products: []
    },
    {
        sessionId: 'wSKeHI5b4qOMG3mAQW1k7b0mbuYZ0PiC-',
        status: 'complete',
        products: []
    },
    {
        sessionId: 'OblUqs2K95KldfV3oV1EEZnMUZjUJeY8',
        status: 'complete',
        products: []
    }
];

var productSeed = [
    {
        title: 'Hawaian Getaway',
        description: 'Hawaii is a destination dreamt by most of the people. If you like good weather, perfect setting, magnificent views, beautiful blue waters, traditional hula-dancing and exquisite cuisine, come to Hawaii to experience the true Polynesian culture. You can start your discovery by visiting all the islands that form this magnificent archipelago. Kauiai is the northernmost island in this volcanic chain and offers an unforgettable sight of natural and wild beauty. The beaches along the Coconut Coast are the perfect place to take a long, relaxing walk or to enjoy a romantic escapade. New discoveries are to be made at the Grand Canyon of the Pacific, in the massive Waimea Canyon. Oahu is the place where you will meet a lot of people of different origins, traditions and culture. Most of the island rises to the expectations of the 21st century and cultural, natural wonders will amaze you. The North Shore is usually very busy during the time of big winter waves, when the surfers are repeatedly attempting to defeat the powers of the ocean. If youre not such a great surfer but would like to catch an insight to the wonders of surfing, try it yourself on Waikiki beach, the perfect place for new-comers and amateurs.The island of Molokai is not as modern as the rest. It managed to preserve its natural setting, its history and native culture. Kaunakakaki is more of a sleepy-town which is just perfect for relaxing and meditating. Halawa Valley is a sight not to be missed by any chance thanks to its verdant flora.',
        location: 'Hawaii',
        categories: ['waterfalls', 'ocean', 'mountains', 'nature', 'beaches', 'snorkeling', 'fish', 'hiking', 'swimming'],
        price: 5000,
        inventory: 500,
        coordinates: [19.8968, 155.5828],
        images: ['http://hdwallpaperfun.com/wp-content/uploads/2014/09/Hawaii-Wallpaper-High-Res-Pics-54655.jpeg', 'http://soaquipassagensbaratas.com.br/wp-content/uploads/2014/08/eua7.jpg', 'https://i.ytimg.com/vi/EebVVEvm75Y/maxresdefault.jpg', 'http://www.aloha-hawaiian.com/images/newsite/HawaiiSunsetHoneymoon.jpg']
    },
    {
        title: 'Grand Canyon Expidition',
        description: 'The Territory of Arizona comprises the extreme south-western portion of the United States. It is bounded on the north by Nevada and Utah, on the east by New Mexico, on the south by Sonora, on the west by California and Nevada. It extends from the one hundred and ninth meridian west to the Great Colorado; and from 31° 28 of north latitude to the thirty-seventh parallel, and contains an area of about 114,000 square miles. The physical features of the Territory may be described as a series of elevated plateau, having an altitude of from 100 feet in the south-west, up to 6,000 and 7,000 feet above the sea level, in the north. Mountain ranges, having a general direction of north-west by south-east, extend over this lofty plateau the entire length of the Territory. These mountains often present the appearance of broken and detached spurs, and sometimes occur in regular and continuous ranges. Narrow valleys and wide, open plains lie between the mountains, while deep canyons and gorges, formed by the rains and floods, which sometimes rush with irresistible force from the mountain barriers, cross the country in every direction. The most extensive of these grand mesas, or table lands, is the Colorado plateau, in the northern portion of the Territory, occupying nearly two-fifths of its entire area. This great plateau has an average altitude of between 5,000 and 6,000 feet. Its surface is diversified by lofty peaks and isolated ranges; it is covered nearly its entire extent with fine grasses; it is penetrated on the west by the Rio Colorado, which has worn a channel thousands of feet in depth. It is also cut by the San Juan on the north-east, and the Little Colorado, the Verde, the Salinas, and the San Francisco on the south. These rivers form in places deep gorges, and again widen into beautiful and productive valleys.',
        location: 'Arizona',
        categories: ['Grand Canyon', 'hot', 'desert', 'sun', 'hiking'],
        price: 3000,
        inventory: 500,
        coordinates: [36.1128, -113.9961],
        images: ['http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg', 'https://media.deseretdigital.com/file/b41fa91284?crop=top:0%7Cleft:0%7Cwidth:1260%7Cheight:670%7Cgravity:Center&resize=width:1260&order=resize,crop&c=14&a=c856f78c', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUujpnAirDSgJhNJ-AifEWa0NDXi7ODarSVVHdS1AnvroIJfdi', 'http://i.huffpost.com/gen/1585786/images/o-GRAND-CANYON-RIVER-facebook.jpg']

    },
    {
        title: 'African Adventure',
        description: 'Africa is a land of great diversity. It is the second largest continent in the world. If you were to travel through the 53 countries of Africa, you would see many things. The weather ranges from very hot desert climate to wet rainforests to permanently frozen glaciers. The landforms include tropical islands, flat plains, and very steep mountains.The people of Africa are just as diverse. There are over a thousand languages spoken in Africa. People come from many tribes. They practice many religions. They hold a variety of jobs, from simple farming to service jobs in teaching and medicine to industrial jobs.Despite all this diversity, Africa has a strong identity as a continent. This book will look at the physical geography of Africa and how it has affected life there.',
        location: 'Africa',
        categories: ['animals', 'safari', 'sahara', 'wildlife', 'nature'],
        price: 4000,
        inventory: 500,
        coordinates: [17.5707, 3.9962],
        images: ['https://i.ytimg.com/vi/lugard7P0nw/maxresdefault.jpg', 'http://eskipaper.com/images/africa-landscape-wallpaper-1.jpg', 'http://cdn.playbuzz.com/cdn/a9ef0d8c-0aa0-4796-b512-8f348ea8eeb5/2faf3263-7f6d-4843-9156-bc257dbf8911.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMUt6UIfVaiEqyPDFSK7v0qNGJmtwR0ThSosz1p5OdXFrcZMn']
    },
    {
        title: 'Australian Undertaking',
        description: 'Australia is a stable, democratic and culturally diverse nation with a highly skilled workforce and one of the strongest performing economies in the world.With spectacular landscapes and a rich ancient culture, Australia is a land like no other. It is the earths sixth-largest country in land area and is the only nation to govern an entire continent.Australia in Brief provides an authoritative overview of Australias history, the land, its people and their way of life. It also looks at Australias economic, scientific and cultural achievements and its foreign, trade and defence policies.  This is the 50th edition of Australia in Brief, revised and updated in October 2014. The Department of Foreign Affairs and Trade is grateful for assistance from other Government departments and agencies, and various private organisations who have licensed the use of photos and graphics. Money values are given in Australian dollars unless otherwise indicated. Weights and measures are metric and imperial.',
        location: 'Australia',
        categories: ['wildlife', 'desert', 'hot', 'safari', 'ocean', 'nature', 'biking', 'snorkeling'],
        price: 2000,
        inventory: 500,
        coordinates: [-25.2744, 133.7751],
        images: ['https://images.unsplash.com/photo-1456023054428-0f2118ef3180?crop=entropy&dpr=2&fit=crop&fm=jpg&h=750&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1300', 'https://images.unsplash.com/photo-1447953696461-df240a5320a3?crop=entropy&dpr=2&fit=crop&fm=jpg&h=750&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1300', 'https://images.unsplash.com/photo-1421992110690-5b12e022c666?crop=entropy&dpr=2&fit=crop&fm=jpg&h=750&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1300', 'https://images.unsplash.com/photo-1445986478946-8504638d4eab?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=e25648c37ff5bef668a03376e7df17bd']
    },
    {
        title: 'Egyptian Excursion',
        description: 'The Nile Valley and Delta, the most extensive oasis on earth, was created by the worlds longest river and its seemingly inexhaustible sources. Without the topographic channel that permits the Nile to flow across the Sahara, Egypt would be entirely desert. The length within Egypt of the River Nile in its northwards course from three central African sources – the White Nile, the Blue Nile, and the Atbara – totals some 1,600 km.The White Nile, which begins at Lake Victoria in Uganda, supplies about 28% of the Niles Egyptian waters. In its course from Lake Victoria to Juba in South Sudan, the White Niles channel drops more than 600 m. In its 1,600-km course from Juba to Khartoum, Sudans capital, the river descends just 75 m. In South Sudan, the White Nile passes through the Sudd, a wide, flat plain covered with swamp vegetation and slows almost to the point of stagnation.The Blue Nile, which originates at Lake Tana in Ethiopia, provides on average some 58% of the Niles Egyptian waters. This river has a steeper gradient and therefore flows more swiftly than the White Nile, which it joins at Khartoum. Unlike the White Nile, the Blue Nile carries a considerable amount of sediment. For several kilometres north of Khartoum, water closer to the eastern bank of the river, coming from the Blue Nile, is visibly muddy, while that closer to the western bank, and coming from the White Nile, is clearer.The much shorter Atbara River, which also originates in Ethiopia, joins the main Nile north of Khartoum between the fifth and sixth cataracts (areas of steep rapids) and provides about 14% of the Niles waters in Egypt. During the low-water season, which runs from January to June, the Atbarah shrinks to a number of pools. But, in late-summer, when torrential rains fall on the Ethiopian Highlands, the Atbarah provides 22% of the Niles flow.The Blue Nile has a similar pattern. It contributes 17% of the Niles waters in the low-water season and 68% during the high-water season. In contrast, the White Nile provides only 10% of the Niles waters during the high-water season but contributes more than 80% during the low-water period. Thus, before the Aswan High Dam was completed in 1971, the White Nile watered the Egyptian stretch of the river throughout the year, whereas the Blue Nile, carrying seasonal rain from Ethiopia, caused the Nile to overflow its banks and deposit a layer of fertile mud over adjacent fields. The great flood of the main Nile usually occurred in Egypt during August, September, and October, but it sometimes began as early as June at Aswan and often did not completely wane until January.The Nile enters Egypt a few kilometers north of Wadi Halfa, a Sudanese town that was completely rebuilt on high ground when its original site was submerged in the reservoir created by the Aswan High Dam. As a result of the dams construction, the Nile actually begins its flow into Egypt as Lake Nasser, which extends southwards from the dam for 320 km to the border and for an additional 158 km within Sudan. Lake Nassers waters fill the area through Lower Nubia (Upper Egypt and northern Sudan) within the narrow canyon between the cliffs of sandstone and granite created by the flow of the river over many centuries.',
        location: 'Egypt',
        categories: ['pyramids', 'Nile River', 'desert', 'sphynx'],
        price: 10000,
        inventory: 500,
        coordinates: [29.9792, 31.1342],
        images: ['http://www.freedomofresearch.org/sites/default/files/ancient-egypt-pyramids-wallpaper.jpg', 'https://www.teachaway.com/sites/default/files/headers/egypt-header-01.jpg', 'http://www.utsegypt.com/wp-content/uploads/2015/08/Egypt-1.jpg', 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Great_Sphinx_of_Giza_-_20080716a.jpg']
    },
    {
        title: 'Exploring China',
        description: 'Viewing the world map, you will find that China is a vast country situated at the eastern part of Eurasia and the western coast of the Pacific Ocean. Covering a land area of 3,706,581 square miles (9,600,000 square kilometers), China is the third largest of the world, inferior to Russia and Canada. It is 3,231 miles long from east to west and 3,417.5 miles long from north to south. With the entire territory shaping like a rooster, its northernmost end reaches Mohe in Heilongjiang Province; the southernmost is at Zengmu Ansha in Nansha Islands, the easternmost at conjunction of Heilongjiang River and the Wusuli River, while the western at the Pamirs. China is an ancient country having a profound history. Originated in the eastern area of the Yellow River Region, the countrys civilization is over 5,000 years old and was considered one of four ancient civilizations of the world, along with the civilizations of the ancient Babylon, the ancient Egypt and the ancient India. The first dynasty of Chinese history started from the Xia Dynasty (2070BC-1600BC) and the last one was the Qing Dynasty (1644-1912), while the most glorious period were the Qin (221BC-206BC), Han (206BC-220), Tang (618-907) and Ming (1368-1644) dynasties. During thousands of years of feudal ruling, Chinese people have created brilliant science and art culture, like the Four Great Inventions, the poetry, paintings and Chinese calligraphy. Also, a great amount of cultural relics such as the Great Wall and the Terra Cotta Warriors left by ancestors have become the treasures of the nation and the wonder of the world. Founded in 1949 by the Communist Party, the Peoples Republic of China (PRC) is a unified multi-ethnic country. 56 nationalities are now living in 34 direct administrative regions including 23 provinces, five autonomous regions, four directly-governed city regions–Beijing, Shanghai, Tianjin and Chongqing and two special administrative regions (SAR)–Hong Kong and Macau. The 55 ethnic minorities mainly live in Chongqing, Gansu, Guangxi, Guizhou, Hainan, Heilongjiang, Hubei, Hunan, Inner Mongolia, Jilin, Liaoning, Ningxia, Qinghai, Sichuan, Tibet, Xinjiang and Yunnan. China is also the most populous country in the world. Being over 1.3 billion (in the end of 2007), the countrys population is about 22 percent of the world population. The most populous part is the eastern coastal areas. Almost 94 percent of Chinese people live in the Southeast part of the country which covers 43 percent of its land area; while the other six percent people live in the northwestern areas which cover 57 percent of the territory.',
        location: 'China',
        categories: ['Great Wall of China', 'Genearl Tsos Chicken', 'mountains', 'nature', 'hiking', 'biking', 'food'],
        price: 7000,
        inventory: 500,
        coordinates: [35.8617, 104.1954],
        images: ['http://i.imgur.com/RWcZ0.jpg', 'http://wallpapercave.com/wp/VRvyWZC.jpg', 'http://64.78.58.53/wp-content/uploads/2015/04/wall-clouds.jpg', 'http://wallpaperbeta.com/wallpaper_3840x2160/snowy_mountains_china_pagoda_landscapes_ultra_3840x2160_hd-wallpaper-35203.jpg']
    }
];

var reviewSeed = [
    {
        rating: 5,
        comment: 'This is a great package, I would highly recomend it to anyone who is considering going here. The water is clear and the air is fresh.  It was an overall wonderful journey.'
    },
    {
        rating: 4,
        comment: 'I really enjoyed this package.  I had the time of my life!  An adventure I will never forget!  My family and I explored the whole country and loved every minute of it.  I saw things that I never thought I would ever see in my life.  Highly recomend this package, Trekly is awesome!'
    },
    {
        rating: 5,
        comment: 'Totally amazing!  What a great vacation, cant wait until I go again!  The mountains were beautiful and the nature was stunning.  The wildlife is amazing too.  This is a great place to go on vacation with with your spuse, kids, parents - whoever!  Go on this trip!'
    },
    {
        rating: 3,
        comment: 'This was a pretty good package.  It was great to get out of the normal routine of life and take an adventure across the world.  I am so glad there is a website like trekly, I love them so much.  You guys are the best!'
    },
        {
        rating: 4,
        comment: 'Wow! What a vacation!  It was such a great experience and I owe it all to trekly!  Thanks for the wonderful package.  The landsscape here is stunning and the fresh air tastes so good!  If you are looking to get out the everyday routine of life and experience something new, this is the package for you!  I had the time of my life!'
    },
        {
        rating: 2,
        comment: 'This was a great vacation!  The traveling was great and everything went really smoothly.  The only reason I gave it a 2 was because I was sick the whole time - it had nothing to do with trekly - they are great!  It was still a blast and I would recomend everyone go on this trip if you get the opportunity.'
    },
        {
        rating: 5,
        comment: 'This is a great package, I would highly recomend it to anyone who is considering going here. The water is clear and the air is fresh.  It was an overall wonderful journey.'
    },
    {
        rating: 4,
        comment: 'I really enjoyed this package.  I had the time of my life!  An adventure I will never forget!  My family and I explored the whole country and loved every minute of it.  I saw things that I never thought I would ever see in my life.  Highly recomend this package, Trekly is awesome!'
    },
    {
        rating: 5,
        comment: 'Totally amazing!  What a great vacation, cant wait until I go again!  The mountains were beautiful and the nature was stunning.  The wildlife is amazing too.  This is a great place to go on vacation with with your spuse, kids, parents - whoever!  Go on this trip!'
    },
    {
        rating: 3,
        comment: 'This was a pretty good package.  It was great to get out of the normal routine of life and take an adventure across the world.  I am so glad there is a website like trekly, I love them so much.  You guys are the best!'
    },
        {
        rating: 4,
        comment: 'Wow! What a vacation!  It was such a great experience and I owe it all to trekly!  Thanks for the wonderful package.  The landsscape here is stunning and the fresh air tastes so good!  If you are looking to get out the everyday routine of life and experience something new, this is the package for you!  I had the time of my life!'
    },
        {
        rating: 2,
        comment: 'This was a great vacation!  The traveling was great and everything went really smoothly.  The only reason I gave it a 2 was because I was sick the whole time - it had nothing to do with trekly - they are great!  It was still a blast and I would recomend everyone go on this trip if you get the opportunity.'
    },    {
        rating: 5,
        comment: 'This is a great package, I would highly recomend it to anyone who is considering going here. The water is clear and the air is fresh.  It was an overall wonderful journey.'
    },
    {
        rating: 4,
        comment: 'I really enjoyed this package.  I had the time of my life!  An adventure I will never forget!  My family and I explored the whole country and loved every minute of it.  I saw things that I never thought I would ever see in my life.  Highly recomend this package, Trekly is awesome!'
    },
    {
        rating: 5,
        comment: 'Totally amazing!  What a great vacation, cant wait until I go again!  The mountains were beautiful and the nature was stunning.  The wildlife is amazing too.  This is a great place to go on vacation with with your spuse, kids, parents - whoever!  Go on this trip!'
    },
    {
        rating: 3,
        comment: 'This was a pretty good package.  It was great to get out of the normal routine of life and take an adventure across the world.  I am so glad there is a website like trekly, I love them so much.  You guys are the best!'
    },
        {
        rating: 4,
        comment: 'Wow! What a vacation!  It was such a great experience and I owe it all to trekly!  Thanks for the wonderful package.  The landsscape here is stunning and the fresh air tastes so good!  If you are looking to get out the everyday routine of life and experience something new, this is the package for you!  I had the time of my life!'
    },
        {
        rating: 2,
        comment: 'This was a great vacation!  The traveling was great and everything went really smoothly.  The only reason I gave it a 2 was because I was sick the whole time - it had nothing to do with trekly - they are great!  It was still a blast and I would recomend everyone go on this trip if you get the opportunity.'
    },    {
        rating: 5,
        comment: 'This is a great package, I would highly recomend it to anyone who is considering going here. The water is clear and the air is fresh.  It was an overall wonderful journey.'
    },
    {
        rating: 4,
        comment: 'I really enjoyed this package.  I had the time of my life!  An adventure I will never forget!  My family and I explored the whole country and loved every minute of it.  I saw things that I never thought I would ever see in my life.  Highly recomend this package, Trekly is awesome!'
    },
    {
        rating: 5,
        comment: 'Totally amazing!  What a great vacation, cant wait until I go again!  The mountains were beautiful and the nature was stunning.  The wildlife is amazing too.  This is a great place to go on vacation with with your spuse, kids, parents - whoever!  Go on this trip!'
    },
    {
        rating: 3,
        comment: 'This was a pretty good package.  It was great to get out of the normal routine of life and take an adventure across the world.  I am so glad there is a website like trekly, I love them so much.  You guys are the best!'
    },
        {
        rating: 4,
        comment: 'Wow! What a vacation!  It was such a great experience and I owe it all to trekly!  Thanks for the wonderful package.  The landsscape here is stunning and the fresh air tastes so good!  If you are looking to get out the everyday routine of life and experience something new, this is the package for you!  I had the time of my life!'
    },
        {
        rating: 2,
        comment: 'This was a great vacation!  The traveling was great and everything went really smoothly.  The only reason I gave it a 2 was because I was sick the whole time - it had nothing to do with trekly - they are great!  It was still a blast and I would recomend everyone go on this trip if you get the opportunity.'
    },
];

var wipeCollections = function () {
    var models = [User, Order, Product, Review];

    return Promise.map(models, function(model) {
        return model.remove({}).exec();
    });
};

var seedDB = function() {
    var randomizeSelector = function(array) {
      var random = Math.floor(Math.random() * array.length);
      var randomSelection = array[random];
      return randomSelection;
    };

    var productsList;
    var usersList;

    return Product.create(productSeed)
    .then(function(products) {
        productsList = products;
        return User.create(userSeed);
    })
    .then(function(users){
        usersList = users;
        // productsList.forEach(function(product) {
        //     product.seller = randomizeSelector(users);
        // });
            // console.log(productsList)
        return Promise.map(orderSeed, function(order) {
            var productToAddToOrder = randomizeSelector(productsList);
            var price;
            if(order.status !== 'cart') {
                price = productToAddToOrder.price;
                order.date = Date();
            }
            order.products.push({product: productToAddToOrder, quantity: 1, finalPrice: price});
            order.user = randomizeSelector(users);

            return Order.create(order);
        });
    })
    .then(function() {
        return Promise.map(reviewSeed, function(review) {
            review.user = randomizeSelector(usersList);
            review.product = randomizeSelector(productsList);
            return Review.create(review);
        });
    });
};

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedDB();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
