import assert from 'node:assert/strict';
import {COSMIC_KEY,cosmicSnapshot,parseCosmicSnapshot,advanceCosmicTime} from '../src/cosmic-journey.js';
import {MISSION_KEY} from '../src/mission-storage.js';
const snapshot=cosmicSnapshot({distanceLy:1e8,accelerationG:1,elapsedYears:1234});assert.notEqual(COSMIC_KEY,MISSION_KEY);assert.deepEqual(parseCosmicSnapshot(JSON.stringify(snapshot)),snapshot);
for(const changes of [{model:'unknown'},{version:2},{elapsedYears:-1},{distanceLy:1e10},{accelerationG:0}])assert.throws(()=>parseCosmicSnapshot(JSON.stringify({...snapshot,...changes})));
assert.equal(advanceCosmicTime(99,.2,100,1),100);assert.equal(advanceCosmicTime(0,100000,100,10),2.5);assert.throws(()=>advanceCosmicTime(1,-1,100));
console.log('PASS separate mission key, validated snapshot, clamped playback, no wall-time replay and exact terminal epoch');
