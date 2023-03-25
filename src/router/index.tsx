import { RouterProvider, createBrowserRouter } from "react-router-dom";

import CalculatorPage from "../pages/calculator";
import HistoryPage from "../pages/history";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <CalculatorPage />,
      id: "Calculadora",
    },
    {
      path: "/history",
      element: <HistoryPage />,
      id: "Histórico",
    },
  ],
  { basename: "/wartale-xp-calculator" }
);

export default function Router() {
  return <RouterProvider router={router} />;
}
