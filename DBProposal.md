## Team Member:  
Zongshuo Wei  20005210  
Chengchen Zhao 10468151  
Lingrui Li 10478741  
Jiyuan Xia 10468319  
Hanyu Wang  

## Users:
![image](https://user-images.githubusercontent.com/83222722/161462969-308361dc-bf72-49e2-bf8c-f8e18fba5bba.png)

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

server_on_sale: [] (An array that stores all the servers id sold by the user.)  

## Servers:
_id:  
feature:  
status:   (using/ empty/ removed)  
stock:  
curPrice:  (Latest price) 
comment: [{ _id: ;
            userName:  ;
            content:  ;
            score:  ;
}] (An array that stores all the comments)

overall_score:  (generate by the comments) 

## Orders:
_id: 
orderCreateTime: 
buyerId:  
sellerId: 
beginTime: (choose by user)  
endTime: (stop timing when user stop using)  
totalHour: (calculate by beginTime and endTime)  
unitPrice: (get from Servers.curPrice)  
totalPrice: (calculate by totalHour and unitPrice)  





