import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,  // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
})

export async function POST(request: Request) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error('Missing email credentials');
    return NextResponse.json({ success: false, error: 'Missing email configuration' }, { status: 500 });
  }

  try {
    const data = await request.json()
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'YOU HAVE MAIL!',
      html: `
        <h1>She responded!</h1>
        <p>Date: ${new Date(data.date).toLocaleDateString()}</p>
        <p>Time: ${data.time}</p>
        <p>Food: ${data.food.join(', ')}</p>
        <p>Activity: ${data.activity}</p>
        <p>Excitement: ${data.excitement}/100</p>
      `,
      attachments: [{
        filename: `date-response-${new Date().toISOString()}.json`,
        content: JSON.stringify(data, null, 2),
        contentType: 'application/json'
      }]
    })
    
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Failed to send email:', error)
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 })
  }
}