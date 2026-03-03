import { useState } from "react";
import { Tree } from "./Tree/Tree";
import { isFile, isFolder, type Folder, type File } from "./Tree/types";
import { dummyItems } from "./sample";

function App() {
  const [folders, setFolders] = useState<Folder[]>(dummyItems.filter(isFolder));
  const [files, setFiles] = useState<File[]>(dummyItems.filter(isFile));

  return (
    <Tree
      folders={folders}
      files={files}
      onChange={({ folders, files }) => {
        setFolders(folders);
        setFiles(files);
      }}
    />
  );
}

export default App;