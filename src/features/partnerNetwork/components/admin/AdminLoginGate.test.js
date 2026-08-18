import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLoginGate from "./AdminLoginGate";

// Router-free component (per the project's Jest constraint), so it can be
// rendered directly.

test("loading state", () => {
  render(<AdminLoginGate connection="loading" onLogin={jest.fn()} />);
  expect(screen.getByRole("status")).toHaveTextContent(/loading/i);
});

test("not-configured state explains the development fallback", () => {
  render(<AdminLoginGate connection="not-configured" onLogin={jest.fn()} />);
  expect(screen.getByText(/backend not configured/i)).toBeInTheDocument();
  expect(screen.getByText(/docs\/data-foundation\/SETUP\.md/)).toBeInTheDocument();
});

test("error state offers retry", () => {
  const onRetry = jest.fn();
  render(<AdminLoginGate connection="error" onLogin={jest.fn()} onRetry={onRetry} />);
  fireEvent.click(screen.getByRole("button", { name: /try again/i }));
  expect(onRetry).toHaveBeenCalled();
});

test("login form submits credentials and shows a failure message", async () => {
  const onLogin = jest.fn().mockResolvedValue({ ok: false, message: "That email and password combination wasn't accepted." });
  render(<AdminLoginGate connection="auth-required" onLogin={onLogin} />);

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "kalen@pathtomexico.com" } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "hunter2" } });
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  await waitFor(() => expect(onLogin).toHaveBeenCalledWith("kalen@pathtomexico.com", "hunter2"));
  expect(await screen.findByRole("alert")).toHaveTextContent(/wasn't accepted/i);
  // The form re-enables for another attempt.
  expect(screen.getByRole("button", { name: /sign in/i })).toBeEnabled();
});

test("successful login never shows an error", async () => {
  const onLogin = jest.fn().mockResolvedValue({ ok: true });
  render(<AdminLoginGate connection="auth-required" onLogin={onLogin} />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "kalen@pathtomexico.com" } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "right" } });
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
  await waitFor(() => expect(onLogin).toHaveBeenCalled());
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
