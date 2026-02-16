// export interface TreeNodeModel {
//   id: string;
//   name: string;
//   parentId: string | null;

//   children?: TreeNodeModel[];
//   hasChildren?: boolean;
//   isExpanded?: boolean;
//   isLoading?: boolean;
// }


export interface TreeNodeModel {
  id: string;
  name: string;
  parentId: string | null;

  children?: TreeNodeModel[];
  hasChildren?: boolean;
  isExpanded?: boolean;
  isLoading?: boolean;
}
