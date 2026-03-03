import type {UniqueIdentifier} from "./types";

import styles from './Tree.module.css';

interface Props {
  id: UniqueIdentifier;
  count: number;
}

export function TreeItemOverlay({id, count}: Props) {
  return (
    <div className={styles.TreeItem} data-overlay>
      {id}
      {count > 0 ? <span className={styles.Badge}>{count}</span> : null}
    </div>
  );
}
