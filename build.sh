echo This operation should be done only the first time you clone this repo or if something changes in the client repo.

echo Setting up client submodule...

echo  Init submodule
git submodule update --init --recursive --remote

echo  Done
echo  Clone submodule

git submodule update

echo  Done

echo Building server...

npm install
npm run build

echo Done

cd api/client

echo Building client...

npm install
npm run build

echo Done
echo Copying client in public section of server.

cd ../..
mv api/client/dist dist/api/public

echo Done
echo Run 'npm run dev' or 'npm start' to launch the server
