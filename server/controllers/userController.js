const User = require('../models/User.js')


exports.createUser = async function (req, res) {
    try {
        const example = await User.create(req.body);
        res.json({success: true, message: "success", user: example});
    } catch (err) {
        res.json({success: false, code: err.code});
    }
}

exports.getAllUsers = async function (req, res) {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(404).json("Error: " + err));
}

exports.getUserByEmail = async function (req, res) {

    User.find({"email": req.params.email}, function(err, data) {
       if(Object.keys(data).length === 0){
           res.status(404).json("Error: " + err);
       }else{
           res.json(data)
       }
    });
}

exports.deleteUserByEmail = async function (req, res) {
    var tempUser = await User.find({email: req.params.email})
    if (tempUser === null) res.status(404).json({success: false, message: "User Not Found"});

    User.findOneAndDelete({ email: req.params.email }, function (err) {
        if(err) res.status(404).json("Error: " + err)
        else
            res.json({success: true, message: "success", user: tempUser});
    });
}