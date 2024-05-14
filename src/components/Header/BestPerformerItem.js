import userImage from "./../../images/user.png"

function BestPerformer({bestPerformer}) {
    const renderStars = () => {
        const stars = []
        const maxRating = 100
        const starCount = Math.ceil((bestPerformer.rating / maxRating) * 5)

        for (let i = 0; i < 5; i++) {
            if (i < starCount) {
                stars.push(<span key={i}>&#9733;</span>)
            } else {
                stars.push(<span key={i}>&#9734;</span>)
            }
        }

        return stars
    }

    return (
        <div>
            <img src={userImage} alt={bestPerformer.name}/>
            <div>{renderStars()}</div>
        </div>
    )
}

export default BestPerformer
