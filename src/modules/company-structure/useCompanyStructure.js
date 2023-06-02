import {
  TreeBrowserNodeCollection,
  TreeBrowserNode,
} from "../../assets/js/tree-browser/utils";
import { ref } from "vue";
import { validateNode } from "../../services/firebase/nodeRepository";

const nodeCollection = ref(new TreeBrowserNodeCollection([]));

export const useCompanyStructure = () => {
  function updateCompanyStructureWithNodesList(nodesList, component) {
    if (!Array.isArray(nodesList) || !nodesList.length) return;
    const companyRootNode = nodesList.filter((node) => !node.parentId)[0];

    if (!companyRootNode) {
      nodeCollection.value = new TreeBrowserNodeCollection([]);
      return;
    }

    const companyNodes = nodesList.filter(
      (node) => node.parentId == companyRootNode.id
    );

    const newCollection = convertCompanyNodesToNewCollection(
      companyNodes,
      nodesList,
      component
    );

    nodeCollection.value = newCollection;
  }

  function convertCompanyNodesToNewCollection(
    companyNodes,
    allNodes,
    component
  ) {
    const treeBrowserNodes = [];
    companyNodes.forEach((currentNode) => {
      if (validateNode(currentNode)) {
        treeBrowserNodes.push(
          new TreeBrowserNode(
            currentNode.id,
            {
              component,
              attributes: { name: currentNode.name },
            },
            {
              childCollection: convertCompanyNodesToNewCollection(
                allNodes.filter((node) => node.parentId == currentNode.id),
                allNodes,
                component
              ),
            }
          )
        );
      }
    });
    return new TreeBrowserNodeCollection(treeBrowserNodes);
  }

  return {
    nodeCollection,
    updateCompanyStructureWithNodesList,
  };
};
