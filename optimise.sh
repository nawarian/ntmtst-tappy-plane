#!/bin/bash

# optimise SFX files
mkdir -p assets/sfx/optimised
for file in assets/sfx/**/*.wav; do
  out_file="assets/sfx/optimised/$(basename "${file%.wav}.mp3")"
  ffmpeg -y -i "$file" -b:a 64k "$out_file"
done

# optimise BGM files
mkdir -p assets/bomberman-bgm/optimised
for file in assets/bomberman-bgm/*.mp3; do
  out_file="assets/bomberman-bgm/optimised/$(basename "$file")"
  ffmpeg -y -i "$file" -b:a 64k "$out_file"
done
