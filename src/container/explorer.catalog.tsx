import { useState } from "react";

import { CatalogItem } from "./home.games";
import { ButtonLeft, ButtonRight } from "./popularity.nows"
import { useIsMobile } from "../hooks/useIsMobile";

import type { GiveawayGame } from "../types/gamerPower";
import { useNavigate } from "react-router-dom";



type Props = {
    data: GiveawayGame[]
}


export default function CatalogExplorer({ data }: Props) {

    const navigate = useNavigate()


    const isMobile = useIsMobile()
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = isMobile ? 4 : 10;

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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} className="sections_1">
                <div>
                    <h2>Explore Catalog</h2>
                    <span>Browser games {data.length}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <ButtonLeft onClick={prevPage} />
                    <span> Página {currentPage + 1} de {totalPages} </span>
                    <ButtonRight onClick={nextPage} />
                </div>
            </div>
            <div className="catalog_game">
                {
                    data.length > 0 &&
                    currentItems.map((value, index) => (
                        <a className="catalog_items" key={index} onClick={() => navigate(`/details/${value.id}`)}>
                            <CatalogItem data={value} />
                        </a>
                    ))
                }
            </div>
        </>
    )
}