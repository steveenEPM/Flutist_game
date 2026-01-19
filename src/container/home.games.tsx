import { Icon_FireFlame, Icon_ArrowTrend } from "../components/icons"
import type { GiveawayGame } from "../types/gamerPower"
import { useNavigate } from "react-router-dom"

import "../styles/comp_catalogo_items.css"
import "../styles/comp_popularity_items.css"

import { truncarTexto } from "../utils/function"

type Props = {
    popularity: GiveawayGame[]
    stock: GiveawayGame[]
}

export default function GamesCatalog({ stock, popularity }: Props) {

    const navigate = useNavigate()

    return (
        <>
            <div className="Catalogs" id="catalog">

                <div className="sections" id="section1">
                    <div className="h2_sections">
                        <div className="icon_sections icon_section1">|
                            <Icon_FireFlame size={30} color="#fefefa" />
                        </div>
                        <h2>Recent releases</h2>
                    </div>
                    <a href="" style={{ textDecoration: "none", opacity: 0.7, fontWeight: "bold" }}>View all</a>
                </div>

                <div className="sections" id="section2">
                    {
                        stock.map((item, index) => {
                            return (

                                <a key={index} className={`catalog_items`} onClick={() => navigate(`/details/${item.id}`)}>
                                    <CatalogItem data={item} />
                                </a>

                            )

                        })
                    }
                </div>
            </div>

            <div className="Catalogs" id="popularitys">
                <div className="h2_sections">
                    <div className="icon_sections icon_section2">
                        <Icon_FireFlame size={30} color="#fefefa" />
                    </div>
                    <h2>Tendencies</h2>
                </div>
                <div>
                    {
                        popularity.map((item, index) => (
                            <a key={index} className="popularity_items" onClick={() => navigate(`/details/${item.id}`)}>
                                <PopularityItem data={item} index={`${index + 1}`} />
                            </a>
                        ))
                    }
                </div>
            </div>
        </>
    )

}

export const CatalogItem = ({ data }: { data: GiveawayGame }) => {

    let { image, title, platforms, users } = data



    return (
        <>
            <div>
                <img src={image} alt={image} />
            </div>
            <div style={{ display: "block", paddingInline: 10 }}>
                <h4> {truncarTexto(title)}</h4>
                <div style={{ display: "flex", gap: 10, flexDirection: "row" }}>
                    {
                        platforms.split(",").map((item, index) =>
                            index < 2 ? (
                                <span key={index}>{item}</span>
                            ) : null // En React es mejor retornar 'null' que un fragmento vacío <></> si no vas a mostrar nada
                        )
                    }
                </div>
            </div>
        </>
    )
}


export const PopularityItem = ({ data, index }: { data: GiveawayGame, index: string }) => {

    let { image, title, platforms } = data

    return (
        <>
            <span className="span_index">{index}</span>
            <div>
                <img src={image} alt={image} />
                <div >
                    <h4> {truncarTexto(title)}</h4>
                    <div style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                        {
                            platforms.split(",").map((item, index) =>
                                index < 2 ? (
                                    <span key={index}>{item}</span>
                                ) : null // En React es mejor retornar 'null' que un fragmento vacío <></> si no vas a mostrar nada
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}