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

const CUSTOM_MOTOR_PREFIX = 'custom:';
const customMotorColors = ['#F7B267', '#C77DFF', '#8D99AE', '#F28482', '#84A59D'];

export const getMotorsList = () => Object.keys(motorSpecs);

/**
 * Create a stable key for a custom motor from its stator dimensions.
 */
export const getCustomMotorKey = (width, height) => {
  const normalizedWidth = Number(width);
  const normalizedHeight = Number(height);

  if (!Number.isFinite(normalizedWidth) || !Number.isFinite(normalizedHeight)) {
    return null;
  }

  return `${CUSTOM_MOTOR_PREFIX}${normalizedWidth}x${normalizedHeight}`;
};

const getCustomMotorSpec = (motorName) => {
  const match = motorName.match(/^custom:(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)$/);
  if (!match) return undefined;

  const statorWidth = Number(match[1]);
  const statorHeight = Number(match[2]);
  if (statorWidth <= 0 || statorHeight <= 0) return undefined;

  // Use dimension-derived defaults for motor properties that aren't stator dimensions.
  const baseHeight = Math.max(2, statorHeight * 0.4);
  const shaftHeight = Math.max(4, statorHeight * 0.75);
  const colorIndex = Math.abs(Math.round(statorWidth * 10 + statorHeight * 100)) % customMotorColors.length;

  return {
    name: `Custom ${statorWidth}×${statorHeight}`,
    statorWidth,
    statorHeight,
    shaftDiameter: statorWidth <= 14 ? 1.5 : statorWidth <= 17 ? 2 : 3,
    mountingPattern: statorWidth <= 14 ? 'M2 12x12' : statorWidth <= 17 ? 'M2 16x16' : 'M3 16x16',
    baseHeight,
    totalHeight: baseHeight + statorHeight + shaftHeight,
    color: customMotorColors[colorIndex],
  };
};

export const getMotorSpec = (motorName) => (
  motorSpecs[motorName] ?? getCustomMotorSpec(motorName)
);
