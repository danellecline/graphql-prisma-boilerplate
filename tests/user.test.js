import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import gql from 'graphql-tag' 
import seedDatabase, { user1, user2 } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, loginUser, getProfile, getUser } from './utils/operations'

// for cases that do not need authenticated users
const client = getClient()

beforeEach(seedDatabase)

test('Should show user info', async () => {
 
    const response = await client.query({ query: getUser })
    expect(response.data.users.length).toBe(2)
    // are not logged in, so we should not see the users email
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Lonny')

})

test('Should create a new user', async () => {
    const user = {
        data: {
            name: 'Kyra',
            email: 'kschlining@mbari.org',
            password: '349ang111kl'
        }
    }
    const response = await client.mutate({ mutation: createUser, variables: user })
    const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
    expect(exists).toBe(true)
})

test('Should fail when user logs in with bad credentials', async () => {
    const user = {
        data: {
            email: 'dcline@mbari.org',
            password: 'wrongpassword12345'    
        }
    }
    await expect(
        client.mutate({ mutation: loginUser, variables: user })
        ).rejects.toThrow()
})

test('Should fetch user profile ', async () => {
    const client = getClient(user1.jwt)
    await client.query({ query: getProfile })
})