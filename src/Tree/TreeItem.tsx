import { useSortable } from '@dnd-kit/react/sortable';

import type { TreeItemProps } from './types';
import styles from './Tree.module.css';


const INDENTATION = 50;

const config = {
    alignment: {
        x: 'start',
        y: 'center',
    },
    transition: {
        idle: true,
    },
} as const;

export function TreeItem(props: TreeItemProps) {
    const { depth, id, index, parentId } = props;

    const { ref, isDragSource } = useSortable({
        ...config,
        id,
        index,
        data: {
            depth,
            parentId,
        },
    });

    return (
        <li
            ref={ref}
            className={styles.TreeItem}
            style={{
                marginLeft: depth * INDENTATION,
            }}
            aria-hidden={isDragSource}
        >
            {id}
        </li>
    );
}
