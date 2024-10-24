// /scripts/lightingSetup.js
// ---------------------- Lightnings ----------------------
import * as THREE from 'three';
import { scene } from 'sceneSetup';

export const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
scene.add(ambientLight);