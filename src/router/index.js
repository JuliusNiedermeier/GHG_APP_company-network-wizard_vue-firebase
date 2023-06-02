import { createRouter, createWebHistory } from "vue-router";
import NewCompany from "../views/NewCompany";
import AddSubsidiary from "../views/AddSubsidiary";
import AddLocation from "../views/AddLocation";

const routes = [
  { path: "/", name: "NewCompany", component: NewCompany },
  {
    path: "/:id/add-subsidiary",
    name: "AddSubsidiary",
    component: AddSubsidiary,
  },
  { path: "/:id/add-location", name: "AddLocation", component: AddLocation },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
