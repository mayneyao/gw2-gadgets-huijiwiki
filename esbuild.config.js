require('esbuild').build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'public/Gadget:TestNews.js',
  target: "chrome56",
  external: ["react", "react-dom"],
}).catch(() => process.exit(1))