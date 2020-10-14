let { userModel } = require('../db');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    userModel.findOne({
        where: {
            access_token: token
        }
    }).then((result) => {
        if(result != null) {
            next();
        } else {
            return res.status(401).send({
                message: 'UnAuthenticated'
            });
        }
    })
}