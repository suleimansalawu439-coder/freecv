import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// A simple plugin to copy the manifest and icons to the output directory
const copyManifestPlugin = () => {
  return {
    name: 'copy-manifest',
    generateBundle() {
      const manifest = fs.readFileSync(path.resolve(__dirname, 'manifest.json'), 'utf-8');
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: manifest
      });
    }
  };
};

export default defineConfig({
  plugins: [copyManifestPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'popup.html')
      }
    }
  }
});
