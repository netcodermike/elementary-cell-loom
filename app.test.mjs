import assert from 'node:assert/strict';
import test from 'node:test';
import {evolve, centerSeed} from './app.mjs';
test('Rule 90 uses exclusive-or of neighbors', () => assert.deepEqual(evolve([0,0,1,0,0],90),[0,1,0,1,0]));
test('Wrapping connects the first and last columns', () => {
  assert.deepEqual(evolve([1,0,0],90,true), [0,1,1]);
  assert.deepEqual(evolve([1,0,0],90,false), [0,1,0]);
});
test('All eight neighborhoods map to the corresponding rule bit', () => {
  for (let rule=0; rule<256; rule++) for (let mask=0; mask<8; mask++)
    assert.equal(evolve([mask>>2,(mask>>1)&1,mask&1],rule)[1], (rule>>mask)&1);
});
test('Seeds center and invalid rows are rejected', () => {
  assert.deepEqual(centerSeed('11',5),[0,1,1,0,0]); assert.throws(()=>centerSeed('2',5)); assert.throws(()=>centerSeed('111',2));
});
