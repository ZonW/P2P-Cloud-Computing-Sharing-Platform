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
city:  
state:  
country:  
zipCode:    
orderHistory: [] (An array that stores all the product id bought by the user.)  
sellingHistory: []  (An array that stores all the product id listed by the user.)  
  
| xxxx        | xxxx  |  xxxx   |
| ------------| ------------- |  -----------|
| xxxx  | xxxx | xxxx  |
| xxxx  | xxxx | xxxx |
| xxxx  | xxxx | xxxx |
| xxxx  | xxxx | xxxx |
| xxxx  | xxxx | xxxx |
| xxxx  | xxxx |  xxxx |
  
## Product:
  
The product collection contains all the information about listed product postings. Each product contains product id, feature description, active status,unit price, and their corresponding sessions and comments as subdocuments. The session subdocument contains session id, starting time, ending time, access link, password, and active status. The comments subdocument contains comment id, user name, comment content, and rating score. An overall rating will be calculated based on each comment rating.
  
_id:  
features:  
status:   (bool)  
unitPrice:  
sessions:  [{ _id: ;  
            startTime: (timestamp) ;  
            endTime: (timestamp) ;  
            link: (teamviewer url) ;  
            password:  
            active: (bool)  
            }] (An array that stores all the sessions)  
comments: [{ _id: ;  
            User_Name:  ;  
            content:  ;  
            rating:  ;  
            }] (An array that stores all the comments)  
overallRating:  (calculated from each comment)  





