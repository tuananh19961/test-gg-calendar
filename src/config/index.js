export const Config = {
  tokenPrefix: import.meta.env.VITE_GG_CALENDAR_TOKEN_KEY,
  clientId: import.meta.env.VITE_GG_CALENDAR_CLIENT_ID,
  calendarId: import.meta.env.VITE_GG_CALENDAR_ID,
  scopes: "email profile openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
  maxRetries: 3
}

export const MSconfig = {
  auth: {
    clientId: import.meta.env.VITE_MSTEAM_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MSTEAM_TENANT_ID}`,
    redirectUri: 'http://localhost:3000/'
  },
  cache: {
    cacheLocation: 'localStorage',
  },
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

export const mockMsTeamEvent = {
  "subject": "Let's go for lunch",
  "body": {
    "contentType": "HTML",
    "content": "Does noon work for you?"
  },
  "start": {
    "dateTime": "2017-04-15T12:00:00",
    "timeZone": "Pacific Standard Time"
  },
  "end": {
    "dateTime": "2017-04-15T14:00:00",
    "timeZone": "Pacific Standard Time"
  },
  "location": {
    "displayName": "Harry's Bar"
  },
  "attendees": [
    {
      "emailAddress": {
        "address": "samanthab@contoso.onmicrosoft.com",
        "name": "Samantha Booth"
      },
      "type": "required"
    }
  ],
  "allowNewTimeProposals": true,
  "transactionId": "7E163156-7762-4BEB-A1C6-729EA81755A7"
}