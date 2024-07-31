#!/bin/bash

# Check if input file is provided
if [ $# -eq 0 ]; then
    echo "Please provide an input SVG file."
    exit 1
fi

input_file=$1
filename=$(basename -- "$input_file")
filename_noext="${filename%.*}"

# Get the dimensions of the SVG
width=$(magick identify -format "%w" "$input_file")
height=$(magick identify -format "%h" "$input_file")

# Calculate 1/3 and 2/3 sizes
width_tiny=$((width / 6))
height_tiny=$((height / 6))
width_third=$((width / 3))
height_third=$((height / 3))
width_two_thirds=$((width * 2 / 3))
height_two_thirds=$((height * 2 / 3))

# Create tiny size PNG
magick "$input_file" -resize ${width_tiny}x${height_tiny} "${filename_noext}_0.png"

# Create 1/3 size PNG
magick "$input_file" -resize ${width_third}x${height_third} "${filename_noext}_1.png"

# Create 2/3 size PNG
magick "$input_file" -resize ${width_two_thirds}x${height_two_thirds} "${filename_noext}_2.png"

echo "Created ${filename_noext}_1.png (1/3 size) and ${filename_noext}_2.png (2/3 size)"