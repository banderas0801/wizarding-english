#!/bin/bash

# Responsive Design Verification Script
# Checks for common responsive design issues in the codebase

echo "========================================="
echo "Responsive Design Verification"
echo "========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check 1: Look for hardcoded 390px width
echo "✓ Checking for hardcoded 390px width constraints..."
if grep -r "max-w-\[390\|maxWidth.*390\|width.*390px" src/ 2>/dev/null | grep -v node_modules; then
    echo -e "${RED}✗ FAILED: Found 390px width constraints${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ PASSED: No 390px width constraints found${NC}"
fi
echo ""

# Check 2: Look for responsive padding in main content
echo "✓ Checking for responsive padding (px-4 sm:px-6 md:px-8 lg:px-12)..."
if grep -r "px-4.*sm:px-6.*md:px-8.*lg:px-12" src/ 2>/dev/null | head -5; then
    echo -e "${GREEN}✓ PASSED: Found responsive padding pattern${NC}"
else
    echo -e "${YELLOW}⚠ WARNING: Could not verify responsive padding pattern${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 3: Verify w-full usage in main containers
echo "✓ Checking for w-full in main containers..."
WFULL_COUNT=$(grep -r "w-full" src/ 2>/dev/null | wc -l)
if [ $WFULL_COUNT -gt 20 ]; then
    echo -e "${GREEN}✓ PASSED: Found $WFULL_COUNT instances of w-full (good responsive practice)${NC}"
else
    echo -e "${YELLOW}⚠ WARNING: Only found $WFULL_COUNT instances of w-full${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 4: Look for problematic hardcoded widths in style attributes
echo "✓ Checking for hardcoded pixel widths in style attributes..."
if grep -r 'style=.*width.*[0-9]\+px' src/ 2>/dev/null | grep -v "width: 100%\|width: \`\|width: \${"; then
    echo -e "${YELLOW}⚠ WARNING: Found potential hardcoded width values${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✓ PASSED: No problematic hardcoded pixel widths found${NC}"
fi
echo ""

# Check 5: Verify max-w-7xl for desktop content
echo "✓ Checking for max-w-7xl (desktop constraint)..."
if grep -r "max-w-7xl" src/ 2>/dev/null; then
    echo -e "${GREEN}✓ PASSED: Found max-w-7xl constraint for desktop${NC}"
else
    echo -e "${YELLOW}⚠ WARNING: Could not find max-w-7xl constraint${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 6: Look for responsive game components
echo "✓ Checking game components for responsiveness..."
GAME_FILES=(
    "src/components/games/BattleGame.tsx"
    "src/components/games/RiddleGame.tsx"
    "src/components/games/MatchGame.tsx"
    "src/components/games/StoryGame.tsx"
)

for game_file in "${GAME_FILES[@]}"; do
    if [ -f "$game_file" ]; then
        if grep -q "w-full" "$game_file"; then
            echo -e "${GREEN}✓ $(basename $game_file): Uses w-full${NC}"
        else
            echo -e "${YELLOW}⚠ $(basename $game_file): May not be responsive${NC}"
            WARNINGS=$((WARNINGS + 1))
        fi
    fi
done
echo ""

# Check 7: Verify App.tsx doesn't have max-width
echo "✓ Checking App.tsx for max-width constraints..."
if grep -q "maxWidth\|max-w-\[" src/App.tsx 2>/dev/null; then
    echo -e "${RED}✗ FAILED: App.tsx contains max-width constraint${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ PASSED: App.tsx has no max-width constraint${NC}"
fi
echo ""

# Check 8: Verify LessonEvan.tsx structure
echo "✓ Checking LessonEvan.tsx responsive structure..."
if grep -q "max-w-7xl mx-auto" src/pages/LessonEvan.tsx 2>/dev/null; then
    echo -e "${GREEN}✓ PASSED: Found max-w-7xl mx-auto in main content area${NC}"
else
    echo -e "${YELLOW}⚠ WARNING: Could not find max-w-7xl mx-auto pattern${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Summary
echo "========================================="
echo "Summary"
echo "========================================="
echo -e "Errors:   ${RED}$ERRORS${NC}"
echo -e "Warnings: ${YELLOW}$WARNINGS${NC}"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ RESPONSIVE DESIGN: VERIFIED${NC}"
    echo "All critical responsive design checks passed!"
    exit 0
else
    echo -e "${RED}✗ RESPONSIVE DESIGN: ISSUES FOUND${NC}"
    echo "Please fix the errors above before deploying."
    exit 1
fi
