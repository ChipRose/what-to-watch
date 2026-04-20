import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from "history";
import HistoryRouter from "../history-route/history-route";

import Logo from "./logo";

const testHistory = createMemoryHistory();

const testComponent = (
  <HistoryRouter history={testHistory}>
    <Logo />
  </HistoryRouter>
);

describe("Component: Logo", () => {
  it("should render correctly", () => {
    render(testComponent);
    const logoLink = screen.getByRole("link", { name: /w\s*t\s*w/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
