<script setup>

</script>

<template>
  <div class="body">
    <h1>Calendar App!</h1>
    <nav>
      <!-- use the router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
      <router-link to="/">Google Calendar</router-link>
      <router-link to="/ms-team">MS Team Calendar</router-link>
    </nav>

    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.body {
  padding: 1rem;
}

.body nav {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 3rem;
}

h1 {
  margin-bottom: 1rem;
}
</style>