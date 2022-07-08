const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const {password, username} = req.body
        console.log(req.body)
        for (let i=0; i < users.length; i++){
          const existing = bcrypt.compareSync(password, users[i].passwordHash)

          console.log(existing)
          if(existing) {
            users[i].password.push(username)
            let passwordToReturn = {...users[i]}
            delete passwordToReturn.passwordHash

            res.status(200).send(passwordToReturn)
            return
          }
        }
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password,salt)
        console.log(password, passwordHash)

      let userObj = {
        passwordHash,
        users: [users]
      }
      users.push(userObj)
      let userToReturn = {...userObj}
      delete userToReturn.passwordHash
      res.status(200).send(userToReturn)
}

}