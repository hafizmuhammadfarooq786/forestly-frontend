const Slider1 =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXN0fGVufDB8fDB8fA%3D%3D&w=1000&q=80";
const Slider2 = "https://wallpapercave.com/wp/ZXNz8K2.jpg";
const Slider3 =
  "https://i.pinimg.com/originals/d3/27/fb/d327fb8d28ed207dab95937b2016ef73.jpg";
const Slider4 =
  "https://content.globalforestwatch.org/wp-content/uploads/2021/01/GFR-Malaysia-Kalimantan-border-tropical-forest-homepage_0.jpg";

const AppleTree =
  "https://cdn0.iconfinder.com/data/icons/trees-19/50/11-512.png";
const OakTree =
  "https://cdn.iconscout.com/icon/premium/png-256-thumb/oak-tree-2243272-1877637.png";
const WhiteAshTree =
  "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/tree.png";
export default [
  {
    id: 1,
    sliders: [Slider1, Slider2, Slider3, Slider4],
    name: "Württemberg Forest 1",
    description: "Block X - 100 sq Patch - Germany",
    patchPerformance: "High Performing Patch",
    species: 12,
    buyCard: false,
    trees: [
      {
        name: "apple trees",
        count: 15,
        imageRef: AppleTree,
        maxHeight: 12,
        maxAge: "2.4",
      },
      {
        name: "oaktrees",
        count: 20,
        imageRef: OakTree,
        maxHeight: 10,
        maxAge: "4",
      },
    ],
  },
  {
    id: 2,
    sliders: [Slider2, Slider1, Slider3, Slider4],
    name: "Württemberg Forest 2",
    description: "Block X - 100 sq Patch - Germany",
    patchPerformance: "High Performing Patch",
    species: 10,
    buyCard: false,
    trees: [
      {
        name: "apple trees",
        count: 15,
        imageRef: AppleTree,
        maxHeight: 20,
        maxAge: "5",
      },
      {
        name: "white ash trees",
        count: 10,
        imageRef: WhiteAshTree,
        maxHeight: 9,
        maxAge: "3",
      },
      {
        name: "oaktrees",
        count: 20,
        imageRef: OakTree,
        maxHeight: 10,
        maxAge: "2.5",
      },
    ],
  },
  {
    id: 3,
    sliders: [Slider3, Slider2, Slider1, Slider4],
    name: "Württemberg Forest 3",
    description: "Block X - 100 sq Patch - Germany",
    patchPerformance: "Low Performing Patch",
    species: 5,
    buyCard: false,
    trees: [
      {
        name: "apple trees",
        count: 15,
        imageRef: AppleTree,
        maxHeight: 15,
        maxAge: "2.4",
      },
      {
        name: "oaktrees",
        count: 20,
        imageRef: OakTree,
        maxHeight: 12,
        maxAge: "2.9",
      },
    ],
  },
  {
    id: 4,
    sliders: [Slider4, Slider2, Slider1, Slider3],
    name: "Württemberg Forest 4",
    description: "Block X - 100 sq Patch - Germany",
    patchPerformance: "High Performing Patch",
    species: 12,
    buyCard: false,
    trees: [
      {
        name: "apple trees",
        count: 15,
        imageRef: AppleTree,
        maxHeight: 27,
        maxAge: "12",
      },
      {
        name: "oaktrees",
        count: 20,
        imageRef: OakTree,
        maxHeight: 25,
        maxAge: "8.9",
      },
      {
        name: "white ash trees",
        count: 10,
        imageRef: WhiteAshTree,
        maxHeight: 16,
        maxAge: "9.7",
      },
    ],
  },
];
