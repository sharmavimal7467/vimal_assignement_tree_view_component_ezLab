import { useTree } from "./hooks/useTree";
import { initialData } from "./data/initialData";
import TreeView from "./components/TreeView/TreeView";

const App = () => {
  const { tree, toggleNode, setTree } = useTree(initialData);

  return (
    <div style={{ padding: 40 }}>
      <TreeView
        data={tree}
        toggleNode={toggleNode}
        setTree={setTree}
      />
    </div>
  );
};

export default App;
