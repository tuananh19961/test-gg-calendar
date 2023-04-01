<script setup>
import axios from 'axios'
import { ref } from "vue";
import { googleSdkLoaded } from "vue3-google-login"

import { Cookie } from "./utils/cookie";
import { Config, mockEvent } from "./config";

import HelloWorld from './components/HelloWorld.vue'

/** Variables */
const isLogined = ref(Cookie.hasToken());
const retries = ref(0);

/**
 * Authenticate with Gmail
 * @param {*} callback
 */
const authenticateGoogle = () => new Promise((resolve, reject) => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2.initTokenClient({
      client_id: Config.clientId,
      scope: Config.scopes,
      callback: (response) => {
        console.log(response);
        if (response.access_token) {
          Cookie.setToken(response.access_token);
          isLogined.value = true;

          resolve(response);
        } else {
          reject(response);
        }
      }
    }).requestAccessToken();
  })
})

/**
 * Push event to calendarID
 * @param {*} event 
 */
const pushEvent = (event) => {
  const token = Cookie.getToken();
  axios.request({
    url: `https://www.googleapis.com/calendar/v3/calendars/${Config.calendarId}/events`,
    method: "POST",
    data: event,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  })
    .then(res => {
      window.alert(`Event [${res.data.id}] is created.`);
    })
    .catch(err => {

      const code = err.response?.data?.error?.code || 500;
      const message = err.response?.data?.error?.message || err.message;

      // Log message
      console.error(`[ERR-${code}]: ${message}`);

      // Clear token
      isLogined.value = false;
      Cookie.clearToken();

      // Retry
      onAddEvent();
    });
}

/**
 * Add event to calendar
 * If logined: Add event to GG calendar
 * If not logined: Re-login and add event to GG calendar
 */
const onAddEvent = () => {
  // Skip if retry many times
  if (retries.value > Config.maxRetries) return false;

  // GG Authenticate and push Event
  if (!isLogined.value) {
    authenticateGoogle()
      .then(() => pushEvent(mockEvent))
      .catch((err) => console.error(err.message));

    return;
  }

  // Add event to GG calendar
  pushEvent(mockEvent);
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="GG CALENDAR" />

      <button class="btn btn-primary" @click.prevent="onAddEvent">
        Add event to GG
      </button>
    </div>
  </header>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.py-2 {
  padding: 2rem 0;
}

.text-center {
  text-align: center;
}

.btn {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  transition: all ease-in-out 300ms;
}

.btn-primary {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-warning {
  color: #000;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn:hover {
  opacity: 0.5;
  transition: all ease-in-out 300ms;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    justify-content: center;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
