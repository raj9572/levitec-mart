# for setup the project and run the application
  first you have to clone  the repository of  "first-commit" from the github.. after clone you have see folder levitec-mart in which the client and server folder exist
  ## for client setup
  1. go to client folder
  2. open the terminal and run command "npm install" for  install all the package in nodemodules
  3. run command "npm run dev" for run the client
  4. you will redirected to http://localhost:5173 where the client is running

  ## for server setup
  1. open the new terminal
  2. go to server folder
  3.  run command "npm install" for  install all the package in nodemodules
  4. run command "npm run dev" for run the server 


# Features of the application
1. when you will run the application you redirected to http://localhost:5173 which is home page where you see the beautiful navbar and  all the product list with name , price and add and remove button
2. in navbar when the user is not logged in then they can see the login and signup button and after loggedin the logout button show the place of login/signup .. which is possible by token which come from server and store in localStorage for authentication
3. you can add the product into cart by click on add(+)  button and remove item from cart by click on (-) button
4. after adding the product into cart click on the cart icon which is show in the middle of the navbar
5. after clicking the cart icon page redirect to cart route where you can see the added items into cart with quantity , price , total, gst, grandTotal and left side button which is for downloade the invoice of the products
6.  the invoice is downloade when the user is logged in otherwise it show popup that only authenticate user is downloade the invoice
7.  we have use the jwt token for secure the application
8.  i have uses the redux toolkit for state management of the application beacuse it was mendatory

# Package we intall for frontend and backend
 ## frontend
 1. react-router-dom -- which is for routing in react
 2. react-redux and redux-toolkit -- which is for state management
 3. react-icons --  which is for using the icons form application
 4. react-toastify --- which is user for show the toast or popup of the user action
 5. axios      ---- which is for request to the server

 ## backend 
 1.bcryptjs -- which is user for encrypt the password of user before save the info of user to database 
 2. jsonwebtoken --- which is user for authenticated it generate a token in which the some information is store of user in ecrypted way... and we use in mostly in middleware for authenticate the user
 3.cors  --- which is user for allow the origin to send the data to the server 
 4. mongoose ---  which is used for fetch , create and many other operation for the data of user or products
 5.puppeteer  -- which is used for generating the dynamic data into the pdfs file 

# Some important things
1. we do not use protected route because we do not need in requirement
2. for the backend we use js because i never do work backend in ts...i know it is very simple bt i never worked.. if we need to work backend in ts then i can learn within 5-6 days..
3. i do not have much good in typescript bt i try to do my best...
4. some where i used chatgpt and google for resolving the error and help to understand the process
