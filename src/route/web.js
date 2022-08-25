import express from "express";
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import doctorController from '../controllers/doctorController'
import patientController from '../controllers/patientController'
import specialtyController from '../controllers/specialtyController'
import clinicController from '../controllers/clinicController'

let router = express.Router();

let initwebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)


    router.post("/api/login", userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-new-user', userController.handleDeleteUser)
    router.get('/api/allcode', userController.handleGetAllCodes)

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/all-doctor', doctorController.getAllDoctor)
    router.post('/api/save-infor-doctor', doctorController.postInforDocdor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)

    router.post('/api/patient-book-appointment', patientController.postBookAppointment)
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment)

    router.post('/api/create-new-specialTy', specialtyController.createSpecialty)
    router.get('/api/get-specialty', specialtyController.getSpecialty)
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialById)

    router.get('/api/get-name-specialty-by-doctorId', doctorController.getNameSpecialtyByDoctorId)


    router.post('/api/create-new-clinic', clinicController.createClinic)
    router.get('/api/get-clinic', clinicController.getClinic)
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById)

    router.delete('/api/auto-delete-booking', patientController.autoDeleteBooking)

    return app.use('/', router)
}

module.exports = initwebRoutes