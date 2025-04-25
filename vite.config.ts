import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "./lib/main.ts",
            formats: ["es", "cjs"],
            name: "PlayerAPI",
            fileName: "player-api",
        },
    }
});
