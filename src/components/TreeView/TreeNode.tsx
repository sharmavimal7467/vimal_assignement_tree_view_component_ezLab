import React, { useState, useRef, useEffect } from "react";
import type { TreeNodeModel } from "./tree.types";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  node: TreeNodeModel;
  toggleNode: (id: string) => void;
  setTree: React.Dispatch<React.SetStateAction<TreeNodeModel[]>>;
}

export const TreeNode: React.FC<Props> = ({ node, toggleNode, setTree }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

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
      nodes.map((n): TreeNodeModel => {
        if (n.id === node.id) return { ...n, name: trimmed };
        return { ...n, children: n.children ? update(n.children) : n.children };
      });

    setTree((prev) => update(prev));
    setIsEditing(false);
  };

  const deleteNode = (id: string) => {
    const remove = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
      nodes
        .filter((n) => n.id !== id)
        .map((n): TreeNodeModel => ({
          ...n,
          children: n.children ? remove(n.children) : n.children,
        }));

    if (window.confirm("Delete this node and its subtree?")) {
      setTree((prev) => remove(prev));
    }
  };

  const addNode = (parentId: string) => {
    const name = prompt("Enter node name");
    if (!name) return;

    const add = (nodes: TreeNodeModel[]): TreeNodeModel[] =>
      nodes.map((n): TreeNodeModel => {
        if (n.id === parentId) {
          return {
            ...n,
            isExpanded: true,
            hasChildren: true,
            children: [
              ...(n.children ?? []),
              {
                id: Date.now().toString(),
                name,
                hasChildren: false,
                isExpanded: false,
                isLoading: false,
              },
            ],
          };
        }
        return { ...n, children: n.children ? add(n.children) : n.children };
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
          background: isDragging ? "lightgrey" : "transparent",
        }}
      >
        <span {...attributes} {...listeners} style={{ cursor: "grab", padding: "0 6px", userSelect: "none" }}>☰</span>

        {node.hasChildren && (
          <span
            style={{ cursor: node.isLoading ? "default" : "pointer", width: 20, textAlign: "center" }}
            onClick={() => !node.isLoading && toggleNode(node.id)}
          >
            {node.isLoading ? "⏳" : node.isExpanded ? "▼" : "▶"}
          </span>
        )}

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
            style={{ padding: "2px 6px", fontSize: 14, flex: 1 }}
          />
        ) : (
          <span onDoubleClick={() => setIsEditing(true)} style={{ cursor: "text", flex: 1 }}>
            {node.name}
          </span>
        )}

        <button onClick={() => addNode(node.id)}>+</button>
        <button onClick={() => deleteNode(node.id)}>🗑</button>
      </div>

        {node.isExpanded && node.children && node.children.length > 0 && (
  <div style={{ marginLeft: 24, marginTop: 6 }}>
    <SortableContext items={node.children.map((c) => c.id)} strategy={verticalListSortingStrategy}>
      {node.children.map((child) => (
        <TreeNode key={child.id} node={child} toggleNode={toggleNode} setTree={setTree} />
      ))}
    </SortableContext>
  </div>
)}

    </div>
  );
};
