import {
  daysUntilLaunch,
  getCountdownDisplay,
  getMilestoneStates,
} from "./launchCountdown";

// America/Cancun is fixed UTC-5 (no DST). 12:00 UTC = 07:00 Cancun.
const cancunNoonUTC = (iso) => new Date(`${iso}T12:00:00Z`);

describe("daysUntilLaunch", () => {
  it("counts whole Cancun-local days to October 1, 2026", () => {
    expect(daysUntilLaunch(cancunNoonUTC("2026-08-16"))).toBe(46);
    expect(daysUntilLaunch(cancunNoonUTC("2026-09-30"))).toBe(1);
  });

  it("is 0 on launch day and negative after", () => {
    expect(daysUntilLaunch(cancunNoonUTC("2026-10-01"))).toBe(0);
    expect(daysUntilLaunch(cancunNoonUTC("2026-10-02"))).toBe(-1);
  });

  it("uses Cancun local date, not UTC date", () => {
    // 2026-10-01T03:00Z is still 2026-09-30 22:00 in Cancun (UTC-5).
    expect(daysUntilLaunch(new Date("2026-10-01T03:00:00Z"))).toBe(1);
    // 2026-10-01T05:00Z is exactly Cancun midnight on launch day.
    expect(daysUntilLaunch(new Date("2026-10-01T05:00:00Z"))).toBe(0);
  });
});

describe("getCountdownDisplay", () => {
  it("shows the day count before launch", () => {
    expect(getCountdownDisplay(cancunNoonUTC("2026-08-16"))).toEqual({
      mode: "countdown",
      days: 46,
      label: "46",
    });
  });

  it("shows LAUNCH DAY at zero days", () => {
    expect(getCountdownDisplay(cancunNoonUTC("2026-10-01"))).toEqual({
      mode: "launch-day",
      days: 0,
      label: "LAUNCH DAY",
    });
  });

  it("shows LAUNCHED after October 1 and never a negative count", () => {
    const display = getCountdownDisplay(cancunNoonUTC("2026-12-25"));
    expect(display).toEqual({ mode: "launched", days: 0, label: "LAUNCHED" });
  });
});

describe("getMilestoneStates", () => {
  it("marks the next milestone current and later ones upcoming", () => {
    const states = getMilestoneStates(cancunNoonUTC("2026-08-16")); // T-46
    expect(states[0]).toMatchObject({ title: "T-45", state: "current" });
    expect(states[1]).toMatchObject({ title: "T-30", state: "upcoming" });
    expect(states.every((m) => m.state !== "past")).toBe(true);
  });

  it("marks crossed milestones as past", () => {
    const states = getMilestoneStates(cancunNoonUTC("2026-09-10")); // T-21
    expect(states.find((m) => m.title === "T-45").state).toBe("past");
    expect(states.find((m) => m.title === "T-30").state).toBe("past");
    expect(states.find((m) => m.title === "T-21").state).toBe("current");
  });

  it("marks everything past once launched", () => {
    const states = getMilestoneStates(cancunNoonUTC("2026-10-05"));
    expect(states.every((m) => m.state === "past")).toBe(true);
  });
});
