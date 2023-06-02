<template>
  <div class="tree-browser-node__body text-accent-on-hover">
    <span class="tree-browser-node__body__label">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },

  setup() {},
};
</script>

<style>
.tree-browser-node__body {
  padding: 10px 0;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.tree-browser-node__body:focus {
  outline: 2px solid var(--color-accent);
}

.tree-browser-node__body__label {
  flex: 1;
}

.tree-browser-node__body__controlls {
  margin-left: 1rem;
}

.tree-browser-node__body__controlls__icon {
  transform: rotate(-90deg);
}

.expanded
  > .tree-browser-node__body
  > .tree-browser-node__body__controlls
  > .tree-browser-node__body__controlls__icon {
  transform: rotate(0);
}
</style>
