import db from "../models";


let createClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })

            }
            else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Clinic not found'
                })
            }
            else {
                if (data && data.length > 0) {
                    data.map(item => {
                        item.imageBase64 = Buffer.from(item.image, 'base64').toString('binary')
                        return item
                    })
                    resolve({
                        errCode: 0,
                        data: data
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getDetailClinicByIdSevice = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: id },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorClinic = []
                    if (location === 'ALL') {

                        doctorClinic = await db.Doctor_infor.findAll({
                            where: { ClinicId: id },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        doctorClinic = await db.Doctor_infor.findAll({
                            where: {
                                ClinicId: id,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    data.doctorClinic = doctorClinic
                } else {
                    data = {}
                }
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createClinicService, getClinicService, getDetailClinicByIdSevice
}