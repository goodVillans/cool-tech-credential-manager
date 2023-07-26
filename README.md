# cool-tech-credential-manager

## A credential management application built with the MERN stack, for a ficticious company named cool tech where different actions can be conducted based on a users role.

### Assignment Brief: 

Your web app should have user login and registration, different user roles, and
different resource access for each user. Cool Tech has the following five
organisational units (OU):

● News management
● Software reviews
● Hardware reviews
● Opinion publishing

Each of these OUs has over 10 different divisions within them. Divisions take care of
subtasks like finances, IT, writing, development, and so on. Each division has its
own credential repository which contains a list of login details for various places. All
employees of the division should have access to it.
Most employees are only part of one OU and one division with it, but there are
some that are part of more than one OU and division. Furthermore, there should
be different user roles for the employees.

● Normal users can read the credential repository, and add new credentials in.
● Management users can do the above plus update credentials.
● Admin users can do the above plus they can assign and unassign users from divisions and OUs. They can also change the user role of any user

## Backend:
A Node diven backend that makes use of express, JWT, bcrypt, mongoose and various other dependencies. 

#### Seed Script: 
A seeding script is used to populate relevant data in the db. The code can be edited to create more OUS, divisions, and users + credentials for each.

#### Models: 
Four schema models have been created which intricately ref one another in a manner that aims to sustain the integrity of the data on the db.

#### Controllers: 
Controllers for each of the Schemas has been designed.

#### Routes:
All endpoints required in the assignment can be found in one of the four route files(Register and login routes are in userRoutes.js).

#### Middleware: 
The only file in middleware is responsible for authentication of user tokens on the backend. it include Auth and role checking.

## Frontend:

A react frontend Styled with Tailwindcss and daisyUI.

### All endpoint actions can be found by clicking the credentials (eye) icon and edit (pen) icon

## Functionality:

#### Credentials Modal displays a list of all users credentials and allows for the editing of a credential if the user is of a required role.

#### The permissions model is responsible for updating the users credentials such as; Role, OUs and divisions.

For additional security, any functionality that access endpoints that require a certain role have been disabled based on the users role. 


