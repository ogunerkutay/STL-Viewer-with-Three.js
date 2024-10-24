// /scripts/planeSetup.js
import * as THREE from 'three';
import { scene } from 'sceneSetup';
import { render } from 'render';

let wireframePlane = null; // Track the current wireframe plane


/**
 * Adds a wireframe plane to the scene based on the dimensions of a specified object.
 * @param {THREE.Object3D} targetObject - The object to which the plane's size and position will be adjusted.
 */
export function addWireframePlane(targetObject) {

    // Remove existing wireframe if present
    if (wireframePlane) {
        scene.remove(wireframePlane);
    }

    // Get the bounding box of the target object
    const bbox = new THREE.Box3().setFromObject(targetObject);
    const size = bbox.getSize(new THREE.Vector3()); // Get the size of the bounding box
    
    // Create a plane geometry based on the object's dimensions
    const planeGeometry = new THREE.PlaneGeometry(size.x, size.y, 10, 10); // Adjust the segments as needed
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00, // Green wireframe
        wireframe: true, // Enable wireframe mode
        side: THREE.DoubleSide // Visible from both sides
    });

    wireframePlane = new THREE.Mesh(planeGeometry, wireframeMaterial);
    
    // Rotate the plane to be horizontal
    wireframePlane.rotation.x = Math.PI / 2;

    // Position the plane at the bottom of the object
    wireframePlane.position.set(bbox.min.x + size.x / 2, bbox.min.y, bbox.min.z + size.z / 2); 

    // Add the plane to the scene
    scene.add(wireframePlane);
    render();
}

/**
 * Removes the wireframe plane from the scene.
 */
export function removeWireframePlane() {
    if (wireframePlane) {
        scene.remove(wireframePlane);
        wireframePlane = null; // Clear reference
        render();
    }
}