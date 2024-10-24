// /scripts/render.js
// ---------------------- Render Function ----------------------
import { renderer } from 'sceneSetup';
import { scene } from 'sceneSetup';
import { camera } from 'cameraSetup';

export function render() {
    renderer.render(scene, camera);
}