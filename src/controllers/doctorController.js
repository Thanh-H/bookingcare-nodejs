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

module.exports = {
    getTopDoctorHome: getTopDoctorHome
}