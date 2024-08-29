import {SliderInterface} from "../interface/SliderInterface";
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

export default function Slider(props: SliderInterface) {

    const [slideNum, setSlideNum] = useState(0);
    const [sliderList, setSliderList] = useState<string[]>([]);

    useEffect(() => {
        setSliderList(props.urls);
    }, []);

    return (
        <div className="slider-container" >
            <button className="slider-button" onClick={() => {
                setSlideNum(slideNum - 1);
                if (slideNum === 0) {
                    setSlideNum(sliderList.length - 1);
                }
            }}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <div className="slider-image" style={{backgroundImage: `url(${sliderList[slideNum]})`}}></div>
            <button className="slider-button" onClick={() => {
                setSlideNum(slideNum + 1);
                if (slideNum === sliderList.length - 1) {
                    setSlideNum(0);
                }
            }}><FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
    );
}
