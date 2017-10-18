var User = require('./models/userModel');
var mailsetup = require('./mailSetup');


module.exports = function (app) {

    // api ---------------------------------------------------------------------

    app.post('/api/login', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err) throw err;
            if (!user || !user.comparePassword(req.body.password)) {
                res.json({
                    message: 'user does not exist',
                    success: false
                });
                return;
            }
            res.json({
                message: 'success',
                user: user,
                success: true
            });
        });

    });

    app.post('/api/signup', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        var newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.pw
        });

        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err) throw err;
            console.log(user);
            if (!user) {
                newUser.save(function (err) {
                    if (err) {
                        return res.send(err);
                    }

                    mailsetup.veryficationMailSender(req, newUser._id);
                    res.json({
                        message: 'user created',
                        success: true
                    });
                });
            } else {
                res.json({
                    message: 'User already exist',
                    success: false
                });
            }
        });
    });

    app.post('/api/reset', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err)
                res.send(err);

            if (!user || !user.comparePassword(req.body.oldPass)) {
                res.json({
                    message: 'user does not exist',
                    success: false
                });
                return;
            } else {
                user.password = req.body.newPass
                user.save();
                res.json({
                    message: 'success',
                    user: user,
                    success: true
                });
            }
        });

    });


    app.get('/verify', function (req, res) {
        if (req.query.id) {

            User.findOneAndUpdate({ _id: req.query.id 
            }, 
            { $set: { isVerified: true } },
             function (err, doc) {
                if (err) throw err;
                console.log("email is verified");
                return res.redirect('http://localhost:8100');
            });
        }
        else {
            console.log("email is not verified");
            res.end("<h1>Token Nt Found</h1>");
        }
    });
};
