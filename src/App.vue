<template>
  <div id="tree-wrapper">
    <CompanySwitcher />
    <NoCompanyPlaceholder v-if="route.name == 'NewCompany'" />
    <CompanyBrowser v-else />
  </div>
  <div id="page-wrapper">
    <router-view />
  </div>
</template>

<script>
import CompanyBrowser from "./modules/company-structure/components/CompanyBrowser.vue";
import CompanySwitcher from "./modules/company-structure/components/CompanySwitcher.vue";
import NoCompanyPlaceholder from "./modules/company-structure/components/NoCompanyPlaceholder.vue";
import { syncNodes, useChildNodes } from "./services/firebase/nodeRepository";
import { useRoute } from "vue-router";
import { computed } from "@vue/runtime-core";
export default {
  components: { CompanyBrowser, CompanySwitcher, NoCompanyPlaceholder },

  setup() {
    const route = useRoute();
    syncNodes();
    return { route };
  },
};
</script>

<style>
@import url("./assets/css/font-faces.css");
@import url("./assets/css/main.css");

body {
  margin: 0;
}

#app {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 2rem;
  height: 100vh;
  overflow: hidden;
}

#tree-wrapper {
  padding: 4rem;
}

#page-wrapper {
  background-color: white;
  border-radius: 50px 0 0 50px;
  padding: 2rem 5rem;
  overflow-y: auto;
}
</style>
