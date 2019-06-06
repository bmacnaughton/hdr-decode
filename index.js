#!/usr/bin/env node
const minimist = require('minimist');
const pkg = require('./package.json');
const hdr = require('hdr-histogram-js');
const util = require('util');

//
// configure command line options
//
const options = [{
  name: 'full-array',
  alias: 'f',
  description: 'show zero elements of counts array'
}, {
  name: 'indexes',
  alias: 'i',
  description: 'preface each histogram with an index number'
}, {
  name: 'version',
  alias: 'v',
  description: `show version (v${pkg.version})`
}, {
  name: 'help',
  alias: 'h',
  description: 'show help'
}]

// helper to map options to minimist inputs
function map (key, val) {
  const res = {};
  options.forEach(option => {
    res[option[key]] = option[val];
  })
  return res;
}

// Parse process arguments
const argv = minimist(process.argv.slice(2), {
  default: map('name', 'default'),
  alias: map('alias', 'name'),
  boolean: ['full-array', 'indexes']
})

// Show help text if requested
if (argv.help) {
  showHelp();
  return;
}

// show version if requested
if (argv.version) {
  console.log(`${pkg.name} v${pkg.version}`);
  return;
}

//
// core functionality
//
const hists = argv._;

if (!hists.length) {
  console.log('no histograms to decode\n');
  showHelp();
  return;
}

//
// loop through histograms supplied
//
hists.forEach((h, i) => {
  let decoded;

  try {
    decoded = hdr.decodeFromCompressedBase64(h);
    if (!argv['full-array']) {
      decoded.counts = decoded.counts.reduce((a, c, i) => {
        if (c) {
          a.push({[i]: c});
        }
        return a;
      }, [])
    }
    decoded = util.inspect(decoded);
  } catch (e) {
    if (e instanceof Error) {
      decoded = e.message;
    } else if (typeof e === 'string') {
      decoded = e;
    } else {
      decoded = 'unknown failure';
    }
  }
  const string = argv.indexes ? `${i}: ${decoded}` : decoded;
  console.log(decoded);
})


//
//
//
function showHelp () {
  console.log(`Usage: ${pkg.name} [options...] histogram...`);
  console.log('\n  decodes encoded histograms produced by HdrHistogram\n');
  console.log(`Options [default]:`);

  options.forEach(o => {
    let alias = '';
    if (o.alias !== undefined) {
      alias = `-${o.alias}, `;
    }
    let msg = padEnd(20, `  ${alias}--${o.name}`);
    msg += `   ${o.description}`;
    let defaultValue = o.displayDefault || o.default;
    if (typeof defaultValue !== 'undefined') {
      msg += ` [${defaultValue}]`;
    }
    console.log(msg);
  })
}

//
// helper
//
function padEnd (n, msg) {
  let len = n - msg.length + 1
  if (len < 0) {
    len = 0
  }
  return msg + ' '.repeat(len)
}


