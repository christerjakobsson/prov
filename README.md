# Kvix Arbetsprov

## Backend

To be able to run the backend follow these steps:

1. Navigate to `./backend`
2. Run `yarn install`
3. Make sure docker-desktop or colima is running locally.
4. Run `docker-compose up -d` to start a container running postgres
5. Run `yarn dev` to start the server.
6. You should now see some migrations running and that the server starts to listen on port 3000 by default.


Some configuration are added in a `.env`.
* DATABASE
* DATABASE_USER
* DATABASE_PASSWORD  
* PORT

All with working default values.
For documentation on endpoints see [Api Documentation](./API_DOC.md)


### Summary



# Frontend

To start the frontend:

1. Navigate to `/frontend`
2. Run `yarn install`
3. Run `yarn start` to start.
4. 

Both projects use eslint and to run linting in any of them execute `yarn lint` 


