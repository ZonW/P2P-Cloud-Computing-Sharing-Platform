const express = require('express');
const router = express.Router();
const users = require('../data/users');

//GET
router.get('/page-user-login', (req, res) => {
    if (req.session.user) {
        console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`);
        res.redirect('../');
    } else {
        console.log(
            console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`)
        );
        res.status(401).render('../views/pages/page-user-login', {});
        return;
    }
});

//GET signup
router.get('/page-user-signup', (req, res) => {
    if (req.session.user) {
        res.redirect('../');
    } else {
        res.status(401).render('../views/pages/page-user-signup', {});
        return;
    }
});

//POST signup    
router.post('/page-user-signup', async (req, res) => {
    try {
        const username = users.checkUsername(req.body.username);
        const firstName = users.checkName(req.body.firstName);
        const lastName = users.checkName(req.body.lastName);
        const email = users.checkEmail(req.body.email);
        const password = users.checkPassword(req.body.password);
        const phone = users.checkPhone(req.body.phone);
        const city = users.checkCity(req.body.city);
        const state = users.checkState(req.body.state);
        const country = users.checkCountry(req.body.country);
        const zipCode = users.checkZipCode(req.body.zipCode);

        const user = await users.createUser(
            firstName,
            lastName,
            email,
            username,
            phone,
            password,
            city,
            state,
            country,
            zipCode
        );

        if (user.userInserted) {
            res.redirect('/');
            return;
        } else {
            res.status(500).render('../views/pages/page-user-signup', { error :  'Internal Server Error' });
            return;
        }
    } catch (e) {
        res.status(500).render('../views/pages/page-user-signup', { error : e });
    }

});

//POST login
router.post('/page-user-login', async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    let user;
    try {
        if (!email || !password) throw 'Missing email or password';
        if (typeof email !== 'string') throw 'email should be string';
        if (email.trim().length === 0) throw 'email cannot be empty spaces';
        for (let i = 0; i < email.length; i++) {
            if (email[i] === ' ') throw 'email cannot contain space';
        }
        // if (!email.match('^[a-zA-Z0-9]+$')) throw 'email can only be alphanumeric characters';
        if (email.length < 4) throw 'email should be at least 4 characters';
        if (password.trim().length === 0) throw 'password with only spaces is not allowed';
        for (let i = 0; i < password.length; i++) {
            if (password[i] === ' ') throw 'password cannot contain space';
        }
        if (password.length < 6) throw 'password should be at least 6 characters long';
        user = await users.checkUserLogin(email, password);
    } catch (e) {
        error = e;
        res.status(400).render('../views/pages/page-user-login', { error });
        return;
    }

    try {
        if (user.authenticated == true) {
            req.session.user = email;
            console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`);
            res.redirect('../');
        } else {
            console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`);
            res.status(400).render('../views/pages/page-user-login', { error: 'username or password is not valid' });
            return;
        }
    } catch (e) {
        res.status(400).render('../views/pages/page-user-login', { error: 'username or password is not valid' });
        return;
    }
});

// GET logout
router.get('/logout', async (req, res) => {
    if (await req.session.user) {
        req.session.destroy();
        res.redirect('../');
    }
});

module.exports = router;
