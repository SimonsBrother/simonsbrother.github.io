import * as THREE from 'three';
import { tagDefinitions as TAGS } from './tags';

/**
 * Converts a list of strings to a single bullet pointed string.
 * @param {string[]} textList
 */
function bulletPoints(textList) {
  const items = textList.map((text, index) => {
    return `<li class="project-list-item ${index === textList.length - 1 ? 'project-last-list-item' : ''}">${text}</li>`;
  }).join('');
  return `<ul class="project-list">${items}</ul>`;
}

/**
 * @type {[
 * { name: string,
 *   description: string,
 *   images: [ { url: string, altText: string } ],
 *   tags: [],
 *   iconPath: string,
 *   modelPath: string,
 *   planetSize: number,
 *   orbitRadius: number,
 *   orbitStartingAngle: number,
 *   orbitSpeed: number,
 *   planetRotationSpeed: THREE.Euler,
 *   orbitOrientation: THREE.Euler,
 *   orbitCentre: THREE.Vector3 },
 * ]}
 */
export const projectDefinitions = [
  {
    name: 'BroadbandBug',
    description: bulletPoints([
      'Designed a tool for detecting broadband problems by monitoring broadband upload and download speed',
      'Built in Python, timestamped broadband speed recordings were saved in a file and plotted on a matplotlib graph',
      'Proved clients’ broadband unreliability, obliging the ISP to investigate disputes',
    ]),

    images: [
      { url: 'projects/broadbandbug/1.png', altText: 'Example output; this graph shows the download speed is consistently no more than 14, and drops out frequently. There is a serious problem with the X axis labelling!' },
      { url: 'projects/broadbandbug/2.png', altText: 'A very large collection of readings. The broadband continually drops out throughout the day.' },
    ],
    tags: [
      TAGS.PYTHON,
      TAGS.MATPLOTLIB,
      TAGS.PERSONAL,
    ],
    iconPath: 'projects/broadbandbug/icon.svg',
    modelPath: undefined, // TODO

    planetSize: 5,
    orbitRadius: 80,
    orbitStartingAngle: 0,
    orbitSpeed: 1,

    planetRotationSpeed: new THREE.Euler(25, 0, 0),
    orbitOrientation: new THREE.Euler(0, 0, 0),
    orbitCentre: new THREE.Vector3(0, 10, 0),
  },
];
