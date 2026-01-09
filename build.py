#!/usr/bin/env python3
"""
Build script to auto-discover markdown files and generate manifest.json
Run this script whenever you add new .md files to the repository.
"""

import os
import json
import re
from pathlib import Path


def extract_title_from_markdown(file_path):
    """Extract the first # heading from a markdown file as the title."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                # Look for first level-1 heading
                if line.startswith('# '):
                    return line[2:].strip()
        # If no heading found, use filename without extension
        return Path(file_path).stem.replace('-', ' ').title()
    except Exception as e:
        print(f"Warning: Could not read {file_path}: {e}")
        return Path(file_path).stem.replace('-', ' ').title()


def find_markdown_files(root_dir='.'):
    """Find all .md files in the repository, excluding hidden directories."""
    markdown_files = []
    root_path = Path(root_dir)

    for md_file in root_path.rglob('*.md'):
        # Skip hidden directories and files
        if any(part.startswith('.') for part in md_file.parts):
            continue

        # Get relative path from root
        relative_path = md_file.relative_to(root_path)

        # Skip README.md as it's for documentation
        if md_file.name.lower() == 'readme.md':
            continue

        title = extract_title_from_markdown(md_file)

        markdown_files.append({
            'path': str(relative_path),
            'title': title
        })

    # Sort by title alphabetically
    markdown_files.sort(key=lambda x: x['title'].lower())

    return markdown_files


def generate_manifest():
    """Generate manifest.json with list of all markdown files."""
    print("Scanning for markdown files...")

    files = find_markdown_files()

    manifest = {
        'files': files
    }

    output_path = 'manifest.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"\nGenerated {output_path}")
    print(f"Found {len(files)} markdown file(s):")
    for file_info in files:
        print(f"  - {file_info['title']} ({file_info['path']})")


if __name__ == '__main__':
    generate_manifest()
