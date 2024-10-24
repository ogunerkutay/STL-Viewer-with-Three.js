// /scripts/windowResizeHandler.js
// ---------------------- Window Resize Handler ----------------------
import { camera } from 'cameraSetup';
import { renderer } from 'sceneSetup';
import { render } from 'render';

export function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    render();
}