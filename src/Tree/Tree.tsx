import { useRef, useState } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import type { FlattenedItem, TreeProps } from "./types";
import styles from "./Tree.module.css";
import { TreeItem } from "./TreeItem";
import { TreeItemOverlay } from "./TreeItemOverlay";
import { buildTree, flattenTree, getDescendants, getDragDepth, getProjection } from "./utilities";

export const Tree = (props: TreeProps) => {
    const { items, indentation = 50, onChange } = props;

    const [flattenedItems, setFlattenedItems] = useState<FlattenedItem[]>(() => flattenTree(items));
    const initialDepth = useRef<number>(0);
    const sourceChildren = useRef<FlattenedItem[]>([]);

    return (
        <DragDropProvider
            onDragStart={(event) => {
                const { source } = event.operation;

                if (!source) return;

                const sourceItem = flattenedItems.find(({ id }) => id === source.id);
                if (!sourceItem) return;

                const depth = sourceItem.depth;
                initialDepth.current = depth;

                setFlattenedItems((flattenedItems) => {
                    sourceChildren.current = [];

                    const descendants = getDescendants(flattenedItems, source.id);

                    return flattenedItems.filter((item) => {
                        if (descendants.has(item.id)) {
                            sourceChildren.current = [...sourceChildren.current, item];
                            return false;
                        };
                        return true;
                    });
                });
            }}

            onDragOver={(event, manager) => {
                const { source, target } = event.operation;
                event.preventDefault();

                if (source && target && source.id !== target.id) {
                    setFlattenedItems((flattenedItems) => {
                        const offsetLeft = manager.dragOperation.transform.x;
                        const dragDepth = getDragDepth(offsetLeft, indentation);
                        const projectedDepth = initialDepth.current + dragDepth;

                        const { depth, parentId } = getProjection(flattenedItems, target.id, projectedDepth);

                        const sortedItems = move(flattenedItems, event);
                        const newItems = sortedItems.map((item) =>
                            item.id === source.id ? { ...item, depth, parentId } : item
                        );

                        return newItems;
                    });
                }
            }}

            onDragMove={(event, manager) => {
                const { source } = event.operation;
                if (!source) return;

                const offsetLeft = manager.dragOperation.transform.x;
                const dragDepth = getDragDepth(offsetLeft, indentation);
                const projectedDepth = initialDepth.current + dragDepth;

                const { depth, parentId } = getProjection(
                    flattenedItems,
                    source.id,
                    projectedDepth
                );

                if (
                    source.data!.depth !== depth ||
                    source.data!.parentId !== parentId
                ) {
                    setFlattenedItems((items) =>
                        items.map((item) =>
                            item.id === source.id ? { ...item, depth, parentId } : item
                        )
                    );
                }
            }}

            onDragEnd={(event) => {
                if (event.canceled) return setFlattenedItems(flattenTree(items));
                const updatedTree = buildTree([...flattenedItems, ...sourceChildren.current]);
                setFlattenedItems(flattenTree(updatedTree));
                onChange(updatedTree);
            }}
        >
            <ul className={styles.Tree}>
                {flattenedItems.map((item, index) => 
                    <TreeItem 
                        key={item.id}
                        {...item}
                        index={index}
                        onRemove={() => {
                            const newItems = flattenedItems.filter(({ id }) => id !== item.id);
                            const tree = buildTree(newItems);

                            setFlattenedItems(flattenTree(tree));
                            onChange(tree);
                        }}
                    />
                )}
            </ul>
            <DragOverlay style={{width: 'min-content'}}>
                {(source) => 
                    <TreeItemOverlay
                        id={source.id}
                        count={sourceChildren.current.length}
                    />
                }
            </DragOverlay>

        </DragDropProvider>
    );
};