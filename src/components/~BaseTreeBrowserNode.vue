<template>
  <div class="tree-browser-node" ref="nodeRef">
    <component
      :is="itemComponent"
      :node="node"
      @togglerequest="onTogglerequest"
      @action="onAction"
    />
    <div class="tree-browser-node__children" v-if="hasChildren && expanded">
      <BaseTreeBrowserNode
        v-for="childNode in node.children"
        :key="childNode.name"
        :node="childNode"
        :itemComponent="itemComponent"
        :origin="[...origin, node.id]"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "BaseTreeBrowserNode",
  props: {
    itemComponent: {
      type: Object,
      required: true,
    },

    node: {
      type: Object,
      required: true,
    },

    origin: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const nodeRef = ref(null);
    let expanded = ref(false);
    let hasChildren = false;

    if (
      props.node.children &&
      Array.isArray(props.node.children) &&
      props.node.children.length
    ) {
      hasChildren = true;
    }

    function toggleChildren(toggleState = !expanded.value) {
      if (hasChildren) {
        expanded.value = toggleState;
      }
    }

    function onTogglerequest() {
      toggleChildren();
    }

    function onAction(event) {
      nodeRef.value.dispatchEvent(
        new CustomEvent("actionclicked", {
          bubbles: true,
          cancelable: true,
          detail: { ...event, nodeId: props.node.id, origin: props.origin },
        })
      );
    }

    return {
      expanded,
      nodeRef,
      hasChildren,
      onTogglerequest,
      onAction,
    };
  },
};
</script>

<style>
.tree-browser-node__children {
  padding-left: 2rem;
}
</style>
