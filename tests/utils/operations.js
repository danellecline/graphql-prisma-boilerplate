import { gql } from 'apollo-boost'

// create a mutation with variables to create a user
const createUser = gql`
    mutation($data:CreateUserInput!) {
        createUser(
            data: $data
        ){
            user {
                id
                name
                email
            }
        }
    }
`
// create a mutation with variables to login a user
const loginUser = gql`
    mutation($data:LoginUserInput!) {
        login(
            data: $data
        ) {
            token
        }
    }
`
// get a profile
const getProfile = gql`
    query {
        me {
            id
            name
            email
        }
    }
`
const getUser = gql`
    query {
        users {
            id
            name
            email
        }
    }
`
const getVerifiedAnnos = gql`
    query {
        annotations {
            id
            commonName
            verified
            xmn
            ymn
            width
            height
        }
    }
`

export { createUser, loginUser, getProfile, getUser }