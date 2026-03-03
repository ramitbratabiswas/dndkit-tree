export type Item = File | Folder;

export interface File {
    id: string;
}

export interface Folder {
    id: string;
    children: Item[];
}

export const isFolder = (item: Item): item is Folder => {
    return "children" in item;
};

export const isFile = (item: Item): item is File => {
    return !("children" in item);
};

export interface TreeProps {
    folders: Folder[];
    files: File[];
    level?: number;
    onChange?: (next: { folders: Folder[]; files: File[] }) => void;
}

export interface TreeItemProps {
    item: Item;
    index: number;
    level?: number;
}
