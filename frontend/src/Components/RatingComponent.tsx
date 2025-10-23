import { useState } from 'react';
import {Star} from "lucide-react";


export function RatingComponent({
                rating,
                setRating,
                maxRating = 5,
                }: {
    rating: number;
    setRating: (value: number) => void;
    maxRating?: number;
})
{
    const [hover, setHover] = useState<number>(0);


    return (
        <div className={"flex mt-1"}>
            <h5>Rating:</h5>
            {[...Array(maxRating)].map((_, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                            style={{ display: 'none' }}
                        />
                        <Star
                            className="star"
                            size={30}
                            // color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            fill={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(0)}
                        />
                    </label>
                );
            })}
        </div>
    );
};


