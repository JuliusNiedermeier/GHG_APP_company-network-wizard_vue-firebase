import router from "./router";

export const registerModule = (module) => {
  if (module.registerRoutes) {
    module.registerRoutes(router);
  }
};

export const registerModules = (modules) => {
  modules.forEach((module) => registerModule(module));
};
