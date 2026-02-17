export interface TreeNodeModel {
  id: string;
  name: string;
  hasChildren: boolean;
  isExpanded: boolean;
  isLoading: boolean;
  children?: TreeNodeModel[]; // optional
}
