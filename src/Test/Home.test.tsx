import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import Home from "../screens/home"
import Platforms from "../container/home.platform"
import api from "../Apis/gamerpower"

// 🔹 Mock del módulo
jest.mock("../Apis/gamerpower", () => ({
  __esModule: true,
  default: {
    getSorttGameByCriteri: jest.fn(),
  },
}))

const mockedApi = api as jest.Mocked<typeof api>

describe("Pagina Inicio - Análisis de datos", () => {

  beforeEach(() => {
    jest.clearAllMocks()

    // 🔴 MOCK ROBUSTO: responde según el parámetro

    mockedApi.getSorttGameByCriteri.mockImplementation(
      (param: "date" | "popularity" | "value") => {
        switch (param) {
          case "date":
            return Promise.resolve(
              new Array(8).fill({ title: "date-game" }) as any
            )

          case "popularity":
            return Promise.resolve(
              [
                { title: "Wildgate (Epic Games) Giveaway" },
                { title: "Otro juego" },
                { title: "Otro juego" },
                { title: "Otro juego" },
                { title: "Otro juego" },
                { title: "Otro juego" },
              ] as any
            )

          case "value":
            return Promise.resolve(
              new Array(10).fill({ title: "value-game" }) as any
            )

          default:
            return Promise.resolve([] as any)
        }
      }
    )
  })

  // -------------------------
  test("games debe tener 5 elementos", async () => {
    render(<Home />)

    // loading inicial
    expect(screen.getByText(/cargando/i)).toBeInTheDocument()

    // espera a que termine el useEffect
    await waitFor(() => {
      expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument()
    })

    const games = screen.getAllByTestId("game-item")
    expect(games).toHaveLength(5)

    const popularity = screen.getAllByTestId("popularity-item")
    expect(popularity).toHaveLength(5)
  })

  // -------------------------
  test("data no debe estar vacío", async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument()
    })

    const dataSpan = screen.getByTestId("notEmty")
    expect(Number(dataSpan.textContent)).toBeGreaterThan(0)
  })
  /*
    // -------------------------
    test("muestra el primer juego popular correctamente", async () => {
      render(<Home />)
  
      const firstPopular = await screen.findByTestId("firtPopular")
  
      expect(firstPopular).toHaveTextContent(
        "Wildgate (Epic Games) Giveaway"
      )
    })*/

})





describe("Pagina Inicio - Components", () => {

  beforeEach(() => {
    jest.clearAllMocks()

    // 🔴 MOCK ROBUSTO: responde según el parámetro
    mockedApi.getSorttGameByCriteri.mockImplementation(
      (param: "date" | "popularity" | "value") => {
        switch (param) {
          case "date":
            return Promise.resolve(
              new Array(8).fill({ title: "date-game" }) as any
            )

          case "popularity":
            return Promise.resolve(
              [
                { title: "Wildgate (Epic Games) Giveaway" },
                { title: "Otro juego" },
                { title: "Otro juego" },
                { title: "Otro juego" },
                { title: "Otro juego" },
                { title: "Otro juego" },
              ] as any
            )

          case "value":
            return Promise.resolve(
              new Array(10).fill({ title: "value-game" }) as any
            )

          default:
            return Promise.resolve([] as any)
        }
      }
    )
  })


  test("debe renderizar 11 elementos con la clase animation-h1", async () => {


    // ⚠️ IMPORTANTE:
    // El componente Home llama a getSorttGameByCriteri **3 veces** dentro del useEffect:
    // 1️⃣ "date"        → llena `data`
    // 2️⃣ "popularity"  → llena `popularity`
    // 3️⃣ "value"       → llena `games`
    //
    // Por eso es OBLIGATORIO mockear la función 3 veces con `mockResolvedValueOnce`.
    // Si solo se mockea una vez:
    // ❌ las siguientes llamadas devuelven `undefined`
    // ❌ el flujo real del componente no se respeta
    // ❌ el componente puede quedarse en loading o entrar al catch
    // ❌ los tests pueden fallar o pasar de forma inconsistente
    //
    // Regla de oro:
    // 👉 Si un componente llama N veces a una función async, el mock debe responder N veces.


    mockedApi.getSorttGameByCriteri
      .mockResolvedValueOnce([{}] as any)
      .mockResolvedValueOnce([{}] as any)
      .mockResolvedValueOnce([{}] as any);

    const { container } = render(<Home />);

    // ⏳ esperar a que termine el loading
    await waitFor(() => {
      expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
    });

    const animatedElements = container.querySelectorAll(".animation-h1");

    expect(animatedElements.length).toBe(11);
  });


  test("debe existir al menos un elemento con la clase animation-h1", async () => {

    mockedApi.getSorttGameByCriteri
      .mockResolvedValueOnce([{}] as any)
      .mockResolvedValueOnce([{}] as any)
      .mockResolvedValueOnce([{}] as any);

    const { container } = render(<Home />);

    await waitFor(() => {
      expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
    });

    const animatedElement = container.querySelector(".animation-h1");

    expect(animatedElement).toBeInTheDocument();
  });

  test("renderiza 6 botones con la clase item-platforms", () => {
    const { container } = render(<Platforms />)

    const buttons = container.querySelectorAll(".item-platforms")

    expect(buttons.length).toBe(6)
  })

  test("renderiza 6 botones con la clase item-platforms", () => {
    const { container } = render(<Platforms />)

    const buttons = container.querySelectorAll(".item-platforms")
    expect(buttons.length).toBe(6)
  })

  test("al hacer click en pc el state cambia a PC", () => {
    render(<Platforms />)

    fireEvent.click(screen.getByText("pc"))

    expect(screen.getByTestId("platform-selected"))
      .toHaveTextContent("PC")
  })

  test("al hacer click en switch el state cambia a SWITCH", () => {
    render(<Platforms />)

    fireEvent.click(screen.getByText("switch"))

    expect(screen.getByTestId("platform-selected"))
      .toHaveTextContent("SWITCH")
  })

  test("al hacer click en xbox-one el state cambia a XBOX-ONE", () => {
    render(<Platforms />)

    fireEvent.click(screen.getByText("xbox-one"))

    expect(screen.getByTestId("platform-selected"))
      .toHaveTextContent("XBOX-ONE")
  })


})
/**
const platforms = [
    "pc",
    "ps4",
    "ps5",
    "xbox-one",
    "switch",
    "xbox-360"
];


// Convierte la API importada en una versión tipada como mock
const mockedApi = api as jest.Mocked<typeof api>;

/*describe('Home component', () => {
   
    test('renderiza el título Home Page', () => {
        render(<Home />);
        expect(screen.getByText(/Home /i)).toBeInTheDocument();
    });

    test('muestra el texto de bienvenida', () => {
        render(<Home />);
        expect(
            screen.getByText(/Bienvenido a la aplicación/i)
        ).toBeInTheDocument();
    });



});


describe('Homes Test 1', () => {
    test('cambia loading a false y carga datos en setData', async () => {

        mockedApi.getSorttGameByCriteri.mockResolvedValueOnce(
            [{} as any, {} as any]
        );

        render(<Home />);
        // Verifica que inicialmente se muestre el estado de carga
        // Esto confirma que loading comienza en true
        expect(screen.getByText("Cargando")).toBeInTheDocument();

        // Espera a que el useEffect termine (llamada async)
        // y el loading cambie a false
        await waitFor(() => {
            // Verifica que el texto "Cargando" ya no esté en el DOM
            expect(screen.queryByText("Cargando")).not.toBeInTheDocument();
        });

        // Obtiene el elemento que muestra la cantidad de datos
        const count = screen.getByTestId("count");

        // Verifica que la función de la API fue llamada
        // exactamente con el parámetro "popularity"
        expect(mockedApi.getSorttGameByCriteri).toHaveBeenCalledWith("popularity");
    });
});

describe('Plataform', () => {

    test('renderiza un botón/link para cada plataforma', () => {
        render(<Plataform />);



        // Recorre cada plataforma y verifica que exista en el DOM
        platforms.forEach((platform) => {
            expect(screen.getByText(platform)).toBeInTheDocument();
        });

    });

    test("al hacer click en ps4 cambia el estado platform a ps4", () => {

        // Renderiza el componente
        render(<Plataform />);

        // Verifica el estado inicial
        expect(screen.getByTestId("selected-platform").textContent)
            .toBe("Todos");

        // Obtiene el botón ps4 usando aria-label (forma accesible)
        const ps4Button = screen.getByLabelText("btn-ps4");

        // Simula el click del usuario
        fireEvent.click(ps4Button);

        // Verifica que el estado cambió a ps4
        expect(screen.getByTestId("selected-platform").textContent)
            .toBe("ps4");
    });

    test("solo el botón ps4 tiene la clase active", async () => {

        // Renderiza el componente
        render(<Plataform />);

        // Obtiene los botones
        const ps4 = screen.getByLabelText("btn-ps4");
        const pc = screen.getByLabelText("btn-pc");
        const ps5 = screen.getByLabelText("btn-ps5");

        // Simula el click en ps4
        fireEvent.click(ps4);

        // ✅ ps4 debe tener la clase active
        expect(ps4).toHaveClass("active");

        // ❌ los demás no
        expect(pc).not.toHaveClass("active");
        expect(ps5).not.toHaveClass("active");
    });

});

*/

