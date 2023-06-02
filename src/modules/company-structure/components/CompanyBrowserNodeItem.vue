<template>
  <div
    class="company-browser-node-item text-accent-on-hover"
    :class="{ 'is-location': !isCompany, 'has-children': node.hasChildren }"
  >
    <div class="company-browser-node-item__controlls" v-if="node.hasChildren">
      <fa
        class="company-browser-node-item__controlls__icon"
        icon="chevron-down"
        :style="{ transform: `rotate(${expanded ? 0 : -90}deg)` }"
        @click="onClick"
      />
    </div>
    <fa
      class="company-browser-node-item__icon"
      :icon="isCompany ? 'building' : 'location-arrow'"
    />
    <span class="company-browser-node-item__label" @click="onLabelClick">{{
      name
    }}</span>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import {
  emitAction,
  TreeBrowserNode,
} from "../../../assets/js/tree-browser/utils";
export default {
  name: "BaseTreeBrowserNodeBody",
  props: {
    node: TreeBrowserNode,
    name: String,
    isCompany: Boolean,
    expanded: Boolean,
  },

  setup(props, context) {
    function onClick({ shiftKey }) {
      // console.log("Expand");
      context.emit("togglerequest");
      // emitAction(context, "togglerequest", { shiftKey });
    }

    const router = useRouter();

    function onLabelClick() {
      if (props.isCompany) {
        router.push({
          name: "AddLocation",
          query: { node: props.node.id },
        });
      }
    }

    return { onClick, onLabelClick };
  },
};
</script>

<style>
.company-browser-node-item {
  padding: 10px 0;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: min-content;
  gap: 1rem;
  background-color: rgba(0, 0, 255, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  color: rgba(0, 0, 0, 0.8);
}

.company-browser-node-item.is-location,
.company-browser-node-item:not(.has-children) {
  /* margin-left: 2rem; */
}

.company-browser-node-item__label {
  white-space: nowrap;
  flex: 1;
}

.company-browser-node-item__controlls {
  /* margin-right: 0.5rem; */
}

.company-browser-node-item__controlls__icon {
  transform: rotate(-90deg);
}
</style>
