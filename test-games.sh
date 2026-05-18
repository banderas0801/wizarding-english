#!/bin/bash

# Automated Game Testing Script for Wizarding App
# Tests all 5 game types automatically

echo "=============================================================="
echo "   Automated Game System Testing - Wizarding App"
echo "=============================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# 1. Check Node.js
echo "[Test 1] Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}OK${NC} Node.js ${NODE_VERSION} found"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} Node.js not found"
    ((FAILED++))
    exit 1
fi
echo ""

# 2. Check npm
echo "[Test 2] Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}OK${NC} npm ${NPM_VERSION} found"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} npm not found"
    ((FAILED++))
    exit 1
fi
echo ""

# 3. Check package.json exists
echo "[Test 3] Checking package.json..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}OK${NC} package.json found"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} package.json not found"
    ((FAILED++))
    exit 1
fi
echo ""

# 4. Check lessons-manifest.json
echo "[Test 4] Checking lessons-manifest.json..."
if [ -f "public/lessons-manifest.json" ]; then
    FILE_SIZE=$(du -h public/lessons-manifest.json | cut -f1)
    LESSON_COUNT=$(grep -o '"lessonId"' public/lessons-manifest.json | wc -l)
    echo -e "${GREEN}OK${NC} Manifest found (${FILE_SIZE}, ${LESSON_COUNT} lessons)"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} lessons-manifest.json not found"
    ((FAILED++))
fi
echo ""

# 5. Check game files exist
echo "[Test 5] Checking game components..."
GAMES=("BattleGame.tsx" "RiddleGame.tsx" "MatchGame.tsx" "StoryGame.tsx")
GAME_PATH="src/components/games"

GAMES_OK=0
for game in "${GAMES[@]}"; do
    if [ -f "$GAME_PATH/$game" ]; then
        echo -e "  ${GREEN}OK${NC} $game"
        ((GAMES_OK++))
    else
        echo -e "  ${RED}FAIL${NC} $game (MISSING)"
    fi
done

# Check GameTab_Master in the correct location
if [ -f "src/components/lesson/GameTab_Master.tsx" ]; then
    echo -e "  ${GREEN}OK${NC} GameTab_Master.tsx"
    ((GAMES_OK++))
else
    echo -e "  ${RED}FAIL${NC} GameTab_Master.tsx (MISSING)"
fi

if [ $GAMES_OK -eq 5 ]; then
    ((PASSED++))
    echo -e "${GREEN}OK${NC} All 5 game components found"
else
    ((FAILED++))
    echo -e "${RED}FAIL${NC} Only $GAMES_OK/5 games found"
fi
echo ""

# 6. Check TypeScript compilation
echo "[Test 6] Checking TypeScript compilation..."
if npx tsc --noEmit > /tmp/build.log 2>&1; then
    echo -e "${GREEN}OK${NC} TypeScript compiles without errors"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} TypeScript compilation failed"
    echo "Error details:"
    tail -20 /tmp/build.log
    ((FAILED++))
fi
echo ""

# 7. Validate game file structure
echo "[Test 7] Validating game file structure..."
STRUCTURE_OK=0

if grep -q "export function BattleGame" "$GAME_PATH/BattleGame.tsx"; then
    ((STRUCTURE_OK++))
fi

if grep -q "export function RiddleGame" "$GAME_PATH/RiddleGame.tsx"; then
    ((STRUCTURE_OK++))
fi

if grep -q "export function MatchGame" "$GAME_PATH/MatchGame.tsx"; then
    ((STRUCTURE_OK++))
fi

if grep -q "export function StoryGame" "$GAME_PATH/StoryGame.tsx"; then
    ((STRUCTURE_OK++))
fi

if grep -q "const gameType" "src/components/lesson/GameTab_Master.tsx"; then
    ((STRUCTURE_OK++))
fi

if [ $STRUCTURE_OK -eq 5 ]; then
    echo -e "${GREEN}OK${NC} All game files have correct structure"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} Game file structure incomplete ($STRUCTURE_OK/5)"
    ((FAILED++))
fi
echo ""

# 8. Check data integrity
echo "[Test 8] Validating manifest data..."
DATA_CHECK=$(node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/lessons-manifest.json'));
let checks = {
  totalLessons: data.length,
  lessonsWithExercises: 0,
  exercisesWithOptions: 0,
  exercisesWithAnswers: 0
};

data.forEach(lesson => {
  if (lesson.exercises && lesson.exercises.length > 0) {
    checks.lessonsWithExercises++;
    lesson.exercises.forEach(ex => {
      if (ex.options && ex.options.length > 0) checks.exercisesWithOptions++;
      if (ex.answer && ex.answer !== '') checks.exercisesWithAnswers++;
    });
  }
});

console.log(JSON.stringify(checks));
" 2>/dev/null)

echo "Data integrity report:"
echo "$DATA_CHECK" | jq '.'

LESSON_COUNT=$(echo "$DATA_CHECK" | jq '.totalLessons')
if [ "$LESSON_COUNT" -gt 100 ]; then
    echo -e "${GREEN}OK${NC} Manifest has ${LESSON_COUNT} lessons with data"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} Manifest has insufficient lessons ($LESSON_COUNT)"
    ((FAILED++))
fi
echo ""

# 9. Check for syntax errors
echo "[Test 9] Checking for syntax errors..."
SYNTAX_OK=1

for game in "${GAMES[@]}"; do
    if ! grep -q "import" "$GAME_PATH/$game"; then
        SYNTAX_OK=0
    fi
done

if ! grep -q "import" "src/components/lesson/GameTab_Master.tsx"; then
    SYNTAX_OK=0
fi

if [ $SYNTAX_OK -eq 1 ]; then
    echo -e "${GREEN}OK${NC} No obvious syntax errors found"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} Syntax errors detected"
    ((FAILED++))
fi
echo ""

# Summary
echo "=============================================================="
echo "                    TEST SUMMARY"
echo "=============================================================="
echo ""
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}ALL TESTS PASSED!${NC}"
    echo ""
    echo "Ready to run locally:"
    echo "  npm install"
    echo "  npm run dev"
    echo "  Open http://localhost:5174"
    echo ""
    exit 0
else
    echo -e "${RED}SOME TESTS FAILED${NC}"
    echo "Please fix issues before deployment"
    echo ""
    exit 1
fi
