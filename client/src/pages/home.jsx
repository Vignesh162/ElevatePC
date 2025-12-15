import { useState, useContext, useEffect} from "react";
import PcCard from "../components/pcCard";
import BenefitCard from "../components/benefitsCard";
import FAQAccordion from "../components/faqAccordion";
import Footer from "../components/footer";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

export default function Home() {
    const [activeFAQindex, setActiveFAQindex] = useState(null);
    const {user} = useContext(AuthContext);
    const benefits = [
        {
        title: "Tailored Performance",
        description: "Every build is customized to your needs—whether it's gaming, content creation, or professional workloads—so you get the exact power and speed you need.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
        },
        {
        title: "Customization & Upgrades",
        description: "No more second-guessing. Our builder ensures every component works seamlessly together, saving you from costly mistakes.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )
        },
        {
        title: "Future-Ready Upgrades",
        description: "We design with tomorrow in mind, giving you upgrade-friendly systems that stay powerful, relevant, and reliable for years.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        )
        }
    ];
    const location = useLocation();
    useEffect(() => {
        if (location.state?.scrollTo) {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        }
    }, [location]);
    return(
        <>
            {/* Landing Section */}
            <div className="flex flex-row justify-center bg-black w-full h-[90vh] p-5">
                <div className="flex flex-col w-[100vw] md:w-[50vw] text-white items-center text-left">
                    <h1 className="text-7xl font-bold max-w-[400px] mt-20">Build Your Own PC</h1>
                    <p className=" max-w-[400px] mt-6 font-semibold opacity-80">​Build your dream rig—without the guesswork. Mix and match the latest CPUs, GPUs, and storage, and our compatibility checker keeps everything snap-together simple.</p>
                    <Link to={user?`/PCBuilderPage`:`/LoginPage`}><button className="w-[150px] h-[50px] font-semibold bg-black rounded-2xl mt-10 border-2 border-amber-50 hover:bg-blue-500 hover:text-black">Get Started</button></Link>
                </div>
                <div
                className="hidden md:flex h-[80vh] w-[50vw] rounded-2xl bg-[url(/images/elevatePC-home-background.jpg)] bg-cover bg-center">
                </div>
            </div>

            {/* Prebuilt PC Section */}
            <div className="w-full h-[300vh] md:h-[90vh] p-5 bg-black">
                <h2 className="text-5xl font-bold mb-5 ml-5 text-center text-white">Pre-Built PCs</h2>
                {/* Pc card container */}
                <div className=" flex flex-col md:flex-row w-full justify-between align-middle">
                    <PcCard title ={"Compact PC"} imgURL={"/images/compact pc.avif"}></PcCard>
                    <PcCard title ={"Workstation PC"} imgURL={"/images/workstation PC.avif"}></PcCard>
                    <PcCard title ={"Gaming PC"} imgURL={"/images/compactPCIcon.png"}></PcCard>
                </div>
            </div>

            {/* Hero Section */}
             <section className="w-[100%] mx-auto min-h-[100vh]  bg-black">
                <div className="grid md:grid-cols-2 min-h-[100vh]">
                    
                    {/* Left Column */}
                    <div className="flex flex-col justify-center rounded-2xl  bg-[url(/images/working-on-pc-img.png)] bg-cover bg-center m-5">

                    </div>

                    {/* Right Column */}
                    <div className="flex items-center justify-center rounded-2xl bg-[url(/images/pc-case-bg-img.png)] bg-cover bg-center m-5">
                   
                    </div>

                </div>
                <div id ="about" className="scroll-mt-[10vh] flex flex-col min-h-[60vh]  text-white items-center">
                    <h2 className="max-w-[70vw] text-5xl  font-semibold text-center mt-5 ">Our Story</h2>
                    <p className="max-w-[70vw] text-lg font-medium mt-5 ">At ElevatePC, we believe a computer should be more than just a machine—it should be a perfect fit for your goals, your passions, and your lifestyle.<br/>
                        We started with a simple mission: to make custom PC building accessible, reliable, and tailored to everyone, from gamers chasing high frame rates to professionals pushing creative limits.<br/> 
                        No more confusion, no more mismatched parts—just seamless builds backed by expertise. Our team combines years of hardware knowledge with cutting-edge tools to ensure every system we design is powerful, future-ready, and crafted with care.<br/>
                        Whether you’re upgrading your first rig or building a powerhouse workstation, we’re here to help you elevate your PC experience.
                    </p>
                    <button className="h-[40px] w-[200px] mt-5 mb-3 rounded-3xl bg-white text-black hover:bg-blue-600">
                        Read More!
                    </button>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="min-h-[90vh] bg-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
                    {/* Left Column - Heading and Description */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white ml-5 mb-6">
                            Benefits
                        </h1>
                        
                        <div className="mb-8 p-6 bg-black rounded-xl shadow-sm border border-blue-100">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Differentiator</h2>
                            <p className="text-white text-lg leading-relaxed">
                            At ElevatePC, we don't just build computers—we build systems designed around you. Every component is 
                            handpicked for peak performance, tested for seamless compatibility, and structured for easy future upgrades. 
                            Whether you're gaming, creating, or working professionally, our custom PCs deliver reliability, power, 
                            and long-term value you can count on.
                            </p>
                        </div>
                        </div>
                        
                        {/* <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-3">Why Choose ElevatePC?</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Handpicked components for optimal performance
                            </li>
                            <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Rigorous compatibility testing
                            </li>
                            <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Future-proof upgrade paths
                            </li>
                        </ul>
                        </div> */}
                    </div>
                    
                    {/* Right Column - Benefit Cards */}
                    <div className="grid grid-cols-1 gap-8">
                        {benefits.map((benefit, index) => (
                        <BenefitCard 
                            key={index}
                            title={benefit.title}
                            description={benefit.description}
                            icon={benefit.icon}
                            index={index}
                        />
                        ))}
                    </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section  className="scroll-mt-[10vh] w-[100%] mx-auto min-h-[90vh] bg-black ">
                <FAQAccordion></FAQAccordion>
            </section>
            <div id="contact"> 
                <Footer></Footer>
            </div>

        </>
    )
}