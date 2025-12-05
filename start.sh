#!/bin/bash
cd /home/container || exit 1

echo "=== GO88S Web - Startup ==="
echo "Node version: $(node -v)"
echo "Working dir : $(pwd)"

# Cài dependency
echo "=== Running npm install (prod) ==="
npm install --omit=dev

# Quyết định cách start
if [ -f package.json ]; then
  # Nếu có script "start" thì dùng npm run start
  if grep -q "\"start\"" package.json; then
    echo "=== Starting with: npm run start ==="
    exec npm run start
  else
    echo "=== No \"start\" script, starting: node server.js ==="
    exec node server.js
  fi
else
  echo "=== No package.json, starting: node server.js ==="
  exec node server.js
fi
