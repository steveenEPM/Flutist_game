
import { platform } from "./home.platform"


type Props = {
    filter: string[]
    onChecked: (str: string) => void
    onClear: () => void
}

export default function FilterGames({ filter, onChecked, onClear }: Props) {


    return (
        <>

            <h3 onClick={onClear} style={{ cursor: "pointer" }}>Platform</h3>
            <div>
                {
                    platform.map((value, index) => {

                        const include: boolean = filter.includes(value)

                        return (
                            <button className={include ? "active" : ""} key={index} onClick={() => onChecked(value)}>
                                {value}
                            </button>
                        )

                    })
                }
            </div>
        </>
    )
}