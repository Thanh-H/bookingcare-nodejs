import db from '../models'
import bcrypt from 'bcryptjs'

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    console.log(check)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok'

                        delete user.password
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password'
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = 'User is not found'
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. please try other Email`

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin
}