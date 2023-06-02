import { v4 as uuid } from "uuid";
import {
  TreeBrowserNode,
  TreeBrowserNodeCollection,
} from "../../assets/js/tree-browser/utils";

export default new TreeBrowserNodeCollection([
  new TreeBrowserNode(uuid(), {
    component: null,
    attributes: { name: "Headquarter" },
  }),
  new TreeBrowserNode(uuid(), {
    component: null,
    attributes: { name: "Office customer care" },
  }),
  new TreeBrowserNode(
    uuid(),
    {
      component: null,
      attributes: { name: "Example Germany GmbH" },
    },
    {
      childCollection: new TreeBrowserNodeCollection([
        new TreeBrowserNode(uuid(), {
          component: null,
          attributes: { name: "Headquarter" },
        }),
        new TreeBrowserNode(uuid(), {
          component: null,
          attributes: { name: "Store Berlin" },
        }),
        new TreeBrowserNode(uuid(), {
          component: null,
          attributes: { name: "Store Hamburg" },
        }),
        new TreeBrowserNode(uuid(), {
          component: null,
          attributes: { name: "Store Achen" },
        }),
      ]),
    }
  ),
  new TreeBrowserNode(
    uuid(),
    {
      component: null,
      attributes: { name: "Example Germany GmbH" },
    },
    {
      childCollection: new TreeBrowserNodeCollection([
        new TreeBrowserNode(uuid(), {
          component: null,
          attributes: { name: "Headquarter" },
        }),
        new TreeBrowserNode(uuid(), {
          component: null,
          attributes: { name: "Store London" },
        }),
        new TreeBrowserNode(uuid(), {
          component: null,
          attributes: { name: "Store Edinburgh" },
        }),
        new TreeBrowserNode(uuid(), {
          component: null,
          attributes: { name: "Store Oban" },
        }),
      ]),
    }
  ),
]);
