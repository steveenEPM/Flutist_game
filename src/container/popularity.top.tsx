
import { Icon_Star } from "../components/icons"
import type { GiveawayGame } from "../types/gamerPower"
import { PopularityItem } from "./home.games"

import "../styles/comp_popularity_items.css"
import { useNavigate } from "react-router-dom"


type Props = {
    data: GiveawayGame[]
}

export default function TopRated({ data }: Props) {

    const navigate = useNavigate()

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" ,gap:20,marginBottom:20}}>
                 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 46, height: 46, borderRadius: 8 }} className="icon_sections">
                    <Icon_Star size={30} />
                </div>
                <h3>Top Rated</h3>
            </div>
            <div className="items_top" style={{gap:20,justifyContent:"space-between"}}>
                {
                    data.map((value, index) => (
                        <a  className="popularity_items" onClick={() => navigate(`/details/${value.id}`)}> 
                            <PopularityItem data={value} index={`${index +1 }`} />
                        </a>
                    ))
                }
            </div>

        </>
    )

}