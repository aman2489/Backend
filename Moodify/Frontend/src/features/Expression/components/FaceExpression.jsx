import { useEffect, useRef, useState } from "react";
import { init ,detect } from "../utils/utils";
import "../styles/cam.scss"
import Nav from "../../../shared/components/nav";

export default function FaceExpression({onClick = () => {}}) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");

    

    useEffect(() => {
        

        init({videoRef, landmarkerRef, streamRef});

        return () => {

            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const expression = detect({videoRef, landmarkerRef, setExpression})
        onClick(expression);
    }

    return (
        <main>
            <div className="cam-page-div" style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button className="btn primary-btn" onClick={handleClick} >Detect expression</button>
        </div>
        </main>
    );
}