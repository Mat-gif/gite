import React from "react";

interface CarouselImageProps {
    src: string;
    alt: string;
}

const CarouselImage: React.FC<CarouselImageProps> = ({src, alt}) => {

    return (
        <img
            className="d-block w-100"
            src={src}
            alt={alt}
        />
    );
}

export default CarouselImage;
