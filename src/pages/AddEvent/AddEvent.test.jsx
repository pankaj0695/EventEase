import { render, screen, fireEvent } from "@testing-library/react";
import AddEvent from "./AddEvent";
import { BrowserRouter } from "react-router-dom";

describe("AddEvent", () => {
  function renderWithRouter() {
    return render(
      <BrowserRouter>
        <AddEvent />
      </BrowserRouter>
    );
  }

  it("renders without crashing", () => {
    renderWithRouter();
    expect(screen.getByText(/Create New Event/i)).toBeInTheDocument();
  });

  it("renders all form fields and the submit button", () => {
    renderWithRouter();
    // Event Details
    expect(screen.getByLabelText(/Event Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Image/i)).toBeInTheDocument();
    // Organizer Details
    expect(screen.getByLabelText(/Organizer Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Email/i)).toBeInTheDocument();
    // Submit button
    expect(screen.getByRole("button", { name: /Create Event/i })).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    renderWithRouter();
    const titleInput = screen.getByLabelText(/Event Title/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const dateInput = screen.getByLabelText(/Date/i);
    const locationInput = screen.getByLabelText(/Location/i);
    const categorySelect = screen.getByLabelText(/Category/i);
    const organizerInput = screen.getByLabelText(/Organizer Name/i);
    const emailInput = screen.getByLabelText(/Contact Email/i);

    fireEvent.change(titleInput, { target: { value: "Test Event" } });
    expect(titleInput.value).toBe("Test Event");

    fireEvent.change(descriptionInput, { target: { value: "A fun event" } });
    expect(descriptionInput.value).toBe("A fun event");

    fireEvent.change(dateInput, { target: { value: "2099-12-31" } });
    expect(dateInput.value).toBe("2099-12-31");

    fireEvent.change(locationInput, { target: { value: "Test City" } });
    expect(locationInput.value).toBe("Test City");

    fireEvent.change(categorySelect, { target: { value: "Technology" } });
    expect(categorySelect.value).toBe("Technology");

    fireEvent.change(organizerInput, { target: { value: "John Doe" } });
    expect(organizerInput.value).toBe("John Doe");

    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput.value).toBe("john@example.com");
  });
});
