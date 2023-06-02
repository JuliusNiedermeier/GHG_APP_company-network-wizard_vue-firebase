<template>
  <div class="company-page">
    <h1 class="company-page__heading">
      Hat <span>{{ companyName }}</span> weitere Tochterfirmen?
    </h1>
    <form @submit.prevent="onSubmit">
      <input
        ref="subsidiaryInput"
        type="text"
        name="company-name"
        id="company-name"
        v-model="name"
        placeholder="Nenne eine Tochterfirma"
      />
      <button type="submit" name="submit" id="submit">+ Hinzufügen</button>
    </form>
    <button @click="onNext">Nein, weiter <fa icon="chevron-right" /></button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useCompanies, createNode } from "../services/firebase/nodeRepository";
export default {
  setup() {
    const subsidiaryInput = ref(null);
    const route = useRoute();
    const router = useRouter();
    const companies = useCompanies();
    const name = ref("");

    const company = computed(() => {
      return companies.value.find((node) => node.id == route.params.id);
    });

    const companyName = computed(() => {
      if (!company.value || !company.value.data) return;
      return company.value.data.name;
    });

    function focusOnInput() {
      if (!subsidiaryInput.value) return;
      subsidiaryInput.value.focus();
    }

    function resetInput() {
      if (!subsidiaryInput.value) return;
      name.value = "";
    }

    onMounted(() => {
      focusOnInput();
    });

    function onSubmit() {
      if (!subsidiaryInput.value || !subsidiaryInput.value.value) {
        alert("name cannot be empty");
        return;
      }
      createNode({
        name: name.value,
        isCompany: true,
        parentId: route.params.id,
      }).then(resetInput);
    }

    function onNext() {
      router.push({ name: "AddLocation", query: { node: route.params.id } });
    }

    return { companyName, subsidiaryInput, onSubmit, onNext, name };
  },
};
</script>

<style>
.company-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

.company-page__heading > span {
  color: blue;
}

.company-page > form {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.company-page > form > input {
  margin-right: 1rem;
  flex: 1;
}

.company-page > button {
  width: 100%;
}
</style>
