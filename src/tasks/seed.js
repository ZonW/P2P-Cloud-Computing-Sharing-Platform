const data = require('../data');
const usersData = data.users;
const productsData = data.products;
const ObjectId = require('mongodb').ObjectId;

async function main() {
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

    // try {
    //     const userInfo1 = await usersData.getUserByName('Boo123');
    //     console.log(userInfo1);
    //     await productsData.createProduct(
    //         userInfo1._id.toString(),
    //         'Good Computer 1',
    //         'This is a very good computer.',
    //         'windows',
    //         '[webServer, deepLearning]',
    //         5,
    //         { lat: 40.7467, long: -74.0574 }
    //     );
    // } catch (e) {
    //     console.log(e);
    // }

    // try {
    //     const userInfo1 = await usersData.getUserByName('Foo123');
    //     await productsData.createProduct(
    //         userInfo1._id.toString(),
    //         'Good Computer 1',
    //         'This is a very good computer.',
    //         'windows',
    //         '[webServer, deepLearning]',
    //         5,
    //         { lat: 40.7467, long: -74.0574 }
    //     );
    // } catch (e) {
    //     console.log(e);
    // }
}

main();
