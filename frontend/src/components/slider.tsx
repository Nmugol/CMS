import {SliderInterface} from "../interface/SliderInterface";
import {useState, useEffect} from "react";

export default function Slider(props: SliderInterface) {

    const [slideNum, setSlideNum] = useState(0);
    const [sliderList, setSliderList] = useState<string[]>([]);

    useEffect(() => {
        setSliderList(props.urls);
    }, []);

    return (
        <div>
            <button onClick={() => {
                setSlideNum(slideNum - 1);
                if (slideNum === 0) {
                    setSlideNum(sliderList.length - 1);
                }
            }}>back</button>
            <img src={sliderList[slideNum]} alt="Slide" />
            <button onClick={() => {
                setSlideNum(slideNum + 1);
                if (slideNum === sliderList.length - 1) {
                    setSlideNum(0);
                }
            }}>next</button>
        </div>
    );
}
