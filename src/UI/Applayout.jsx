import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import { useState } from "react";
import offline from "../assets/offline.png"
export const Applayout = () => {
  const [Value, setValue] = useState(true);
  const [onlineOffline, setonlineOffline] = useState(false)
  window.onoffline = () => {
    setonlineOffline(true);  //When the user is offline then setonlineOffline state to true

  }
  window.ononline = () => {
    setonlineOffline(false); //When the user is online then setonlineOffline state to false

  }

  if (onlineOffline || !window.navigator.onLine) { //When the user is offline then this condition is executed and shows the offline page

    return (
      <div className=" h-screen w-screen flex items-center justify-center flex-col">
        <img className='h-auto min-h-fit w-full min-[450px]:w-[max(60vh,75%)] min-[450px]:h-auto md:w-[max(60vh,70%)] md:min-h-[79vw] lg:w-[max(37vw,60vh)] lg:h-[60%] lg:min-h-fit object-top object-cover relative' src={offline}></img>
        <span className="text-center font-[600] text-[#92E3A9] text-[max(clamp(0.8rem,0.8308rem+0.8734vw,1.25rem),2vh)] md:text-[max(clamp(1.25rem,0.125rem+2.3438vw,1.625rem),2.3vh)] lg:text-[max(clamp(1.1375rem,0.5441rem+0.6548vw,1.4125rem),2.3vh)]">
          <h5>You are offline!</h5>
          <h5>Please connect to the internet</h5>
        </span>
      </div>
    )
  }

  return (
    <main className={`w-screen h-fit  text-[black]  ${Value ? "relative" : "fixed"}`}>

      <Header data={() => setValue(!Value)} navValue={Value} />
      <Outlet />
      <Footer />
    </main>
  )
}
