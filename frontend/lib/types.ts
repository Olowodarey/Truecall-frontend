// Event and Match types matching backend entities

export enum EventStatus {
  OPEN = "open",
  CLOSED = "closed",
  SETTLED = "settled",
}

export enum MatchStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum MatchResult {
  HOME_WIN = 1,
  DRAW = 2,
  AWAY_WIN = 3,
}

export interface Match {
  id: number;
  externalId: string;
  homeTeam: string;
  awayTeam: string;
  matchTime: number;
  status: MatchStatus;
  result: MatchResult | null;
  homeScore: number | null;
  awayScore: number | null;
  eventId: number | null;
  submittedToContract: boolean;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  eventName: string;
  contractEventId: number | null;
  matchId: number;
  match?: Match;
  accessCode: string;
  creator: string;
  oracle: string;
  status: EventStatus;
  transactionId: string | null;
  createdAt: string;
}

export interface PredictionPayload {
  eventId: number;
  prediction: MatchResult;
  accessCode: string;
}
