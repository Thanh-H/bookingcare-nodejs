import db from "../models";


let createSpecialtyService = (data) => {
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
                await db.Specialty.create({
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

let getSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Specialty not found'
                })
            }
            else {
                if (data && data.length > 0) {
                    data.map(item => {
                        item.imageBase64 = new Buffer(item.image, 'base64').toString('binary')
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

let getDetailSpecialByIdSevice = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorSpecialty = []
                    if (location === 'ALL') {

                        doctorSpecialty = await db.Doctor_infor.findAll({
                            where: { specialtyId: id },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        doctorSpecialty = await db.Doctor_infor.findAll({
                            where: {
                                specialtyId: id,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty
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
    createSpecialtyService, getSpecialtyService, getDetailSpecialByIdSevice
}