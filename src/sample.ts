import { type Item } from "./Tree/types";

export const dummyItems: Item[] = [
  {
    id: "root-1",
    children: [
      {
        id: "root-1-folder-A",
        children: [
          {
            id: "root-1-folder-A-file-1",
          },
          {
            id: "root-1-folder-A-file-2",
          },
          {
            id: "root-1-folder-A-subfolder-1",
            children: [
              {
                id: "root-1-folder-A-subfolder-1-file-1",
              },
              {
                id: "root-1-folder-A-subfolder-1-file-2",
              },
            ],
          },
        ],
      },
      {
        id: "root-1-folder-B",
        children: [
          {
            id: "root-1-folder-B-file-1",
          },
          {
            id: "root-1-folder-B-subfolder-1",
            children: [
              {
                id: "root-1-folder-B-subfolder-1-file-1",
              },
              {
                id: "root-1-folder-B-subfolder-1-subfolder-1",
                children: [
                  {
                    id: "deep-nested-file-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "root-2",
    children: [
      {
        id: "root-2-folder-A",
      },
      {
        id: "root-2-folder-B",
        children: [
          {
            id: "root-2-folder-B-file-1",
          },
          {
            id: "root-2-folder-B-file-2",
          },
        ],
      },
    ],
  },
  {
    id: "loose-item-1",
  },
];