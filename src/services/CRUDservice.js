import bcrypt from 'bcryptjs'
import db from '../models';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            })
            resolve('create new user success')

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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }

        } catch (e) {
            reject(e)
        }
    })

}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lasttName = data.lastName
                user.address = data.address

                resolve(await user.save());
            }
            else {
                resolve()
            }

        } catch (e) {
            console.log(e)
        }
    })
}

let deleteUserById = (userId) => {
    new Promise(async (resolve, reject) => {
        try {
            if (userId) {
                resolve(await db.User.destroy({
                    where: { id: userId }
                }))
            }
            else resolve();

        } catch (e) {
            reject(e)
        }

    })

}

module.exports = { createNewUser, getAllUser, getUserInfoById, updateUserData, deleteUserById }