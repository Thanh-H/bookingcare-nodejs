import userService from "../services/userService"
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'missing input parameter!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required Parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing required parameters'
        })
    }
    let message = await userService.updateUser(data)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing required parameters'
        })
    }
    let message = await userService.DeleteUser(id)
    return res.status(200).json(message)
}

let handleGetAllCodes = async (req, res) => {
    try {
        let data = await userService.GetAllCodes(req.query.type)
        return res.status(200).json(data)

    } catch (e) {
        console.log('get all code error', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever'
        })
    }


}

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    handleGetAllCodes
}