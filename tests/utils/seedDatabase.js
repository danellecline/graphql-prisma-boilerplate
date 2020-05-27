import prisma from '../../src/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const user1 = {
    input: {
        name: "Lonny",
        email: "lonny@mbari.org",
        password: bcrypt.hashSync('jo$1de12345')
    },
    user: undefined,
    jwt: undefined
}

const user2 = {
    input: {
        name: "Danelle",
        email: "dcline@mbari.org",
        password: bcrypt.hashSync('jo$1de12345')
    },
    user: undefined,
    jwt: undefined
}
 
const seedDatabase = async () => {
    // clean users
    await prisma.mutation.deleteManyUsers()

    // create user 1

    // bypassing node during tests, so we want to hash the password
    user1.user = await prisma.mutation.createUser({
        data: user1.input
    })

    // create an authentication token to user in the test cases
    user1.jwt = jwt.sign({ userId: user1.user.id }, process.env.JWT_SECRET)

    // create user 2
    user2.user = await prisma.mutation.createUser({
        data: user2.input
    })

    user2.jwt = jwt.sign({ userId: user2.user.id }, process.env.JWT_SECRET)
 
}

export { seedDatabase as default, user1, user2}
