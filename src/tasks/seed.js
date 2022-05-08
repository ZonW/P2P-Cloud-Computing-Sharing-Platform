const data = require('../data');
const usersData = data.users;
const productsData = data.products;
const ObjectId = require('mongodb').ObjectId;

async function main() {
              //////user//////
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


     /* try {
         const userInfo1 = await usersData.getUserByEmail('zwei123@gmail.com');
         await productsData.createProduct(
             userInfo1._id.toString(),
             'Good Computer 1',
             'This is a very good computer.',
             'windows',
             ["scientificCalculation", "deepLearning"],
             1651572490,
             10,
             {"country": "United States",
              "region": "NJ",
              "city": "Jersey City",
              "lat": 40.7467, 
              "lon": -74.0574 
            }
         );
      } catch (e) {
          console.log(e);
      }

     try {
         const userInfo1 = await usersData.getUserByEmail('zwei123@gmail.com');
         await productsData.createProduct(
             userInfo1._id.toString(),
             'Good Computer 2',
             'This is also a very good computer.',
             'macos',
             ["modelingAndSimulation", "deepLearning"],
             1651658890,
             5,
             {"country": "United States",
              "region": "DC",
              "city": "Washington",
              "lat": 38.9072, 
              "lon": -77.0369 
            }
         );
      } catch (e) {
          console.log(e);
      }

     try {
      const userInfo1 = await usersData.getUserByEmail('zwei123@gmail.com');
      await productsData.createProduct(
          userInfo1._id.toString(),
          'Good Computer 3',
          'This is the best computer.',
          'linux',
          ["webServer", "gaming"],
          1651831690,
          7,
          {"country": "United States",
           "region": "WA",
           "city": "Seattle",
           "lat": 47.6034, 
           "lon": -122.3414 
         }
      );
    } catch (e) {
        console.log(e);
    } */

          ////////session//////////

          ////////comment//////////
          //INPUT PRODUCT ID BY HAND//
    /* try {
      const userInfo1 = await usersData.getUserByEmail('zwei123@gmail.com');
      await productsData.addComment(
          userInfo1._id.toString(),
          "62764cdfc2160d9772b04ff1",
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
          "62764cdfc2160d9772b04ff1",
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
          "62764cdfc2160d9772b04ff2",
          {"content": "Good for deep learning",
            "rating": 4,
          }
      );
    } catch (e) {
        console.log(e);
    } */

}

main();
