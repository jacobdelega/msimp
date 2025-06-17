import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";

const LottieSearch = ({ src, width, height, ...rest }) => {
    const ref = useRef(null);

    useEffect(() => {
        const animation = Lottie.loadAnimation({
            container: ref.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            ...rest,
            path: src,
        });
        return () => animation.destroy();
    }, [src, rest]);

    return <div ref={ref} className="flex w-1/2 m-auto mt-8 lg:w-full" />;
};

export default LottieSearch