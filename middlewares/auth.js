const jwt = require('jsonwebtoken');
const {ShopUsers} = require('../models/home_schema');


const auth = async (req, res, next) => {
    try {

        const userToken = req.cookies.jwt;
        const isTokenVerified = jwt.verify(userToken, process.env.SECRET_KEY);
        req.user = await ShopUsers.findOne({_id: isTokenVerified._id});
        req.token = userToken;
        req.tokens = isTokenVerified.tokens?.token;

        if (isTokenVerified != null) {
            console.log('success !');
            next();
        } else {
            res.send('try again after sometime !');
        }
        
    } catch (error) {
        res.render('signin');
        console.log('the user is not availible please sign in first !');
    }
}

module.exports = {auth};