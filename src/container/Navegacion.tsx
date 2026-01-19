import { useState } from "react"
import "../styles/conta_Navegacion.css"
import { Icon_ArrowTrend, Icon_Home, Icon_ChartBars, Icon_CloudPlus, Icon_BarsOffset, Icon_XMark } from "../components/icons"
import { useIsMobile } from "../hooks/useIsMobile"
import { useIsScrolling } from "../hooks/useIsScrolling"
/**Hooks  */
import { useNavigate } from "react-router-dom"



export default function NavegacionPage() {

    const [isActive, setActive] = useState<boolean>(false)
    const isMobile = useIsMobile(); // 480 por defecto

    const size: number = isMobile ? 30 : 20

    // Solo llamas al hook y él te devuelve true o false
    const scrolling = useIsScrolling(90);

    const navigate = useNavigate()

    const condicon1 = isMobile ? "mobile" : ""
    const condicon2 = isActive ? "active" : ""

    return (
        <>
            {isMobile && (
                <button type="button" id="btn_press_nav" className={condicon2} onClick={() => setActive(prev => !prev)}
                    style={{ opacity: scrolling ? 0.4 : 1 }}
                >
                    {!isActive ? <Icon_BarsOffset /> : <Icon_XMark />}
                </button>
            )}
            <div className={`navegacionPage ${condicon1} ${condicon2}`}>
                <div className="sections" id="section1">
                    <div>
                        <Icon_CloudPlus size={24} color="#fefefa" />
                    </div>
                    <h2>Flutist game</h2>
                </div>

                <div className="sections" id="section2">
                    <button className="navs" id="nav_item1" onClick={() => navigate("/")}>
                        <Icon_Home size={size} color="#fefefa" />
                        <span>Inicio</span>
                    </button>
                    <button className="navs" id="nav_item2" onClick={() => navigate("/explorer")}>
                        <Icon_ChartBars size={size} color="#fefefa" />
                        <span>Explorar</span>
                    </button>
                    <button className="navs" id="nav_item2" onClick={() => navigate("/popularity")}>
                        <Icon_ArrowTrend size={size} color="#fefefa" />
                        <span>Tendencies</span>
                    </button>
                </div>
            </div>

        </>
    )
}

