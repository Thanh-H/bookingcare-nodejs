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
        console.log(error)
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

let bulkCreateSchedule = async (req, res) => {
    try {
        let message = await doctorService.bulkCreateScheduleService(req.body)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.satatus(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}
let getScheduleByDate = async (req, res) => {
    try {
        let message = await doctorService.getScheduleByDateService(req.query.doctorId, req.query.date)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from sever"
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let message = await doctorService.getExtraInforDoctorByIdService(req.query.doctorId)
        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from sever"
        })

    }
}
let getProfileDoctorById = async (req, res) => {
    try {
        let message = await doctorService.getProfileDoctorByIdService(req.query.doctorId)
        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from sever"
        })

    }
}

let getNameSpecialtyByDoctorId = async (req, res) => {
    try {
        let message = await doctorService.getNameSpecialtyByDoctorIdService(req.query.doctorId)
        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from sever"
        })

    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDocdor: postInforDocdor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getNameSpecialtyByDoctorId
}