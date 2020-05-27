import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'
var typeDefs = require("../prisma/generated/prisma-client/prisma-schema").typeDefs
"use strict";

const prisma = new Prisma({
  typeDefs,
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
})

export { prisma as default }