import { DndContext, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TreeNode } from "./TreeNode";
import type { TreeNodeModel } from "./tree.types";

interface Props {
  data: TreeNodeModel[];
  toggleNode: (id: string) => void;
  setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
}

const TreeView: React.FC<Props> = ({ data, toggleNode, setTree }) => {
  const tree = data;

  const findAndRemove = (nodes: TreeNodeModel[], id: string): [TreeNodeModel | null, TreeNodeModel[]] => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        const removed = nodes[i];
        const newNodes = [...nodes];
        newNodes.splice(i, 1);
        return [removed, newNodes];
      }
      const children = nodes[i].children ?? [];
      const [removed, newChildren] = findAndRemove(children, id);
      if (removed) {
        const newNodes = [...nodes];
        newNodes[i] = { ...nodes[i], children: newChildren.length ? newChildren : undefined };
        return [removed, newNodes];
      }
    }
    return [null, nodes];
  };

  const insertNode = (nodes: TreeNodeModel[], targetId: string, nodeToInsert: TreeNodeModel): TreeNodeModel[] => {
    return nodes.map((n) => {
      if (n.id === targetId) {
        return { ...n, children: [nodeToInsert, ...(n.children ?? [])], hasChildren: true, isExpanded: true };
      }
      return { ...n, children: n.children ? insertNode(n.children, targetId, nodeToInsert) : n.children };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTree((prev) => {
      const [draggedNode, treeWithoutDragged] = findAndRemove(prev, String(active.id));
      if (!draggedNode) return prev;
      return insertNode(treeWithoutDragged, String(over.id), draggedNode);
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tree.map((n) => n.id)} strategy={verticalListSortingStrategy}>
        {tree.map((node) => (
          <TreeNode key={node.id} node={node} toggleNode={toggleNode} setTree={setTree} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default TreeView;
