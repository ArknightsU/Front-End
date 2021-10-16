import React from "react";
import Rating from "react-rating";

interface StarRating {
    readOnly: boolean;
    initialRating?: number;
}
export function StarRating(props: StarRating): JSX.Element {
    return (
        <Rating
            className="h-full flex justify-center items-center"
            stop={5}
            fractions={2}
            readonly={props.readOnly}
            initialRating={props.initialRating ? props.initialRating : 0}
            emptySymbol={<SvgImage type={false} />}
            fullSymbol={<SvgImage type={true} />}
        ></Rating>
    );
}

interface StarImage {
    type: boolean;
}
const SvgImage = (props: StarImage): JSX.Element => {
    const color = props.type ? "#fffa86" : "#808080";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            style={{ width: "30px", height: "30px" }}
            fill={color}
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );
};
