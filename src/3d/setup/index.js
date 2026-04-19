import * as THREE from 'three';

let scene, renderer, camera;

export function setupScene() {
  scene = new THREE.Scene();
  renderer = makeRenderer();
  camera = makeCamera();
  return { scene, renderer, camera };
}

export function makeRenderer() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  }
  catch (error) {
    alert('Could not create WebGL renderer. '
      + 'Please ensure your browser supports WebGL and that it is enabled. '
      + 'You may need to use a different browser, or restart your device.');
    throw error;
  }
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.classList.add('prevent-select');
  renderer.domElement.id = 'threejs-canvas';
  document.body.appendChild(renderer.domElement);
  renderer.capabilities.logarithmicDepthBuffer = true;

  // Error handling for context loss
  renderer.domElement.addEventListener('webglcontextlost', () => {
    alert('WebGL context lost. Please restart your browser. Consider zooming out less.');
  }, { once: true });

  return renderer;
}

export function makeCamera() {
  return new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1, 200000);
}

export function onWindowResized(renderer, camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

window.addEventListener('resize', () => {
  onWindowResized(renderer, camera);
});
