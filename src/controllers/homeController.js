
import { json } from 'body-parser';
import db from '../models/index'
import CRUDservice from '../services/CRUDservice'
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: data
        })
    } catch (e) {
        console.log(e)
    }

}
let getCRUD = (req, res) => {
    return res.render('CRUD.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send('post crud from server')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser()
    return res.render('displayCRUD.ejs', { dataTable: data })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        return res.render('editCRUD.ejs', { user: userData })
    }
    else {
        return res.send('User not found!')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDservice.updateUserData(data);
    return res.redirect('/get-crud')
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        await CRUDservice.deleteUserById(userId);
        return res.send('Delete user success')
    }
    else {
        return res.send('User not found!')
    }
}

module.exports = {
    getHomePage,
    getCRUD, postCRUD, displayGetCRUD, getEditCRUD,
    putCRUD, deleteCRUD
} 