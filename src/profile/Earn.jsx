import React from 'react'
import Dashboard from "./Dashboard.jsx";

const Earn = () => {
    return (
        <div >
            <div className={"h-40"}></div>
            <div className={"w-full"}>
            <Dashboard
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="132, 0, 255"
            />
            </div>
        </div>
    )
}
export default Earn
