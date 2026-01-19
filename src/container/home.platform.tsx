import { useNavigate } from "react-router-dom"
import { useIsMobile } from "../hooks/useIsMobile"

export const platform = ["pc", "playstation 4", "playstation 5", "android", "iOS", "steam", "xbox-360"]


const isPlatform = (platform: string) => {
    if (platform === "playstation 4") {
        return "ps4"
    } else if (platform === "playstation 5") {
        return "ps5"
    } else {
        return platform
    }
}

export default function Platforms() {

    const navigate = useNavigate()

    const isMoble = useIsMobile()

    const onSelectPlatform = (item: string) => {

        navigate("/explorer", {
            state: { platform: item }
        })
    }


    return (
        <>
            {
                platform.map((item, index) => (
                    <button className={`item-platforms`} id={`item-${index}`} key={index} onClick={() => onSelectPlatform(item.toUpperCase())}
                        data-testid="platform-selected"
                    >
                        {isMoble ? isPlatform(item) : item.toLowerCase()}
                    </button>
                ))
            }


        </>
    )

}
