<template>
  <select class="company-switcher" name="company-switcher" @change="onChange">
    <option selected hidden>Kunden wählen...</option>
    <option
      v-for="company in companies"
      :key="company.id"
      :value="company.id"
      :selected="route.params.id == company.id"
    >
      {{ company.data.name }}
    </option>
  </select>
  <button v-if="route.name !== 'NewCompany'" @click="router.push('/')">
    Neue Firma
  </button>
</template>

<script>
import { useCompanies } from "../../../services/firebase/nodeRepository";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const companies = useCompanies();
    const router = useRouter();
    const route = useRoute();

    function onChange(event) {
      router.push({
        name: "AddSubsidiary",
        params: { id: event.target.value },
      });
    }

    return { companies, onChange, route, router };
  },
};
</script>

<style scoped>
.company-switcher {
  padding: 0.5rem 1rem;
  margin-bottom: 5rem;
  background-color: rgba(0, 0, 255, 0.05);
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: bold;
}

button {
  margin-left: 1rem;
}
</style>
