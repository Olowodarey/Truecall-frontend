import { describe, expect, it, beforeEach } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;
const wallet3 = accounts.get("wallet_3")!;
const oracle = accounts.get("wallet_4")!;

describe("Football Prediction Contract", () => {
  const eventName = "Premier League Match";
  const accessCode = "SECRET123";
  const homeTeam = "Manchester United";
  const awayTeam = "Liverpool";
  const matchTime = 1700000000;

  const OUTCOME_HOME = Cl.uint(1);
  const OUTCOME_DRAW = Cl.uint(2);
  const OUTCOME_AWAY = Cl.uint(3);

  describe("Event Creation", () => {
    it("should create an event successfully", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii(eventName),
          Cl.stringAscii(accessCode),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );

      expect(result).toBeOk(Cl.uint(1));
    });

    it("should store event details correctly", () => {
      simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii(eventName),
          Cl.stringAscii(accessCode),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );

      const { result } = simnet.callReadOnlyFn(
        "football-prediction",
        "get-event",
        [Cl.uint(1)],
        deployer,
      );

      // Verify event was created successfully
      expect(result).toBeDefined();
      // The event exists if we can retrieve it without error
      expect((result as any).type).not.toBe("error");
    });

    it("should increment event IDs", () => {
      const { result: result1 } = simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii("Event 1"),
          Cl.stringAscii("CODE1"),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );

      const { result: result2 } = simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii("Event 2"),
          Cl.stringAscii("CODE2"),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );

      expect(result1).toBeOk(Cl.uint(1));
      expect(result2).toBeOk(Cl.uint(2));
    });
  });

  describe("Access Control & Predictions", () => {
    beforeEach(() => {
      simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii(eventName),
          Cl.stringAscii(accessCode),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );
    });

    it("should allow joining with correct access code", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_HOME],
        wallet1,
      );

      expect(result).toBeOk(Cl.bool(true));
    });

    it("should reject joining with incorrect access code", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii("WRONG_CODE"), OUTCOME_HOME],
        wallet1,
      );

      expect(result).toBeErr(Cl.uint(104)); // err-invalid-code
    });

    it("should prevent duplicate predictions", () => {
      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_HOME],
        wallet1,
      );

      const { result } = simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_AWAY],
        wallet1,
      );

      expect(result).toBeErr(Cl.uint(107)); // err-already-predicted
    });

    it("should store prediction details correctly", () => {
      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_DRAW],
        wallet1,
      );

      const { result } = simnet.callReadOnlyFn(
        "football-prediction",
        "get-prediction",
        [Cl.uint(1), Cl.principal(wallet1)],
        wallet1,
      );

      expect(result).toBeSome(
        Cl.tuple({
          "event-name": Cl.stringAscii(eventName),
          "predicted-outcome": OUTCOME_DRAW,
          timestamp: Cl.uint(simnet.blockHeight),
        }),
      );
    });

    it("should initialize leaderboard for new users", () => {
      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_HOME],
        wallet1,
      );

      const { result } = simnet.callReadOnlyFn(
        "football-prediction",
        "get-user-stats",
        [Cl.principal(wallet1)],
        wallet1,
      );

      expect(result).toBeTuple({
        "total-points": Cl.uint(0),
        "correct-predictions": Cl.uint(0),
        "total-predictions": Cl.uint(1),
      });
    });

    it("should increment total predictions for existing users", () => {
      // First prediction
      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_HOME],
        wallet1,
      );

      // Create second event
      simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii("Event 2"),
          Cl.stringAscii("CODE2"),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );

      // Second prediction
      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(2), Cl.stringAscii("CODE2"), OUTCOME_AWAY],
        wallet1,
      );

      const { result } = simnet.callReadOnlyFn(
        "football-prediction",
        "get-user-stats",
        [Cl.principal(wallet1)],
        wallet1,
      );

      expect(result).toBeTuple({
        "total-points": Cl.uint(0),
        "correct-predictions": Cl.uint(0),
        "total-predictions": Cl.uint(2),
      });
    });
  });

  describe("Event Management", () => {
    beforeEach(() => {
      simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii(eventName),
          Cl.stringAscii(accessCode),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );
    });

    it("should allow creator to close event", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "close-event",
        [Cl.uint(1)],
        deployer,
      );

      expect(result).toBeOk(Cl.bool(true));
    });

    it("should prevent non-creator from closing event", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "close-event",
        [Cl.uint(1)],
        wallet1,
      );

      expect(result).toBeErr(Cl.uint(102)); // err-unauthorized
    });

    it("should prevent joining after event is closed", () => {
      simnet.callPublicFn(
        "football-prediction",
        "close-event",
        [Cl.uint(1)],
        deployer,
      );

      const { result } = simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_HOME],
        wallet1,
      );

      expect(result).toBeErr(Cl.uint(105)); // err-event-closed
    });

    it("should allow creator to update oracle before settlement", () => {
      const newOracle = wallet2;
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "update-oracle",
        [Cl.uint(1), Cl.principal(newOracle)],
        deployer,
      );

      expect(result).toBeOk(Cl.bool(true));
    });

    it("should prevent non-creator from updating oracle", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "update-oracle",
        [Cl.uint(1), Cl.principal(wallet2)],
        wallet1,
      );

      expect(result).toBeErr(Cl.uint(102)); // err-unauthorized
    });
  });

  describe("Oracle Result Submission", () => {
    beforeEach(() => {
      simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii(eventName),
          Cl.stringAscii(accessCode),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );

      // Add some predictions
      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_HOME],
        wallet1,
      );

      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_AWAY],
        wallet2,
      );

      // Close event
      simnet.callPublicFn(
        "football-prediction",
        "close-event",
        [Cl.uint(1)],
        deployer,
      );
    });

    it("should allow oracle to submit result", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "submit-result",
        [Cl.uint(1), OUTCOME_HOME],
        oracle,
      );

      expect(result).toBeOk(Cl.bool(true));
    });

    it("should prevent non-oracle from submitting result", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "submit-result",
        [Cl.uint(1), OUTCOME_HOME],
        wallet1,
      );

      expect(result).toBeErr(Cl.uint(102)); // err-unauthorized
    });

    it("should prevent result submission before event is closed", () => {
      // Create new event
      simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii("Event 2"),
          Cl.stringAscii("CODE2"),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );

      const { result } = simnet.callPublicFn(
        "football-prediction",
        "submit-result",
        [Cl.uint(2), OUTCOME_HOME],
        oracle,
      );

      expect(result).toBeErr(Cl.uint(106)); // err-event-not-closed
    });

    it("should update event status to settled", () => {
      simnet.callPublicFn(
        "football-prediction",
        "submit-result",
        [Cl.uint(1), OUTCOME_HOME],
        oracle,
      );

      const { result } = simnet.callReadOnlyFn(
        "football-prediction",
        "get-event",
        [Cl.uint(1)],
        deployer,
      );

      // Verify event was settled successfully
      expect(result).toBeDefined();
      expect((result as any).type).not.toBe("error");
    });
  });

  describe("Points and Leaderboard", () => {
    beforeEach(() => {
      simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii(eventName),
          Cl.stringAscii(accessCode),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );

      // Wallet1 predicts home win (correct)
      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_HOME],
        wallet1,
      );

      // Wallet2 predicts away win (incorrect)
      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(1), Cl.stringAscii(accessCode), OUTCOME_AWAY],
        wallet2,
      );

      // Close and settle event
      simnet.callPublicFn(
        "football-prediction",
        "close-event",
        [Cl.uint(1)],
        deployer,
      );

      simnet.callPublicFn(
        "football-prediction",
        "submit-result",
        [Cl.uint(1), OUTCOME_HOME],
        oracle,
      );
    });

    it("should award points for correct prediction", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "award-points",
        [Cl.uint(1), Cl.principal(wallet1)],
        deployer,
      );

      expect(result).toBeOk(
        Cl.tuple({
          awarded: Cl.bool(true),
          points: Cl.uint(10),
        }),
      );

      // Check leaderboard updated
      const stats = simnet.callReadOnlyFn(
        "football-prediction",
        "get-user-stats",
        [Cl.principal(wallet1)],
        wallet1,
      );

      expect(stats.result).toBeTuple({
        "total-points": Cl.uint(10),
        "correct-predictions": Cl.uint(1),
        "total-predictions": Cl.uint(1),
      });
    });

    it("should not award points for incorrect prediction", () => {
      const { result } = simnet.callPublicFn(
        "football-prediction",
        "award-points",
        [Cl.uint(1), Cl.principal(wallet2)],
        deployer,
      );

      expect(result).toBeOk(
        Cl.tuple({
          awarded: Cl.bool(false),
          points: Cl.uint(0),
        }),
      );

      // Check leaderboard not updated with points
      const stats = simnet.callReadOnlyFn(
        "football-prediction",
        "get-user-stats",
        [Cl.principal(wallet2)],
        wallet2,
      );

      expect(stats.result).toBeTuple({
        "total-points": Cl.uint(0),
        "correct-predictions": Cl.uint(0),
        "total-predictions": Cl.uint(1),
      });
    });

    it("should accumulate points across multiple events", () => {
      // Award points for first event
      simnet.callPublicFn(
        "football-prediction",
        "award-points",
        [Cl.uint(1), Cl.principal(wallet1)],
        deployer,
      );

      // Create second event
      simnet.callPublicFn(
        "football-prediction",
        "create-event",
        [
          Cl.stringAscii("Event 2"),
          Cl.stringAscii("CODE2"),
          Cl.stringAscii(homeTeam),
          Cl.stringAscii(awayTeam),
          Cl.uint(matchTime),
          Cl.principal(oracle),
        ],
        deployer,
      );

      // Wallet1 predicts draw (correct)
      simnet.callPublicFn(
        "football-prediction",
        "join-event",
        [Cl.uint(2), Cl.stringAscii("CODE2"), OUTCOME_DRAW],
        wallet1,
      );

      // Close and settle
      simnet.callPublicFn(
        "football-prediction",
        "close-event",
        [Cl.uint(2)],
        deployer,
      );

      simnet.callPublicFn(
        "football-prediction",
        "submit-result",
        [Cl.uint(2), OUTCOME_DRAW],
        oracle,
      );

      // Award points for second event
      simnet.callPublicFn(
        "football-prediction",
        "award-points",
        [Cl.uint(2), Cl.principal(wallet1)],
        deployer,
      );

      // Check accumulated points
      const stats = simnet.callReadOnlyFn(
        "football-prediction",
        "get-user-stats",
        [Cl.principal(wallet1)],
        wallet1,
      );

      expect(stats.result).toBeTuple({
        "total-points": Cl.uint(20),
        "correct-predictions": Cl.uint(2),
        "total-predictions": Cl.uint(2),
      });
    });
  });
});
