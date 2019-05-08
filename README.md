# test-rrweb
to test the functionality of rrweb.io for record user sessions

The below things need to be done for fully functional
- Currently the user need to change the 

To Inject scripts or css in express use app.use like below and place the file inside public dir
// to get the public directory accessible for referencing events.js file otherwise express looks the file in localhost:8102/events.js
app.use("/public", express.static(__dirname + "/public"));

