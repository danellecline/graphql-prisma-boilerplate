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

wait a few seconds for the docker prisma image and empty database to spin-up, then deploy the development model

```yarn prisma-deploy-dev```

edit .graphqlconfig.yml and edit the endpoint to reflect the above, e.g.
```http://localhost:4466/fish/dev```

then generate the new schema

```yarn prisma-deploy-dev```

# Test

Deploy the test database

```yarn prisma-deploy-test```

Install test dependencies
```yarn install --dev```

Run test
```yarn test```

* Install dependencies
```npm install```
