<template>
  <div
    class="my-node-body-add"
    :class="{ 'text-accent': active }"
    @click="onClick"
  >
    <fa class="my-node-body-add__icon" icon="plus" />
    <span class="my-node-body-add__label">Add item...</span>
  </div>
</template>

<script>
export default {
  name: "CompanyBrowserNodeItemAdd",
  props: {
    node: Object,
    active: Boolean,
  },

  setup(props, context) {
    function onClick() {
      context.emit("action", { type: "add" });
    }

    return { onClick };
  },
};
</script>

<style>
.my-node-body-add {
  padding: 10px 0;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  opacity: 0.5;
  color: blue;
}

.my-node-body-add:hover {
  opacity: 1;
}

.my-node-body-add__label {
  white-space: nowrap;
  flex: 1;
}
</style>
