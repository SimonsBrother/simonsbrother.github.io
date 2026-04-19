import { Planet } from '../environment/planet';
import { updateFocus } from './focus';
import * as THREE from 'three';

export function setupAnimationLoop(renderer, camera, updateAccretionDiskFlows, batchedRenderer, composer) {
  function animate() {
    delta = clock.getDelta();
    Planet.updateAllPlanets();
    updateFocus();
    updateAccretionDiskFlows(delta, camera);
    batchedRenderer.update(delta); // Update black hole particles
    composer.render(delta); // Render with post-processing
  }
  renderer.setAnimationLoop(animate);
}

const clock = new THREE.Clock();
let delta;
