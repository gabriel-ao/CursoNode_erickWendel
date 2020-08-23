docker run --name postgres -e POSTGRES_USER=gabriel -e POSTGRES_PASSWORD=gabriel -e POSTGRES_DB=herois -p 5432:5432 -d postgres

docker ps
docker exec -it postgre /bin/bash

docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

## ---- MONGODB

docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -d mongo:4

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u admin -p admin --authenticationDatabase admin --eval "db.getSiblingDB("herois").createUser({user: "gabriel", pwd: "gabriel", roles: [{role: "readWrite", db: "herois"}]})"

docker exec -it mongodb mongo --host localhost -u admin -p admin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'gabriel', pwd: 'gabriel', roles: [{role: 'readWrite', db: 'herois'}]})"
