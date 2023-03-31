# test-gg-calendar

Project to login with gg account and add event to GG calendar

## Recommended Documents

* https://developers.google.com/identity/oauth2/web/guides/migration-to-gis
* https://github.com/yobaji/vue3-google-login
* https://developers.google.com/calendar/api/v3/reference?hl=vi

## Project Setup

```sh
yarn install
```

### Create .env file with content

```
VITE_GG_CALENDAR_CLIENT_ID=[GG client ID]
VITE_GG_CALENDAR_TOKEN_KEY="gg-calendar-access-token"
VITE_GG_CALENDAR_ID=[email of calendar]
```

## Compile and Hot-Reload for Development

```sh
yarn dev --port=3000
```

## Notes
* When create "OAuth 2.0 Client IDs" in Google Cloud Console,
    * Config "Authorized JavaScript origins" with 2 domains to dev in local:
        ```
        http://localhost:3000
        http://localhost
        ```