<template>
  <v-app>
    <v-main>
      <UsersTable/>
    </v-main>
  </v-app>
</template>

<script>
import UsersTable from "@/components/UsersTable";

export default {
  name: 'App',

  components: {
    UsersTable,
  },
};
</script>
