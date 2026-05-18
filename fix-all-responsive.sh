#!/bin/bash

# Fix all responsive design issues across the entire app

echo "Fixing responsive design issues across all pages..."
echo ""

cd /sessions/zealous-awesome-mayer/mnt/wizarding-app

# Count files to be modified
FILES_TO_FIX=$(grep -l "max-w-\[390px\]" src/pages/*.tsx 2>/dev/null | wc -l)
echo "Found $FILES_TO_FIX files with max-w-[390px] constraint"
echo ""

# Create a sed script to fix the issues
cat > /tmp/fix-responsive.sed << 'SEDEOF'
# Fix main container max-width constraints
s/max-w-\[390px\] mx-auto//g
s/max-w-\[390px\]/max-w-7xl/g

# Fix inline style width constraints for modals/overlays
s/maxWidth: '390px'/maxWidth: undefined/g
s/, maxWidth: '390px'//g

SEDEOF

# Apply fixes to all page files
for file in src/pages/*.tsx; do
    if grep -q "max-w-\[390px\]" "$file" 2>/dev/null; then
        echo "Fixing: $(basename $file)"
        sed -i.bak -f /tmp/fix-responsive.sed "$file"
        rm "${file}.bak" 2>/dev/null || true
    fi
done

echo ""
echo "Fixes applied! Verifying..."
echo ""

# Verify the fix
REMAINING=$(grep -l "max-w-\[390px\]" src/pages/*.tsx 2>/dev/null | wc -l)
if [ $REMAINING -eq 0 ]; then
    echo "✓ All max-w-[390px] constraints removed!"
    echo ""
    echo "Checking for responsive patterns..."
    grep -l "w-full" src/pages/*.tsx 2>/dev/null | wc -l | xargs echo "Files with w-full:"
else
    echo "⚠ Warning: $REMAINING files still have max-w-[390px]"
fi
