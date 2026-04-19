import { FontLoader } from 'three/addons';
import { createTextFlow, updateFlows } from './orbitingText';
import { consumeAccretionText } from './text';
import {
  getDepthForDistance,
  getFontSizeForDistance,
  getMaterialForDistance,
  getOrbitSpeedForDistance,
} from './gradientSystem';
import {
  ACCRETION_WIDTH,
  BLACK_HOLE_RADIUS,
  MAX_WARPED_DISK_RADIUS,
  MIN_WARPED_DISK_RADIUS,
  WIDTH_SCALE_FACTOR,
} from '../quasarConfig';
import { loading } from '../../../../loadingState';

const loader = new FontLoader();

export function addTextAccretionDisk(scene) {
  loader.load('/SourceCodePro.json', (font) => {
    let radius = BLACK_HOLE_RADIUS + 2;
    loading.blackHole.accretionDiskSize = ACCRETION_WIDTH - BLACK_HOLE_RADIUS;

    while (radius < ACCRETION_WIDTH * WIDTH_SCALE_FACTOR) {
      const fontSize = getFontSizeForDistance(radius);
      const text = consumeAccretionText(radius, fontSize);
      const textWarped = text; // Could inline
      const material = getMaterialForDistance(radius);
      const orbitSpeed = getOrbitSpeedForDistance(radius);
      const depth = getDepthForDistance(radius);

      createTextFlow(scene, text, font, fontSize, material, radius, depth, orbitSpeed);
      if (radius >= MIN_WARPED_DISK_RADIUS && radius <= MAX_WARPED_DISK_RADIUS) {
        createTextFlow(scene, textWarped, font, fontSize, material, radius, depth, orbitSpeed, true);
      }

      radius += fontSize;
      loading.blackHole.accretionDiskDistanceLoaded += fontSize;
    }
  });

  return updateFlows;
}
