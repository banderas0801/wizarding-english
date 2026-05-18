#!/usr/bin/env python3
"""
Fix responsive design issues across all page components
- Remove max-w-[390px] constraints from main containers
- Replace with responsive max-w-7xl for desktop
- Keep w-full for mobile responsiveness
"""

import os
import re
from pathlib import Path

def fix_responsive_design(file_path):
    """Fix responsive design issues in a single file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Pattern 1: Remove max-w-[390px] mx-auto from main container divs
    # But preserve the structure
    content = re.sub(
        r'className="([^"]*?)max-w-\[390px\]\s+mx-auto([^"]*?)"',
        r'className="\1\2"',
        content
    )

    # Pattern 2: Remove max-w-[390px] from class names (general cleanup)
    content = re.sub(
        r'\s*max-w-\[390px\]\s*',
        ' ',
        content
    )

    # Pattern 3: Clean up multiple spaces that may have been created
    content = re.sub(r'\s{2,}(className|style)', r' \1', content)

    # Pattern 4: Fix inline styles with maxWidth: '390px'
    content = re.sub(
        r',\s*maxWidth:\s*[\'"]390px[\'"]',
        '',
        content
    )
    content = re.sub(
        r'maxWidth:\s*[\'"]390px[\'"],?\s*',
        '',
        content
    )

    # Pattern 5: If a container has w-full and mx-auto, add responsive max-width
    # Only if it doesn't already have max-w-7xl or max-w-*
    pattern = r'className="([^"]*?)w-full\s+mx-auto([^"]*?)"'
    def add_max_w(match):
        class_str = match.group(1) + match.group(2)
        # Check if already has max-w-*
        if 'max-w-' in class_str:
            return match.group(0)  # Already has max-width, don't modify
        else:
            # This is the main content area, add responsive max-width
            return f'className="{match.group(1)}w-full mx-auto max-w-7xl{match.group(2)}"'

    # Only apply this to main content areas (be selective)
    if '<main' in content:
        content = re.sub(pattern, add_max_w, content)

    return content, original != content

def main():
    pages_dir = Path('src/pages')

    if not pages_dir.exists():
        print(f"Error: {pages_dir} not found")
        return

    tsx_files = list(pages_dir.glob('*.tsx'))
    print(f"Found {len(tsx_files)} TypeScript/React files")
    print("=" * 50)

    fixed_count = 0
    files_with_issues = []

    for file_path in sorted(tsx_files):
        try:
            content, was_modified = fix_responsive_design(file_path)

            # Check if file has issues
            has_390px = 'max-w-[390px]' in content

            if was_modified:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✓ {file_path.name:40} - FIXED")
                fixed_count += 1
            elif has_390px:
                files_with_issues.append(file_path.name)
                print(f"⚠ {file_path.name:40} - Needs manual review")

        except Exception as e:
            print(f"✗ {file_path.name:40} - ERROR: {e}")

    print("=" * 50)
    print(f"\nResults:")
    print(f"  Files fixed: {fixed_count}")
    print(f"  Files needing review: {len(files_with_issues)}")

    if files_with_issues:
        print(f"\nFiles to review manually:")
        for fname in files_with_issues:
            print(f"  - {fname}")

if __name__ == '__main__':
    main()
