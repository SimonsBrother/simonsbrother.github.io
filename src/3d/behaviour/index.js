import { CustomArcballControls } from './camera/camera_controller';
import { setupPointer } from './raycast';
import { EVENTS } from '../../constants';
import { setupDoubleClickUnfocus, setupFocusing, setupFocusZooming } from './focus';
import { setupCameraAnimation } from './camera/cameraAnimation';
import { runIntroAnimation, setupCameraInitialStateForIntroduction } from './camera/introAnimation';
import { setupAnimationLoop } from './animationLoop';
import { loading } from '../loadingState';

export function setupBehaviours(scene, camera, renderer, updateAccretionDiskFlows, batchedRenderer, composer) {
  const controls = new CustomArcballControls(camera, renderer.domElement, scene);
  setupFocusZooming(renderer.domElement);
  setupPointer(camera, scene);
  setupFocusing(camera, controls);
  document.addEventListener(EVENTS.INTRO_COMPLETE, () => {
    setupDoubleClickUnfocus(document);
  });
  setupCameraAnimation(camera, controls);
  setupCameraInitialStateForIntroduction(camera, controls);
  loading.sceneSetup.progress = 1;
  runIntroAnimation();
  setupAnimationLoop(renderer, camera, updateAccretionDiskFlows, batchedRenderer, composer);
}
