import clinicService from '../services/clinicService'


let createClinic = async (req, res) => {
    try {
        let message = await clinicService.createClinicService(req.body)
        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}

let getClinic = async (req, res) => {
    try {
        let message = await clinicService.getClinicService()
        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let message = await clinicService.getDetailClinicByIdSevice(req.query.id, req.query.location)
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
    createClinic, getClinic, getDetailClinicById
}