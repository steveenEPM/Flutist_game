import type { GiveawayGame } from "../types/gamerPower";

type Props = {
    data: GiveawayGame
}

export default function Sipnosis({ data }: Props) {

    let { image, description } = data

    return (
        <>
            <div className="comp_img">
                <img src={image} alt={image} />
            </div>
            <div className="comp_sip" style={{paddingInline:18,paddingBlock:10}}>
                <h3 className="h3_section">Synopsis</h3>
                <p>{description}</p>
            </div>
        </>
    )

}