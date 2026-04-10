export const Easing = {
  premium: [0.34, 1.56, 0.64, 1], // Smooth bounce
  smooth: [0.4, 0, 0.2, 1], // Material
  easeOutQuart: [0.25, 1, 0.5, 1]
};

export const Duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  verySlow: 1.5
};

export const Transitions = {
  entrance: {
    duration: Duration.normal,
    ease: Easing.premium
  },
  hover: {
    duration: Duration.fast,
    ease: Easing.smooth
  }
};