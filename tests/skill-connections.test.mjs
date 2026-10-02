import test from 'node:test';
import assert from 'node:assert/strict';
import { connectionPoints, connectionsIntersect } from '../lib/skill-connections.ts';
test('crossing diagonals are detected',()=>assert.equal(connectionsIntersect([{x:0,y:0},{x:10,y:10}],[{x:0,y:10},{x:10,y:0}]),true));
test('parallel lines do not end a round',()=>assert.equal(connectionsIntersect([{x:0,y:0},{x:10,y:0}],[{x:0,y:2},{x:10,y:2}]),false));
test('touching endpoints count as an intersection',()=>assert.equal(connectionsIntersect([{x:0,y:0},{x:10,y:0}],[{x:10,y:0},{x:10,y:5}]),true));
test('collinear disjoint segments do not intersect',()=>assert.equal(connectionsIntersect([{x:0,y:0},{x:3,y:0}],[{x:4,y:0},{x:7,y:0}]),false));
test('visible curved crossing is detected',()=>assert.equal(connectionsIntersect(connectionPoints({x:0,y:0},{x:100,y:100}),connectionPoints({x:0,y:100},{x:100,y:0})),true));
test('curve retains its endpoints',()=>{const p=connectionPoints({x:4,y:7},{x:80,y:90});assert.deepEqual(p[0],{x:4,y:7});assert.deepEqual(p.at(-1),{x:80,y:90});});
