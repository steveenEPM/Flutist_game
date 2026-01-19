import { useState, useEffect } from "react"
/**Components */
import NavegacionPage from "../container/Navegacion"
import { Icon_ArrowTrend } from "../components/icons"
// Tipos de TypeScript
import type { GiveawayGame } from "../types/gamerPower"

// API
import api from "../Apis/gamerpower"
import Nows from "../container/popularity.nows"
//Style
import "../styles/srce_pupularity.css"
import TopRated from "../container/popularity.top"


const { getSorttGameByCriteri } = api



export default function ScreenPupularity() {

    const [popularity, setPopularity] = useState<GiveawayGame[]>([])
    const [topRated, setTopRatep] = useState<GiveawayGame[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getSorttGameByCriteri("popularity").then(res => {

            const array1 = res.slice(0, -11)
            const array2 = res.slice(-10)

            setPopularity(array1)
            setTopRatep(array2)
        })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])


    if (loading) return <div>Cargando...</div>

    return (
        <>
            <NavegacionPage />
            <div className="popularity containers" id="container1" style={{marginTop:80}}>
                <div className=" icon_sections">
                    <Icon_ArrowTrend size={40} color="#fefefa" />
                </div>
                <h2>Tendencies</h2>
                <span>Discover the most popular games and what the community is playing right now</span>
            </div>
            <div className="popularity containers" id="container2">
                <Nows data={popularity} />
            </div>
            <div className="popularity containers" id="container3">
                <TopRated data={topRated} />
            </div>
        </>
    )
}