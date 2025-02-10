import { TypeAnimation } from "react-type-animation";
import wave from "@/assets/wave_W.svg"


export function BasePage({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* <Navbar /> */}
            <div className=" relative flex items-center justify-center h-screen px-10 ">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% opacity-60 blur-lg filter-none"></div>
                <div className="absolute bottom-0 left-0 w-full">
                    <img src={wave} alt="Wave" className="w-full" />
                </div>
                <div className=" relative flex lg:flex-row w-full justify-evenly items-center ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold mb-6">Welcome to Aimzy!</h1>
                        <TypeAnimation
                            preRenderFirstString={true}
                            sequence={[
                            "We will help you set objectives.",
                            1000,
                            "We will help you build routines.",
                            1000,
                            "We will help you track progress.",
                            1000,
                            "We will help you stay motivated.",
                            1000,
                            () => {
                                console.log("Sequence completed");
                            },
                            ]}
                            speed={50}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            style={{
                            fontSize: "20px",
                            display: "inline-block",
                            fontFamily: "sans-serif",
                            }}
                        />
                    </div>
                    <div className="rounded-lg shadow-lg w-full max-w-sm">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
