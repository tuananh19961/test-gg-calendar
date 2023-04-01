<script setup>
import MSapi from './graph';

import HelloWorld from '../components/HelloWorld.vue';
import { mockMsTeamEvent } from '../config';

// Create MSAPI client
const api = new MSapi();

/**
 * Add event to calendar
 * If logined: Add event to GG calendar
 * If not logined: Re-login and add event to GG calendar
 */
const onAddEvent = () => {
  api.events()
    .create(mockMsTeamEvent)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

const onGetCalendar = () => {
  api.events()
    .get('/me/events', { orderBy: 'subject DESC' })
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="MS-TEAM" />

      <button class="btn btn-primary" @click.prevent="onAddEvent">
        Add event to MS-Team Calendar
      </button>

      <button class="btn btn-primary" @click.prevent="onGetCalendar">Calendar</button>
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
