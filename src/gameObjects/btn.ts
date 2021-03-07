import { GameObject } from '@eva/eva.js';
import { Event } from '@eva/plugin-renderer-event';
import { Graphics } from '@eva/plugin-renderer-graphics';
import { Text } from '@eva/plugin-renderer-text';
import { Transition } from '@eva/plugin-transition';

interface BtnParams {
  text: string;
  transform?: object;
  callback: ()=>void;
}
export default function createBtn({ text, transform = {}, callback = ()=>{} }: BtnParams) {
  // 创建游戏对象
  const box = new GameObject('box', {
    size: {
      width: 320,
      height: 80,
    },
    ...transform
  });
  // 创建游戏对象
  const btnGO = new GameObject('btn');
  const textGO = new GameObject('text', {
    anchor: {
      x: 0.5,
      y: 0.5,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
  });

  // 创建Graphics组件
  const { graphics } = btnGO.addComponent(new Graphics());

  graphics.beginFill(0xFF4510, 0.5);
  graphics.lineStyle(6, 0xA65A22);
  graphics.drawRoundedRect(0, 0, 320, 80, 8);
  graphics.endFill();
  textGO.addComponent(
    new Text({
      text: text,
      style: {
        fontSize: 32,
        fill: 0xffffff,
      },
    })
  );
  box.addChild(btnGO);
  box.addChild(textGO);

  // 创建动画组件
  const transition = box.addComponent(new Transition({
    group: {
      idle: [
        {
          name: 'scale.x',
          component: box.transform,
          values: [
            {
              time: 0,
              value: 1,
              tween: 'ease-out',
            },
            {
              time: 300,
              value: 1.5,
              tween: 'ease-in',
            },
            {
              time: 600,
              value: 1,
            },
          ],
        },
        {
          name: 'scale.y',
          component: box.transform,
          values: [
            {
              time: 0,
              value: 1,
              tween: 'ease-out',
            },
            {
              time: 300,
              value: 1.2,
              tween: 'ease-in',
            },
            {
              time: 600,
              value: 1,
            },
          ],
        },
      ]
    }
  }))

  // 执行动画
  transition.play('idle', Infinity)

  //创建事件组件
  const evt = box.addComponent(new Event)
  evt.on('tap', () => {
    callback()
  })
  
  //返回游戏实例
  return box;
}
