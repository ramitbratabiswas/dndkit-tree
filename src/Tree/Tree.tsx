import type { TreeProps } from "./types";
import "./Tree.styles.css";
import { TreeItem } from "./TreeItem";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { isFile, isFolder } from "./types";

export const Tree = (props: TreeProps) => {
  const { folders, files, level = 0, onChange } = props;

  const combined = [...folders, ...files];

  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source, target } = event.operation;
        if (!source || !target || source.id === target.id) return;

        const src = combined.find((x) => x.id === source.id);
        const trg = combined.find((x) => x.id === target.id);
        if (!src || !trg) return;

        if (isFolder(src) !== isFolder(trg)) return;

        event.preventDefault();
      }}
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source, target } = event.operation;
        if (!source || !target || source.id === target.id) return;

        const src = combined.find((x) => x.id === source.id);
        const trg = combined.find((x) => x.id === target.id);
        if (!src || !trg) return;

        if (isFolder(src) !== isFolder(trg)) return;

        const nextCombined = move(combined, event);

        const nextFolders = nextCombined.filter(isFolder);
        const nextFiles = nextCombined.filter(isFile);

        onChange?.({ folders: nextFolders, files: nextFiles });
      }}
    >
      <div className="tree-container">
        <div className="tree-list">
          {folders.map((folder, index) => (
            <TreeItem
              key={folder.id}
              item={folder}
              level={level}
              index={index}
            />
          ))}

          {files.map((file, index) => (
            <TreeItem
              key={file.id}
              item={file}
              level={level}
              index={index}
            />
          ))}
        </div>
      </div>
    </DragDropProvider>
  );
};