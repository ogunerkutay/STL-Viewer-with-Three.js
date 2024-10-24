// stlReaderWorker.js
self.onmessage = function(e) {
    const file = e.data;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        self.postMessage(arrayBuffer);
    };
    
    reader.onerror = (error) => {
        self.postMessage({ error: error.message });
    };
};