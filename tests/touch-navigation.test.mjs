import test from 'node:test';
import assert from 'node:assert/strict';
import { bindTouchNavigation } from '../lib/touch-navigation.ts';

function setup(allowed = true) {
  const target = new EventTarget();
  const moves = [], finishes = [];
  const cleanup = bindTouchNavigation(target, { canStart:()=>allowed, width:()=>390, start:()=>{}, move:x=>moves.push(x), finish:(step,offset)=>finishes.push({step,offset}) });
  const send = (type,x,y,time=0,count=1) => {
    const e = new Event(type,{cancelable:true});
    const touches=Array.from({length:count},(_,i)=>({identifier:i,clientX:x,clientY:y}));
    Object.defineProperties(e,{touches:{value:type==='touchend'?[]:touches},changedTouches:{value:touches},timeStamp:{value:time}});
    target.dispatchEvent(e);
    return e;
  };
  return {target,moves,finishes,send,cleanup};
}
test('touch swipe turns left and right without pointer events',()=>{
  for(const sign of [-1,1]) {
    const s=setup(); s.send('touchstart',180,200);
    assert.equal(s.send('touchmove',180+sign*90,204,80).defaultPrevented,true);
    s.send('touchend',180+sign*100,205,100);
    assert.equal(s.finishes.at(-1).step,-sign); s.cleanup();
  }
});
test('pointer cancellation does not erase an active touch gesture',()=>{
  const s=setup(); s.send('touchstart',200,200); s.send('touchmove',100,203,60);
  s.target.dispatchEvent(new Event('pointercancel')); s.target.dispatchEvent(new Event('lostpointercapture'));
  s.send('touchend',80,203,80); assert.equal(s.finishes.at(-1).step,1); s.cleanup();
});
test('vertical reading stays native and never turns a chapter',()=>{
  const s=setup(); s.send('touchstart',180,200);
  assert.equal(s.send('touchmove',184,100,70).defaultPrevented,false);
  s.send('touchend',100,50,100); assert.equal(s.finishes.at(-1).step,0); assert.equal(s.moves.length,0); s.cleanup();
});
test('pinch and touch cancellation never navigate',()=>{
  const s=setup(); s.send('touchstart',200,200); s.send('touchmove',100,200,70);
  s.send('touchmove',80,200,80,2); s.send('touchend',60,200,100);
  assert.equal(s.finishes.at(-1).step,0);
  s.send('touchstart',200,200); s.send('touchcancel',80,200,150);
  assert.ok(s.finishes.every(item=>item.step===0)); s.cleanup();
});
test('game controls can exclude touch navigation and cleanup removes listeners',()=>{
  const s=setup(false); s.send('touchstart',200,200); s.send('touchmove',80,200,80); s.send('touchend',60,200,100);
  assert.equal(s.finishes.length,0); s.cleanup();
  const active=setup(); active.cleanup(); active.send('touchstart',200,200); active.send('touchend',60,200,100); assert.equal(active.finishes.length,0);
});
