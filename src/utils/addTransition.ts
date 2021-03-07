import { Transition } from '@eva/plugin-transition';
import {
  Event,
  // EventSystem,
  // HIT_AREA_TYPE,
} from '@eva/plugin-renderer-event';
export default function add (obj: any, lastPositionY: any) {
  const animation = obj.addComponent(new Transition());
  animation.group = {
    move: [
      {
        name: 'position.y',
        component: obj.transform,
        values: [{
            time: 0,
            value: 105,
            tween: 'ease-in',
          },
          {
            time: 800,
            value: lastPositionY,
          }
        ],
      },
      
    ],
  };
  const evt = obj.addComponent(new Event());
  // 移动事件
  let endPosition = {
    x:375,
    y:lastPositionY
  }
  let touched = false;
  let flag = true  // 是否已经执行一次
  evt.on('touchstart', () => {
    if (flag) {
      touched = true;
    }
  });
  evt.on('touchend', (e: any) => {
    console.log(e)
    touched = false;
    flag = false
    animation.play('move', 1);
    animation.on('finish', () => {
      console.log(endPosition)
    });
  });
  evt.on('touchmove', (e: any) => {
    if (touched) {
      const transform = e.gameObject.transform;
      console.log(e.data.position.x)
      endPosition["x"] = e.data.position.x
      endPosition["y"] = lastPositionY
      transform.position.x = e.data.position.x;
    } 
  });
}