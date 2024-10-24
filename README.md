# STL Viewer with Three.js

This project is a simple STL viewer built using Three.js, allowing users to drag and drop STL files to visualize 3D models in the browser. The viewer utilizes various Three.js components, including loaders and controls, to provide an interactive experience.

## Features

- Drag and drop STL files to load 3D models.
- Toggle wireframe view for better model visualization.
- Responsive layout to accommodate different screen sizes.
- Error handling for unsupported file types or loading issues.

## Technologies Used

- [Three.js](https://threejs.org/): A JavaScript library for creating 3D graphics in the browser.
- JavaScript Modules: Using ES6 modules for better code organization.
- HTML5: Structuring the application interface.
- CSS: Styling the viewer layout and components.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge).
- Basic understanding of JavaScript and web development.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stl-viewer.git

2. Navigate to the project directory:

cd stl-viewer

3. Open index.html in your web browser or use a local server.

### Usage
Drag and drop your STL files onto the designated area to view the model.
Use the checkbox to toggle the wireframe view.

### Customization
You can customize the viewer by modifying the following files:

/scripts/main.js: Main entry point of the application.
/scripts/sceneSetup.js: Configure the Three.js scene.
/scripts/cameraSetup.js: Adjust camera settings.
/scripts/controlsSetup.js: Modify controls for user interaction.
/styles/main.css: Update styles to match your preferences.
