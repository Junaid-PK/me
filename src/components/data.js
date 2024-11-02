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

export const skillImages = [
  {
    src: "https://img.shields.io/badge/php-%23777BB4.svg?style=flat&logo=php&logoColor=white",
    alt: "PHP",
  },
  {
    src: "https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54",
    alt: "Python",
  },
  {
    src: "https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white",
    alt: "TypeScript",
  },
  {
    src: "https://img.shields.io/badge/dart-%230175C2.svg?style=flat&logo=dart&logoColor=white",
    alt: "Dart",
  },
  {
    src: "https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E",
    alt: "JavaScript",
  },
  {
    src: "https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=flat&logo=google-cloud&logoColor=white",
    alt: "Google Cloud",
  },
  {
    src: "https://img.shields.io/badge/vercel-%23000000.svg?style=flat&logo=vercel&logoColor=white",
    alt: "Vercel",
  },
  {
    src: "https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=flat&logo=digitalOcean&logoColor=white",
    alt: "DigitalOcean",
  },
  {
    src: "https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white",
    alt: "AWS",
  },
  {
    src: "https://img.shields.io/badge/azure-%230072C6.svg?style=flat&logo=microsoftazure&logoColor=white",
    alt: "Azure",
  },
  {
    src: "https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat&logo=firebase",
    alt: "Firebase",
  },
  {
    src: "https://img.shields.io/badge/vue.js-%2335495e.svg?style=flat&logo=vuedotjs&logoColor=%234FC08D",
    alt: "Vue.js",
  },
  {
    src: "https://img.shields.io/badge/django-%23092E20.svg?style=flat&logo=django&logoColor=white",
    alt: "Django",
  },
  {
    src: "https://img.shields.io/badge/Flutter-%2302569B.svg?style=flat&logo=Flutter&logoColor=white",
    alt: "Flutter",
  },
  {
    src: "https://img.shields.io/badge/laravel-%23FF2D20.svg?style=flat&logo=laravel&logoColor=white",
    alt: "Laravel",
  },
  {
    src: "https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white",
    alt: "Next JS",
  },
  {
    src: "https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB",
    alt: "React",
  },
  {
    src: "https://img.shields.io/badge/apache-%23D42029.svg?style=flat&logo=apache&logoColor=white",
    alt: "Apache",
  },
  {
    src: "https://img.shields.io/badge/nginx-%23009639.svg?style=flat&logo=nginx&logoColor=white",
    alt: "Nginx",
  },
  {
    src: "https://img.shields.io/badge/gunicorn-%298729.svg?style=flat&logo=gunicorn&logoColor=white",
    alt: "Gunicorn",
  },
  {
    src: "https://img.shields.io/badge/postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white",
    alt: "Postgres",
  },
  {
    src: "https://img.shields.io/badge/redis-%23DD0031.svg?style=flat&logo=redis&logoColor=white",
    alt: "Redis",
  },
  {
    src: "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white",
    alt: "MongoDB",
  },
];
