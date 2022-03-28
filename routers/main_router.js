require('dotenv').config();
const express = require("express");
const bcryptjs = require('bcryptjs');
const {auth} = require('../middlewares/auth');
const {ShopUsers} = require('../models/home_schema');

const router = express.Router();

let currentUserID = '';
let cartListLength = 0;

router.get('/',(req, res) => {
    res.render('home');
});

router.get('/signup',(req, res) => {
    res.render('signup');
});

router.get('/signin',(req, res) => {
    res.render('signin');
});

router.get('/userhome', (req, res) => {
    res.render('user_home', {
        isSignin: null,
        username: null,
        email: null
    });
});

router.get('/cart', (req, res) => {
    res.render('cart', {
        currentuserID : currentUserID,
        cartListLen : cartListLength
    });
});

router.post('/signup' ,async (req, res) => {
    try {
        const password = req.body?.password;
        const confirmpassword = req.body?.confirmpassword;
        const userData = ShopUsers({
            name: req.body?.username,
            email: req.body?.email,
            number: req.body?.number,
            password: password
        });

        const token = await userData.generateToken();
        console.log(token);

        if (confirmpassword === password) {
            const savedData = await userData.save();
            console.log(`The submitted Data is : ${savedData}`);
            res.render('signin');
        } else {
            console.log('your password is not been confirmed properly!');
        }

    } catch (error) {
        console.log(error);
    }
});

router.post('/signin' , async (req, res) => {
    try {
      let isSignin = false;
        console.log(isSignin);
    const useremail = req.body.email;
    const password = req.body.password;
    const user = await ShopUsers.findOne({email: useremail});
    const isSimilar = await bcryptjs.compare(password, user?.password);
    
    const token = await user.generateToken();
    res.cookie('jwt', token);


    if (isSimilar == true) {
        console.log('Sginin successfuly !');
        isSignin = true;
        console.log(isSignin);
        currentUserID = user._id;
        console.log(currentUserID);
        res.status(201).render('user_home', {
            isSignin: isSignin,
            username : user.name,
            email : useremail,
            id: user._id,
        });
    }
    } catch (error) {
        console.log(error);
    }
});


router.get('/logout', auth , async (req, res) => {
    try {
        res.clearCookie('jwt');
        // // thapa technincal function...
        // req.user.tokens = req.user.tokens.filter((elem) => {
        //     return elem.token !== req.token;
        // });
        res.render('home');
    } catch (error) {
        console.log(error);
    }
});



// creating an API for items...
router.get('/userItems', async (req, res) => {
    try {
        const users = await ShopUsers.find({});
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});


router.post('/userItems', async (req, res) => {
    try {
        const data = req.body;
        const userData = ShopUsers(data);
        await userData.save();
        const users = await ShopUsers.find({});
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});


router.patch('/userItems/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedData = await ShopUsers.findByIdAndUpdate({ _id: _id }, req.body, { new: true });
        res.send(updatedData);
    } catch (error) {
        console.log(error);
    }
});


router.delete('/userItems/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedData = await ShopUsers.findByIdAndDelete({ _id: _id });
        const users = await ShopUsers.find({});
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});


//signup and signin API...

// --> signup API...
router.post('/user/signup', async (req, res) => {
    try {
        const userData = ShopUsers(req.body);
        await userData.save();
        res.status(201).send(userData);
    } catch (error) {
        console.log(error);
    }
});

// --> signin API...
router.post('/user/signin', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        console.log(`Email: ${userEmail} Password : ${userPassword}`);
        const user = await ShopUsers.findOne({email: userEmail});
        const isSimilar = await bcryptjs.compare(userPassword, user.password);

        if (isSimilar) {
            res.status(201).send(user);
            console.log('signin successfully !');
            return user;
        }else {
            res.send("The password doesn't match...")
        }
    } catch (error) {
        console.log(error);
    }
});



// ALL ABOUT CART...

// ---> my Cart adding API...
router.post('/user/cartAdd/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await ShopUsers.findById({_id: id});
        await user.addToCart(JSON.parse(JSON.stringify(req.body)));
        res.status(201).send(user.carts);
        console.log(user?.carts['cart']);
    } catch (error) {
        console.log(error);
    }
});


// ---> my Cart getting API...
router.get('/user/getCart/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await ShopUsers.findById({_id: id});
        const userCartList = user.carts;
        cartListLength = userCartList.length;
        res.send(userCartList);
    } catch (error) {
        console.log(error);
    }
});


module.exports = {router};