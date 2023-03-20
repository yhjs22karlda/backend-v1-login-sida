import express from "express"

const app = express()
const PORT = 3001
app.use(express.json())

const users = []
// const usernameTest = /^\w{5,20}$/
// const emailTest = /.+@.+\..+/
// const passwordTest = /.{6,}/

app.post("/api/login", (req, res) => {
    let sucsess = false
    const user = users.find(user => user.username === req.body.username)
    sucsess = user?.password === req.body.password

    res.json({sucsess})
})

app.post("/api/signup", (req, res) => {
    let sucsess = false
    let usernameExists = true
    let emailExists = true
    if(users.every(user => user.username !== req.body.username)) {
        usernameExists = false
    }
    if(users.every(user => user.email !== req.body.email)) {
        emailExists = false
    }
    if(usernameExists === false && emailExists === false) {
        users.push({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        sucsess = true
    }
    console.log(users)
    res.json({sucsess, usernameExists, emailExists})
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})