import P5 from 'p5'
import * as sketch from './sketch'

/**
 * Define a pass-through property.
 *
 * This is used for the `window` object to be able to
 * read and write properties like `width` and `height`
 * at any moment, even though they are on a completely
 * different object
 */
function map(property, from, on) {
  Object.defineProperty(on, property, {
    get: () => from[property],
    set: (value) => from[property] = value,
  })
}

/**
 * Main application entry point
 */
function main() {
  // Start a new P5 Sketch!
  new P5(p5 => {
    // make functions context-bound to p5
    for (const field in p5)
      if (typeof p5[field] === 'function')
        p5[field] = p5[field].bind(p5)

    // make p5 functions publicly available and properties publicly accessible
    for (const field in p5)
      switch (typeof p5[field]) {
        case 'function':
          window[field] = p5[field]
          break
        default:
          map(field, p5, window)
          break
      }

    // assign exported elements to the p5 instance
    for (const field in sketch)
      if ([typeof sketch[field], 'undefined'].includes(typeof p5[field]))
        switch(typeof sketch[field]) {
          case 'function':
            p5[field] = () => sketch[field](p5)
            break
          default:
            p5[field] = sketch[field]
        }
  })
}

// Start the main function as soon as the document is loaded
window.addEventListener('load', main, { once: true })
