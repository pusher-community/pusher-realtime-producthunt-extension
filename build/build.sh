#!/bin/bash

BUILD_DIR="`dirname $0`"
echo "Build directory: $BUILD_DIR"

SRC_DIR="$BUILD_DIR/../"
DIST_DIR="$BUILD_DIR/pusher-realtime-producthunt/"

echo "Source directory $SRC_DIR"
echo "Distribution Directory: $DIST_DIR"

rm -rf $DIST_DIR
mkdir $DIST_DIR

cp -r $SRC_DIR*.html $SRC_DIR*.js $SRC_DIR*.json $SRC_DIR*.png $SRC_DIR*.md $DIST_DIR

set -x verbose
zip -rj $BUILD_DIR"/pusher-realtime-producthunt.zip" $DIST_DIR
