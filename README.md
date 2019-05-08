# test-rrweb
to test the functionality of rrweb.io for record user sessions

How this works
1. Copy the recorded file inside the recordings folder
2. Run the application using npm start command
3. Navigate to localhost:8102/replay
4. Give the username of the recorded file which is available in the recorded json file
5. click play button

Future Improvements
1. Once the file is placed in the recording all the files will be listed out in the /replay page once click on a file then it will play

Knowledge gained from this work --
-- To Inject scripts or css in express use app.use like below and place the file inside public dir
-- // to get the public directory accessible for referencing events.js file otherwise express looks the file in localhost:8102/events.js
-- app.use("/public", express.static(__dirname + "/public"));

