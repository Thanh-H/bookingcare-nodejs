require('dotenv').config()
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (datasend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP_NAME, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Hà Lê Thanh 👻" <halethanh18@gmail.com>', // sender address
        to: datasend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(datasend), // html body
    });
}

let getBodyHTMLEmail = (datasend) => {
    let result = ''
    if (datasend.language === 'vi') {
        result =
            `
            <h3> xin chào ${datasend.patientName}  </h3> 
            <p> Bạn nhận được email này vì đã đặt lịch khám bệnh online trên ThanhCare </p>
            <p> Thông tin đặt lịch khám bệnh: </p>
            <div> <b> Thời gian ${datasend.time} </b> </div>
            <div><b> Bác sĩ: ${datasend.doctorName} </b> </div>
            <p> Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận 
            và hoàn tất thủ tục đặt lịch khám bệnh </p>
            </div> 
            <div>
            <a href=${datasend.redirectLink} target="_blank" > Click here </a>
            </div>
            <div> Xin chân thành cảm ơn! </div>
        `
    }
    if (datasend.language === 'en') {
        result =
            `
        <h3> Dear ${datasend.patientName}  </h3> 
        <p> You received this email because you booked an online medial appointmen in ThanhCare </p>
        <p> Information to shedule an appointment:: </p>
        <div> <b> Time ${datasend.time} </b> </div>
        <div><b> Doctor: ${datasend.doctorName} </b> </div>
        <p> 
        If the above information is true, please click on the link below to confirm and
         complete the medical appointment booking procedure.</p>
        </div> 
        <div>
        <a href=${datasend.redirectLink} target="_blank" > Click here </a>
        </div>
        <div> Sincarely thank! </div>
        `
    }
    return result
}

module.exports = {
    sendSimpleEmail
}