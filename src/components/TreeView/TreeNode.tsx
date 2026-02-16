// import React from "react";
// import type { TreeNodeModel } from "./tree.types";

// import {
//   useSortable,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// import { CSS } from "@dnd-kit/utilities";

// interface Props {
//   node: TreeNodeModel;
//   toggleNode: (id: string) => void;
//   setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
// }

// export const TreeNode: React.FC<Props> = ({
//   node,
//   toggleNode,
//   setTree,
// }) => {

//   /* =============================
//      🔹 DRAG CONFIG
//   ============================== */
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id: node.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   /* =============================
//      🔹 DELETE NODE
//   ============================== */
//   const deleteNode = (id: string) => {
//     const remove = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
//       nodes
//         .filter((n) => n.id !== id)
//         .map((n) =>
//           n.children
//             ? { ...n, children: remove(n.children) }
//             : n
//         );

//     if (window.confirm("Delete this node and its subtree?")) {
//       setTree((prev) => remove(prev));
//     }
//   };

//   /* =============================
//      🔹 ADD NODE
//   ============================== */
//   const addNode = (parentId: string) => {
//     const name = prompt("Enter node name");
//     if (!name) return;

//     const add = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
//       nodes.map((n) => {
//         if (n.id === parentId) {
//           return {
//             ...n,
//             isExpanded: true,
//             hasChildren: true,
//             children: [
//               ...(n.children || []),
//               {
//                 id: Date.now().toString(),
//                 name,
//                 parentId,
//                 hasChildren: false,
//               },
//             ],
//           };
//         }

//         if (n.children) {
//           return { ...n, children: add(n.children) };
//         }

//         return n;
//       });

//     setTree((prev) => add(prev));
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={{ ...style, marginTop: 6 }}
//     >
//       {/* 🔹 Node Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           padding: "6px 8px",
//           border: "1px solid #ddd",
//           borderRadius: 6,
//         //   background: "#fff",
//           cursor: "grab",
//         }}
//         {...attributes}
//         {...listeners}
//       >
//         {node.hasChildren && (
//           <span
//             style={{ cursor: "pointer" }}
//             onClick={() => toggleNode(node.id)}
//           >
//             {node.isExpanded ? "▼" : "▶"}
//           </span>
//         )}

//         <span>{node.name}</span>

//         <button onClick={() => addNode(node.id)}>+</button>
//         <button onClick={() => deleteNode(node.id)}>🗑</button>
//       </div>

//       {/* 🔹 Children */}
//       {node.isExpanded && node.children && (
//         <div style={{ marginLeft: 24, marginTop: 6 }}>
//           <SortableContext
//             items={node.children.map((child) => child.id)}
//             strategy={verticalListSortingStrategy}
//           >
//             {node.children.map((child) => (
//               <TreeNode
//                 key={child.id}
//                 node={child}
//                 toggleNode={toggleNode}
//                 setTree={setTree}
//               />
//             ))}
//           </SortableContext>
//         </div>
//       )}
//     </div>
//   );
// };


// import React from "react";
// import type { TreeNodeModel } from "./tree.types";

// import {
//   useSortable,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// import { CSS } from "@dnd-kit/utilities";

// interface Props {
//   node: TreeNodeModel;
//   toggleNode: (id: string) => void;
//   setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
// }

// export const TreeNode: React.FC<Props> = ({
//   node,
//   toggleNode,
//   setTree,
// }) => {
//   /* =============================
//      🔹 DRAG CONFIG
//   ============================== */
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id: node.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   /* =============================
//      🔹 DELETE NODE
//   ============================== */
//   const deleteNode = (id: string) => {
//     const remove = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
//       nodes
//         .filter((n) => n.id !== id)
//         .map((n) =>
//           n.children
//             ? { ...n, children: remove(n.children) }
//             : n
//         );

//     if (window.confirm("Delete this node and its subtree?")) {
//       setTree((prev) => remove(prev));
//     }
//   };

//   /* =============================
//      🔹 ADD NODE
//   ============================== */
//   const addNode = (parentId: string) => {
//     const name = prompt("Enter node name");
//     if (!name) return;

//     const add = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
//       nodes.map((n) => {
//         if (n.id === parentId) {
//           return {
//             ...n,
//             isExpanded: true,
//             hasChildren: true,
//             children: [
//               ...(n.children || []),
//               {
//                 id: Date.now().toString(),
//                 name,
//                 parentId,
//                 hasChildren: false,
//                 isExpanded: false,
//               },
//             ],
//           };
//         }

//         if (n.children) {
//           return { ...n, children: add(n.children) };
//         }

//         return n;
//       });

//     setTree((prev) => add(prev));
//   };

//   return (
//     <div ref={setNodeRef} style={{ ...style, marginTop: 6 }}>
//       {/* 🔹 Node Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           padding: "6px 8px",
//           border: "1px solid #ddd",
//           borderRadius: 6,
//         //   background: "#fff",
//         }}
//       >
//         {/* 🔹 Drag Handle (IMPORTANT FIX) */}
//         <span
//           {...attributes}
//           {...listeners}
//           style={{
//             cursor: "grab",
//             padding: "0 6px",
//             userSelect: "none",
//           }}
//         >
//           ☰
//         </span>

//         {/* Expand / Collapse */}
//         {node.hasChildren && (
//           <span
//             style={{ cursor: "pointer" }}
//             onClick={() => toggleNode(node.id)}
//           >
//             {node.isExpanded ? "▼" : "▶"}
//           </span>
//         )}

//         <span>{node.name}</span>

//         {/* Buttons now work properly */}
//         <button onClick={() => addNode(node.id)}>+</button>
//         <button onClick={() => deleteNode(node.id)}>🗑</button>
//       </div>

//       {/* 🔹 Children */}
//       {node.isExpanded && node.children && (
//         <div style={{ marginLeft: 24, marginTop: 6 }}>
//           <SortableContext
//             items={node.children.map((child) => child.id)}
//             strategy={verticalListSortingStrategy}
//           >
//             {node.children.map((child) => (
//               <TreeNode
//                 key={child.id}
//                 node={child}
//                 toggleNode={toggleNode}
//                 setTree={setTree}
//               />
//             ))}
//           </SortableContext>
//         </div>
//       )}
//     </div>
//   );
// };



// import React, { useState, useRef, useEffect } from "react";
// import type { TreeNodeModel } from "./tree.types";

// import {
//   useSortable,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// import { CSS } from "@dnd-kit/utilities";

// interface Props {
//   node: TreeNodeModel;
//   toggleNode: (id: string) => void;
//   setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
// }

// export const TreeNode: React.FC<Props> = ({
//   node,
//   toggleNode,
//   setTree,
// }) => {
//   /* =============================
//      🔹 DRAG CONFIG
//   ============================== */
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id: node.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   /* =============================
//      🔹 EDIT STATE
//   ============================== */
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(node.name);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (isEditing && inputRef.current) {
//       inputRef.current.focus();
//       inputRef.current.select();
//     }
//   }, [isEditing]);

//   const saveEdit = () => {
//     if (!editValue.trim()) return;

//     const update = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
//       nodes.map((n) => {
//         if (n.id === node.id) {
//           return { ...n, name: editValue };
//         }
//         if (n.children) {
//           return { ...n, children: update(n.children) };
//         }
//         return n;
//       });

//     setTree((prev) => update(prev));
//     setIsEditing(false);
//   };

//   /* =============================
//      🔹 DELETE NODE
//   ============================== */
//   const deleteNode = (id: string) => {
//     const remove = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
//       nodes
//         .filter((n) => n.id !== id)
//         .map((n) =>
//           n.children
//             ? { ...n, children: remove(n.children) }
//             : n
//         );

//     if (window.confirm("Delete this node and its subtree?")) {
//       setTree((prev) => remove(prev));
//     }
//   };

//   /* =============================
//      🔹 ADD NODE
//   ============================== */
//   const addNode = (parentId: string) => {
//     const name = prompt("Enter node name");
//     if (!name) return;

//     const add = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
//       nodes.map((n) => {
//         if (n.id === parentId) {
//           return {
//             ...n,
//             isExpanded: true,
//             hasChildren: true,
//             children: [
//               ...(n.children || []),
//               {
//                 id: Date.now().toString(),
//                 name,
//                 parentId,
//                 hasChildren: false,
//                 isExpanded: false,
//               },
//             ],
//           };
//         }

//         if (n.children) {
//           return { ...n, children: add(n.children) };
//         }

//         return n;
//       });

//     setTree((prev) => add(prev));
//   };

//   return (
//     <div ref={setNodeRef} style={{ ...style, marginTop: 6 }}>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           padding: "6px 8px",
//           border: "1px solid #ddd",
//           borderRadius: 6,
//           background: "#transparent",
//         }}
//       >
//         {/* 🔹 Drag Handle */}
//         <span
//           {...attributes}
//           {...listeners}
//           style={{
//             cursor: "grab",
//             padding: "0 6px",
//             userSelect: "none",
//           }}
//         >
//           ☰
//         </span>

//         {/* Expand / Collapse */}
//         {node.hasChildren && (
//           <span
//             style={{ cursor: "pointer" }}
//             onClick={() => toggleNode(node.id)}
//           >
//             {node.isExpanded ? "▼" : "▶"}
//           </span>
//         )}

//         {/* 🔹 Editable Name */}
//         {isEditing ? (
//           <input
//             ref={inputRef}
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//             onBlur={saveEdit}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") saveEdit();
//               if (e.key === "Escape") {
//                 setEditValue(node.name);
//                 setIsEditing(false);
//               }
//             }}
//             style={{
//               padding: "2px 6px",
//               fontSize: 14,
//             }}
//           />
//         ) : (
//           <span
//             onDoubleClick={() => setIsEditing(true)}
//             style={{ cursor: "text" }}
//           >
//             {node.name}
//           </span>
//         )}

//         <button onClick={() => addNode(node.id)}>+</button>
//         <button onClick={() => deleteNode(node.id)}>🗑</button>
//       </div>

//       {/* 🔹 Children */}
//       {node.isExpanded && node.children && (
//         <div style={{ marginLeft: 24, marginTop: 6 }}>
//           <SortableContext
//             items={node.children.map((child) => child.id)}
//             strategy={verticalListSortingStrategy}
//           >
//             {node.children.map((child) => (
//               <TreeNode
//                 key={child.id}
//                 node={child}
//                 toggleNode={toggleNode}
//                 setTree={setTree}
//               />
//             ))}
//           </SortableContext>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useState, useRef, useEffect } from "react";
import type { TreeNodeModel } from "./tree.types";

import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

interface Props {
  node: TreeNodeModel;
  toggleNode: (id: string) => void;
  setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
}

export const TreeNode: React.FC<Props> = ({
  node,
  toggleNode,
  setTree,
}) => {
  /* =============================
     🔹 DRAG CONFIG
  ============================== */
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  /* =============================
     🔹 EDIT STATE
  ============================== */
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Keep input in sync if name changes externally
  useEffect(() => {
    setEditValue(node.name);
  }, [node.name]);

  const saveEdit = () => {
    const trimmed = editValue.trim();
    if (!trimmed) {
      setEditValue(node.name);
      setIsEditing(false);
      return;
    }

    const update = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
      nodes.map((n) => {
        if (n.id === node.id) {
          return { ...n, name: trimmed };
        }
        if (n.children) {
          return { ...n, children: update(n.children) };
        }
        return n;
      });

    setTree((prev) => update(prev));
    setIsEditing(false);
  };

  /* =============================
     🔹 DELETE NODE
  ============================== */
  const deleteNode = (id: string) => {
    const remove = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
      nodes
        .filter((n) => n.id !== id)
        .map((n) =>
          n.children
            ? { ...n, children: remove(n.children) }
            : n
        );

    if (window.confirm("Delete this node and its subtree?")) {
      setTree((prev) => remove(prev));
    }
  };

  /* =============================
     🔹 ADD NODE
  ============================== */
  const addNode = (parentId: string) => {
    const name = prompt("Enter node name");
    if (!name) return;

    const add = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
      nodes.map((n) => {
        if (n.id === parentId) {
          return {
            ...n,
            isExpanded: true,
            hasChildren: true,
            children: [
              ...(n.children || []),
              {
                id: Date.now().toString(),
                name,
                parentId,
                hasChildren: false,
                isExpanded: false,
                isLoading: false,
              },
            ],
          };
        }

        if (n.children) {
          return { ...n, children: add(n.children) };
        }

        return n;
      });

    setTree((prev) => add(prev));
  };

  return (
    <div ref={setNodeRef} style={{ ...style, marginTop: 6 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 8px",
          border: "1px solid #ddd",
          borderRadius: 6,
          background: "transparent",
        }}
      >
        {/* 🔹 Drag Handle */}
        <span
          {...attributes}
          {...listeners}
          style={{
            cursor: "grab",
            padding: "0 6px",
            userSelect: "none",
          }}
        >
          ☰
        </span>

        {/* 🔹 Expand / Collapse with Lazy Loading Indicator */}
        {node.hasChildren && (
          <span
            style={{
              cursor: node.isLoading ? "default" : "pointer",
              width: 20,
              display: "inline-block",
              textAlign: "center",
            }}
            onClick={() => {
              if (!node.isLoading) {
                toggleNode(node.id);
              }
            }}
          >
            {node.isLoading
              ? "⏳"
              : node.isExpanded
              ? "▼"
              : "▶"}
          </span>
        )}

        {/* 🔹 Editable Name */}
        {isEditing ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") {
                setEditValue(node.name);
                setIsEditing(false);
              }
            }}
            style={{
              padding: "2px 6px",
              fontSize: 14,
            }}
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            style={{ cursor: "text", flex: 1 }}
          >
            {node.name}
          </span>
        )}

        <button onClick={() => addNode(node.id)}>+</button>
        <button onClick={() => deleteNode(node.id)}>🗑</button>
      </div>

      {/* 🔹 Children */}
      {node.isExpanded && node.children && (
        <div style={{ marginLeft: 24, marginTop: 6 }}>
          <SortableContext
            items={node.children.map((child) => child.id)}
            strategy={verticalListSortingStrategy}
          >
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                toggleNode={toggleNode}
                setTree={setTree}
              />
            ))}
          </SortableContext>
        </div>
      )}
    </div>
  );
};
