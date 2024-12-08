import style from "../../styles/MainProfile.module.css"
import {useEffect, useState} from "react";
import {client} from "../../lib/client";

function Reviews({user, setShowingUser, showingUser}) {
    const [reviews, setReviews] = useState([])
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)

    function getReviewsUser() {
        if (!user.id){
            return
        }

        client.get(`api/v1/user/getReviews?userId=${showingUser ? showingUser.id : user.id}`)
            .then(function (response) {
                setReviews(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(()=>{
        getReviewsUser()
    },[user,showingUser])

    function handleFormReview(e) {
        e.preventDefault();

        client.post("api/v1/user/createReview", {
            "review": review,
            "rating": parseInt(rating),
            "toUser": parseInt(showingUser.id)
        })
        .then(function (response) {
            const updatedUser = { ...showingUser, rating: response.data.NewRating };
            setShowingUser(updatedUser);

            const updatedReviews = reviews.map(r => {
                if (r.id.toString() === response.data.Id) {
                    return {
                        ...r,
                        rating: rating,
                        review: review
                    }
                }
                return r
            })

            const reviewExists = reviews.some(r => r.id.toString() === response.data.Id)
            if (!reviewExists) {
                updatedReviews.push({
                    id: response.data.Id,
                    rating: rating,
                    review: review,
                    reviewer: { id: user.id, username: user.username }
                })
            }

            setReviews(updatedReviews);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div className={style.reviews}>
            {showingUser ?
                <form onSubmit={handleFormReview} className={style.review}>
                    <h3>{user.username}</h3>
                    <p>Leave a review</p>

                    <div>
                        <label htmlFor="rating">
                            Review:
                        </label>
                        <input placeholder="Review"
                               type="text"
                               onChange={(e)=>{setReview(e.target.value)}} ></input>
                    </div>

                    <div>
                        <label htmlFor="rating">
                            Rating:
                        </label>
                        <input defaultValue="0"
                               id="rating"
                               type="number"
                               onChange={(e)=>{setRating(e.target.value)}} ></input>
                    </div>

                    <input type="submit"/>

                </form>
                :null}

            {reviews.map((review) => (
                    <div key={review.id} className={style.review}>
                        <h3>{review.reviewer.username}</h3>
                        <p className={style.reviewText}>{review.review}</p>
                        <p className={style.rating}>{review.rating}</p>
                    </div>
                )
            )}
        </div>
    )
}

export default Reviews
