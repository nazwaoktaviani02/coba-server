import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "nazwamohamad1002@gmail.com",
        pass: "bpxs xjuv qbxh xxnn",
      },
    });

    await transporter.sendMail({
      from: "KADA App <nazwamohamad1002@gmail.com>",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email berhasil dikirim ke:", email);
  } catch (error) {
    console.log("Email gagal dikirim:", error);
  }
};

export default sendEmail;