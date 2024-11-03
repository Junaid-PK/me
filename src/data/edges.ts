import { MarkerType } from "@vue-flow/core";

type Edge = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  label?: string;
  markerEnd?: string;
  type?: string;
};
export const initialEdges: Edge[] = [
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
    source: "4",
    target: "5",
  },
  {
    id: "e3-4",
    type: "smoothstep",
    source: "3",
    target: "4",
    label: "Secondary",
  },
];
