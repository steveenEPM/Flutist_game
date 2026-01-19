import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"


import FilterGames from "../container/explorer.filter";
import CatalogExplorer from "../container/explorer.catalog";

import { useIsMobile } from "../hooks/useIsMobile";
import type { GiveawayGame } from "../types/gamerPower";
import api from "../Apis/gamerpower"


import "../styles/srce_explorer.css"
import NavegacionPage from "../container/Navegacion";


const { getSorttGameByCriteri } = api


export default function ScreenExplorer() {

    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<GiveawayGame[]>([])
    const [aux, setAux] = useState<GiveawayGame[]>([])
    const [filter, setFilter] = useState<string[]>([])

    const { state } = useLocation()


    useEffect(() => {
        getSorttGameByCriteri("date").then(res => setData(res))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))

    }, [])

    useEffect(() => {
        if (!filter.length) return

        const elements = data.filter(({ platforms }) =>

            platforms
                .split(",")
                .some(item => filter.includes(item.toLowerCase()))
        )

        setAux(elements)
    }, [filter, data])

    useEffect(() => {
        if (state) {
            let { platform } = state

            let array: string[] = [`${platform.toLowerCase()}`]
            setFilter(array)
        }

    }, [state])

    const isMobile = useIsMobile()

    const onFilter = (str: string) => setFilter(prev =>
        prev.includes(str)
            ? prev.filter(item => item !== str) // si existe, lo elimina
            : [...prev, str]                     // si no existe, lo agrega
    )

    const clearFilter = () => setFilter([])

    if (loading) return <div>Cargando...</div>




    return (
        <>
            <NavegacionPage />
            <div className="contianers explorer root">
                {
                    !isMobile &&
                    <div className="containers explorer" id="container1">
                        <FilterGames filter={filter} onChecked={onFilter} onClear={clearFilter} />
                    </div>
                }
                <div className="explorer containers" id="container2">
                    <CatalogExplorer data={filter.length == 0 ? data : aux} />
                </div>
            </div>
        </>
    )

}