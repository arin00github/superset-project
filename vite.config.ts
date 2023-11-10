import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: ".",
    // resolve: {
    //     alias: {
    //         "@superset-ui/core": "./packages/superset-ui-core",
    //     },
    // },
    cacheDir: ".vite",
    server: {
        // hmr: {
        //     overlay: false,
        // },
    },
});
