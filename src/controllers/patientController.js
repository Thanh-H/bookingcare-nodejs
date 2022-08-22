import patientService from '../services/patientService'

let postBookAppointment = async (req, res) => {
    try {
        let message = await patientService.postBookAppointmentService(req.body)
        return res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }

}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let message = await patientService.postVerifyBookAppointmentService(req.body)
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
    postBookAppointment, postVerifyBookAppointment
}