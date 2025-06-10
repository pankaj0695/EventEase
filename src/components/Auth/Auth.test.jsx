import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

// Use a module-level variable for pathname
let mockPathname = "/login";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => ({ pathname: mockPathname }),
    useNavigate: () => vi.fn(),
  };
});

describe("Auth", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("renders without crashing (signup)", async () => {
    mockPathname = "/signup";
    const { default: Auth } = await import("./Auth");
    render(<Auth />);
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  it("renders without crashing (login)", async () => {
    mockPathname = "/login";
    const { default: Auth } = await import("./Auth");
    render(<Auth />);
    expect(screen.queryByPlaceholderText(/Name/i)).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Continue with Google/i })).toBeInTheDocument();
  });

  it("all input fields are working properly (signup)", async () => {
    mockPathname = "/signup";
    const { default: Auth } = await import("./Auth");
    render(<Auth />);
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    expect(nameInput.value).toBe("Test User");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  it("all input fields are working properly (login)", async () => {
    mockPathname = "/login";
    const { default: Auth } = await import("./Auth");
    render(<Auth />);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "login@example.com" } });
    expect(emailInput.value).toBe("login@example.com");

    fireEvent.change(passwordInput, { target: { value: "loginpass" } });
    expect(passwordInput.value).toBe("loginpass");
  });
});
