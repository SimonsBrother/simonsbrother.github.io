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
 * Returns the text in bold.
 */
function b(text) {
  return `<b>${text}</b>`;
}

/**
 * Creates a styled date
 * @param {number} year
 */
function date(year) {
  return `<span class="project-date">${year}</span>`;
}

/**
 * Project definitions
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
      `Built in ${b('Python')}, timestamped broadband speed recordings were saved in a file and plotted on a ${b('matplotlib')} graph`,
      'Proved clients’ broadband unreliability, obliging the ISP to investigate disputes',
    ]) + date(2020),

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
    orbitSpeed: 5,
  },

  {
    name: 'Portfolio',
    description: bulletPoints([
      'Designed and developed a personal website for showcasing programming projects',
      `Utilised ${b('HTML')}, ${b('CSS')}, ${b('JavaScript')}, ${b('React')}, ${b('Three.JS')}, `
      + `${b('Vite')}, and ${b('ESLint')} to create an engaging and unique portfolio, frequently requesting feedback and criticism from family and friends to gain insight into user experience and preferences`
    ]) + date(2025),

    images: [],
    tags: [
      TAGS.HTML,
      TAGS.CSS,
      TAGS.JAVASCRIPT,
      TAGS.REACT,
    ],
    iconPath: 'projects/portfolio/icon.svg',
    modelPath: undefined,

    planetSize: 30,
    placeholderModelSize: 0.1,
    orbitRadius: 0.01,
  },
];
