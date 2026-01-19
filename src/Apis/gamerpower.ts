import axios from "axios"

// type Platform = "pc" | "steam" | "epic-games-store" | "ubisoft" | "gog" | "itchio" | "ps4" | "ps5" | "xbox-one" | "xbox-series-xs" | "switch" | "android" | "ios" | "vr" | "battlenet" | "origin" | "drm-free" | "xbox-360";



class GamerPower {

//    private Host: string = "https://www.gamerpower.com/api"

    constructor() { }

    /**
         * La función getSorttGameByCriteri se encarga de obtener la lista de juegos (giveaways)
         * ordenados según un criterio específico.
         * 
         * Realiza una petición HTTP al endpoint `/giveaways` utilizando el parámetro `sort-by`
         * para definir el tipo de ordenamiento.
         *
         * @param params Criterio de ordenamiento permitido:
         *  - "date": ordena los juegos por fecha
         *  - "value": ordena los juegos por valor
         *  - "popularity": ordena los juegos por popularidad
         *
         * * @example
         * ```ts
         * const games = await getSorttGameByCriteri("date");
         * console.log(games);
         * ```
     */

    async getSorttGameByCriteri(params: "date" | "value" | "popularity"): Promise<any> {
        try {
            const { data } = await axios.get(`/api-gamer/giveaways?sort-by=${params}`);

            return data;
        } catch (error) {
            throw new Error("Not Found 404");
        }
    }


    /**
         * La función getGameplatform se encarga de obtener la lista de juegos (giveaways)
         * filtrados por una plataforma específica.
         *
         * Realiza una petición HTTP al endpoint `/giveaways` utilizando el parámetro `platform`
         * para limitar los resultados a la plataforma indicada.
         *
         * @param params Plataforma sobre la cual se desea filtrar los juegos.
         * Puede ser un valor del tipo `Platform` (por ejemplo: pc, ps4, xbox-one, etc.).
         * 
         *  * @example
         * ```ts
         * const games = await api.getGameplatform("pc");
         * console.log(games);
         * ```
     */

    async getGameplatform(params: string): Promise<any> {
        try {
            const { data } = await axios.get(`/api-gamer/giveaways?platform=${params}`);
            console.log("x")
            return data;
        } catch (error) {
            throw new Error("Not Found 404");
        }
    }


    /**
         * La función getGameId se encarga de obtener la información de un juego específico
         * a partir de su identificador único.
         *
         * Realiza una petición HTTP al endpoint `/giveaways` utilizando el parámetro `id`
         * para recuperar los datos del juego solicitado.
         *
         * @param params Identificador único del juego que se desea consultar.
         *
         * @example
         * ```ts
         * const game = await api.getGameId(1234);
         * console.log(game);
     * ```
     */

    async getGameId(params: string): Promise<any> {
        try {
            const { data } = await axios.get(`/api-gamer/giveaway?id=${params}`);
            return data;
        } catch (error) {
            throw new Error("Not Found 404");
        }
    }
}



export default new GamerPower()


