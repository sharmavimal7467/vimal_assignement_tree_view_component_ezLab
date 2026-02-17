// import type { TreeNodeModel } from "../components/TreeView/tree.types";

// export const initialData: TreeNodeModel[] = [
//   {
//     id: "1",
//     name: "A",
//     parentId: null,
//     hasChildren: true,
//     isExpanded: true,
//     children: [
//       {
//         id: "2",
//         name: "B",
//         parentId: "1",
//         hasChildren: true,
//         isExpanded: true,
//         children: [
//           {
//             id: "3",
//             name: "C",
//             parentId: "2",
//             hasChildren: true,
//             isExpanded: true,
//             children: [
//               {
//                 id: "4",
//                 name: "D",
//                 parentId: "3",
//                 hasChildren: false,
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ];

import type { TreeNodeModel } from "../components/TreeView/tree.types";
export const initialData: TreeNodeModel[] = [
  {
    id: "1",
    name: "A",
    hasChildren: true,
    isExpanded: true,
    isLoading: false,
    children: [
      {
        id: "2",
        name: "B",
        hasChildren: true,
        isExpanded: true,
        isLoading: false,
        children: [
          {
            id: "3",
            name: "C",
            hasChildren: true,
            isExpanded: true,
            isLoading: false,
            children: [
              {
                id: "4",
                name: "D",
                hasChildren: false,
                isExpanded: false,
                isLoading: false,
              },
            ],
          },
        ],
      },
    ],
  },
];
