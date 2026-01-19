import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom"

import type { GiveawayGame } from "../types/gamerPower";

// Componentes
import NavegacionPage from "../container/Navegacion";
import { Icon_ArrowLeft } from "../components/icons";
import Sipnosis from "../container/details.sipnosis";
// Styles 
import "../styles/srce_details.css"
// API
import api from "../Apis/gamerpower"
import Info from "../container/details.info";
const { getGameId } = api

export default function ScreenDetails() {

    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<GiveawayGame>()

    const navigate = useNavigate()
    const { platform } = useParams()

    const goBack = () => {
        navigate(-1)
    }
    useEffect(() => {
        getGameId(platform ? platform : "12").then(res => setData(res))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])


    if (loading) return <div>Cargando...</div>


    return (
        <>
            <NavegacionPage />
            <div id="back_catalog">
                <a onClick={goBack}>
                    <Icon_ArrowLeft size={20} />
                    <span>Volver al cátalogo</span>
                </a>
            </div>
            <div className="details container">
                <div className="details containers" id="container1">
                    {
                        data && <Sipnosis data={data} />
                    }
                </div>
                <div className="details containers" id="container2">
                    {
                        data && <Info data={data} />
                    }
                </div>
            </div>
        </>
    )
}

/**
 * 
 *      
 */