import doctorService from '../services/doctorService'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let message = await doctorService.getTopDoctorHomeService(+limit);
        return res.status(200).json(message)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })

    }
}
let getAllDoctor = async (req, res) => {
    try {
        let message = await doctorService.getAllDoctorService()
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}

let postInforDocdor = async (req, res) => {
    try {
        let message = await doctorService.postInforDoctorService(req.body)
        return res.status(200).json(message)

    } catch (error) {
        console(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })

    }
}
let getDetailDoctorById = async (req, res) => {
    try {
        let message = await doctorService.getDetailDoctorByIdService(req.query.id)
        return res.status(200).json(message)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDocdor: postInforDocdor,
    getDetailDoctorById: getDetailDoctorById
}