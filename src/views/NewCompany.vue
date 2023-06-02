<template>
  <div class="company-page">
    <h1>Wie heißt dein Unternehmen?</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" name="company-name" id="company-name" v-model="name" />
      <button type="submit" name="submit" id="submit">Los</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { createNode } from "../services/firebase/nodeRepository";
import { useRouter } from "vue-router";
export default {
  setup(props, context) {
    const router = useRouter();
    const name = ref("");

    function onSubmit() {
      createNode({ name: name.value, isCompany: true }).then((result) => {
        if (result.id)
          router.push({ name: "AddSubsidiary", params: { id: result.id } });
      });
    }
    return { onSubmit, name };
  },
};
</script>
