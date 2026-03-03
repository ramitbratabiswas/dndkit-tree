import { useSortable } from "@dnd-kit/react/sortable";
import { isFile, isFolder, type TreeItemProps } from "./types";
import { Tree } from "./Tree";

export const TreeItem = ({ item, index, level = 0 }: TreeItemProps) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: item.id,
    index: index
  });

  const folders = isFolder(item) ? item.children.filter(isFolder) : [];
  const files = isFolder(item) ? item.children.filter(isFile) : [];

  return (
    <div className="tree-item-container">
      <div
        ref={ref}
        className={`tree-item ${isDragging ? "dragging" : ""}`}
        style={{ marginLeft: level * 24 }}
      >
        {item.id}
      </div>

      <Tree folders={folders} files={files} level={level + 1} />
    </div>
  );
};