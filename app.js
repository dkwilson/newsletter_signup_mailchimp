const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post('/', (req, res) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    axios({
        method: 'post',
        url: 'https://us19.api.mailchimp.com/3.0/lists/324e3e9f3c',
        auth: {
            username: 'damastes',
            password: '4456215c126ad8d9b3d12dda0062c7b6-us19'
          },
          data: { 
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                       FNAME: firstname,
                       LNAME: lastname
                    }
                }
        ]
           }
      })
      .then(function (response) {
        if (response.status === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            reject(error);
        }
      })
      .catch(function (error) {
        res.sendFile(__dirname + "/failure.html");
      });

});

app.post('/failure', (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`The server is running on port 3000.`);
})

