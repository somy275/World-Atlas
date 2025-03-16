import { SendOTPInEmail } from "./SendOTP";

export const OtpGenerator = () => {
    const GenerateOTp = Math.floor(1000 + Math.random() * 9000);
    SendOTPInEmail(GenerateOTp);
    return GenerateOTp
}