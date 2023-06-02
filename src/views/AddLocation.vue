<template>
  <div class="company-page">
    <h1 class="company-page__heading">
      Welche Standorte hat <span>{{ companyName }}</span
      >?
    </h1>
    <form class="company-page__form" @submit.prevent="onSubmit">
      <input
        ref="locationInput"
        type="text"
        name="location-name"
        id="location-name"
        v-model="name"
        placeholder="Nenne einen Standort"
      />
      <button type="submit" name="submit" id="submit">+ Hinzufügen</button>
    </form>
    <button @click="onNext">
      Keine weiteren Standorte <fa icon="chevron-right" />
    </button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import {
  createNode,
  useChildNodes,
  useNodes,
} from "../services/firebase/nodeRepository";
export default {
  setup() {
    const locationInput = ref(null);
    const route = useRoute();
    const router = useRouter();
    const nodes = useNodes();
    const processed = [];
    const name = ref("");

    const company = computed(() => {
      return nodes.value.find((node) => node.id == route.query.node);
    });

    const subsidiaries = computed(() => {
      const childNodes = useChildNodes(route.params.id);
      return childNodes.value.filter((node) => node.data.isCompany);
    });

    const companyName = computed(() => {
      if (!company.value || !company.value.data) return;
      return company.value.data.name;
    });

    function focusOnInput() {
      if (!locationInput.value) return;
      locationInput.value.focus();
    }

    function resetInput() {
      if (!locationInput.value) return;
      name.value = "";
    }

    onMounted(() => {
      focusOnInput();
    });

    function onSubmit() {
      if (!locationInput.value || !locationInput.value.value) {
        alert("name cannot be empty");
        return;
      }
      createNode({
        name: name.value,
        isCompany: false,
        parentId: route.query.node,
      }).then(resetInput);
    }

    function onNext() {
      processed.push(company.value.id);
      const nextSubsidiaries = subsidiaries.value.filter(
        (node) => !processed.includes(node.id)
      );
      if (!nextSubsidiaries.length) {
        router.push({ name: "NewCompany" });
      } else {
        resetInput();
        focusOnInput();
        router.push({ query: { node: nextSubsidiaries[0].id } });
      }
    }

    return { companyName, locationInput, onSubmit, onNext, name };
  },
};
</script>

<style>
.company-page__heading > span {
  color: blue;
}
</style>
