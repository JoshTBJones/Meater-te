# Setup Instructions
This small application used Node.js. The instructions assume you have downloaded the repo on your local machine and are ready to use it. If not, please download the repo before you continue.
## Requirements
* Node
## Initial Setup
1. Open the terminal of your choice and navigate to the app root directory
2. Download the required packages `npm install` Once complete you will notice a new directory `node_modules` has been created
3. Bulild the application. Run the command `npm run build` this will compile the TypeScript source code and save it as browser friendly javascript. Once this command is complete you're ready to run the application.
4. Run the app `node .`. This will run the dev server on your local machine, when the process is complete you will notice a print out in your terminal reading, `server started at http://localhost:8080`

## Dev Mode Setup
If you wish to run the application in development mode, and make changes to the code you can simply run the `npm run dev` command. This runs the same functions as the `npm run build` command but it also watches for changes in the source code, when a change is detected the build command is run again. This is possible with the nodemon package.
