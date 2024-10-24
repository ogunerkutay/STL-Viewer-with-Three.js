// /scripts/cameraSetup.js
// ---------------------- Camera Setup ----------------------
import * as THREE from 'three';
import { scene } from 'sceneSetup';

export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);
scene.add(camera);