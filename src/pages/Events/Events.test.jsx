import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mock EventCard to just render the event title for simplicity
vi.mock("../../components/EventCard/EventCard", () => ({
  __esModule: true,
  default: ({ title }) => <div data-testid="event-card">{title}</div>,
}));

const mockEvents = [
  { id: "1", title: "Event One", date: "2099-01-01" },
  { id: "2", title: "Event Two", date: "2099-02-01" },
];

// Partial mock for firebase/firestore to provide getFirestore and mock getDocs/collection
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    collection: vi.fn(() => ({})),
    getDocs: vi.fn(async () => ({
      docs: mockEvents.map((event) => ({
        id: event.id,
        data: () => ({ ...event }),
      })),
    })),
  };
});

import Events from "./Events";

describe("Events", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );
    expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading events/i)).not.toBeInTheDocument();
    });
  });

  it("renders all the events properly", async () => {
    render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );
    // Wait for event cards to appear
    await waitFor(() => {
      expect(screen.getByText("Event One")).toBeInTheDocument();
      expect(screen.getByText("Event Two")).toBeInTheDocument();
    });
    // Optionally, check the number of event cards
    const cards = screen.getAllByTestId("event-card");
    expect(cards).toHaveLength(2);
  });
});
