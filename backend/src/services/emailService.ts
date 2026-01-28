import nodemailer from 'nodemailer';

class EmailService {
    private transporter: nodemailer.Transporter | null = null;

    private async getTransporter() {
        if (this.transporter) return this.transporter;

        const isDev = process.env.NODE_ENV === 'development';
        const hasSmtpConfig = process.env.SMTP_USER && process.env.SMTP_HOST;

        let config: any;

        if (hasSmtpConfig) {
            config = {
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            };
            console.log(`[EmailService] Using SMTP configuration: ${process.env.SMTP_HOST}`);
        } else if (isDev) {
            console.log('[EmailService] No SMTP config found. Creating Ethereal test account...');
            const ethAccount = await nodemailer.createTestAccount();
            config = {
                host: ethAccount.smtp.host,
                port: ethAccount.smtp.port,
                secure: ethAccount.smtp.secure,
                auth: {
                    user: ethAccount.user,
                    pass: ethAccount.pass,
                },
            };
            console.log('--- Ethereal Test Account Created ---');
            console.log(`User: ${config.auth.user}`);
            console.log(`Pass: ${config.auth.pass}`);
            console.log('------------------------------------');
        } else {
            throw new Error('SMTP configuration missing in production environment');
        }

        this.transporter = nodemailer.createTransport(config);

        // Verify connection configuration
        try {
            await this.transporter.verify();
            console.log('[EmailService] Transporter verified and ready');
        } catch (error) {
            console.error('[EmailService] Transporter verification failed:', error);
            this.transporter = null;
            throw error;
        }

        return this.transporter;
    }

    async sendRecoveryEmail(email: string, name: string, token: string) {
        const transporter = await this.getTransporter();
        const resetUrl = `http://localhost:4321/reset-password?token=${token}`;

        const mailOptions = {
            from: '"MIRAI Platform" <noreply@mirai-projects.com>',
            to: email,
            subject: 'Recuperar Contraseña | MIRAI',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background-color: #f8fafc; padding: 40px; border-radius: 20px;">
                    <h1 style="color: #4f46e5; margin-bottom: 24px; font-weight: 800; font-size: 24px;">Hola, ${name}</h1>
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                        Has solicitado restablecer tu contraseña en la plataforma MIRAI. 
                        Haz clic en el siguiente botón para continuar con el proceso:
                    </p>
                    <a href="${resetUrl}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);">
                        Restablecer Contraseña
                    </a>
                    <p style="font-size: 14px; color: #64748b; margin-top: 40px; border-top: 1px solid #e2e8f0; pt: 20px;">
                        Este enlace expirará en 30 minutos por motivos de seguridad.<br>
                        Si no solicitaste este cambio, puedes ignorar este correo.
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);

        if (process.env.NODE_ENV === 'development' && !process.env.SMTP_USER) {
            console.log(`Email sent: ${nodemailer.getTestMessageUrl(info)}`);
        }

        return info;
    }
}

export const emailService = new EmailService();
