import specialtyService from '../services/specialtyService'


let createSpecialty = async (req, res) => {
    try {
        let message = await specialtyService.createSpecialtyService(req.body)
        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}

let getSpecialty = async (req, res) => {
    try {
        let message = await specialtyService.getSpecialtyService()
        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}

let getDetailSpecialById = async (req, res) => {
    try {
        let message = await specialtyService.getDetailSpecialByIdSevice(req.query.id, req.query.location)
        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}

module.exports = {
    createSpecialty, getSpecialty, getDetailSpecialById
}