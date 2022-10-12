<h1 align="center">Node.JS Movies System</h1>

## Description:

The project aims to create categories by admins only, and movies by users then rate them after they create an account for them in the application and confirm their account by email.  
Every person who created a movie, rates, or even admins who created categories can only edit or delete it whenever he wants.


## To run this project

`Step 1` : To use this project must install [Node.js](https://nodejs.org/en/) and [pgadmin](https://www.pgadmin.org/download/) Then Download the source code

```
git clone https://github.com/MohamedAlabasy/Node.JS-Movies-System.git
```

`Step 2` : Enter the project file then install package

```
npm i
```
`Step 3` : Open pgadmin then create a database called `StorexWeb_movies` , then to run migrations :
```
db-migrate up
```


<h3 align="center">To help you understand the project</h3>

## Folder Structure

```bash
├── src
│   ├── controllers 
│   │   ├── authController.ts => `for handel authentication function`
│   │   ├── categoriesController.ts => `for handel categories function`
│   │   ├── moviesController.ts => `for handel movies function`
│   │   └── ratesController.ts => `for handel rates function`
│   │
│   │
│   ├── middleware
│   │   ├── morganMiddleware.ts => `for log url, method and statue of requests`
│   │   │── notFoundMiddleware.ts => `for not Found Middleware`
│   │   └── errorMiddleware.ts => `for error Middleware`
│   │
│   │
│   ├── models
│   │   ├── categoriesModels.ts => `for handel categories Models`
│   │   ├── emailVerificationModels.ts => `for handel email verification Models`
│   │   ├── moviesModels.ts => `for handel movies Models`
│   │   │── ratesModels.ts => `for handel rates Models`
│   │   │── resetPasswordModels.ts => `for handel reset password Models`
│   │   └── userModels.ts => `for handel user Models`
│   │
│   │
│   ├── Public
│   │   └── assets => `contains ADS (photos and videos)`
│   │
│   │
│   ├── routes
│   │   ├── api
│   │   │   │── authRouter.ts => `for handel authentication route`
│   │   │   │── categoryRouter.ts => `for handel category route`
│   │   │   │── movieRouter.ts => `for handel movie route`
│   │   │   └── rateRouter.ts => `for handel rate route`
│   │   └── routes.ts => `import all routes and exports it to index`
│   │
│   │
│   ├── tests => `for testing purposes`
│   │   ├── helpers
│   │   │   └── reporter.ts
│   │   └── indexSpec.ts => `for testing endpoint api`
│   │
│   │
│   ├── utilities
│   │   ├── helpers
│   │   │   │── emailVerification.ts => `for send email message`
│   │   │   └── emailMessagesDesign.ts => `for email messages design ( HTML & CSS )`
│   │   │── checkTokens.ts => `for Request check Tokens`
│   │   │── common.ts => `for common variables`
│   │   └── validateRequest.ts => `for validate Request`
│   │
│   ├── database.ts => `for handel database Pool`
│   └── index.ts => `to run the server`
└──
```

## DataBase ERD

## DataBase ERD
<p align="center">
   <img src="https://user-images.githubusercontent.com/93389016/195209452-77d05549-4e6c-4c28-8b98-662e514bf225.jpg" alt="ERP Database">
</p>

`Step 4` : To run project

```
node run start
```


`Step 5` : Open [postman](https://www.postman.com/downloads/) and import : [API Collation](https://github.com/MohamedAlabasy/Node.JS-Movies-System/blob/main/api_collection.json) You will find it in the project file.

`Step 6` : After completing the registration as a new user, you must go to your email to confirm the email through the code sent to you

To run eslint to check error

```
npm run lint
```

To run eslint and auto fixed error

```
npm run lint:f
```

To compile the TS code

```
npm run build
```

To run the JS code

```
node dist/index.js
```

<hr>

Here are the [Command](https://github.com/MohamedAlabasy/Node.JS-Movies-System/blob/main/command.txt) that were used in the project, You will find it in the project file.
