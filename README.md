### hdr-decode

this simple command line utility decodes hdr-histograms encoded in base64 using the `decodeFromCompressedBase64` method.

#### installation

    $ git clone --depth=1 git@github.com:bmacnaughton/hdr-decode.git
    $ npm install

or
    $ npm install hdr-decode

#### running

```
$ alias hdr-decode=/path/to/hdr-decode/index.js
$ hdr-decode HISTFAAAACh4nJNpmSzMwMDAwQABTFCaEURcm7yEwf4DROArF1M1230WJgCDWQb1
Int32Histogram {
  autoResize: false,
  startTimeStampMsec: 9007199254740991,
  endTimeStampMsec: 0,
  tag: 'NO TAG',
  integerToDoubleValueConversionRatio: 1,
  identity: NaN,
  highestTrackableValue: 3600000000,
  lowestDiscernibleValue: 1,
  numberOfSignificantValueDigits: 2,
  bucketCount: 25,
  subBucketCount: 256,
  countsArrayLength: 3328,
  wordSizeInBytes: 0,
  maxValue: 22015,
  minNonZeroValue: 2992,
  unitMagnitude: 0,
  lowestDiscernibleValueRounded: 1,
  unitMagnitudeMask: 0,
  subBucketHalfCountMagnitude: 7,
  subBucketHalfCount: 128,
  subBucketMask: 255,
  leadingZeroCountBase: 45,
  percentileIterator:
   PercentileIterator {
     currentIterationValue:
      HistogramIterationValue {
        valueIteratedTo: 0,
        valueIteratedFrom: 0,
        countAtValueIteratedTo: 0,
        countAddedInThisIterationStep: 0,
        totalCountToThisValue: 0,
        totalValueToThisValue: 0,
        percentile: 0,
        percentileLevelIteratedTo: 0 },
     percentileTicksPerHalfDistance: 1,
     percentileLevelToIterateTo: 0,
     percentileLevelToIterateFrom: 0,
     reachedLastRecordedValue: false,
     histogram: [Circular],
     savedHistogramTotalRawCount: undefined,
     arrayTotalCount: undefined,
     currentIndex: 0,
     currentValueAtIndex: 0,
     nextValueAtIndex: 1,
     prevValueIteratedTo: 0,
     totalCountToPrevIndex: 0,
     totalCountToCurrentIndex: 0,
     totalValueToCurrentIndex: 0,
     countAtThisValue: 0,
     freshSubBucket: true },
  recordedValuesIterator:
   RecordedValuesIterator {
     currentIterationValue:
      HistogramIterationValue {
        valueIteratedTo: 0,
        valueIteratedFrom: 0,
        countAtValueIteratedTo: 0,
        countAddedInThisIterationStep: 0,
        totalCountToThisValue: 0,
        totalValueToThisValue: 0,
        percentile: 0,
        percentileLevelIteratedTo: 0 },
     histogram: [Circular],
     savedHistogramTotalRawCount: undefined,
     arrayTotalCount: undefined,
     currentIndex: 0,
     currentValueAtIndex: 0,
     nextValueAtIndex: 1,
     prevValueIteratedTo: 0,
     totalCountToPrevIndex: 0,
     totalCountToCurrentIndex: 0,
     totalValueToCurrentIndex: 0,
     countAtThisValue: 0,
     freshSubBucket: true,
     visitedIndex: -1 },
  totalCount: 5,
  counts: [ { '699': 1 }, { '762': 3 }, { '1067': 1 } ] }
```

```
$ hdr-decode -h
Usage: hdr-decode [options...] histogram...

  decodes encoded histograms produced by HdrHistogram

Options [default]:
  -f, --full-array      show zero elements of counts array
  -i, --indexes         preface each histogram with an index number
  -v, --version         show version (v1.0.0)
  -h, --help            show help
```
