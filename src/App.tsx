import { useState } from "react";
import { Tree } from "./Tree/Tree";
import type { Item } from "./Tree/types";

function App() {
    const [items, setItems] = useState<Item[]>([
        {
            id: 'Home',
            children: [],
        },
        {
            id: 'Collections',
            children: [
                { id: 'Spring', children: [] },
                { id: 'Summer', children: [] },
                { id: 'Fall', children: [] },
                { id: 'Winter', children: [] },
            ],
        },
        {
            id: 'About Us',
            children: [],
        },
        {
            id: 'My Account',
            children: [
                { id: 'Addresses', children: [] },
                { id: 'Order History', children: [] },
            ],
        },
    ]);

    return (
        <Tree items={items} onChange={setItems} />
    );
}

export default App;