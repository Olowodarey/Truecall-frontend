# Creating Test Events

To test the prediction functionality, you need to create events in the backend. Here's how:

## Option 1: Using the Backend API Directly

### Step 1: First, sync matches from the football API

```bash
curl -X POST http://localhost:3001/api/matches/sync
```

This will fetch upcoming matches and store them in the database.

### Step 2: Get a match ID

```bash
curl http://localhost:3001/api/matches/upcoming
```

Look for a match in the response and note its `id`.

### Step 3: Create an event for that match

```bash
curl -X POST http://localhost:3001/api/oracle/create-event \
  -H "Content-Type: application/json" \
  -d '{
    "eventName": "Premier League Predictions",
    "matchId": 1,
    "accessCode": "PL2024"
  }'
```

Replace `matchId` with the actual match ID from step 2.

## Option 2: Using a REST Client (Postman, Insomnia, etc.)

**POST** `http://localhost:3001/api/oracle/create-event`

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "eventName": "Champions League Final Predictions",
  "matchId": 1,
  "accessCode": "UCL2024"
}
```

## Verify Events Were Created

```bash
curl http://localhost:3001/api/oracle/events
```

You should see your created events in the response.

## Test on Frontend

1. Navigate to `http://localhost:3000/events`
2. You should now see event cards displayed
3. Click "Join Event & Predict" on an open event
4. Enter the access code you used when creating the event
5. Select your prediction
6. Connect your Stacks wallet and submit

## Important Notes

- Make sure you have matches in the database before creating events
- The access code is required for users to join events
- Events will show as "OPEN" status initially
- You need a Stacks wallet (like Hiro Wallet) installed to submit predictions
