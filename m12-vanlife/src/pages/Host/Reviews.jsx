import { BsStarFill } from "react-icons/bs"
import ReviewsGraph from '../../assets/reviews.png'
import { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { Navigate } from 'react-router-dom'
import { requireAuth } from '../../utils'

export async function loader({request}) {
    await requireAuth(request)
    return 0
}

export default function Reviews() {
    const { isLoggedIn } = useContext(LoginContext)

    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "January 3, 2023",
            text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
            id: "1",
        },
        {
            rating: 5,
            name: "Sandy",
            date: "December 12, 2022",
            text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
            id: "2",
        },
    ]
    
    return (
        <>
            {
                isLoggedIn ?
                <section className="host__reviews">
                    <div className="host__reviews--inner">
                        <h2>Your reviews</h2>
                        <p>Last <span>30 days</span></p>
                    </div>
                    <img
                        className="host__reviews--graph"
                        src={ReviewsGraph}
                        alt="Review graph"
                    />
                    <h3>Reviews ({reviewsData.length.toString()})</h3>
                    {reviewsData.map((review) => (
                        <div key={review.id}>
                            <div className="host__reviews--item">
                                {[...Array(review.rating)].map((_, i) => (
                                    <BsStarFill className="host__reviews--item--star" key={i} />
                                ))}
                                <div className="host__reviews--item--info">
                                    <p className="name">{review.name}</p>
                                    <p className="date">{review.date}</p>
                                </div>
                                <p>{review.text}</p>
                            </div>
                            <hr />
                        </div>
                    ))}
                </section>
            : <Navigate to='/' />
            }
        </>

    )
}
