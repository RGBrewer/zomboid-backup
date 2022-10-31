
# Zomboid Backup

This project makes backups of your saved game folder at a desired interval.
Never lose your character to some random bug again.

## Development details

This is a neutralinoJS app.
https://github.com/neutralinojs/neutralinojs

Neutralino allows you to quickly build apps with just html/css. It uses the OS's native browser and wraps it in a window, so you dont have to package an entire browser like electron. This makes our file size super small (like 2MB!), works on Windows/Mac/Linux, and compiles super quick! 

## Key Files you care about ##
 - **resources/index.html** 
   - entry point to the app

 - **resources/js/zomboid.js** 
   - contains a JavaScript class that interfaces with the neutralino filesystem api to perform various actions

**Heads up!** You can get a standard browser window `inspector` by editing the `enableInspector` flag in neutralino.config.json - it is off by default, otherwise it would be included with the distribution executable.

### Running / Building the project ###
You'll need neutralino installed `npm i -g @neutralinojs/neu`
no other dependencies.

`neu run` to run locally

`neu build` to build executables to the /dist folder

### Something to remember ...
Your save folder can get pretty large. Several GB. You should prune it from time to time. This software makes a complete copy, so the larger it is the slower / more resource-intensive it is to copy.

## License

[MIT](LICENSE)