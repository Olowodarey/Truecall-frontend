"use client";

import { useState } from "react";
import { Event, MatchResult } from "@/lib/types";
import { openContractCall } from "@stacks/connect";
import { uintCV, stringAsciiCV } from "@stacks/transactions";
import { STACKS_TESTNET } from "@stacks/network";

interface PredictionModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PredictionModal({
  event,
  isOpen,
  onClose,
}: PredictionModalProps) {
  const [accessCode, setAccessCode] = useState("");
  const [prediction, setPrediction] = useState<MatchResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !event || !event.match) {
    return null;
  }

  const handleSubmit = async () => {
    if (!accessCode || !prediction) {
      setError("Please enter access code and select a prediction");
      return;
    }

    if (!event.contractEventId) {
      setError("Event not yet confirmed on blockchain");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
      const contractName =
        process.env.NEXT_PUBLIC_CONTRACT_NAME || "football-prediction";

      await openContractCall({
        network: STACKS_TESTNET,
        contractAddress,
        contractName,
        functionName: "join-event",
        functionArgs: [
          uintCV(event.contractEventId),
          stringAsciiCV(accessCode),
          uintCV(prediction),
        ],
        onFinish: (data: { txId: string }) => {
          console.log("Transaction submitted:", data.txId);
          setSuccess(true);
          setTimeout(() => {
            onClose();
            resetForm();
          }, 2000);
        },
        onCancel: () => {
          setIsSubmitting(false);
          setError("Transaction cancelled");
        },
      });
    } catch (err) {
      console.error("Error submitting prediction:", err);
      setError(
        err instanceof Error ? err.message : "Failed to submit prediction",
      );
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setAccessCode("");
    setPrediction(null);
    setError(null);
    setSuccess(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      resetForm();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Make Your Prediction
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Event Info */}
        <div className="mb-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-2">
            {event.eventName}
          </h3>
          <p className="text-gray-300">
            {event.match.homeTeam} <span className="text-gray-500">vs</span>{" "}
            {event.match.awayTeam}
          </p>
        </div>

        {/* Access Code Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Access Code
          </label>
          <input
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
            placeholder="Enter event access code"
          />
        </div>

        {/* Prediction Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Your Prediction
          </label>
          <div className="space-y-3">
            <button
              onClick={() => setPrediction(MatchResult.HOME_WIN)}
              disabled={isSubmitting}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                prediction === MatchResult.HOME_WIN
                  ? "bg-orange-500/20 border-orange-500 text-white"
                  : "bg-gray-700/30 border-gray-600 text-gray-300 hover:border-orange-500/50"
              } disabled:opacity-50`}
            >
              <span className="font-semibold">{event.match.homeTeam} Wins</span>
            </button>

            <button
              onClick={() => setPrediction(MatchResult.DRAW)}
              disabled={isSubmitting}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                prediction === MatchResult.DRAW
                  ? "bg-orange-500/20 border-orange-500 text-white"
                  : "bg-gray-700/30 border-gray-600 text-gray-300 hover:border-orange-500/50"
              } disabled:opacity-50`}
            >
              <span className="font-semibold">Draw</span>
            </button>

            <button
              onClick={() => setPrediction(MatchResult.AWAY_WIN)}
              disabled={isSubmitting}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                prediction === MatchResult.AWAY_WIN
                  ? "bg-orange-500/20 border-orange-500 text-white"
                  : "bg-gray-700/30 border-gray-600 text-gray-300 hover:border-orange-500/50"
              } disabled:opacity-50`}
            >
              <span className="font-semibold">{event.match.awayTeam} Wins</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
            Prediction submitted successfully!
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !accessCode || !prediction}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? "Submitting..." : "Submit Prediction"}
        </button>

        <p className="mt-4 text-xs text-gray-400 text-center">
          Make sure you have a Stacks wallet installed and connected
        </p>
      </div>
    </div>
  );
}
