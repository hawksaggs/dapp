rsync -r src/ docs/
rsync build/contracts/* docs/
git add .
git commit -m "Compile assets for github pages"
git push origin master