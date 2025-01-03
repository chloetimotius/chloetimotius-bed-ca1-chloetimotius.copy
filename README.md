# Starter Repository for Assignment
Folder structure
src
  ├── configs
  │   ├── createSchema.js        # Creates database schema
  │   ├── initTables.js          # Initializes database tables
  ├── controllers
  │   ├── challengesController.js # Handles logic for challenges
  │   ├── gamificationController.js # Manages gamification features
  │   ├── usersController.js     # Manages user-related functionality
  ├── models
  │   ├── challengesModel.js     # Database models for challenges
  │   ├── gamificationModel.js   # Database models for gamification
  │   ├── usersModel.js          # Database models for users
  ├── routes
  │   ├── challengesRoutes.js    # Routes for challenges
  │   ├── gamificationRoutes.js  # Routes for gamification
  │   ├── mainRoutes.js          # Main routes for the application
  │   ├── usersRoutes.js         # Routes for users
  ├── services
  │   ├── db.js                  # Database connection and configuration
  ├── app.js                      # Application entry point
  ├── .env                        # Environment variables file
  ├── .gitignore                  # Git ignore file
  ├── index.js                    # Entry point for the application
  ├── package-lock.json           # Package lock file for dependencies
  ├── package.json                # Project metadata and dependencies
  ├── README.md                   # Project documentation

To start please download these node modules first
- express
- mysql2
- dotenv
- nodemon

Next, ensure that you have the .env with the correct contents as below
DB_HOST=localhost
DB_USER=root 
DB_PASSWORD=root
DB_DATABASE=fitness

Finally,
To create and insert tables from the config folder
1. Open the terminal
2. Enter npm run init_tables into the terminal
3. This should create and insert into table 'fitness'
4. To run the server, enter npm run dev
5. To test API endpoints do click on the postman icon on the left side of the screen and run ur requests accordingly
For example:
localhost:3000/gamification/character/

IMPORTANT:
6. Please read the comments below each section as they help to identify what each part does
For example:
// ##############################################################
// DEFINE CONTROLLER FUNCTION TO CREATE USER
// ##############################################################
/*
 - Controller to create a new user.
 - Validates the request body, checks if the username already exists,
   and inserts a new user into the database.
*/
// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR ABILITIES
// ##############################################################
/*
  This function retrieves all abilities from the database.
  It fetches every entry from the Ability table.
*/
7. Thank you for your time and have fun with my code :>
