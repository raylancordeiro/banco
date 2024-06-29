import nodemailer from 'nodemailer'

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendEmail(conta_id, valor, formaPagamentoDescricao) {
    const info = await this.transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "bar@example.com", // list of receivers
        subject: "Comprovante ✔", // Subject line
        html: `
        <h2>Comprovante de pagamento</h2>
        <b>Foi realizada uma transação</b>
        <ul>
            <li>Conta: ${conta_id}</li>
            <li>Valor: ${valor}</li>
            <li>forma de pagamento: ${formaPagamentoDescricao}</li>
        </ul>
        <img src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/>
        `,
    });
    }
}

export default new EmailService;