import { initialColors } from "./colors";

export const initialThemes = [
  {
    id: "t1",
    name: "Default Theme",
    colors: initialColors,
  },
  {
    id: "t2",
    name: "2nd Theme",
    colors: [
      {
        id: "c10",
        role: "primary main",
        hex: "#ff4a11",
        contrastText: "#FFFFFF",
      }, // Vibrant orange
    ],
  },
];
