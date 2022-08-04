import express from 'express'
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
module.exports = { getHomePage, getCRUD, postCRUD } 