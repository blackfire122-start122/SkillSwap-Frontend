import style from "../../styles/Stars.module.css";

const renderStars = (rating) => {
    const stars = []
    const maxRating = 100
    const starCount = Math.ceil((rating / maxRating) * 5)

    for (let i = 0; i < 5; i++) {
        if (i < starCount) {
            stars.push(<span className={style.star} key={i}>&#9733;</span>)
        } else {
            stars.push(<span className={style.star} key={i}>&#9734;</span>)
        }
    }

    return stars
}

export default renderStars