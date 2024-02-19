#!/bin/bash

# optimise BGM files
mkdir -p assets/bomberman-bgm/optimised
for file in assets/bomberman-bgm/*.mp3; do
  out_file="assets/bomberman-bgm/optimised/$(basename "$file")"
  ffmpeg -y -i "$file" -b:a 64k "$out_file"
done
