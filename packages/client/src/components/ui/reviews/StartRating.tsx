import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type StartRatingProps = {
    value: number;
}

const StartRating = ({ value }: StartRatingProps) => {
    const placeHolders = [1, 2, 3, 4, 5];

    return (
        < div className="flex gap-1">
            {
                placeHolders.map((p) => {
                    const diff = value-p;
                    return diff >= 0 ? <FaStar key={p+1} /> :
                        diff >= -0.5 ? <FaStarHalfAlt key={p+1} /> :
                            <FaRegStar key={value} />
                })}
        </div >
    )
}

export default StartRating