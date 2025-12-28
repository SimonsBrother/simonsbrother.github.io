import { TextGeometry } from 'three/addons';
import * as THREE from 'three';
import { Flow } from 'three/addons/modifiers/CurveModifier';
import { BLACK_HOLE_RADIUS, NUM_CIRCLE_POINTS, WARPED_DISK_SCALE } from '../quasarConfig';

const rad = deg => (deg * Math.PI) / 180.0;
const flows = [];
const RIGHT_ANGLE_IN_RADIANS = rad(90);
const warpedDiskShape = drawWarpedAccretionShape(WARPED_DISK_SCALE);
let warpedDiskWidestWidth = WARPED_DISK_SCALE.xScale * BLACK_HOLE_RADIUS;

/**
 * Updates the positions of all generated disks.
 * @param delta the time since the last frame.
 * @param camera
 */
export function updateFlows(delta, camera) {
  const rotationMatrix = new THREE.Matrix4();
  rotationMatrix.lookAt(new THREE.Vector3(), camera.position, new THREE.Vector3(0, 1, 0));

  flows.forEach((flow) => {
    flow.moveAlongCurve(flow.orbitSpeed * delta);
    if (flow.isWarpedDisk) {
      pointFlowTowardsCamera(flow, rotationMatrix);
    }
  });
}

function pointFlowTowardsCamera(flow, cameraRotationMatrix) {
  const curve = flow.curveArray[0];
  cameraRotationMatrix = cameraRotationMatrix.clone().scale(curve.scaleVector);
  curve.originalCurve.points.forEach((point, index) => {
    curve.points[index] = point.clone().applyMatrix4(cameraRotationMatrix);
  });
  flow.updateCurve(0, curve);
}

/**
 * Creates a circular text flow; this is a path that text follows.
 * @param scene
 * @param text {string} the text to show.
 * @param font {Font} a loaded font.
 * @param fontSize {number} the size of the font; this appears to be in scene units, not font px.
 * @param fontMaterial {MeshBasicMaterial} the material of the font.
 * @param radius {number} the distance from the centre the closest edge of the text should be.
 * @param fontDepth {number} the deep th e font is.
 * @param orbitSpeed {number} a fast text orbits around the black hole.
 * @param warpedDisk {boolean} true if the disk is meant to represent light from behind the black hole, forming a warped disk.
 */
export function createTextFlow(scene, text, font, fontSize, fontMaterial, radius, fontDepth = 1, orbitSpeed = 0.1, warpedDisk = false) {
  const geometry = new TextGeometry(text, {
    font: font,
    size: fontSize,
    depth: fontDepth,
    curveSegments: 1,
  });

  const textMesh = new THREE.Mesh(geometry, fontMaterial);
  geometry.rotateX(RIGHT_ANGLE_IN_RADIANS);
  geometry.translate(0, fontDepth / 2, 0);

  // Curve for path
  let curve;
  if (warpedDisk) {
    curve = new THREE.CatmullRomCurve3(generateWarpedPointPositions(NUM_CIRCLE_POINTS));
  }
  else {
    curve = new THREE.CatmullRomCurve3(generateCirclePointPositions(NUM_CIRCLE_POINTS, radius));
  }
  curve.closed = true;
  if (warpedDisk) {
    curve.originalCurve = curve.clone();
    curve.scaleFactor = radius / warpedDiskWidestWidth * 1.8;
    curve.scaleVector = new THREE.Vector3(curve.scaleFactor, curve.scaleFactor, 1);
    geometry.rotateZ(2 * RIGHT_ANGLE_IN_RADIANS);
  }

  // Flow for movement
  const flow = new Flow(textMesh);
  flow.orbitSpeed = orbitSpeed;
  flow.updateCurve(0, curve);
  flow.isWarpedDisk = warpedDisk;
  flow.object3D.frustumCulled = false;
  scene.add(flow.object3D);
  flows.push(flow);

  return flow;
}

/**
 * Generates Vector3 positions in a circular pattern.
 * @param numPoints {number} how many points to generate.
 * @param radius {number} how far the points should be from the centre.
 * @return {THREE.Vector3[]}
 */
function generateCirclePointPositions(numPoints, radius) {
  const pointPositions = [];
  const segmentAngle = 2 * Math.PI / numPoints;
  for (let i = 0; i < numPoints; i++) {
    pointPositions.push(
      new THREE.Vector3(
        radius * Math.cos(i * segmentAngle),
        0,
        radius * Math.sin(i * segmentAngle)),
    );
  }
  return pointPositions;
}

function generateWarpedPointPositions(numPoints) {
  return warpedDiskShape.getPoints(numPoints).map((v2) => {
    return new THREE.Vector3(v2.x, v2.y, 0);
  });
}

/**
 * Creates a shape consisting of points to form the warped accretion disk shape.
 * @param xScale how much larger relative to the black hole radius that the shape should be.
 * @param yScale same as xScale, but for height.
 * @param offsetScale how 'squished' the shape should be.
 * @param xyScale a factor applied to both x and y scaling.
 */
function drawWarpedAccretionShape({ xScale = 5, yScale = 2.5, offsetScale = 1, xyScale = 1 }) {
  const shape = new THREE.Shape();
  const curveWidth = BLACK_HOLE_RADIUS * xScale * xyScale;
  const curveHeight = BLACK_HOLE_RADIUS * yScale * xyScale;
  const xOffset = BLACK_HOLE_RADIUS * offsetScale;

  const halfWidth = curveWidth / 2;
  const halfHeight = curveHeight / 2;

  shape.moveTo(-halfWidth, 0);
  shape.bezierCurveTo(-halfWidth + xOffset, 0, -xOffset, halfHeight, 0, halfHeight);
  shape.bezierCurveTo(xOffset, halfHeight, halfWidth - xOffset, 0, halfWidth, 0);
  shape.bezierCurveTo(halfWidth - xOffset, 0, xOffset, -halfHeight, 0, -halfHeight);
  shape.bezierCurveTo(-xOffset, -halfHeight, xOffset - halfWidth, 0, -halfWidth, 0);
  return shape;
}
