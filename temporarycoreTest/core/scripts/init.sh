read -p "Enter the name of the project: " name
read -p "Enter git repo: " repo




echo "{ Start Init project"
cd ../
cp -r carbrb $name
cd $name
echo "} End Init project"



echo "{ Start Init client"
ng new $name --style=scss
mv $name client
cd client
yarn add -D git+ssh://git@bitbucket.org:vmaskhulia/schematics.git
echo "./node_modules/schematics/g \$@" > g
chmod +x node_modules/schematics/g g
./g init
cd ../
echo "} End Init client"



echo "{ Start Init server"
cd server
yarn
cd ../
echo "} End Init server"



echo "{ Start Init git"
rm -rf .git
echo "*.log" > .gitignore
git init
git add .
git commit -m "chore(init)"
git remote add origin $repo
git push origin master
echo "} End Init git"
