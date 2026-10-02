import test from 'node:test';
import assert from 'node:assert/strict';
import { gestureAxis, swipeStep } from '../lib/portfolio-gestures.ts';
test('vertical and diagonal reading gestures do not become page turns',()=>{assert.equal(gestureAxis(15,70),'y');assert.equal(gestureAxis(20,20),null);});
test('deliberate horizontal drag locks to rotation',()=>assert.equal(gestureAxis(-60,12),'x'));
test('small movement does not trigger a swipe',()=>{assert.equal(gestureAxis(4,3),null);assert.equal(swipeStep(15,390),0);});
test('swipes work in both directions on phone and desktop',()=>{assert.equal(swipeStep(-65,390),1);assert.equal(swipeStep(100,740),-1);});
