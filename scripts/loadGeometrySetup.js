    // /scripts/loadGeometrySetup.js
    // ---------------------- Load Geometry & Mesh Creation ----------------------
    import * as THREE from 'three';
    import {STLLoader} from 'stlloader';
    import { scene } from 'sceneSetup';
    import { camera } from 'cameraSetup';
    import { controls } from 'controlsSetup';
    import { render } from 'render';

    export function loadGeometry(arrayBuffer) {
        return new Promise((resolve, reject) => {
            try {

                const loader = new STLLoader();
                const geometry = loader.parse(arrayBuffer);

                // Create mesh material - could be moved to a separate function
                const material = new THREE.MeshPhongMaterial({ 
                    color: 0xff00ff, 
                    specular: 0x111111, 
                    shininess: 200 
                });
                
                // Create the mesh
                const object = new THREE.Mesh(geometry, material);
                object.position.set(0, 0, 0);

                // Use requestAnimationFrame for smooth scene updates
                requestAnimationFrame(() => {
                    // Add to scene
                    scene.add(object);
                    
                    // Adjust camera and add edges in separate frames
                    requestAnimationFrame(() => {
                        adjustCameraAndControls(object);
                        
                        requestAnimationFrame(() => {
                            addEdgeDetection(object, geometry);
                            render();
                            resolve(object);
                        });
                    });
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    // Function to adjust camera and controls
    function adjustCameraAndControls(object) {
        const bbox = new THREE.Box3().setFromObject(object);
        const center = bbox.getCenter(new THREE.Vector3());
        controls.target.copy(center);
        controls.update();

        const size = bbox.getSize(new THREE.Vector3());
        camera.position.set(size.x * -1 / 3, size.y * -2 / 3, size.z * 3 / 2).add(bbox.min);
        camera.lookAt(center);
    }

    // Function to add edge detection
    function addEdgeDetection(object, geometry) {
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xff0000, // Red color
            polygonOffset: true, // Enable polygon offset
            polygonOffsetFactor: 1, // Offset factor
            polygonOffsetUnits: 1   // Offset units
        });
        const line = new THREE.LineSegments(edges, lineMaterial);
        object.add(line);
    }