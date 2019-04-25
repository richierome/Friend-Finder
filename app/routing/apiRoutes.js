var path = require("path");
var fs = require('fs');
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.sendFile(path.join(__dirname, "../data/friends.js"));
    });

    app.post("/api/friends", function(req, res){
        var newSingles = req.body;

        console.log(newSingles);
 
        fs.readFile(path.join(__dirname, "../data/friends.js"), 'utf-8',(err,data)=> {
            if (err) throw err;

            data = JSON.parse(data);

            console.log(data);

            // Compare the newSingels.scores array to the data[index].scores array (make sure they are both ints)
            var multi = [];
            for (let i = 0; i < data.length; i++) {
               var matchScore = data[i];
               var userScore = 0;

                for (let j = 0; j < 10; j++) {
                    let match = Math.abs(newSingles.scores[j] - matchScore.scores[j]);
                    console.log(match);
                    userScore = userScore + match;
                }

              multi.push(userScore);
            }

            var index = 0;
            var value = multi[0];
                for (var i = 1; i < multi.length; i++) {
                if (multi[i] < value) {
                    value = multi[i];
                    index = i;
            }
            }

            res.json(data[index]);


        });
    });

    
}