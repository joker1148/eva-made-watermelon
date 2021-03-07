import { GameObject } from '@eva/eva.js';

export default function Whole() {
  const whole = new GameObject('whole', {
    size: {
      width: 750,
      height: 1400
    },
    origin: {
      x: 0,
      y: 0
    },
    position:{x: 0,y: 0},
    anchor: {
      x: 0,
      y: 0,
    },
  }); 
  return whole;
}