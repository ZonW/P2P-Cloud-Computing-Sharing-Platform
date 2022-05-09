const data = require('../data');
const usersData = data.users;
const productsData = data.products;
const ObjectId = require('mongodb').ObjectId;

async function main() {
    //////user//////
    try {
        await usersData.createUser(
            'Chengchen',
            'Zhao',
            'czhao36@gmail.com',
            'aBigSeller',
            '2012048866',
            'czhao36@gmail.com',
            'hoboken',
            'NJ',
            'US',
            '07030'
        );
    } catch (e) {
        console.log(e);
    }

    try {
        await usersData.createUser(
            'Zon',
            'Wei',
            'zwei123@gmail.com',
            'Boo123',
            '2012048888',
            'weizongshuo123',
            'hoboken',
            'NJ',
            'US',
            '07030'
        );
    } catch (e) {
        console.log(e);
    }

    try {
        await usersData.createUser(
            'Zong',
            'Fei',
            'fei123@gmail.com',
            'Foo123',
            '2012048888',
            'feizongshuo123',
            'hoboken',
            'NJ',
            'US',
            '07030'
        );
    } catch (e) {
        console.log(e);
    }

    try {
        await usersData.createUser(
            'Zoo',
            'Hei',
            'hei123@gmail.com',
            'Bar123',
            '2012048888',
            'heizongshuo123',
            'hoboken',
            'NJ',
            'US',
            '07030'
        );
    } catch (e) {
        console.log(e);
    }










    ///// Products/////

    try {
        console.log('product 1');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Windows-OS machine learning server',
            'This is a very good computer for deep learning & machine learning, you must try it.',
            'windows',
            ["deepLearning"],
            1651572490,
            1499,
            {"country": "United States",
                "region": "NJ",
                "city": "Jersey City",
                "lat": 40.7467,
                "lon": -74.0574
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
                active: true
            },{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "https://get.teamviewer.com/s06432945-t4HO88yy20JF",
                sellerLink: "https://get.teamviewer.com/s06432945",
                active: true
            },{
                _id: ObjectId(),
                startTime: new Date().getTime(),
                endTime: new Date().getTime()+360000000,
                buyerLink: "",
                sellerLink: "",
                active: false
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 2');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Windows-based model simulation server',
            'anyone who like model simulation cannot miss this woderful server!!! ',
            'windows',
            ["deepLearning","modelingAndSimulation"],
            1651572490,
            2000,
            {"country": "United States",
                "region": "NJ",
                "city": "Jersey City",
                "lat": 40.7467,
                "lon": -74.0574
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 3');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Mac-OS game sharing platform',
            'This is a very high configured server, and it is in MacOS',
            'macos',
            ["gaming"],
            1651572430,
            1345,
            {"country": "United States",
                "region": "DC",
                "city": "Washington",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 4');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'A wonderful server for the video games',
            'If you are tired of lagging when you play your favorite games, please try this server and enjoy your game! Do not waste any time',
            'windows',
            ["gaming"],
            1651572430,
            998,
            {"country": "United States",
                "region": "NJ",
                "city": "Jersey City",
                "lat": 40.7467,
                "lon": -74.0574
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 5');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Linux-based server',
            'If you are a hard-core linux user, come and check this server.',
            'linux',
            ["scientificCalculation"],
            1651572430,
            1400,
            {"country": "United States",
                "region": "DC",
                "city": "Washington",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 6');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'UNIX-based server',
            'If you are a hard-core Unix user, come and check this server ',
            'unix',
            ["scientificCalculation"],
            1651572430,
            1400,
            {"country": "United States",
                "region": "DC",
                "city": "Washington",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 7');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Game high-speed processing server',
            'This server can run game smoothly and fluently ',
            'windows',
            ["gaming"],
            1651572430,
            300,
            {"country": "United States",
                "region": "CA",
                "city": "Irvine",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 8');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Anime high-speed processing server',
            'This server can help you make animation smoothly and fluently ',
            'windows',
            ["modelingAndSimulation"],
            1651572430,
            500,
            {"country": "United States",
                "region": "CA",
                "city": "Los Angeles",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 9');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Graph high-speed processing server',
            'This server can help you make graph smoothly and fluently ',
            'windows',
            ["modelingAndSimulation"],
            1651572430,
            500,
            {"country": "United States",
                "region": "CA",
                "city": "San Francisco",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 10');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'high-speed calculate server',
            'This server can help you make calculations quickly and correctly ',
            'linux',
            ["scientificCalculation"],
            1651572430,
            500,
            {"country": "United States",
                "region": "CA",
                "city": "San Cruise",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 11');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'high-speed modeling server',
            'This server can help you make models quickly and correctly ',
            'linux',
            ["modelingAndSimulation"],
            1651572430,
            500,
            {"country": "United States",
                "region": "CA",
                "city": "Santa Barbara",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }


    try {
        console.log('product 12');
        const userInfo1 = await usersData.getUserByEmail('zwei123@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Good Computer 2',
            'This is also a very good computer.',
            'macos',
            ["modelingAndSimulation", "deepLearning"],
            1651658890,
            500,
            {"country": "United States",
                "region": "DC",
                "city": "Washington",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
                active: true
            },{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "https://get.teamviewer.com/s06432945-t4HO88yy20JF",
                sellerLink: "https://get.teamviewer.com/s06432945",
                active: true
            },{
                _id: ObjectId(),
                startTime: new Date().getTime(),
                endTime: new Date().getTime()+3600000,
                buyerLink: "",
                sellerLink: "",
                active: true
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 13');
        const userInfo1 = await usersData.getUserByEmail('zwei123@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Good Computer 3',
            'This is the best computer.',
            'linux',
            ["webServer", "gaming"],
            1651831690,
            700,
            {"country": "United States",
                "region": "WA",
                "city": "Seattle",
                "lat": 47.6034,
                "lon": -122.3414
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
                active: true
            },{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "https://get.teamviewer.com/s06432945-t4HO88yy20JF",
                sellerLink: "https://get.teamviewer.com/s06432945",
                active: true
            },{
                _id: ObjectId(),
                startTime: new Date().getTime(),
                endTime: new Date().getTime()+3600000,
                buyerLink: "",
                sellerLink: "",
                active: true
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 14');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'high-speed simulation server',
            'This server can help you simulate models more effciently',
            'linux',
            ["modelingAndSimulation"],
            1651572430,
            300,
            {"country": "United States",
                "region": "CA",
                "city": "San Diego",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 15');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'game quality promoting server',
            'This server can help you get higher gaming experience',
            'windows',
            ["gaming"],
            1651572430,
            100,
            {"country": "United States",
                "region": "NY",
                "city": "New York City",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 15');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'game speed promoting server',
            'This server can help you get quicker gaming experience',
            'windows',
            ["gaming"],
            1651572430,
            100,
            {"country": "United States",
                "region": "CA",
                "city": "Fresno",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 16');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Mac-OS Game high-speed processing server',
            'This server can run game smoothly and fluently ',
            'macos',
            ["gaming"],
            1651572430,
            300,
            {"country": "United States",
                "region": "CA",
                "city": "Stockton",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 17');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'MAc-OS Anime high-speed processing server',
            'This server can help you make animation smoothly and fluently ',
            'macos',
            ["modelingAndSimulation"],
            1651572430,
            500,
            {"country": "United States",
                "region": "CA",
                "city": "Los Angeles",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 18');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Mac-OS Graph high-speed processing server',
            'This server can help you make graph smoothly and fluently ',
            'macos',
            ["modelingAndSimulation"],
            1651572430,
            500,
            {"country": "United States",
                "region": "CA",
                "city": "San Francisco",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 19');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Mac-OS high-speed calculate server',
            'This server can help you make calculations quickly and correctly ',
            'macos',
            ["scientificCalculation"],
            1651572430,
            500,
            {"country": "United States",
                "region": "CA",
                "city": "San Cruise",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 20');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Mac-OS high-speed modeling server',
            'This server can help you make models quickly and correctly ',
            'macos',
            ["modelingAndSimulation"],
            1651572430,
            500,
            {"country": "United States",
                "region": "CA",
                "city": "Santa Barbara",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 21');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Mac-OS high-speed simulation server',
            'This server can help you simulate models more effciently',
            'macos',
            ["modelingAndSimulation"],
            1651572430,
            300,
            {"country": "United States",
                "region": "CA",
                "city": "San Diego",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 22');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Mac-OS game quality promoting server',
            'This server can help you get higher gaming experience',
            'macos',
            ["gaming"],
            1651572430,
            100,
            {"country": "United States",
                "region": "NJ",
                "city": "Fort Lee",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 23');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Mac-OS game speed promoting server',
            'This server can help you get quicker gaming experience',
            'macos',
            ["gaming"],
            1651572430,
            100,
            {"country": "United States",
                "region": "CA",
                "city": "Mountain View",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 24');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Linux high quality modeling server',
            'This server can help you get high quality model when you are modeling',
            'linux',
            ["modelingAndSimulation"],
            1651572430,
            200,
            {"country": "United States",
                "region": "WA",
                "city": "Seattle",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 25');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Unix high speed simulating server',
            'This server can help you simulating more quickly in linux OS',
            'unix',
            ["modelingAndSimulation"],
            1651572430,
            200,
            {"country": "United States",
                "region": "TX",
                "city": "Dallas",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 26');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Windows high speed simulating server',
            'This server can help you simulating more quickly in linux OS',
            'windows',
            ["modelingAndSimulation"],
            1651572430,
            250,
            {"country": "United States",
                "region": "WA",
                "city": "Seattle",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 27');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Unix Graph high-speed processing server',
            'This server can help you make graph smoothly and fluently ',
            'unix',
            ["modelingAndSimulation"],
            1651572430,
            250,
            {"country": "United States",
                "region": "TX",
                "city": "Dallas",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 28');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Unix game promoting server',
            'This server can help you play high quality games ',
            'unix',
            ["gaming"],
            1651572430,
            300,
            {"country": "United States",
                "region": "TX",
                "city": "Austin",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 29');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Linux game promoting server',
            'This server can help you play high quality games ',
            'linux',
            ["gaming"],
            1651572430,
            300,
            {"country": "United States",
                "region": "TX",
                "city": "Austin",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    try {
        console.log('product 30');
        const userInfo1 = await usersData.getUserByEmail('czhao36@gmail.com');
        await productsData.createProduct(
            userInfo1._id.toString(),
            'Mac-OS calculating promoting server',
            'This server can help you calculate more quickly in Mac OS ',
            'macos',
            ["scientificCalculation"],
            1651572430,
            300,
            {"country": "United States",
                "region": "TX",
                "city": "Austin",
                "lat": 38.9072,
                "lon": -77.0369
            },
            [{
                _id: ObjectId(),
                startTime: 1651988836000,
                endTime: 1651988936000,
                buyerLink: "",
                sellerLink: "",
            }]
        );
    } catch (e) {
        console.log(e);
    }

    ////////session//////////
    /* try {
        await productsData.createSession(
            "627756f59cd000b47ff88acc",
            1651988836000,
            1651988936000,
            "",
            ""
            )
    }
    catch (e){
        throw e
    }

    try {
        await productsData.createSession(
            "627756f59cd000b47ff88acc",
            1750988836000,
            1750988936000,
            "https://get.teamviewer.com/s06432945-t4HO88yy20JF",
            "https://get.teamviewer.com/s06432945"
            )
    }
    catch (e){
        throw e
    }

    try {
        await productsData.createSession(
            "627756f59cd000b47ff88acc",
            new Date().getTime(),
            new Date().getTime()+3600000,
            "https://get.teamviewer.com/s06432945-t4HO88yy20JF",
            "https://get.teamviewer.com/s06432945"
            )
    }
    catch (e){
        throw e
    }*/





    ////////comment//////////
    //INPUT PRODUCT ID BY HAND//
    /* try {
      const userInfo1 = await usersData.getUserByEmail('zwei123@gmail.com');
      await productsData.addComment(
          userInfo1._id.toString(),
          "62774e0e49db33997d425e1f",
          {"content": "Very good computer",
            "rating": 2,
          }
      );
    } catch (e) {
        console.log(e);
    }

    try {
      const userInfo1 = await usersData.getUserByEmail('zwei123@gmail.com');
      await productsData.addComment(
          userInfo1._id.toString(),
          "62774e0e49db33997d425e1f",
          {"content": "Another very good computer",
            "rating": 4,
          }
      );
    } catch (e) {
        console.log(e);
    }

    try {
      const userInfo1 = await usersData.getUserByEmail('zwei123@gmail.com');
      await productsData.addComment(
          userInfo1._id.toString(),
          "62774e0e49db33997d425e21",
          {"content": "Good for deep learning",
            "rating": 4,
          }
      );
    } catch (e) {
        console.log(e);
    }*/

}

main();
