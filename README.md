# These API's we need to make

## auth

POST /signup

POST /login

POST /logout

## profile router

GET /profile/view

PATCH /profile/edit

PATCH /profile/password

## connectionrequest

POST /request/send/:status/:userId -> status=[ignored , interested]

POST /request/review/:status/:requestId -> status=[accepted , rejected]

## user

GET /user/connections

GET /user/request/recieved

GET /user/feed

##

##

npm run dev will use .env.local and start on PORT=7000.

npm start will use .env.production and start on PORT=8000.
