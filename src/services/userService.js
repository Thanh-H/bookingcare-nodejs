import db from '../models'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compare(password, user.password)

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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users
            if (userId === 'all') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'all') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            resolve(users)


        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, please try another email!'
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'The users is not exist'
                })
            }
            user.email = data.email
            user.firstName = data.firstName
            user.lastName = data.lastName
            user.address = data.address
            user.phonenumber = data.phonenumber
            user.gender = data.gender
            user.roleId = data.roleId
            await user.save()
            console.log(">>>>>>>>>>", user)
            resolve({
                errCode: 0,
                errMessage: 'update succeeds'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let DeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let foundUser = await db.User.findOne({
                where: { id: id }
            })
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: 'The users is not exist'
                })
            }
            await db.User.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                errMessage: 'delete succeeds'
            })


        } catch (e) {
            reject(e)

        }
    })
}

let GetAllCodes = (type) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!type) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.Allcode.findAll({
                    where: { type: type }
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }


        } catch (e) {
            reject(e)
        }



    })
}

module.exports = {
    handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser,
    updateUser,
    DeleteUser,
    GetAllCodes
}