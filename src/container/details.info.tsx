
import { Icon_CloudPlus, Icon_Eye } from "../components/icons";
import type { GiveawayGame } from "../types/gamerPower";


type Props = {
    data: GiveawayGame
}

export default function Info({ data }: Props) {

    let { worth, title, platforms, users, gamerpower_url } = data

    

    console.log(typeof(worth))

    return (
        <>
            {
                /**
                 * 
                 *  <div className="comp_img">
                    <img src={thumbnail} alt={thumbnail} />
                </div>
                 */
            }
            <div className="sections">
                <h3>{title}</h3>

                <div style={{ marginBlock: 10 }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                        <Icon_CloudPlus size={20} />
                        <h4>Platforms</h4>
                    </div>
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

                <div>
                    <div style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <Icon_Eye size={20} />
                        <h4>Views</h4>
                    </div>
                    <span>{users}</span>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems:"center",gap:50,marginTop:20,justifyContent:"space-between"}}>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <h4>Price</h4>
                    <span style={{ fontWeight: "bold", fontSize: 26 }}>{worth && worth !== "n/a" ? worth : 0}</span>
                </div>
                <button className="buttons_buy" onClick={() => window.location.href = gamerpower_url}>buy</button>
            </div>
        </>
    )

}