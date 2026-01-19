// Hooks de React
import { useEffect, useState } from "react"

// Tipos de TypeScript
import type { GiveawayGame } from "../types/gamerPower"

// Estilos CSS de la vista Inicio
import "../styles/srce_inicio.animation.css"
import "../styles/srce_inicio.css"

// Componentes
import Platforms from "../container/home.platform"
import NavegacionPage from "../container/Navegacion"
import GamesCatalog from "../container/home.games"
/**Is mobile */
// API
import api from "../Apis/gamerpower"


const { getSorttGameByCriteri } = api




export default function ScreenHomes() {

    const [popularity, setPopularity] = useState<GiveawayGame[]>([])
    const [data, setData] = useState<GiveawayGame[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getSorttGameByCriteri("date")
            .then(res => {
                setData(res.slice(-4))
                return getSorttGameByCriteri("popularity")
            })
            .then(res => {
                setPopularity(res.slice(-4))
                return getSorttGameByCriteri("value")
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) return <div>Cargando...</div>

    return (
        <>
            <NavegacionPage />
            <div className="homes containers" id="container1">
                <h1>
                    {
                        htmlH1.split("").map((letra, index) => letra === " " ? (" ") : <span key={index} className="animation-h1">{letra}</span>)
                    }
                </h1>
                <p>
                    In this cross-platform library, each melody leads you to a different experience. A space where genres are arranged like notes. Here, you don't search randomly; follow the sound that best suits your playing style.
                </p>
            </div>
            <div className="homes containers" id="container2" style={{ flexDirection: "row" }}>
                <Platforms />
            </div>
            <div className="homes containers" id="container3">
                <GamesCatalog stock={data} popularity={popularity} />
            </div>
        </>
    )
}


/**
 * 
 * <div style={{ overflow: "hidden" }}>
                <Test1 games={games} data={data} popularity={popularity} />
            </div>
 */

const htmlH1 = "Flutist game"