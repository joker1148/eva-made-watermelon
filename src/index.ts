import createBackground from './gameObjects/background';
import createBasketFront from './gameObjects/board/basketFront';
import createBoard from './gameObjects/board/board';
import createBall from './gameObjects/ball';
import createWhole from './gameObjects/whole';
import createBtn from './gameObjects/btn';
import resources from './resources';

import { Game, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { ImgSystem } from '@eva/plugin-renderer-img';
import { EventSystem } from '@eva/plugin-renderer-event';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { RenderSystem } from '@eva/plugin-renderer-render';
import { TransitionSystem } from '@eva/plugin-transition';
import { GraphicsSystem } from '@eva/plugin-renderer-graphics';
import { TextSystem } from '@eva/plugin-renderer-text';


import { Transition } from '@eva/plugin-transition';
import {
  Event,
  // HIT_AREA_TYPE,
  // EventSystem,
  // HIT_AREA_TYPE,
} from '@eva/plugin-renderer-event';

resource.addResource(resources);

//添加动画
// import add from './utils/addTransition'


const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1484,
      antialias: true,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new TextSystem(),
  ],
});

game.scene.transform.size.width = 750;
game.scene.transform.size.height = 1484;





const { basetFront, playAnim } = createBasketFront();
const btn = createBtn({
  text: '投球',
  transform: {
    position: {
      x: 0,
      y: -120,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 1.0,
    },
  },
  callback: () => {
    alert('还没做呢～一起来完善吧')
  },
});
game.scene.addChild(createBackground());
game.scene.addChild(createBoard());
game.scene.addChild(basetFront);
game.scene.addChild(btn);


const whole = createWhole()
const evt = whole.addComponent(new Event());
evt.on('touchstart', () => {
  console.log("touch")
});
game.scene.addChild(whole);


function getGrade (item: any) {
  const arr = ['apple','basketball','lemon','watermelon']  //等级1、2、3、4
  let res = ""
  for(let i = 0;i<arr.length;i++) {
    if(item === arr[i]) {
      res = arr[i + 1]
    }
  }
  return res
}


let wholeObjArr:any = []
function createMyBall () {
  const arr = ['apple','basketball','lemon','watermelon']  //等级1、2、3、4
  let type = arr[Math.floor(Math.random()*arr.length)]
  const ball = createBall(type, {x:375,y:105});
  const animation = ball.addComponent(new Transition());
  animation.group = {
    move: [
      {
        name: 'position.y',
        component: ball.transform,
        values: [{
            time: 0,
            value: 105,
            tween: 'ease-in',
          },
          {
            time: 800,
            value: 1000,
          }
        ],
      },
      
    ],
  };
  const evt = ball.addComponent(new Event());
  // 移动事件
  let touched = false;
  let flag = true  // 是否已经执行一次
  let resPosition = { x: 375, y: 1000 }
  evt.on('touchstart', () => {
    if (flag) {
      touched = true;
    }
  });
  evt.on('touchend', () => {
    touched = false;
    flag = false
    animation.play('move', 1);
    animation.on('finish', () => {
      let id = game.scene.gameObjects[game.scene.gameObjects.length - 1].id
      wholeObjArr.forEach((item: any)=>{
        let min = item["resPosition"].x - 80
        let max = item["resPosition"].x + 80
        let planType = type // 目标type
        let x = resPosition.x
        console.log(min,max,x)
        if (x > min && x < max && planType === item['type']) {
          let id = item["id"]
          game.scene.gameObjects.forEach((item,index)=>{
            // console.log(item.id)
            if(item.id === id) {
              game.scene.removeChild(game.scene.gameObjects[index]);//把目标移除
              game.scene.removeChild(game.scene.gameObjects[game.scene.gameObjects.length - 1]);//把自己移除

              //升级
              let nextGrade = getGrade(planType)
              console.log("next:" + nextGrade)
              console.log(x)
              const ball = createBall(nextGrade,{x,y:1000});
              game.scene.addChild(ball);
            }
          })
        }
      })
      wholeObjArr.push({
        type,
        id,
        resPosition
      })
      console.log(wholeObjArr)
      setTimeout(()=>{
        createMyBall()
      })
    });
  });
  evt.on('touchmove', e => {
    if (touched) {
      const transform = e.gameObject.transform;
      // console.log(e.data.position.x)
      resPosition.x = e.data.position.x
      transform.position.x = e.data.position.x;
    } 
  });
  console.log(game.scene)
  console.log(game.scene.gameObjects[game.scene.gameObjects.length - 1])
  
  game.scene.addChild(ball);

}

createMyBall()


window.playAnim = playAnim;
window.game = game;
