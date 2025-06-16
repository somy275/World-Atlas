import emailjs from '@emailjs/browser';
export const SendOTPInEmail = (GenerateOTP) => {
    var templateParams = {
        username: localStorage.getItem('UserName'),
        UserEmail: localStorage.getItem('UserEmail'),
        OTP: GenerateOTP,
    };
    console.log(GenerateOTP);

    emailjs.send('service_a3fpo58', 'template_h2i51vq', templateParams, {
        publicKey: "F6TmcE9h2UrpAeXNk"
    }
    ).then(
        (response) => {
            console.log('SUCCESS!', response.status);
        },
        (error) => {
            console.log('FAILED...', error);
        },
    );
}