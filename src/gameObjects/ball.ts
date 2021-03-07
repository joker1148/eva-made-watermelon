import { GameObject } from '@eva/eva.js';
import { Img } from '@eva/plugin-renderer-img'
// import { Transition } from '@eva/plugin-transition';
// import {
//   Event,
//   // EventSystem,
//   // HIT_AREA_TYPE,
// } from '@eva/plugin-renderer-event';
// import add from '../utils/addTransition'

export default function createBall(type: any, position: any) {
  const ball = new GameObject('ball', {
    size: {
      width: 100,
      height: 100
    },
    origin: {
      x: 0.5,
      y: 0.5
    },
    position,
    anchor: {
      x: 0,
      y: 0,
    },
  });

  ball.addComponent(
    new Img({
      resource: type,
    })
  );

 


  
  return ball;
}