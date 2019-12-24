@echo off
set "a100_react_copy_from=./build"
set "a100_react_copy_to=../ggpo1.github.io"
xcopy /se "%a100_react_copy_from%" "%a100_react_copy_to%\"
::if not exist "%a100_react_copy_to%" md "%a100_react_copy_to%"& xcopy /se "%a100_react_copy_from%" "%a100_react_copy_from%\"
cd ../ggpo1.github.io
git status

:: returning back to project folder
cd ../a100

pause