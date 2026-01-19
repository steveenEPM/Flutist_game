import { useState } from "react"

import type { GiveawayGame } from "../types/gamerPower"


import { Icon_AngleLeft, Icon_AngleRight, Icon_FireFlame } from "../components/icons"
import { CatalogItem } from "./home.games"

import "../styles/comp_catalogo_items.css"
import { useIsMobile } from "../hooks/useIsMobile"
import { useNavigate } from "react-router-dom"

type Props = {
    data: GiveawayGame[]
}

export default function Nows({ data }: Props) {

    const navigate = useNavigate()

    const isMobile = useIsMobile()
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = isMobile ? 4 : 12;

    // Cálculo de índices
    const offset = currentPage * itemsPerPage;
    const currentItems = data.slice(offset, offset + itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Funciones de navegación
    const nextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    return (
        <>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 46, height: 46, borderRadius: 8 }} className="icon_sections">
                        <Icon_FireFlame size={30} />
                    </div>
                    <h3>Trending Now</h3>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <ButtonLeft onClick={prevPage} />
                    <span> Página {currentPage + 1} de {totalPages} </span>
                    <ButtonRight onClick={nextPage} />
                </div>
            </div>
            <div className="list_items1">
                {
                    currentItems.map((item, index) => (
                        <a href="" key={index} className="catalog_items" onClick={() => navigate(`/details/${item.id}`)}>
                            <CatalogItem data={item} />
                        </a>
                    ))
                }
            </div>


        </>
    )

}


const sizeAngle: number = 20

export const ButtonLeft = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className="btn_angle">
        <Icon_AngleLeft size={sizeAngle} />
    </button>
)


export const ButtonRight = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className="btn_angle">
        <Icon_AngleRight size={sizeAngle} />
    </button>
)




