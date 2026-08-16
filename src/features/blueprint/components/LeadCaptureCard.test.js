// Launch fix #1 — LeadCaptureCard hardening: honeypot + metadata fields,
// duplicate-submit guard, and the after-failure "view anyway" escape hatch.
// @formspree/react is mocked so no network is ever touched.
import { render, screen, fireEvent } from "@testing-library/react";
import LeadCaptureCard from "./LeadCaptureCard";
import { BLUEPRINT_UI } from "../data/uiCopy";

jest.mock("@formspree/react", () => ({
  useForm: jest.fn(),
  ValidationError: () => null,
}));

const { useForm } = require("@formspree/react");

const IDLE = { submitting: false, succeeded: false, errors: null };
const FAILED = { submitting: false, succeeded: false, errors: {} };

function renderCard(state, props = {}) {
  const handleSubmit = jest.fn((e) => e.preventDefault());
  useForm.mockReturnValue([state, handleSubmit]);
  const utils = render(
    <LeadCaptureCard
      answers={{}}
      recommendation={{ topCityMatches: [] }}
      sessionId="bp-test"
      lang="en"
      onSuccess={props.onSuccess || jest.fn()}
      onBack={jest.fn()}
      onContinueAnyway={props.onContinueAnyway}
    />
  );
  return { ...utils, handleSubmit };
}

function hiddenField(container, name) {
  return container.querySelector(`input[name="${name}"]`);
}

test("submits with honeypot and consistent source metadata", () => {
  const { container } = renderCard(IDLE);
  expect(hiddenField(container, "source")).toHaveValue("blueprint-v2");
  expect(hiddenField(container, "form_name")).toHaveValue("blueprint_lead");
  expect(hiddenField(container, "page")).toHaveValue("/my-mexico-blueprint");
  expect(hiddenField(container, "language")).toHaveValue("en");

  const honeypot = hiddenField(container, "_gotcha");
  expect(honeypot).not.toBeNull();
  expect(honeypot).toHaveAttribute("aria-hidden", "true");
  expect(honeypot).toHaveAttribute("tabindex", "-1");
  expect(honeypot).toHaveClass("hidden");
});

test("a failed submission shows the error and the view-anyway escape hatch", () => {
  const onContinueAnyway = jest.fn();
  renderCard(FAILED, { onContinueAnyway });

  expect(screen.getByRole("alert")).toHaveTextContent(BLUEPRINT_UI.en.leadCapture.error);

  const escape = screen.getByRole("button", {
    name: BLUEPRINT_UI.en.leadCapture.continueAfterError,
  });
  fireEvent.click(escape);
  expect(onContinueAnyway).toHaveBeenCalledTimes(1);
});

test("the escape hatch never appears before a failure", () => {
  renderCard(IDLE, { onContinueAnyway: jest.fn() });
  expect(
    screen.queryByRole("button", { name: BLUEPRINT_UI.en.leadCapture.continueAfterError })
  ).toBeNull();
  expect(screen.queryByRole("alert")).toBeNull();
});

test("an in-flight submission blocks a duplicate submit", () => {
  const { container, handleSubmit } = renderCard({
    submitting: true,
    succeeded: false,
    errors: null,
  });
  fireEvent.submit(container.querySelector("form"));
  expect(handleSubmit).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: BLUEPRINT_UI.en.leadCapture.submitting })).toBeDisabled();
});

test("success calls onSuccess exactly once", () => {
  const onSuccess = jest.fn();
  renderCard({ submitting: false, succeeded: true, errors: null }, { onSuccess });
  expect(onSuccess).toHaveBeenCalledTimes(1);
});
