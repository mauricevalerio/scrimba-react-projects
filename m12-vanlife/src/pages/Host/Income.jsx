import IncomeGraph from '../../assets/income.png'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import { requireAuth } from '../../utils'

export async function loader({request}) {
    await requireAuth(request)
    return 0
}

export default function Income() {
    const { isLoggedIn } = useContext(LoginContext)
    const transactionsData = [
        { amount: 720, date: "Jan 3, '23", id: "1" },
        { amount: 560, date: "Dec 12, '22", id: "2" },
        { amount: 980, date: "Dec 3, '22", id: "3" },
    ]
    return (
        <>
            {
                isLoggedIn ?
                    <section className="host__income">
                        <h1>Income</h1>
                        <p>Last <span>30 days</span></p>
                        <h2>$2,260</h2>
                        <img
                            className="host__income--graph"
                            src={IncomeGraph}
                            alt="Income graph"
                        />
                        <div className="host__income--header">
                            <h3>Your transactions ({transactionsData.length.toString()})</h3>
                            <p>Last <span>30 days</span></p>
                        </div>
                        <div className="host__income--transactions">
                            {transactionsData.map((item) => (
                                <div key={item.id} className="host__income--transactions--item">
                                    <h3>${item.amount}</h3>
                                    <p>{item.date}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                :
                <Navigate to='/' />
            }
        </>

    )
}
