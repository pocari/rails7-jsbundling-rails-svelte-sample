import { globPlugin } from 'esbuild-plugin-glob';
import esbuild from 'esbuild';
import esbuildSvelte from 'esbuild-svelte';
import sveltePreprocess from "svelte-preprocess";

const args = process.argv.slice(2);

const options = {
  entryPoints: [
    "app/javascript/**.ts",
    "app/javascript/**/*.ts",
    "app/javascript/**/*.svelte"
  ],
  bundle: true,
  sourcemap: true,
  outbase: 'app/javascript/',
  outdir: 'app/assets/builds',
  plugins: [
    globPlugin(),
    esbuildSvelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  logLevel: "info",
  watch: args.includes('--watch') && {
    onRebuild: (err, res) => {
      const now = `[${new Date().toLocaleTimeString()}]`;
      if (err) {
        console.error(`${now} ${err}`);
        return;
      }
      console.log(`Rebuild done!`);
      if (res.warnings.length) {
        console.log(`${now} ${res.warnings}`);
      }
    },
  },
};

esbuild.build(options).catch(() => process.exit(1));
