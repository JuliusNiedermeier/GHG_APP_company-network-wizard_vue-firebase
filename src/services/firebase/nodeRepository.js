import { firestore } from "./index";
import { ref } from "@vue/reactivity";
import { computed, onUnmounted } from "vue";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { Node } from "../../models/Node";

const nodeCollection = collection(firestore, "nodes");

export const createNode = (node) => {
  return addDoc(nodeCollection, node);
};

export const getNode = async (id) => {
  const node = await getDoc(doc(firestore, [nodeCollection.path, id]));
  return node.exists ? node.data() : null;
};

export const updateNode = (id, node) => {
  return updateDoc(doc(firestore, [nodeCollection.path, id]), node);
};

export const deleteNdoe = (id) => {
  return deleteDoc(doc(firestore, [nodeCollection.path, id]));
};

const nodes = ref([]);

export function useNodes() {
  return nodes;
}

export function useCompanies() {
  return computed(() => nodes.value.filter((node) => !node.data.parentId));
}

export function useChildNodes(id) {
  return computed(() => nodes.value.filter((node) => node.data.parentId == id));
}

function compareFunc(a, b) {
  if (!a.data.isCompany) return -1;
  else if (!b.data.isCompany) return 1;
  else return 0;
}

export function syncNodes() {
  const close = onSnapshot(nodeCollection, (snapshot) => {
    nodes.value = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
      .sort(compareFunc);
  });

  onUnmounted(close);
}

export const useLoadNodes = () => {
  const close = onSnapshot(nodeCollection, (snapshot) => {
    nodes.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });

  onUnmounted(close);

  return nodes;
};

export function validateNode(node) {
  if (node instanceof Node) return true;
  else throw new Error("Invalid data for type Node");
}
