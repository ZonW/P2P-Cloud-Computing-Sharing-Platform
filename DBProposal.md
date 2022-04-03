## Team Member:  
Zongshuo Wei  20005210  
Chengchen Zhao 10468151  
Lingrui Li 10478741  
Jiyuan Xia 10468319  
Hanyu Wang  

## Users:  

The user collection contains all the registered users and their corresponding data. Each document is constructed with userid, user name, first name, last name, email address, phone number, residential city, residential state, country, zipcode and the id correspondes to the purchase and selll collections that contain data about their purchase history and selling history.  

_id:  
User_Name:  
firstName:  
lastName:  
Email:  
Phone:  
Gender:  
City:  
State:  
Country:  
zipCode:  
Age:  

Server_on_sale: [] (An array that stores all the servers id sold by the user.)  
Server_bought: []  (An array that stores all the servers id purchased by the user.)  


## Servers:
_id:  
features:  
Status:   (On sale/ bought/ removed)  
Stocks:  
Price:  
Comments: [{ _id: ;
            User_Name:  ;
            content:  ;
            score:  ;
}] (An array that stores all the comments)


Overall_score:  (generate by the comments)  





