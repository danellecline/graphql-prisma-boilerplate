import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    // for subscriptions, authentication data exists on a web socket which
    // is in request.connection.context.Authorization
    // otherwise it is in request.request.headers.authorization
    const header = request.request ? request.request.headers.authorization: request.connection.context.Authorization

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.userId
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    } 
    
    return null
}

export { getUserId as default }