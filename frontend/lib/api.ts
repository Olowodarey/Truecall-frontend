// API service for backend communication

import { Event } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Fetch all events from the backend
 */
export async function fetchEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/oracle/events`);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

/**
 * Fetch a single event by ID
 */
export async function fetchEventById(id: number): Promise<Event> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/oracle/events/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
}
