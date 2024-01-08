const jwt = require("jsonwebtoken");
// const config = require("./config")();
token = {
    authToken: function (data) {
        var token = jwt.sign(data, process.env.SECRET_KEY,{ expiresIn: '24h' });
        return token;
    }
};
module.exports = token;