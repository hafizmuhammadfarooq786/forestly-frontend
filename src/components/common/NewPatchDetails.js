const Slider1 =
  "https://images.unsplash.com/photo-1592922248899-a0db80c9d271?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGdyZWVuJTIwZm9yZXN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
const Slider2 =
  "https://images.unsplash.com/photo-1597927043619-aaefddfaf316?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGdyZWVuJTIwZm9yZXN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
const Slider3 =
  "https://images.unsplash.com/photo-1603612692333-7bac35e43500?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGdyZWVuJTIwZm9yZXN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
const Slider4 =
  "https://images.unsplash.com/photo-1535520371158-a5a192f79831?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3JlZW4lMjBmb3Jlc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

const Slider5 =
  "https://images.unsplash.com/photo-1590273466070-40c466b4432d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBmb3Jlc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=500&q=60";
const Slider6 =
  "https://images.unsplash.com/photo-1599220144359-d4b723bd476d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZW4lMjBmb3Jlc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export default [
  {
    id: 1,
    sliders: [Slider1, Slider2, Slider3, Slider4, Slider5, Slider6],
    name: "Württemberg Forest 1",
    description: "Block X - 300 sq Patch - Germany",
    country: "Germany",
    area: "3 Acres",
    sqMeters: 121401,
    unitPrice: 300,
    monthlyActive: false,
    annuallyActive: false,
    benefits: [
      {
        bgColor: "rgba(0, 207, 232, 0.12)",
        imgSrc: "map-check-outline",
        title: "Climate impacts",
        description: "Your patch will capture CO2 and clean water",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Economic Impacts",
        description: "Land Restored",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Land Restoration",
        description: "Buying the forest patch will help restore land",
      },
    ],
  },
  {
    id: 2,
    sliders: [Slider2, Slider3, Slider4, Slider5, Slider6, Slider1],
    name: "Württemberg Forest 2",
    description: "Block X - 400 sq Patch - Germany",
    country: "Pakistan",
    area: "4 Acres",
    sqMeters: 16188,
    unitPrice: 400,
    monthlyActive: false,
    annuallyActive: false,
    benefits: [
      {
        bgColor: "rgba(0, 207, 232, 0.12)",
        imgSrc: "map-check-outline",
        title: "Climate impacts",
        description: "Your patch will capture CO2 and clean water",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Economic Impacts",
        description: "Land Restored",
      },
    ],
  },
  {
    id: 3,
    sliders: [Slider3, Slider4, Slider5, Slider6, Slider1, Slider2],
    name: "Württemberg Forest 3",
    description: "Block X - 600 sq Patch - Germany",
    country: "Germany",
    area: "1.5 Acre",
    sqMeters: 6070.5,
    unitPrice: 650,
    monthlyActive: false,
    annuallyActive: false,
    benefits: [
      {
        bgColor: "rgba(0, 207, 232, 0.12)",
        imgSrc: "map-check-outline",
        title: "Climate impacts",
        description: "Your patch will capture CO2 and clean water",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Economic Impacts",
        description: "Land Restored",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Land Restoration",
        description: "Buying the forest patch will help restore land",
      },
    ],
  },
  {
    id: 4,
    sliders: [Slider4, Slider5, Slider6, Slider1, Slider2, Slider3],
    name: "Württemberg Forest 4",
    description: "Block X - 800 sq Patch - Pakistan",
    country: "Pakistan",
    area: "1 Acre",
    sqMeters: 4047,
    unitPrice: 800,
    monthlyActive: false,
    annuallyActive: false,
    benefits: [
      {
        bgColor: "rgba(0, 207, 232, 0.12)",
        imgSrc: "map-check-outline",
        title: "Climate impacts",
        description: "Your patch will capture CO2 and clean water",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Land Restoration",
        description: "Buying the forest patch will help restore land",
      },
    ],
  },
  {
    id: 5,
    sliders: [Slider5, Slider5, Slider1, Slider2, Slider3, Slider4],
    name: "Württemberg Forest 5",
    description: "Block X - 250 sq Patch - Germany",
    country: "Germany",
    area: "5 Acres",
    unitPrice: 250,
    sqMeters: 20235,
    monthlyActive: false,
    annuallyActive: false,
    benefits: [
      {
        bgColor: "rgba(0, 207, 232, 0.12)",
        imgSrc: "map-check-outline",
        title: "Climate impacts",
        description: "Your patch will capture CO2 and clean water",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Economic Impacts",
        description: "Land Restored",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Land Restoration",
        description: "Buying the forest patch will help restore land",
      },
    ],
  },
  {
    id: 6,
    sliders: [Slider6, Slider1, Slider2, Slider3, Slider4, Slider5],
    name: "Württemberg Forest 6",
    description: "Block X - 1000 sq Patch - Pakistan",
    country: "Pakistan",
    area: "16 Acres",
    sqMeters: 64752,
    unitPrice: 175,
    monthlyActive: false,
    annuallyActive: false,
    benefits: [
      {
        imgSrc: "island",
        bgColor: "#FFF8E1",
        title: "Economic Impacts",
        description: "Land Restored",
      },
      {
        imgSrc: "island",
        bgColor: "#FFF8E1",
        title: "Land Restoration",
        description: "Buying the forest patch will help restore land",
      },
    ],
  },
  {
    id: 7,
    sliders: [Slider1, Slider3, Slider5, Slider2, Slider4, Slider6],
    name: "Württemberg Forest 7",
    description: "Block X - 700 sq Patch - Germany",
    country: "Germany",
    area: "7 Acres",
    sqMeters: 28329,
    unitPrice: 225,
    monthlyActive: false,
    annuallyActive: false,
    benefits: [
      {
        imgSrc: "map-check-outline",
        bgColor: "rgba(0, 207, 232, 0.12)",
        title: "Climate impacts",
        description: "Your patch will capture CO2 and clean water",
      },
      {
        imgSrc: "island",
        bgColor: "#FFF8E1",
        title: "Economic Impacts",
        description: "Land Restored",
      },
      {
        imgSrc: "island",
        bgColor: "#FFF8E1",
        title: "Land Restoration",
        description: "Buying the forest patch will help restore land",
      },
    ],
  },
  {
    id: 8,
    sliders: [Slider2, Slider4, Slider6, Slider1, Slider3, Slider5],
    name: "Württemberg Forest 8",
    description: "Block X - 1565 sq Patch - Pakistan",
    country: "Pakistan",
    area: "24 Acres",
    sqMeters: 97128,
    unitPrice: 1655,
    monthlyActive: false,
    annuallyActive: false,
    benefits: [
      {
        bgColor: "rgba(0, 207, 232, 0.12)",
        imgSrc: "map-check-outline",
        title: "Climate impacts",
        description: "Your patch will capture CO2 and clean water",
      },
    ],
  },
  {
    id: 9,
    sliders: [Slider5, Slider5, Slider1, Slider2, Slider3, Slider4],
    name: "Württemberg Forest 5",
    description: "Block X - 250 sq Patch - Germany",
    country: "Germany",
    area: "5 Acres",
    unitPrice: 250,
    sqMeters: 20235,
    monthlyActive: false,
    annuallyActive: false,
    benefits: [
      {
        bgColor: "rgba(0, 207, 232, 0.12)",
        imgSrc: "map-check-outline",
        title: "Climate impacts",
        description: "Your patch will capture CO2 and clean water",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Economic Impacts",
        description: "Land Restored",
      },
      {
        bgColor: "#FFF8E1",
        imgSrc: "island",
        title: "Land Restoration",
        description: "Buying the forest patch will help restore land",
      },
    ],
  },
];
