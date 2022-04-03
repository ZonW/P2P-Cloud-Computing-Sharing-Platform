## Team Member:  
Zongshuo Wei  20005210  
Chengchen Zhao 10468151  
Lingrui Li 10478741  
Jiyuan Xia 10468319  
Hanyu Wang  

## Users:  

The user collection contains all the registered users and their corresponding data. Each document is constructed with userid, user name, first name, last name, email address, phone number, residential city, residential state, country, zipcode and the id correspondes to the purchase and selll collections that contain data about their purchase history and selling history.  

_id:  
userName:  
firstName:  
lastName:  
email:  
phone:  
gender:  
city:  
state:  
country:  
zipCode:  
age:  

orderHistory: [] (An array that stores all the servers id sold by the user.)  
sellingHistory: []  (An array that stores all the servers id purchased by the user.)  


## Product:
_id:  
features:  
status:   (onSale/ removed)  
price:  
sessions:  [{ _id: ;  
            startTime: (timestamp) ;  
            endTime: (timestamp) ;  
            link: (teamviewer url) ;  
            active: (bool)  
            }] (An array that stores all the sessions)  
comments: [{ _id: ;  
            User_Name:  ;  
            content:  ;  
            score:  ;  
            }] (An array that stores all the comments)  
overallScore:  (generate by the comments)  





