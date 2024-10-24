// /scripts/controlsSetup.js
// ---------------------- Controls ----------------------
import { OrbitControls } from 'orbitcontrols';
import { camera } from 'cameraSetup';
import { renderer } from 'sceneSetup';
import { render } from 'render';

export const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);