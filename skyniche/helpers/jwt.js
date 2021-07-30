const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /^\/customers(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            { url: /^\/transactions(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
            `/login`


        ]
    })
}

async function isRevoked(req, payload, done) {
    console.log("helllo", payload);

    if (!payload.isAdmin) {

        done(null, true)
    }

    done();

}
module.exports = authJwt