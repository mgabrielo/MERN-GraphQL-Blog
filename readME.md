# Software Architectural Design for a React Node GraphQL Blog Application

(1) Problem Statement :

- A need for a simple social system where a number of people can share information with minimal resources

(1)a- Inquires:

- What type of system is needed ? is it web or mobile system - web and should be adapted for desktop and mobile screens
- how many people will be allowed to interact with this system ? A small range of people can be considered
- what type of information is shared between users of this system ? blog and comments
- what resources are to be used to the minimal ? bandwidth of data
- Will users that create blog and comments be identifiable to others ? Yes through authenication
- what type of data will used for the blog and comments ? Text
- what type of application model will be used ? A client-server application structure will be used
- How will data be stored on this system ? data can be store on an online database
- Will the applcation require a notification system - at moment just a simple interaction between blog and comments are required

(2)Requirements :
(a)functional requirements: beak down the requirements into sub systems
i - blog Management -: A way to create, retrieve and modify blogs that belongs to users
ii - comment management -: A way to create, retrieve and modify comments that belongs to users
iii - User Authentication system -: a way of tracking users that interact with blog and comments
iv - GraphQl communication system -: a way to define and manage data interaction with minimal bandwidth
v- database system - a way to structure and store data that will be manipulated by users

(b)Non-funtional requirements:
i- Efficient Data Querying and Data Manipulation
ii-Secure authentication and authorization mechanism
iii-Scalable Database system that accommodate the unidentified range of users
iv-User friendly interface to collect and distribute system interactions
v-Reliable Data storage to ensure user interactions are non-volatile
vi-Consistency- ensure process of blog and comment interaction are guided by authorised identification between client and server
vii- compatibility - to ensure system is accessible on a required platform

3-Use Case Priorities:
i- user registartion and login
ii- blog creation
iii- blog visibilty
iv- comment creation on blog
v- managing blog
vi- managing comments
vii-comment visibility

System Design
-To describe the communication between the client and server application to support proposed requirements for the application; the project can be split into sub systems to resolve the flow of data communication in more details
For this Project , react application will represent the frontend client and a node application will represent the backend server.

System relationship between server and client via sub-systems :

(a)User Registration:
-A visiting user provides details for account creation from client application to be sent to the server application via apollo client
-the details of the created user are received by graphql api service in the server and stored as account details in the database
-On complete registration, user data is saved to redux store and user is directed to Blog Page

(b)User Login:
-Existing User provides account details from client application to be sent to the server application via apollo client
-server receives the existing user details via graphql api service to verify and authorise user to access other resources such as blog management and comment management

(c)Blog Creation:
-Existing User creates blog from client application to be sent to the server application via apollo client
-The graphql api service in the server receives blog and stores it in the database
-The graphql api service retrieves the blog and sends to the client app to be viewed by all users including the blog creator
-On successful completion of blog creation, the apollo client refetches current list of blogs for authenticated user

(d)Blog Visibilty :
-The client application checks if current user is authenticated user
-if authenticated user exist, the graphql apollo client will request current list blogs from the graphql api service in the server side
-the blogs that belongs to all users will be made visible to authenicated user

(e)blog Management:
-client application checks if visible blog belongs to existing authenticated user via redux state management
-if existing blog belongs to authenticated user,the authenicated user can then trigger action (such as edit or delete) for blog modification on the client app
-Based on the triggered action, a request for blog modification is sent to the server via apollo client
-changes made to blogs are commited and saved to database using a graphql api service
-blogs for authenticated user are then queried and retrieved by graphql api service and sent to the client to be received and viewed by the authenticated user via apollo client

(f)Comment Creation:
-existing user creates comment on blog from client application to be sent to the server application via apollo client
-details of comment is stored in accordance to related blog it belongs to and user that created it
-comment is retrieved and sent to the client app to be viewed by all users including the comment creator

(d)Comment Visibilty :
-The client application checks if current user is authenticated user via redux state management
-if authenticated user exist, the graphql apollo client will request current list blogs from the graphql api service in the server side
-the blog belongs to all users will be made visible to authenicated user

(g)Comment Management:
-client application checks if visible comment belongs to exisiting authenticated user via redux state management
-if existing comment belongs to authenticated user,the authenicated user can then trigger an action (such as delete) for comment modification on the client app
-Based on the triggered action, a request for comment modification is sent to the server via apollo client
-changes made to comments are commited and saved to database using a graphql api service
-comments for authenticated user are then queried and retrieved by graphql api service and sent to the client to be received and viewed by the authenticated user via apollo client

Summary of System design :
This system design for the React-Node GraphQL blog application outlines the communication between the client and server to support various user actions such as registration, login, blog management, and comment management. The architecture is divided into subsystems to streamline data flow and interaction.
Furthermore it ensures a defined interaction between the client and server, facilitating user registration, login, and efficient management of blogs and comments. It leverages Apollo Client for communication, GraphQL for data querying and mutations, and MongoDB for persistent storage. The GraphQL API design supports scalability and maintainability of application data with usage of minimal resources. Ultimately, This system uses modern technologies to ensure efficient communication between the client and server, and smooth data flow across different subsystems.

Data Modelling:
The data modelling for this GraphQL project involves three main entities: User, Blog, and Comment. Each entity is represented both in the Mongoose schema and the GraphQL schema

User Model :

- The is identified through an Id as its primary key
- The related fields owned by the user includes email, name and password;
- the associated fields that belong to the user include blog and comments that are inherited via array of foreign keys
- The User Model has One-to-Many relationship with the Blog Model (a user can write multiple blogs).
- The blogs owned by the User are recorded as array of ObjectIds that references Blog model
- The User also has One-to-Many relationship with Comment model (a user can write multiple comments).
- The blog owned by the User are recorded as array of ObjectIds that references blog model
- The comments owned by the User are recorded as array of ObjectIds that references comment model

Blog Model :

- The is identified through an Id as its primary key
- The related fields owned by a blog includes title, content, date;
- The associated fields that belong to the blog include user and comments that are inherited via foreign keys
- The user field in the blog model has ObjectId references a User (refers to the User who wrote the blog).
- The comment field in the blog model has an array of ObjectId that references comment associated with post record
- The blog model has Many-to-One with User (many blogs can belong to one user)
- The blog model has One-to-Many relationship with Comment model(a blog can contain multiple comments).

Comment Model :

- The is identified through an Id as its primary key
- The related fields owned by a comment includes text, date;
- The associated fields that belong to the user include blog and user that are inherited via array of foreign keys
- The user field in the comment model has an ObjectId that references User model
- The post field in the comment model has an ObjectId that references Post model
- The comment model has Many-to-One with the Blog Model (many comments can belong to one blog)
- The comment model has Many-to-One with User (many comments can belong to one user)

Data Defintion and Data Flow

The GraphQL Schema defines the data structure and relationships at the API level and uses the resolvers to fetch related data based on the parents data structure and relationships at the database level.

The GraphQL Schema and Its Association with other schemas is given below
(i)UserType:

- blogs: Accepts a Blog Type and Resolves to a list of blogs created by the user.
- comments: Accepts a Comment Type Resolves to a list of comments made by the user.

(ii) BlogType:

- user:Accepts a User Type and Resolves to the user who created the blog.
- comments: Accepts a Comment Type and Resolves to a list of comments on the blog.

(iii) CommentType:

- user: Accepts a User Type and Resolves to the user who made the comment.
- blog: Accepts a Blog Type and Resolves to the blog the comment belongs to

Summary of Data Modelling:
The Mongoose models define the structure and relationships of the data in MongoDB, while the GraphQL schema defines how this data can be queried and mutated. The GraphQL resolvers use the Mongoose models to fetch and return the related data, ensuring that the relationships between users, blogs, and comments are properly maintained both at the database and API levels. This allows for a clear and consistent data flow and interaction model across the different parts of the application.

Additional Improvements that can be made includes:

- Use of JWT strategy of Authenication
- More Server Side Validations via middlewares to process data and handle errors more efficently
- Backend Session management to provide a more secure authorization to resources
- Including features such as Search API to find and sort blog more efficiently
- Pagination of data to optimise data loading and page response time
- blog Filtering to reduce the creation of blog with an already existing title
- implementing option for the creation of media related blog to improve content description of blog
- Unit Testing of front end application to assert functional behaviour of user interface
- Integration testing to verify high level functionality support provided by client and server application
- Other forms of optimization including image optimization, code splitting and use of react hooks for enhanced page rendering
