export const fetchChildren = (parentId: string) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: `${parentId}-1`,
          name: "Lazy Child",
          parentId,
          hasChildren: false
        }
      ]);
    }, 1000);
  });
};
