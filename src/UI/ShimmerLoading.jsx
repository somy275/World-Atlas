
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
//This function is used to show the loader while the data is loading
export const CountryOuterLoader = () => {
    const loading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
        <>
            <div className={`h-auto w-screen  grid grid-cols-auto sm:grid-cols-2 ${window.innerHeight > 750 && window.innerWidth < 1550 ? "lg:grid-cols-2" : "lg:grid-cols-3"} grid-rows-1 place-items-center gap-y-[7rem] `}>
                {
                    loading.map((idx) => {
                        return (
                            <SkeletonTheme key={idx} baseColor='#414247' highlightColor='grey' duration={1.5} >
                                <div className="h-auto w-[17rem] lg:w-[max(27.1vw,37vh)] lg:max-w-[530px] lg:h-[max(34.4vw,48vh)] outline-2 outline-[#343435c1] rounded-[0.3rem] inset-shadow-[7px_7px_10px_-5px_#282829] shadow-[10px_10px_15px_-5px_#282829]">
                                    <div className="h-fit w-full relative">
                                        <Skeleton className='w-[max(17rem,70vw)] min-[450px]:w-[max(18rem,52vw)] min-[450px]:max-w-[280px] md:w-[max(19rem,38vw)] md:max-w-[350px] lg:w-[max(19rem,25vw)] lg:h-[max(17vw,22vh)] lg:max-w-[550px] h-[11rem]  rounded-tl-[0.3rem] rounded-tr-[0.3rem]' />
                                    </div>
                                    <div className="h-fit w-full px-[1rem]  pb-[1.7rem] pt-[1rem]">
                                        <div className=' w-[70%]'>
                                            <Skeleton className='h-[1rem] lg:h-[max(1.523vw,1.5vh)] lg:max-h-[20px] w-auto mt-[2rem] mb-[0.7rem]' />
                                        </div>
                                        <div className='h-auto w-auto flex flex-col gap-[0.2rem] text-[1.2rem] '>
                                            <Skeleton className='h-[0.5rem] w-full' count={3} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        )
                    })
                }
            </div>
        </>
    )
};

//This function is used to show the loader while the data is loading
export const CountryInnerLoader = () => {
    return (
        <>
            <SkeletonTheme baseColor='#414247' highlightColor='grey' duration={1.5}>
                <div className='h-screen w-screen flex flex-col md:flex-row items-center justify-around '>
                    <span className='w-[80%]  min-[450px]:max-w-[440px] md:max-w-[480px] h-auto lg:w-[max(25vw,37vh)] lg:h-auto'>
                        <Skeleton className='h-[max(12rem,20vh)] min-[450px]:h-[max(45vw,26vh)] min-[450px]:max-h-[270px] min-[450px]:w-[max(24vw,21vh)] w-[max(17rem,70vw)] lg:w-[max(20vw,37vh)] lg:h-[max(15vw,22vh)] lg:max-w-[550px]  rounded-[0.3rem]' />
                        <Skeleton className='h-[max(0.7vw,1.5vh)] w-auto mt-[2rem] mb-[0.7rem]' />
                    </span>
                    <span className=' w-[80%]  lg:w-[max(27vw,37vh)] lg:h-auto'>
                        <Skeleton count={6} className='h-[max(0.7vw,1.5vh)] w-fit lg:h-[max(0.7vw,1.5vh)] lg:w-auto my-[0.8rem]' />
                    </span>
                </div>
            </SkeletonTheme>

        </>
    )
}