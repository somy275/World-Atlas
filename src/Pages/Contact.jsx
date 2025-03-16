import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { notifyOnError, notifyOnSuccess } from './NotifyOnForm';
export const Contact = () => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    //getting button reference using useRef hook
    const button = useRef();
    const formAnimated = "outline-1 outline-white focus:outline-[#ffd380] focus:outline-2 rounded-2xl  py-1.5 pl-4.5 text-[max(clamp(1rem,0.8308rem+0.8734vw,1.25rem),2.2vh)] md:text-[max(clamp(1.25rem,0.125rem+2.3438vw,1.625rem),2.3vh)] lg:text-[max(clamp(0.9375rem,0.5441rem+0.6148vw,1.3125rem),2.3vh)]";
    //getting Form reference using useRef hook
    const form = useRef();
    //Send message when form is submited   
    const sendEmail = () => {
        button.current.innerHTML = "Sending...";
        button.current.disabled = true;
        emailjs
            .sendForm('service_ee96nwn', 'template_bekk9ve', form.current, {
                publicKey: 'zU5MC4AjhJkakciY3',
            })
            .then(
                () => {
                    button.current.innerHTML = "Send";
                    button.current.disabled = false;
                    console.log('SUCCESS!');
                    form.current.reset()
                    notifyOnSuccess("Message has been sent Successfully");

                },
                (error) => {
                    notifyOnError("Message has been sent Error:" + error.message)
                },
            );

    }
    return (
        <section className="h-auto w-screen flex items-center justify-around py-[8rem]">
            <form ref={form} onSubmit={handleSubmit(sendEmail)} encType="multipart/form-data" className="w-[70%] lg:w-[max(37vh,42vw)] h-fit flex flex-col  gap-9 text-white">
                <h3 className="text-[white] text-center pb-[5%] text-[max(1.7rem,6.6vw)] min-[450px]:text-[max(1.8rem,4.6vw)] md:text-[max(2.3rem,3.6vw)] lg:text-[max(clamp(2.0875rem,0.5727rem+1.8418vw,2.75rem),4vh)] font-bold">Contact Us</h3>
                <input name='name' className={formAnimated} type="text" autoFocus placeholder="Enter your name" autoComplete="on" spellCheck="true"></input>
                <input name='email' className={formAnimated} type="email" placeholder="Enter your email"   {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}></input>
                {errors.email && errors.email.type === "required" && (
                    notifyOnError("Email is required")
                )}
                {errors.email && errors.email.type === "pattern" && (
                    notifyOnError("Email is not valid")
                )}
                <input name='from_phone' className={formAnimated} type="tel" placeholder="Enter your mobile no." ></input>
                <textarea className={formAnimated} name="message" cols="30" rows="10" placeholder="Enter your message" {...register("message", { required: true })}></textarea>
                {errors.message && errors.message.type === "required" && (
                    notifyOnError("Message is required")
                )}
                <button ref={button} type="submit" className="bg-[#ff8531] rounded-2xl py-2 px-[3rem] text-white font-bold w-fit mx-auto cursor-pointer active:scale-[0.85] active:text-black active:transition-transform active:duration-[200ms] text-[max(clamp(1rem,0.8308rem+0.8734vw,1.25rem),2.2vh)] md:text-[max(clamp(1.25rem,0.125rem+2.3438vw,1.625rem),2.3vh)] lg:text-[max(clamp(1.0375rem,0.5441rem+0.6148vw,1.3125rem),2.3vh)]">
                    Send</button>
                <ToastContainer
                />
            </form>

        </section>
    )
}
