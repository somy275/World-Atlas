import { SendOTPInEmail } from "./SendOTP";

export const OtpGenerator = () => {
    const GenerateOTp = Math.floor(1000 + Math.random() * 9000); //Generate 4 digit otp
    SendOTPInEmail(GenerateOTp); // Send otp in email
    return GenerateOTp
}