#!/usr/bin/env node
const minimist = require('minimist');
const pkg = require('./package.json');
const hdr = require('hdr-histogram-js');
const util = require('util');

// hdr.decodeFromCompressedBase64


// Define CLI flags
//const options = [{
//  name: 'config',
//  alias: 'c',
//  description: 'Config file path',
//  default: './test/versions'
//}, {
//  name: 'package',
//  alias: 'p',
//  description: 'package name to test (multiple allowed)',
//}, {
//  name: 'no-summary',
//  alias: 'S',
//  description: 'do not write summary file',
//  default: false
//}, {
//  name: 'summary-file',
//  description: 'summary file name',
//  displayDefault: '<linux>-<version>-node-<version>-summary-<ts>.json',
//  default: makeLogName('summary', 'json')
//}, {
//  name: 'no-details',
//  alias: 'D',
//  description: 'do not write details file',
//  default: false
//}, {
//  name: 'details-file',
//  description: 'details file name',
//  displayDefault: '<linux>-<version>-node-<version>-details-<ts>',
//  default: makeLogName('details')
//}, {
//  name: 'reporter',
//  alias: 'r',
//  description: 'Reporting style',
//  default: 'spec'
//}, {
//  name: 'suppress',
//  alias: 's',
//  description: 'Suppress output of error text',
//  default: true
//}, {
//  name: 'verbose',
//  alias: 'V',
//  description: 'Enable verbose logging',
//  default: false
//}, {
//  name: 'downloads',
//  alias: 'd',
//  description: 'Display download counts',
//  default: false
//}, {
//  name: 'log-directory',
//  alias: 'l',
//  description: 'Directory to write summary and detail logs',
//  default: '.'
//}, {
//  name: 'version',
//  alias: 'v',
//  description: `show version (v${pkg.version})`
//}, {
//  name: 'help',
//  alias: 'h',
//  description: 'Show help information'
//}]

const options = [{
  name: 'full-array',
  alias: 'f',
  description: 'show zero elements of counts array'
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
  boolean: ['full-array']
})

// Show help text
if (argv.help) {
  showHelp();
  return;
}

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

  console.log(`${i}: ${decoded}`);
})


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


