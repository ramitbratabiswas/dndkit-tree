export interface Item {
    id: string;
    children: Item[];
    collapsed?: boolean;
}

export interface FlattenedItem extends Item {
    parentId: string | null;
    depth: number;
    index: number;
}

export type UniqueIdentifier = string | number;

export interface TreeProps {
    items: Item[];
    indentation?: number;
    onChange(items: Item[]): void;
}

export interface TreeItemProps extends FlattenedItem {
    onRemove?(): void;
}

export interface TreeItemOverlayProps {
    id: UniqueIdentifier;
    count: number;
}