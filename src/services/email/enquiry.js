/* eslint-disable n/no-deprecated-api */
import nodemailer from 'nodemailer'
const sendenquiryMail = (data, files) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    let mailOptions = {
      from: data.Email,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Blinds & Curtains Enquiry Mail',
      attachments: [
        {
          filename: files[0].originalname,
          content: files[0].buffer
        }
      ],
      html: `
      <ul>
        <li>Name: ${data.Name}</li>
        <li>Email: ${data.Email}</li>
        <li>Mobile Number: ${data.Mobilenumber}</li>
        <li>Address: ${data.Address}</li>
        <li>Country: ${data.Country}</li>
        <li>State: ${data.State}</li>
        <li>City: ${data.City}</li>
        <li>Zipcode: ${data.Zipcode}</li>
        <li>Message: ${data.Message}</li>
      </ul>
    `
    }
    if (files.length > 0) {
      mailOptions = {
        ...mailOptions,
        ...{
          attachments: [
            {
              filename: files[0].originalname,
              content: files[0].buffer
            }
          ]
        }
      }
    }
    const replymailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: data.Email,
      subject: 'Blinds & Curtains Enquiry Mail',
      html: `
      <p>Dear ${data.Name},</p>
      <p>Thank you for your enquiry.</p>

     
    `
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        console.log('Email Sent')
        resolve({ status: 'Email Sent' })
      }
    })
    transporter.sendMail(replymailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        console.log('Email Sent')
        resolve({ status: 'Email Sent' })
      }
    })
  })
}
export default sendenquiryMail
