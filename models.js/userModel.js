let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let admin = new Schema(
    {
        userName: { type: String ,unique:true},
        password: { type: String, },
    },
    { timestamps: true, }
);
module.exports = mongoose.model("user", user, "user");