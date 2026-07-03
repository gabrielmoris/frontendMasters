import { useState } from 'react';

type RGBColor = `rgb(${number}, ${number}, ${number})` | `#${string}`;

/**
 *  Sets a color in RGB or hex
 * @param defaultColor
 * @returns
 */

export const useColor = (defaultColor: RGBColor = 'rgb(255, 0, 0)') => {
  const [color, setColor] = useState<RGBColor>(defaultColor);

  return [color, setColor];
};
