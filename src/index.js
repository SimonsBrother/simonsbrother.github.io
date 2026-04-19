import { setupComponents } from './components/componentLoader';
import { ConditionalScrollSystem } from './components/scrollSystem/conditionalScrollSystem';
import { setupBorders } from './components/globalstyles/borders';

// Prioritised
const scrollSystem = new ConditionalScrollSystem();
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
else onDOMContentLoaded();

function onDOMContentLoaded() {
  setupComponents(scrollSystem);
  setupBorders();
  document.addEventListener('touchend', () => onWindowResized(renderer, camera));
}

// 3D
import { setupScene, onWindowResized } from './3d/setup';
import { setupEnvironment } from './3d/environment';
import { setupBehaviours } from './3d/behaviour';

const { scene, renderer, camera } = setupScene();
const { batchedRenderer, centralUpdateFunction, composer } = setupEnvironment(scene, camera, renderer);
setupBehaviours(scene, camera, renderer, centralUpdateFunction, batchedRenderer, composer);
