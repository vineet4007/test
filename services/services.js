const mongoose = require('mongoose')
const db = require('../dbConnection/dao')
const generateToken = require('../middlewares/jwt')


const Login = async (req, res) => {
    try {
        let { username, password } = req.body
        let findUser = await db.user.findOne({ username: username })
        console.log(findUser)
        if (!findUser) {
            return res.status(200).send({ status: 1, message: "User Does not exist" })
        }
        if (password !== findUser.password) {
            return res.status(200).send({ status: 1, message: "Password is Incorrect" })
        }
        let authToken = await generateToken.authToken({ _id: findUser._id.toString(), });
        let data = {
            name: findUser.username,
            authToken: authToken
        }
        return res.status(200).send({ status: 1, message: "Valid User", data: data })
    } catch (error) {
        console.log("Err", error)
        res.status(500).send({ status: 0, message: "Something went wrong " })
    }
}

const Signup = async (req, res) => {
    try {
        console.log(req.body)
        let { username, password } = req.body
        let findUser = await db.user.findOne({ username: username })
        if (findUser) {
            return res.status(200).send({ status: 1, message: "User Already Exist Please Choose different Name", data: [] })
        }
        let data = {
            username: username,
            password: password
        }
        let createUser = await db.user.create(data)
        return res.status(201).send({ status: 1, message: "User Created Successfully", data: [] })
    } catch (error) {
        console.log("Sign up error", error)
        return res.status(500).send({ status: 0, message: "Something went wrong", data: [] })
    }
}

let AllProducts = async (req, res) => {
    try {
        // let category = req.query.category 
        const url = 'https://dummyjson.com/products';
        const response = await fetch(url);

        const jsonResponse = await response.json();
        let data = [...jsonResponse.products]

        let category = req.query.category
        if (!category) {
            return res.status(200).send({ status: 1, message: "data", payload: jsonResponse })
        }
        let datafiltered = data.filter(function (item) {
            return item.category == category;
        });

        return res.send({ status: 1, message: "Data Fetched Successfully", data: datafiltered })
    } catch (err) {
        console.log("error is coming", err)
    }
}

module.exports = {
    allProducts: AllProducts,
    Login: Login,
    signup: Signup
}