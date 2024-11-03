type NodeType = {
  id: string;
  type?: string;
  data: { label: string };
  position: { x: number; y: number };
  class: string;
};

export const initialNodes: NodeType[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Full Stack Developer" },
    position: { x: 250, y: 0 },
    class: "light",
  },
  {
    id: "2",
    type: "output",
    data: { label: "React, Next.js, Vue.js TypeScript" },
    position: { x: 100, y: 100 },
    class: "light",
  },
  {
    id: "3",
    data: { label: "Laravel, PHP" },
    position: { x: 400, y: 100 },
    class: "light",
  },
  {
    id: "4",
    data: { label: "Django, Python" },
    position: { x: 150, y: 200 },
    class: "light",
  },
  {
    id: "5",
    type: "output",
    data: { label: "Node.js, JavaScript" },
    position: { x: 300, y: 300 },
    class: "light",
  },
];
