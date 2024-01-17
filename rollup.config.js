import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import bundleSize from 'rollup-plugin-bundle-size'
import terser from '@rollup/plugin-terser'
import cleanup from 'rollup-plugin-cleanup'

const buildConfig = (input, output, format = 'esm', minified = false, browser = false, es5 = false, external = []) => {
    const tmpConfig = []
    tmpConfig.push({
        input,
        output: {
            file: output,
            format: format,
            sourcemap: true,
            name: 'translator',
            exports: format === 'esm' ? 'named' : 'default'
        },
        external,
        plugins: [
            typescript({
                tsconfig: format === 'esm' ? './tsconfig.json' : './tsconfig.rollup.json'
            }),
            commonjs(),
            resolve({ browser }),
            ...(es5
                ? [
                      babel({
                          babelHelpers: 'bundled',
                          presets: ['@babel/preset-env']
                      })
                  ]
                : []),
            bundleSize(),
            cleanup()
        ]
    })
    if (minified) {
        tmpConfig.push({
            input,
            output: {
                file: output.replace('.js', '.min.js'),
                format: format,
                sourcemap: true,
                name: 'translator',
                exports: format === 'esm' ? 'named' : 'default'
            },
            external,
            plugins: [
                commonjs(),
                typescript({
                    tsconfig: format === 'esm' ? './tsconfig.json' : './tsconfig.rollup.json'
                }),
                resolve({ browser }),
                ...(es5
                    ? [
                          babel({
                              babelHelpers: 'bundled',
                              targets: {
                                  ie: 8
                              },
                              presets: ['@babel/preset-env']
                          })
                      ]
                    : []),
                terser(),
                bundleSize(),
                cleanup()
            ]
        })
    }
    return tmpConfig
}

export default [
    ...buildConfig('src/index.browser.ts', 'dist/translator.js', 'umd', true, true, true),
    //...buildConfig('src/index.browser.ts', 'dist/translator.cjs', 'cjs', false, true),
    //...buildConfig('src/index.ts', 'dist/cjs/translator.cjs', 'cjs', false, false),
    ...buildConfig('src/index.ts', 'dist/esm/index.js', 'esm', false, false, false, ['hpagent']),
    ...buildConfig('src/index.ts', 'dist/esm/translator.mod.js', 'esm', false, true)
]
