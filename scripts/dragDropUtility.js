// /scripts/dragDropUtility.js
import { loadGeometry } from 'loadGeometrySetup';
import {renderer} from 'sceneSetup';

let loadedObject = null;

export function getLoadedObject() {
    return loadedObject;
}

const dropArea = document.getElementById('drop-area');

// Function to disable the drop area
function disableDropArea() {
    dropArea.removeEventListener('dragover', handleDragOver);
    dropArea.removeEventListener('dragleave', handleDragLeave);
    dropArea.removeEventListener('drop', handleDrop);
    dropArea.style.display = 'none'; // Completely hide the drop area
    renderer.domElement.style.display = 'block';
}

// Function to enable the drop area and hide the canvas
export function enableDropArea() {
    dropArea.style.display = 'flex'; // Show the drop area
    renderer.domElement.style.display = 'none'; // Hide the Three.js canvas
}

// Function to handle drag over event
function handleDragOver(event) {
    event.preventDefault(); // Prevent default behavior
    dropArea.style.backgroundColor = '#e3e3e3'; // Change background color on dragover
}

// Function to handle drag leave event
function handleDragLeave() {
    dropArea.style.backgroundColor = ''; // Reset background color on drag leave
}


// Function to handle drop event
function handleDrop(event) {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    dropArea.style.backgroundColor = ''; // Reset background color

    const files = event.dataTransfer.files; // Get the files from the drop event
    if (files.length > 0) {
        const file = files[0]; // Get the first file
        
        if (isValidSTLFile(file)) {
            // Show loading indicator
            showLoadingIndicator();

            // Use Web Worker for heavy processing
            if (window.Worker) {
                const readerWorker = new Worker('./scripts/stlReaderWorker.js'); // Absolute from root
                readerWorker.postMessage(file);

                readerWorker.onerror = (error) => {
                    handleError(error);
                    return;
                };

                readerWorker.onmessage = (event) => {
                    if (event.data.error) {
                        handleError(event.data.error);
                        return;
                    }

                    const arrayBuffer = event.data;

                    loadGeometry(arrayBuffer)
                    .then(result => {
                        loadedObject = result;
                        hideLoadingIndicator();
                        disableDropArea();
                    })
                    .catch(handleError)
                    .finally(() => {
                        readerWorker.terminate();

                    });

                };
            } else {
                // Fallback for browsers without Worker support
                loadGeometry(file)
                    .then(result => {
                        loadedObject = result;
                        hideLoadingIndicator();
                        disableDropArea();
                    })
                    .catch(handleError);
            }
        } else {
            handleError('Invalid file type. Please upload an STL file.');
        }
    }
}

// Add event listeners if dropArea exists
if (dropArea) {
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('dragleave', handleDragLeave);
    dropArea.addEventListener('drop', handleDrop);
}

function isValidSTLFile(file) {
    return file instanceof File && 
           (file.type === 'model/stl' || 
            file.name.toLowerCase().endsWith('.stl'));
}

// Error handling function
function handleError(error) {
    console.error('Error:', error);
    hideLoadingIndicator();
    // Show error to user
    showErrorMessage(error);
}

function showErrorMessage(message) {
    // Show error message to user
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// UI feedback functions
function showLoadingIndicator() {
    // Add loading spinner or progress bar
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'block';
}

function hideLoadingIndicator() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
}

