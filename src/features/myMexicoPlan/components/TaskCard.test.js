import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskCard from "./TaskCard";

const TASK = {
  id: "test-task",
  title: "Open a Mexican bank account",
  realityNote: "Takes one appointment once you have your paperwork in order.",
  ownership: "self",
  estimate: { time: "1 day", cost: "$0" },
  guideLink: null,
};

function renderTaskCard(props) {
  return render(
    <MemoryRouter>
      <TaskCard task={TASK} onToggle={() => {}} {...props} />
    </MemoryRouter>
  );
}

test("does not play the completion pulse for a task that is already done on mount", () => {
  renderTaskCard({ done: true });
  expect(screen.queryByTestId("task-completion-pulse")).not.toBeInTheDocument();
});

test("does not play the completion pulse for a task that is already not-done on mount", () => {
  renderTaskCard({ done: false });
  expect(screen.queryByTestId("task-completion-pulse")).not.toBeInTheDocument();
});

test("plays the completion pulse only when the task transitions from incomplete to complete", () => {
  const { rerender } = renderTaskCard({ done: false });
  expect(screen.queryByTestId("task-completion-pulse")).not.toBeInTheDocument();

  rerender(
    <MemoryRouter>
      <TaskCard task={TASK} onToggle={() => {}} done />
    </MemoryRouter>
  );
  expect(screen.getByTestId("task-completion-pulse")).toBeInTheDocument();
});

test("does not play the completion pulse when un-completing a task", () => {
  const { rerender } = renderTaskCard({ done: true });
  rerender(
    <MemoryRouter>
      <TaskCard task={TASK} onToggle={() => {}} done={false} />
    </MemoryRouter>
  );
  expect(screen.queryByTestId("task-completion-pulse")).not.toBeInTheDocument();
});

test("rapid toggling never leaves more than one pulse element mounted", () => {
  const { rerender } = renderTaskCard({ done: false });

  const sequence = [true, false, true, false, true];
  sequence.forEach((done) => {
    rerender(
      <MemoryRouter>
        <TaskCard task={TASK} onToggle={() => {}} done={done} />
      </MemoryRouter>
    );
  });

  expect(screen.getAllByTestId("task-completion-pulse")).toHaveLength(1);
});

test("clicking the checkbox calls onToggle and preserves keyboard/screen-reader affordances", () => {
  const onToggle = jest.fn();
  renderTaskCard({ done: false, onToggle });

  const checkbox = screen.getByRole("button", { name: `Mark "${TASK.title}" as done` });
  expect(checkbox).toHaveAttribute("aria-pressed", "false");

  fireEvent.click(checkbox);
  expect(onToggle).toHaveBeenCalledTimes(1);
});
