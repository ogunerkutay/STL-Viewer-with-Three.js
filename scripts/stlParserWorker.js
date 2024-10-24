// stlParserWorker.js
import { STLLoader } from 'stlloader';

self.onmessage = (event) => {
    const file = event.data;

    const loader = new STLLoader();

    try {
        const geometry = loader.parse(file);
        self.postMessage({ geometry }, [geometry]);
    } catch (error) {
        self.postMessage({ error });
    }
};