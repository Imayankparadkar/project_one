const GeometricBackground = () => {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="geometric"
                    x="0"
                    y="0"
                    width="120"
                    height="120"
                    patternUnits="userSpaceOnUse"
                >
                    {/* Diamond shapes */}
                    <path
                        d="M60 10 L80 30 L60 50 L40 30 Z"
                        fill="none"
                        stroke="hsl(36 15% 90% / 10%)"
                        strokeWidth="1"
                    />
                    <path
                        d="M0 70 L20 90 L0 110 L-20 90 Z"
                        fill="none"
                        stroke="hsl(36 15% 90% / 10%)"
                        strokeWidth="1"
                    />
                    <path
                        d="M120 70 L140 90 L120 110 L100 90 Z"
                        fill="none"
                        stroke="hsl(36 15% 90% / 10%)"
                        strokeWidth="1"
                    />
                    {/* Quarter arcs in corners */}
                    <path
                        d="M0 0 Q30 0 30 30"
                        fill="none"
                        stroke="hsl(36 15% 90% / 10%)"
                        strokeWidth="1"
                    />
                    <path
                        d="M120 0 Q90 0 90 30"
                        fill="none"
                        stroke="hsl(36 15% 90% / 10%)"
                        strokeWidth="1"
                    />
                    <path
                        d="M0 120 Q30 120 30 90"
                        fill="none"
                        stroke="hsl(36 15% 90% / 10%)"
                        strokeWidth="1"
                    />
                    <path
                        d="M120 120 Q90 120 90 90"
                        fill="none"
                        stroke="hsl(36 15% 90% / 10%)"
                        strokeWidth="1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric)" />
        </svg>
    );
};

export default GeometricBackground;
