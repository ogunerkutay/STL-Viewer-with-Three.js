// /scripts/raycaster.js
// ---------------------- Raycaster for Mouse Double Click ----------------------
import * as THREE from 'three';
import { renderer, scene } from 'sceneSetup';
import { camera } from 'cameraSetup';
import { controls } from 'controlsSetup';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function onMouseDoubleClick(event) {
    event.preventDefault();

    const containerWidth = renderer.domElement.clientWidth;
    const containerHeight = renderer.domElement.clientHeight;
    mouse.x = (event.clientX / containerWidth) * 2 - 1;
    mouse.y = -(event.clientY / containerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const point = intersects[0].point;
        controls.target.set(point.x, point.y, point.z);
        controls.update();
    }
}