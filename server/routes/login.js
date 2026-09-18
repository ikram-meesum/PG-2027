let express = require('express');
let route = express.Router();

route.get('/', (req, res, next) => {
    //res.render("login");
});

route.post('/', (req, res, next) => {
    let email = req.body.txtemail;
    let pwd = req.body.txtpwd;
    console.log('Email ', email);
    console.log('Password ', pwd);

    if(email === 'ikram@gmail.com' && pwd === '12345')
    {
        //res.redirect('/mbbsstudent');
        res.json({message: 'Success'});
    }
    else
    {
        res.json({message: 'Invalid username or password'});
    }    
});

module.exports = route;