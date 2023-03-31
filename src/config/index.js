export const Config = {
  tokenPrefix: import.meta.env.VITE_GG_CALENDAR_TOKEN_KEY,
  clientId: import.meta.env.VITE_GG_CALENDAR_CLIENT_ID,
  calendarId: import.meta.env.VITE_GG_CALENDAR_ID,
  scopes: "email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
}

export const mockEvent = {
  'summary': 'Google I/O 2023',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2023-03-30T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2023-03-30T17:00:00-10:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [],
  'reminders': {
    'useDefault': false,
    'overrides': [
      { 'method': 'email', 'minutes': 24 * 60 },
      { 'method': 'popup', 'minutes': 10 }
    ]
  }
}