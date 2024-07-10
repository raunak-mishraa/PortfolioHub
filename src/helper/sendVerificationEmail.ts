import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<{ success: boolean; message: string; }> {
    try {
        const result = await resend.emails.send({
            from: 'Verification <noreply@raunakmishra.codes>',
            to: email,
            subject: "Verification Code",
            react: VerificationEmail({username, otp:verifyCode})
        });
        console.log("Email sent successfully", result);
        return {
            success: true,
            message: "Verification email sent successfully"
        };
    } catch (error) {
        console.error("Error sending verification email", error);
        return {
            success: false,
            message: "Error sending verification email"
        };
    }
}
