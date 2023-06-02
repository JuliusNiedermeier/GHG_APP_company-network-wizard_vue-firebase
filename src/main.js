import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBuilding,
  faLocationArrow,
  faChevronDown,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { registerModules } from "./registerModules";

import companyStructureModule from "./modules/company-structure";

registerModules([companyStructureModule]);

library.add(faBuilding, faLocationArrow, faChevronDown, faPlus, faChevronRight);

const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.use(router);
app.mount("#app");
