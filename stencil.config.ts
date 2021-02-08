import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import alias from '@rollup/plugin-alias';
const elementBase:Partial<Config> = {
  namespace: 'custom-elements',
  srcDir: "src/elements",
  tsconfig: "elements.tsconfig.json",
}

const showcaseBase: Partial<Config> = {
  globalStyle: 'src/showcase/_root/global.css',
  globalScript: 'src/showcase/_root/global.ts',
  taskQueue: 'async',
  tsconfig: "showcase.tsconfig.json",
  rollupPlugins: {
    after: [
      nodePolyfills(),
      alias({
          entries: {
              "@utils": "./src/utils"
          }
      }),
    ]
  },
  devServer: {
    reloadStrategy: "pageReload"
  }
};


const lazy:Config = Object.assign({}, elementBase, {
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: './lazy-loader',
      dir: "dist"
    },
  ],
});

const eager:Config = Object.assign({}, elementBase, {
  outputTargets: [
    {
      type: 'dist-custom-elements-bundle',
      dir: "dist"
    },
  ],
});

const docs:Config = Object.assign({}, elementBase, {
  outputTargets: [
    {
      type: 'docs-readme',
      dir: "dist/docs"
    },
  ],
});

const showcase:Config = Object.assign({}, showcaseBase, {
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      //baseUrl: 'https://myapp.local/',

      copy: [
        { src: '../dist/docs', dest: 'static/docs' },
        { src: '../images', dest: 'static/images' }
      ]
    },
  ],
});

const envTarget = process.env['STENCIL_TARGET'];

export const config = envTarget === "lazy" ? lazy 
  : envTarget === "eager" ? eager 
  : envTarget === "showcase" ? showcase
  : envTarget === "docs" ? docs
  : null;

if(config == null) {
  throw new Error("unknown stencil build target!");
}