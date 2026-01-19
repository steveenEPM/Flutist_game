import type { GiveawayGame } from "../../types/gamerPower";



//** Pagina Inicio - Análisis de datos */
export const Test1 = ({ games, popularity, data }: { games: GiveawayGame[], popularity: GiveawayGame[], data: GiveawayGame[] }) => (
  <div>
    {
      //**Los datos deben de tener 5 elementos */
    }
    <div>
      <ul data-testid="games-list">
        {games.map((_, index) => (
          <li key={index} data-testid="game-item">
            Game {index}
          </li>
        ))}
      </ul>

      <ul data-testid="popularity-list">
        {popularity.map((_, index) => (
          <li key={index} data-testid="popularity-item">
            Popular {index}
          </li>
        ))}
      </ul>

      {
        /**data no debe estar bacio */
      }

      <span data-testid="notEmty">{data.length}</span>

      {
        /***El primer juego poular es "Wildgate (Epic Games) Giveaway" */

        <span data-testid="firtPopular">{popularity[0]?.title}</span>
      }
      ̣
    </div>




  </div>
)

export const Test2 = ({ state }: { state: string }) => (
  <div>
    <p data-testid="selected-platform">{state}</p>
  </div>
)