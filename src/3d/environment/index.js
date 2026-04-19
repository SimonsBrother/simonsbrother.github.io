import * as THREE from 'three';
import { addPostProcessing } from './post_processing';
import { PATHS } from '../../constants';
import { loading } from '../loadingState';
import * as QUARKS from 'three.quarks';
import { addTextAccretionDisk } from './central_object/quasar/textAccretionDisk';
import { addPlanets } from '../../content/planets';
import { addBlackHole } from './central_object/quasar/blackHole';

export function setupEnvironment(scene, camera, renderer) {
  addLight(scene);
  addCubeMap(scene);
  addPostProcessing(scene, camera, renderer);
  const batchedRenderer = new QUARKS.BatchedRenderer();
  const updateAccretionDiskFlows = addTextAccretionDisk(scene);
  const composer = addPostProcessing(scene, camera, renderer);
  addPlanets(scene);
  addBlackHole(scene, camera);

  return { batchedRenderer, updateAccretionDiskFlows, composer };
}

export function addLight(scene) {
  const blackHoleLight = new THREE.PointLight(0xffffff, 2, 0, 0);
  blackHoleLight.position.set(0, 0, 0);
  scene.add(blackHoleLight);

  const highLight = new THREE.PointLight(0xffffff, 3, 0, 0);
  highLight.position.set(0, 50, 0);
  scene.add(highLight);

  const ambientLight = new THREE.AmbientLight(0xaaaaaa, 3);
  scene.add(ambientLight);
}

export async function addCubeMap(scene) {
  // Background (made with https://jaxry.github.io/panorama-to-cubemap/ and https://www.spacespheremaps.com/silver-and-gold-nebulae-spheremaps/)
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  cubeTextureLoader.setPath(PATHS.CUBEMAP);
  cubeTextureLoader.load(
    [
      'px.png', 'nx.png',
      'py.png', 'ny.png',
      'pz.png', 'nz.png',
    ],
    (cubeTexture) => {
      scene.background = cubeTexture;
      loading.background.progress = 1;
    },
    undefined, console.error);
}
