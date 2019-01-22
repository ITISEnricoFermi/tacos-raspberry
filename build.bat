@echo off

echo This operation should be done only the first time you clone this repo or if something changes in the client repo.

echo Setting up client submodule...

echo  Init submodule
call git submodule update --init --recursive --remote

echo  Done

echo Building server...

call npm install
call npm run build

echo Done

cd api\client

echo Building client...

call npm install
call npm run build

echo Done
echo Copying client in public section of server.

cd ..\..
move api\client\dist dist\api\public

echo Done
echo Run 'npm run dev' or 'npm start' to launch the server
