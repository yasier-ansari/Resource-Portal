import mail from '@sendgrid/mail';
import { NextResponse } from "next/server";
// mail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
    mail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
    const body = await request.json()
    const { userEmail, userName } = body;
    const msg = {
        to: userEmail, // Change to your recipient
        from: 'repo.yasier@gmail.com', // Change to your verified sender
        templateId: process.env.NEXT_PUBLIC_SENDGRID_WELCOME_TEMPLATE,
        dynamicTemplateData: {
            name: userName,
            email: userEmail // Add dynamic template data fields as needed
        },
    }
    mail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

    console.log("email is", userEmail)
    return NextResponse.json({ message: 'Email sent successfully', res: request.body });
}

export async function GET(request) {
    // console.log(request);
    return NextResponse.json({ message: "hello there", req: "asda" })
}