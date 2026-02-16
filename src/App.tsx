// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// import React from "react";
// import { TreeView } from "./components/TreeView/TreeView";
// import { useTree } from "./hooks/useTree";
// import { initialData } from "./data/initialData";

// const App: React.FC = () => {
//   const { tree } = useTree(initialData);

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Tree View Component</h2>
//       <TreeView data={tree} />
//     </div>
//   );
// };

// export default App;


import React from "react";
import { TreeView } from "./components/TreeView/TreeView";
import { useTree } from "./hooks/useTree";
import { initialData } from "./data/initialData";

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
