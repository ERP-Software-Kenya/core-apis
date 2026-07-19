Role : Senior nest js backend engineer
tech stack : nestjs typeorm postgres centrifugo

task 1 : review entire project structure

so we are working on ERP software where the use can manage the inventory manage the vehicle transportation and other stuffs like add monitor inventory report and other things.

so the things will start from the organization creation and management.there will be one organization where the multiple user will work on that.

this will be pure roles and permission base modal at where multiple kind of user will access the some part of the organization based on the roles and permission.

so you need to create module based on that where the organization can be manage by the different roles check how the seeder has been created and seed the user and its permissions.

one module will be the product at where user should able to add product for the particular organization and can manage inventory for that after that he should be able to review logs of the stock changes like if someone add the stock remove stock then the logs should be there about every inventory change so the devide modules like that

there is another one module for the store and warehouse management according to the organization one organization can be add multiple warehouse and stores and keep the product in the store or the warehouse so if use add the product stock then it should be mention which warehouse or which store has that stocks so it can be maintain or admin can review where the all stocks are 

after that there should be proper schema for the product categories and it should be maintain

also use should able to manage his customer for the selling the products through the stores

it will be desktop base system so system should be able to send the notification on the system so the one module will work for that

one module will be for the expanses management so the module can be perform all the kind of operation regarding the expanses

one important things is the user creation and roles assign 

there will be one main role is that super admin which can access all the organization and after that admin role should be there which will be the organization admin

for authentication use jwt and salt hash based authentication where the user will enter username and password and user will able to login into the system we want this kind of system so provide powerfull authentication to the system with appropriate roles and permission.


report-generation is the important thing which also should maintain the logs like who has requested the report and when the report has been deliver to whom so it should be also manage 

one another module is the supplier who is the supplier what he is supplying how much stock has been supply from him and all the things should be manage from them 

all apis request should be tightly validated with the request dto's.

same way orders should be manage and according to that stock should be move so one module will be for that 

iteam return will be another module where if someone return the item then the records will be store there 


one another important module is the subscription module at where the there will be three plans where the pro premium and enterprise this kind of plan at where user will purchase the plan for his organization and according to that he can add the users products and store and for the enterprise plan he can use unlimited number of features in the ui so you need to plan this also that how the plan will work how the payment module will work with the integration of third party payment module and store the payment record and plan so organization and entire ERP software will goes to subscription base so need to plan this

after that verify the all the database schema weather it is appropriate or not if not then plan production ready schema 


only plan that how use centrifugo for the real time communication or can use the socket io for the real time communication and will implement it later

after that create proper context file about what we have implemented and how is it designed.

we need also one mail service named node mailer which can help us to send mail with multiple kind of templates so we need database for this and also for the pdf for the reports of stocks