/**
 * FPV Motor Specifications Database
 * 
 * Motor naming convention: First 2 digits = stator width (mm), last 2 digits = stator height (mm)
 * Example: 1105 = 11mm wide, 5mm tall stator
 */

export const motorSpecs = {
  "1105": {
    name: "1105",
    statorWidth: 11,
    statorHeight: 5,
    shaftDiameter: 1.5,
    mountingPattern: "M2 9x9",
    baseHeight: 2,
    totalHeight: 15,
    color: "#FF6B6B" // Red
  },
  "1404": {
    name: "1404",
    statorWidth: 14,
    statorHeight: 4,
    shaftDiameter: 1.5,
    mountingPattern: "M2 12x12",
    baseHeight: 2.5,
    totalHeight: 14,
    color: "#4ECDC4" // Teal
  },
  "1506": {
    name: "1506",
    statorWidth: 15,
    statorHeight: 6,
    shaftDiameter: 2,
    mountingPattern: "M2 12x12",
    baseHeight: 2.5,
    totalHeight: 16,
    color: "#45B7D1" // Blue
  },
  "2207": {
    name: "2207",
    statorWidth: 22,
    statorHeight: 7,
    shaftDiameter: 3,
    mountingPattern: "M3 16x16",
    baseHeight: 3,
    totalHeight: 20,
    color: "#96CEB4" // Green
  },
  "2306": {
    name: "2306",
    statorWidth: 23,
    statorHeight: 6,
    shaftDiameter: 3,
    mountingPattern: "M3 16x16",
    baseHeight: 3,
    totalHeight: 19,
    color: "#FFEAA7" // Yellow
  }
};

export const getMotorsList = () => Object.keys(motorSpecs);

export const getMotorSpec = (motorName) => motorSpecs[motorName];
