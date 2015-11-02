#!/bin/bash

SCRIPT_DIR="`dirname $0`"
echo "Script directory: $SCRIPT_DIR"

SRC_DIR="$SCRIPT_DIR/../"
DIST_DIR="$SCRIPT_DIR/../dist/"
BUILD_TO_DIR=$DIST_DIR"pusher-realtime-producthunt"

echo "Source directory $SRC_DIR"
echo "Building to directory: $BUILD_TO_DIR"

rm -rf $DIST_DIR
mkdir $DIST_DIR
mkdir $BUILD_TO_DIR

cp -r $SRC_DIR*.html $SRC_DIR*.js $SRC_DIR*.json $SRC_DIR*.png $SRC_DIR*.md $BUILD_TO_DIR

set -x verbose
zip -rj $DIST_DIR"/pusher-realtime-producthunt.zip" $BUILD_TO_DIR
