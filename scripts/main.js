// /scripts/main.js
//import { onMouseDoubleClick } from 'raycaster';
import { onWindowResize } from 'windowResizeHandler';
import { addWireframePlane, removeWireframePlane } from 'planeSetup';
import { enableDropArea, getLoadedObject } from'dragDropUtility';
import 'sceneSetup';
import 'cameraSetup';
import 'controlsSetup';
import 'lightingSetup';


let isWireframeEnabled = false;

const wireframeToggle = document.getElementById('wireframe-toggle');

wireframeToggle.addEventListener('change', (event) => {
    isWireframeEnabled = event.target.checked; // Update the flag

    const object = getLoadedObject();

    if (object && isWireframeEnabled) {
        addWireframePlane(object); // Add the wireframe plane if the object is loaded and the checkbox is checked
    } else {
        removeWireframePlane(); // Remove wireframe plane if unchecked
    }
});

enableDropArea();


// Add event listeners
window.addEventListener('resize', onWindowResize, false);
// Uncomment if needed: document.addEventListener('dblclick', onMouseDoubleClick, false);