import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import { Prisma } from 'prisma-binding'

const Mutation = {
    async login(password, args, { prisma }, info) {

        const user = await prisma.query.user({ 
            where: {
                email: args.data.email }
            })

        if (!user) {
            throw new Error('Unable to login.')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login.')
        }

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async createUser(parent, args, { prisma }, info) {
        const users = await prisma.query.users({ 
            where: {
                email: args.data.email }
            })

        console.log(users)

        if (users.length > 0) {
            throw new Error('User exists.')
        }

        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer')
        }

        // store the hashed version with a salt of 10
        const password = await bcrypt.hash(args.data.password, 10)

        // if we leave off info, by default this returns all scalar fields
        const user = await prisma.mutation.createUser({ 
            data: {
                name: args.data.name,
                email: args.data.email,
                password: password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        }

    },
    async updateUser(parent, args, { prisma, request }, info) {
        // get authenticated user since we only want the user to modify their own profile
        const userId = getUserId(request, true)

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        // get authenticated user since we only want the user to delete themselves
        const userId = getUserId(request)

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)

    }
}

export { Mutation as default }
