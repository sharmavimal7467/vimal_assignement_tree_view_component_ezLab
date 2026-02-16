import { useState } from "react";
import type { TreeNodeModel } from "../components/TreeView/tree.types";
// import { TreeNodeModel } from "../components/TreeView/tree.types";

export const useTree = (initialData: TreeNodeModel[]) => {
  const [tree, setTree] = useState<TreeNodeModel[]>(initialData);

  const toggleNode = (id: string) => {
    const toggle = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
      nodes.map(node => {
        if (node.id === id) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children) {
          return { ...node, children: toggle(node.children) };
        }
        return node;
      });

    setTree(prev => toggle(prev));
  };

  return {
    tree,
    toggleNode,
    setTree,
  };
};
