import { MarkerType } from "@vue-flow/core";

export const initialNodes = [
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

export const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    label: "backend heavy",
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: "e4-5",
    // type: "step",
    source: "4",
    target: "5",
    // label: "Node 2",
    // style: { stroke: "orange" },
    // labelBgStyle: { fill: "orange" },
  },
  {
    id: "e3-4",
    type: "smoothstep",
    source: "3",
    target: "4",
    label: "Secondary",
  },
];
