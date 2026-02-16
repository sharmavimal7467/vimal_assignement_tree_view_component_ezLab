// import type { TreeNodeModel } from "./tree.types";
// import { TreeNode } from "./TreeNode";

// interface Props {
//   data: TreeNodeModel[];
//   toggleNode: (id: string) => void;
//   setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
// }

// export const TreeView: React.FC<Props> = ({
//   data,
//   toggleNode,
//   setTree,
// }) => {
//   return (
//     <div>
//       {data.map((node) => (
//         <TreeNode
//           key={node.id}
//           node={node}
//           toggleNode={toggleNode}
//           setTree={setTree}
//         />
//       ))}
//     </div>
//   );
// };


// import React from "react";
// import {
//   DndContext,
//   closestCenter,
// } from "@dnd-kit/core";
// import type { DragEndEvent } from "@dnd-kit/core";

// import type { TreeNodeModel } from "./tree.types";
// import { TreeNode } from "./TreeNode";

// interface Props {
//   data: TreeNodeModel[];
//   toggleNode: (id: string) => void;
//   setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
// }

// export const TreeView: React.FC<Props> = ({
//   data,
//   toggleNode,
//   setTree,
// }) => {

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const activeId = String(active.id);
//     const overId = String(over.id);

//     setTree((prevTree) => {

//       let draggedNode: TreeNodeModel | null = null;

//       // 🔹 Remove dragged node
//       const removeNode = (
//         nodes: TreeNodeModel[]
//       ): TreeNodeModel[] =>
//         nodes
//           .filter((node) => {
//             if (node.id === activeId) {
//               draggedNode = node;
//               return false;
//             }
//             return true;
//           })
//           .map((node) => ({
//             ...node,
//             children: node.children
//               ? removeNode(node.children)
//               : node.children,
//           }));

//       const treeWithoutDragged = removeNode(prevTree);
//       if (!draggedNode) return prevTree;

//       // 🔹 Prevent dropping into its own child
//       const isDescendant = (
//         node: TreeNodeModel,
//         targetId: string
//       ): boolean => {
//         if (!node.children) return false;
//         return node.children.some(
//           (child) =>
//             child.id === targetId ||
//             isDescendant(child, targetId)
//         );
//       };

//       if (isDescendant(draggedNode, overId)) {
//         return prevTree;
//       }

//       // 🔹 Insert dragged node into new parent
//       const insertNode = (
//         nodes: TreeNodeModel[]
//       ): TreeNodeModel[] =>
//         nodes.map((node) => {
//           if (node.id === overId) {
//             return {
//               ...node,
//               isExpanded: true,
//               hasChildren: true,
//               children: [
//                 ...(node.children || []),
//                 {
//                   ...draggedNode!,
//                   parentId: node.id,
//                 },
//               ],
//             };
//           }

//           return {
//             ...node,
//             children: node.children
//               ? insertNode(node.children)
//               : node.children,
//           };
//         });

//       return insertNode(treeWithoutDragged);
//     });
//   };

//   return (
//     <DndContext
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <div>
//         {data.map((node) => (
//           <TreeNode
//             key={node.id}
//             node={node}
//             toggleNode={toggleNode}
//             setTree={setTree}
//           />
//         ))}
//       </div>
//     </DndContext>
//   );
// };



// import React from "react";
// import {
//   DndContext,
//   closestCenter,
// } from "@dnd-kit/core";
// import type { DragEndEvent } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// import type { TreeNodeModel } from "./tree.types";
// import { TreeNode } from "./TreeNode";

// interface Props {
//   data: TreeNodeModel[];
//   toggleNode: (id: string) => void;
//   setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
// }

// /* =========================================
//    🔹 Helper: Flatten Tree
// ========================================= */
// const flattenTree = (
//   nodes: TreeNodeModel[],
//   parentId: string | null = null
// ): TreeNodeModel[] => {
//   return nodes.flatMap((node) => [
//     { ...node, parentId },
//     ...(node.children
//       ? flattenTree(node.children, node.id)
//       : []),
//   ]);
// };

// /* =========================================
//    🔹 Helper: Build Tree From Flat
// ========================================= */
// const buildTree = (
//   flat: TreeNodeModel[]
// ): TreeNodeModel[] => {
//   const map = new Map<string, TreeNodeModel>();
//   const roots: TreeNodeModel[] = [];

//   flat.forEach((node) => {
//     map.set(node.id, { ...node, children: [] });
//   });

//   flat.forEach((node) => {
//     const mapped = map.get(node.id)!;

//     if (node.parentId) {
//       const parent = map.get(node.parentId);
//       if (parent) {
//         parent.children = parent.children || [];
//         parent.children.push(mapped);
//       }
//     } else {
//       roots.push(mapped);
//     }
//   });

//   return roots;
// };

// export const TreeView: React.FC<Props> = ({
//   data,
//   toggleNode,
//   setTree,
// }) => {

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     setTree((prevTree) => {
//       const flat = flattenTree(prevTree);

//       const oldIndex = flat.findIndex(
//         (n) => n.id === active.id
//       );
//       const newIndex = flat.findIndex(
//         (n) => n.id === over.id
//       );

//       if (oldIndex === -1 || newIndex === -1)
//         return prevTree;

//       const moved = arrayMove(flat, oldIndex, newIndex);

//       // 🔹 Prevent parent into its own child
//       const movedNode = moved[newIndex];
//       const possibleParent =
//         moved[newIndex - 1] || null;

//       if (
//         possibleParent &&
//         possibleParent.id === movedNode.id
//       ) {
//         return prevTree;
//       }

//       // 🔹 Assign new parent
//       moved[newIndex] = {
//         ...movedNode,
//         parentId: possibleParent
//           ? possibleParent.parentId
//           : null,
//       };

//       return buildTree(moved);
//     });
//   };

//   return (
//     <DndContext
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <SortableContext
//         items={flattenTree(data).map((n) => n.id)}
//         strategy={verticalListSortingStrategy}
//       >
//         <div>
//           {data.map((node) => (
//             <TreeNode
//               key={node.id}
//               node={node}
//               toggleNode={toggleNode}
//               setTree={setTree}
//             />
//           ))}
//         </div>
//       </SortableContext>
//     </DndContext>
//   );
// };


// import React from "react";
// import {
//   DndContext,
//   closestCenter,
// } from "@dnd-kit/core";
// import type { DragEndEvent } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";

// import type { TreeNodeModel } from "./tree.types";
// import { TreeNode } from "./TreeNode";

// interface Props {
//   data: TreeNodeModel[];
//   toggleNode: (id: string) => void;
//   setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
// }

// export const TreeView: React.FC<Props> = ({
//   data,
//   toggleNode,
//   setTree,
// }) => {

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const activeId = String(active.id);
//     const overId = String(over.id);

//     setTree((prevTree) => {

//       let draggedNode: TreeNodeModel | null = null;

//       // 🔹 Remove node recursively
//       const removeNode = (
//         nodes: TreeNodeModel[]
//       ): TreeNodeModel[] =>
//         nodes
//           .filter((node) => {
//             if (node.id === activeId) {
//               draggedNode = node;
//               return false;
//             }
//             return true;
//           })
//           .map((node) => ({
//             ...node,
//             children: node.children
//               ? removeNode(node.children)
//               : node.children,
//           }));

//       const treeWithoutDragged = removeNode(prevTree);
//       if (!draggedNode) return prevTree;

//       // 🔹 Insert node at same level as "over"
//       const insertNode = (
//         nodes: TreeNodeModel[]
//       ): TreeNodeModel[] =>
//         nodes.map((node) => {
//           if (node.children) {
//             const index = node.children.findIndex(
//               (child) => child.id === overId
//             );

//             if (index !== -1) {
//               const newChildren = arrayMove(
//                 [...node.children, draggedNode!],
//                 node.children.length,
//                 index
//               ).map((child) =>
//                 child.id === draggedNode!.id
//                   ? { ...child, parentId: node.id }
//                   : child
//               );

//               return {
//                 ...node,
//                 children: newChildren,
//                 hasChildren: true,
//               };
//             }

//             return {
//               ...node,
//               children: insertNode(node.children),
//             };
//           }

//           return node;
//         });

//       // 🔹 If dropped at root level
//       const rootIndex = treeWithoutDragged.findIndex(
//         (node) => node.id === overId
//       );

//       if (rootIndex !== -1) {
//         const newRoot = arrayMove(
//           [...treeWithoutDragged, draggedNode],
//           treeWithoutDragged.length,
//           rootIndex
//         ).map((node) =>
//           node.id === draggedNode!.id
//             ? { ...node, parentId: null }
//             : node
//         );

//         return newRoot;
//       }

//       return insertNode(treeWithoutDragged);
//     });
//   };

//   return (
//     <DndContext
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <div>
//         {data.map((node) => (
//           <TreeNode
//             key={node.id}
//             node={node}
//             toggleNode={toggleNode}
//             setTree={setTree}
//           />
//         ))}
//       </div>
//     </DndContext>
//   );
// };


import React from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { TreeNodeModel } from "./tree.types";
import { TreeNode } from "./TreeNode";

interface Props {
  data: TreeNodeModel[];
  setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
}

export const TreeView: React.FC<Props> = ({
  data,
  setTree,
}) => {

  /* =========================================
     🔹 LAZY LOAD FUNCTION
  ========================================= */
  const toggleNode = (id: string) => {
    setTree((prev) => {

      const update = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
        nodes.map((node) => {
          if (node.id === id) {

            // 🔹 If already loaded → just toggle
            if (node.children) {
              return {
                ...node,
                isExpanded: !node.isExpanded,
              };
            }

            // 🔹 If has children but not loaded → simulate API
            if (node.hasChildren && !node.children) {

              // Set loading true immediately
              setTimeout(() => {
                setTree((current) => {

                  const injectChildren = (
                    nodes: TreeNodeModel[]
                  ): TreeNodeModel[] =>
                    nodes.map((n) => {
                      if (n.id === id) {
                        return {
                          ...n,
                          isLoading: false,
                          isExpanded: true,
                          children: [
                            {
                              id: id + "-1",
                              name: "Lazy Child 1",
                              parentId: id,
                              hasChildren: false,
                              isExpanded: false,
                            },
                            {
                              id: id + "-2",
                              name: "Lazy Child 2",
                              parentId: id,
                              hasChildren: true,
                              isExpanded: false,
                            },
                          ],
                        };
                      }

                      if (n.children) {
                        return {
                          ...n,
                          children: injectChildren(n.children),
                        };
                      }

                      return n;
                    });

                  return injectChildren(current);
                });
              }, 1000); // simulate API delay

              return {
                ...node,
                isLoading: true,
              };
            }

            return node;
          }

          if (node.children) {
            return {
              ...node,
              children: update(node.children),
            };
          }

          return node;
        });

      return update(prev);
    });
  };

  /* =========================================
     🔹 DRAG HANDLER (your existing logic)
  ========================================= */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    setTree((prevTree) => {
      const oldIndex = prevTree.findIndex(
        (n) => n.id === activeId
      );
      const newIndex = prevTree.findIndex(
        (n) => n.id === overId
      );

      if (oldIndex === -1 || newIndex === -1)
        return prevTree;

      return arrayMove(prevTree, oldIndex, newIndex);
    });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div>
        {data.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            toggleNode={toggleNode}
            setTree={setTree}
          />
        ))}
      </div>
    </DndContext>
  );
};
