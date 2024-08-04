import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from "./CarouselImage";

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: React.SetStateAction<number>) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <CarouselImage src={"/cerf.jpg"} alt={"cerf"}/>
            </Carousel.Item>
            <Carousel.Item>
                <CarouselImage src={"/montagne.jpg"} alt={"montag"}/>
            </Carousel.Item>
            <Carousel.Item>
                <CarouselImage src={"/chaletslagon4.jpg"} alt={"chalet"}/>
            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel;
