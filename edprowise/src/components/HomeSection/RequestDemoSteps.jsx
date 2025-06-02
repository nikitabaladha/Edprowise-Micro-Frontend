
import React, { useEffect, useState, useRef } from "react";
// ... other imports remain same
import { LiaWpforms } from "react-icons/lia";
import { IoMdTimer } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import { RiPresentationLine } from "react-icons/ri";
import { FcAssistant } from "react-icons/fc";
import { MdStart } from "react-icons/md";
import { Link } from "react-router-dom";

const RequestDemoSteps = () => {
    const [isMobile, setIsMobile] = useState(false);
    const stepRefs = useRef([]);
    const graphContainerRef = useRef();

    const steps = [
        { title: "Fill Out the Demo Request Form", icons: <LiaWpforms />, color: "#f2be00", text: "Click the 'Request a Demo' button and provide basic details such as your name, school name, contact information, and the services you’re interested in", x: 0, y: 0 },
        { title: "Choose a Convenient Time", icons: <IoMdTimer />, color: "#15a382", text: "Select your preferred date and time for the demo, and our team will do their best to accommodate your schedule.", x: 20, y: 50 },
        { title: "Receive a Confirmation", icons: <GiConfirmed />, color: "#443fe0", text: "Once you submit the request, you’ll receive a confirmation email with the demo details. Our team will also reach out to confirm the appointment.", x: 40, y: 30 },
        { title: "Join the Live Demo Session", icons: <RiPresentationLine />, color: "#fa416c", text: "On the scheduled date, join our expert-led session via Zoom or Google Meet. We’ll walk you through our solutions and answer any questions.", x: 60, y: 60 },
        { title: "Get Personalized Assistance", icons: <FcAssistant />, color: "#0568fc", text: "After the demo, our team will assist you in implementing the best solutions for your school’s needs.", x: 80, y: 45 },
        { title: "Book Demo Now", icons: <MdStart />, color: "#0e759e", x: 100, y: 85 },
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const modifiedSteps = isMobile? steps.map((step, index) => ({
            ...step,
            x: 95,
            y: [100, 80, 60, 40, 20, 0][index],
        }))
        : steps;

    // ... existing state variables
    const [progress, setProgress] = useState(0);
    const [rocketPosition, setRocketPosition] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);
    const [isRocketVisible, setIsRocketVisible] = useState(true);

    const getRotationAngle = (index) => {
        if (isMobile) return 134;
        if (index === 1) return 75;
        if (index === 3) return 72;
        return 0;
    };

    useEffect(() => {
        if (isMobile) {
            const observer = new IntersectionObserver(
                (entries) => {
                    let mostVisibleEntry = null;
                    let maxRatio = 0;

                    entries.forEach((entry) => {
                        if (entry.intersectionRatio > maxRatio) {
                            maxRatio = entry.intersectionRatio;
                            mostVisibleEntry = entry;
                        }
                    });

                    if (mostVisibleEntry) {
                        const index = stepRefs.current.findIndex(
                            (ref) => ref === mostVisibleEntry.target
                        );
                        if (index !== -1) {
                            setProgress(index);
                            setRocketPosition(index);
                            setRotation(getRotationAngle(index));
                            setIsRocketVisible(true);
                        }
                    }
                },
                { 
                    root: graphContainerRef.current,
                    rootMargin: '-25% 0px', // Focus on middle 50% of container
                    threshold: 0.5
                }
            );

            stepRefs.current.forEach((ref) => ref && observer.observe(ref));
            return () => observer.disconnect();
        }else {
            // Original interval-based animation
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const nextStep = prev + 1;

                    if (nextStep < steps.length) {
                        setTimeout(() => {
                            setRocketPosition(nextStep);
                            setRotation(getRotationAngle(nextStep));
                            setIsRocketVisible(true);
                        }, 1500);
                        return nextStep;
                    } else {
                        setIsRocketVisible(false);
                        setTimeout(() => {
                            setProgress(0);
                            setRocketPosition(0);
                            setRotation(getRotationAngle(0));
                            setCycleCount((prevCycle) => prevCycle + 1);
                            setIsRocketVisible(true);
                        }, 2000);
                        return 0;
                    }
                });
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [isMobile, cycleCount]);

    return (
        <section className="wpo-blog-section section-padding-request-steps" id="blog">
            <div className="container">
                <div className="wpo-section-title-s2 pb-1 mb-0">

                    <h2>Take Next Steps</h2>
                </div>
                <div className="graph-container" >
                    <svg className="graph-lines" xmlns="http://www.w3.org/2000/svg">
                        {modifiedSteps.map((step, index) => {
                            if (index === 0) return null;
                            const prevStep = modifiedSteps[index - 1];
                            const isActive = index <= progress;
                            return (
                                <line
                                key={index}
                                    x1={`${prevStep.x}%`}
                                    y1={`${100 - prevStep.y}%`}
                                    x2={`${step.x}%`}
                                    y2={`${100 - step.y}%`}
                                    // ... existing line attributes
                                    stroke={isActive ? "#e8533c" : ""}
                                    strokeWidth="6"
                                    strokeDasharray="500"
                                    strokeDashoffset={isActive ? "0" : "500"}
                                    style={{ transition: "stroke-dashoffset 3s ease" }}
                                />
                            );
                        })}
                    </svg>

                    {/* Rocket remains same */}
                    {progress < modifiedSteps.length && (
                        <div
                            className="rocket"
                            style={{
                                left: `${modifiedSteps[progress].x}%`,
                                bottom: `${modifiedSteps[progress].y}%`,
                                transform: `translate(-50%, 50%) rotate(${rotation}deg)`,
                            }}
                        >
                            {isRocketVisible && "🚀"}
                        </div>
                    )}

                    {modifiedSteps.map((step, index) => (
                        <div
                            key={index}
                            className="graph-point"
                            style={{ left: `${step.x}%`, bottom: `${step.y}%` }}
                            ref={(el) => (stepRefs.current[index] = el)}
                        >
                            {/* ... existing point rendering */}
                            <div className="point"></div>
                            <div className="d-flex point-label" 
                                style={{ background: index <= rocketPosition ? step.color : "#ffffff", padding: "10px", borderRadius: "10px" }}
                            >

                                <div
                                    className="request-demo-steps-icon"
                                    style={{
                                        color: index <= rocketPosition ? "#ffffff" : "#333"
                                    }}
                                >
                                    {step.icons}
                                </div>
                                <div className="d-flex flex-column">
                                    <div
                                        className="request-semo-title"
                                        style={{
                                            color: index <= rocketPosition ? "#ffffff" : "#333"
                                        }}
                                    >
                                        {step.title}
                                    </div>
                                    <div
                                        className="text-black"
                                        style={{
                                            color: index <= rocketPosition ? "#333" : "#666"
                                        }}
                                    >
                                        {step.text}
                                    </div>
                                </div>
                            </div>
                            {(index === 4) && (!isMobile) &&(
                                <Link to={"/request-demo"}>
                                    <button className="request-demo-button">Request For Demo</button>
                                </Link>
                            )}

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RequestDemoSteps;