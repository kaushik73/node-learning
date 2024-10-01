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

POST /request/send/interested/:userId

POST /request/send/ignored/:userId

POST /request/review/accepted/:requestId

POST /request/review/rejected/:requestId

## user

GET /user/connections

GET /user/request

GET /user/feed

##

##

## Lec-12 : Logical DB Query & Compound Indexes

When we make any field unique then it automatically make it as index, so that queries became fast.

or we can do index : true
