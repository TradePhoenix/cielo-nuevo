import { render, screen, act } from "@testing-library/react";
import BlueprintLoading from "./BlueprintLoading";

let mockPrefersReducedMotion = false;

jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => mockPrefersReducedMotion,
  };
});

beforeEach(() => {
  mockPrefersReducedMotion = false;
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("cycles through all interpretation messages and calls onComplete once at the end", () => {
  const onComplete = jest.fn();
  render(<BlueprintLoading onComplete={onComplete} />);

  expect(screen.getByText("We've been considering what matters most to you.")).toBeInTheDocument();
  expect(onComplete).not.toHaveBeenCalled();

  act(() => jest.advanceTimersByTime(650));
  expect(screen.getByText("Your answers point toward a particular rhythm of life.")).toBeInTheDocument();
  expect(onComplete).not.toHaveBeenCalled();

  act(() => jest.advanceTimersByTime(650));
  expect(screen.getByText("We think we've found a strong place to begin.")).toBeInTheDocument();
  expect(onComplete).not.toHaveBeenCalled();

  act(() => jest.advanceTimersByTime(650));
  expect(onComplete).toHaveBeenCalledTimes(1);
});

test("the full sequence completes in well under a lengthy wait, and clicking Show My Results short-circuits it immediately", () => {
  const onComplete = jest.fn();
  render(<BlueprintLoading onComplete={onComplete} />);

  act(() => jest.advanceTimersByTime(400));
  const skipButton = screen.getByRole("button", { name: "Show My Results" });

  act(() => skipButton.click());
  expect(onComplete).toHaveBeenCalledTimes(1);
});

test("reduced motion: results are shown immediately with no artificial waiting", () => {
  mockPrefersReducedMotion = true;
  const onComplete = jest.fn();
  render(<BlueprintLoading onComplete={onComplete} />);

  expect(onComplete).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("We've been considering what matters most to you.")).not.toBeInTheDocument();
});
