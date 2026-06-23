import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_EMAIL;

    if (!smtpHost || !smtpUser || !smtpPass || !toEmail) {
      console.log("Contact (mode démo):", { name, email, message });
      return Response.json(
        { message: "Message reçu (mode démo). Pour l'envoi réel, configurez SMTP." },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 587,
      secure: Number(smtpPort) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"BookStore Contact" <${smtpUser}>`,
      replyTo: email,
      to: toEmail,
      subject: `Nouveau message de ${name} via BookStore`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return Response.json({ message: "Message envoyé avec succès !" });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    return Response.json(
      { message: "Message reçu (mode démo). L'envoi email a échoué." },
      { status: 200 }
    );
  }
}