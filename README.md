# GraphQL Prisma Boilerplate Code 

Contains boilerplate for GraphQl+Prisma Postgres Project
Credit to Andrew Mead for his awesome class on GraphQL and this boiler plate. 
Slightly modified for deployment on a local database.

## Requirements
  * Docker
  * Node

## Setup

* Clone this repo
```git clone ...```

* Copy config/dev.env.template to config/dev.env and change the service name to reflect your project, e.g. if your api is for a fish app:

```PRISMA_ENDPOINT=http://localhost:4466/fish/dev```

* Copy config/test.env.template to config/test.env and change the endpoint to reflect your project, e.g. if your api is for a fish app:

```PRISMA_ENDPOINT=http://localhost:4466/fish/test```

## Development

*  Startup the prisma server. Should only need to do this once.
```yarn prisma-up``` 

wait a few seconds for the docker prisma image and empty database to spin-up.

Create a token so that the Prisma CLI can read the env file and generate the correct token

```prisma token -e ../config/dev.env```

Now deploy

```yarn prisma-deploy-dev```

then generate the new schema

```yarn prisma-deploy-dev```

Finally, open at [http://localhost:4466/fish/dev](http://localhost:4466/fish/dev) or whatever endpoint you've specified in dev.env.

Use the token to access the database by inserting in the HTTP header, e.g.
```
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTg5OTM2MDk3LCJleHAiOjE1OTA1NDA4OTd9.SUxmPrQjABEDVL6xB688aVkylURXPfX5JkkKnMLSxDw"
}
```
![ Image link ](/imgs/authorize.png)

# Test

Deploy the test database

```yarn prisma-deploy-test```

Install test dependencies
```yarn install --dev```

Run test
```yarn test```

* Install dependencies
```npm install```

# Resources
PgAmin
* For probing PostGres databases - you need something to inspect the database outside of prisma for some debugging
http://127.0.0.1:52696/browser/
