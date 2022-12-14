import db from "../models";
import emailService from './emailService'
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid'

let buidUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId} `
    return result
}

let postBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date
                || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing prameter'
                })
            }
            else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buidUrlEmail(data.doctorId, token)
                })
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })
                // create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.time,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed!'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let postVerifyBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })

            }
            else {
                let appointmen = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointmen) {
                    appointmen.statusId = 'S2'
                    await appointmen.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment succeed!'
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}

let autoDeleteBookingService = () => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Booking.destroy({
                where: {},
                truncate: true
            })
            resolve({
                errCode: 0,
                errMessage: 'delete succeeds'
            })


        } catch (e) {
            reject(e)

        }
    })
}

module.exports = {
    postBookAppointmentService, postVerifyBookAppointmentService, autoDeleteBookingService
}