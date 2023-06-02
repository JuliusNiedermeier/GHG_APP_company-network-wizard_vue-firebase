<template>
  <!-- <pre>{{ topLevelNodes }}</pre> -->
  <!-- <pre>{{ nodeCollection }}</pre> -->
  <BaseTreeBrowser :nodeCollection="nodeCollection" />
</template>

<script>
import BaseTreeBrowser from "../../../components/BaseTreeBrowser.vue";
import NoCompanyPlaceholder from "./NoCompanyPlaceholder.vue";
import CompanyBrowserNodeItem from "./CompanyBrowserNodeItem.vue";
import { markRaw } from "@vue/reactivity";
import { useNodes } from "../../../services/firebase/nodeRepository";
import { computed, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import {
  TreeBrowserNode,
  TreeBrowserNodeCollection,
} from "../../../assets/js/tree-browser/utils";

export default {
  components: { BaseTreeBrowser, NoCompanyPlaceholder },

  setup() {
    function onCardClick() {
      alert(
        "Switch to a different company.\nThis feature has not been implemented yet."
      );
    }

    const route = useRoute();

    const rawCompanyBrowserNodeItem = markRaw(CompanyBrowserNodeItem);
    const nodes = useNodes();

    const topLevelNodes = computed(() => {
      return nodes.value.filter((node) => {
        console.log(node.data);
        return node.data.parentId == route.params.id;
      });
    });

    const secondLevelNodes = computed(() => {
      const sln = [];
      topLevelNodes.value.forEach((tln) => {
        sln.push(...nodes.value.filter((node) => node.data.parentId == tln.id));
      });
      return sln;
    });

    const secondLevelTreeBrowserNodes = computed(() => {
      const _nodes = [];
      secondLevelNodes.value.forEach((sln) => {
        _nodes.push(
          new TreeBrowserNode(
            sln.id,
            {
              component: rawCompanyBrowserNodeItem,
              attributes: {
                name: sln.data.name,
                isCompany: sln.data.isCompany,
              },
            },
            {
              parentId: sln.data.parentId,
            }
          )
        );
      });
      return _nodes;
    });

    const topLevelTreeBrowserNodes = computed(() => {
      console.log("topLevelTreeBrowserNodes");
      const _nodes = [];
      topLevelNodes.value.forEach((tln) => {
        _nodes.push(
          new TreeBrowserNode(
            tln.id,
            {
              component: rawCompanyBrowserNodeItem,
              attributes: {
                name: tln.data.name,
                isCompany: tln.data.isCompany,
              },
            },
            {
              childCollection: new TreeBrowserNodeCollection(
                secondLevelTreeBrowserNodes.value.filter(
                  (node) => node.parentId == tln.id
                )
              ),
            }
          )
        );
      });
      return _nodes;
    });

    const nodeCollection = computed(() => {
      console.log("Generating the collection");
      return new TreeBrowserNodeCollection(topLevelTreeBrowserNodes.value);
    });

    watch(nodeCollection, console.log);

    // const { nodeCollection, updateCompanyStructureWithNodesList } =
    //   useCompanyStructure();

    // watch(nodes, (newNodes) => {
    //   updateCompanyStructureWithNodesList(newNodes, rawCompanyBrowserNodeItem);
    // });

    // const currentCompanyRootNode = computed(() => {
    //   return nodes.value.filter((node) => !node.parentId)[0];
    // });

    return {
      onCardClick,
      // nodeCollection,
      // currentCompanyRootNode,
      // route,
      secondLevelNodes,
      topLevelNodes,
      nodeCollection,
    };
  },
};
</script>

<style>
.company-info-card {
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid rgb(211, 211, 211);
  margin-bottom: 4rem;
  cursor: pointer;
}

.company-info-card h3 {
  margin: 0;
}
</style>
