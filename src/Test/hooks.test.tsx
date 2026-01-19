import { render, screen, fireEvent } from "@testing-library/react";
import NavegacionPage from "../container/Navegacion";

// 🔹 Mock del hook useIsMobile
jest.mock("../hooks/useIsMobile", () => ({
  useIsMobile: jest.fn(),
}));

// 🔹 Mock de los íconos
jest.mock("../components/icons", () => ({
  Icon_BarsOffset: () => <div data-testid="icon-bars" />,
  Icon_XMark: () => <div data-testid="icon-xmark" />,
  Icon_Home: () => <div />,
  Icon_ChartBars: () => <div />,
  Icon_ArrowTrend: () => <div />,
  Icon_CloudPlus: () => <div />,
}));

import { useIsMobile } from "../hooks/useIsMobile";

describe("NavegacionPage", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe tener la clase 'mobile' cuando está en mobile", () => {
    // 👉 simulamos mobile
    (useIsMobile as jest.Mock).mockReturnValue(true);

    const { container } = render(<NavegacionPage />);

    const nav = container.querySelector(".navegacionPage");

    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass("mobile");
  });

  test("debe cambiar entre Icon_BarsOffset y Icon_XMark al hacer click", () => {
    // 👉 simulamos mobile
    (useIsMobile as jest.Mock).mockReturnValue(true);

    render(<NavegacionPage />);

    const button = screen.getByRole("button");

    // 🔹 Inicialmente debe estar Icon_BarsOffset
    expect(screen.getByTestId("icon-bars")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-xmark")).not.toBeInTheDocument();

    // 🔹 Click → activa menú
    fireEvent.click(button);

    // 🔹 Ahora debe estar Icon_XMark
    expect(screen.getByTestId("icon-xmark")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-bars")).not.toBeInTheDocument();
  });

});
