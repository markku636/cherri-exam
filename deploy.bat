
npm run build
sleep 3

cd dist
git init 
git add -A
git commit -m 'deploy'

git push -f https://github.com/markku636/cherri-exam.git master:gh-pages

pause