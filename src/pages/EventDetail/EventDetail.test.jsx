import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

const mockEvent = {
  id: "abc123",
  title: "Test Event",
  description: "This is a test event.",
  date: "2099-12-31",
  location: "Test City",
  organizerName: "John Doe",
  contactEmail: "john@example.com",
  category: "Technology",
  imageUrl: "https://example.com/image.jpg",
};

// Mock useParams to return a fixed eventId
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ eventId: mockEvent.id }),
  };
});

// Partial mock for firebase/firestore to provide getDoc and doc
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    doc: vi.fn(),
    getDoc: vi.fn(async () => ({
      id: mockEvent.id,
      exists: () => true,
      data: () => ({ ...mockEvent }),
    })),
  };
});

import EventDetail from "./EventDetail";


describe("EventDetail", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    render(<EventDetail />);
    expect(screen.getByText(/Loading event/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/Loading event/i)).not.toBeInTheDocument();
    });
  });

  it("fetches and displays the event properly", async () => {
    render(<EventDetail />);
    // Wait for event details to appear
    await waitFor(() => {
      expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
      expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
      expect(screen.getByText(mockEvent.date)).toBeInTheDocument();
      expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
      expect(screen.getByText(mockEvent.organizerName)).toBeInTheDocument();
      expect(screen.getByText(mockEvent.contactEmail)).toBeInTheDocument();
      expect(screen.getByText(mockEvent.category)).toBeInTheDocument();
    });
    // Check image alt text
    expect(screen.getByAltText(mockEvent.title)).toBeInTheDocument();
  });
});
