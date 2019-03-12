const LocalStrategy = require('passport-local').Strategy;

const connection = require('./dbconn');

connection.connect(function(err) {
  if(!err) console.log("Connected DB!");
  else console.log(err);
});

module.exports = function(passport) {

  passport.use('login',
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
      console.log('Login Attempted : '+username+' = '+ password);
      if(!username || !password ) { return done(null, false,{ message: 'All fields are required.'}); }
      connection.query("select * from node_users where username='"+username+"';", function(err, rows){
          console.log("###################################################################");
          console.log(rows);
          console.log("###################################################################");
          // console.log(err);
        if (err) done(null, false, { message: err });
        // console.log(rows);

        if(!rows.length){ console.log("CHK 2"); return done(null, false, { message: 'User not found' }); }
        var dbPassword  = rows[0].password;
        console.log(dbPassword);
        // const encPassword = password;

        if(!(dbPassword == password)){
            return done(null, false, { message: 'Password incorrect' });
         }
        const user = rows[0];
        return done(null, rows[0]);
      });
    })
  );



  passport.use('signup',
    new LocalStrategy({passReqToCallback: true},(req, username, password, done) => {
      email = req.body.email;
      console.log('##################################################################');
      console.log(username+password+email);
      console.log('##################################################################');
      if(!username || !password || !email ) {
        return done(null, false,{ message: 'All fields are required.'});
      }

      connection.query("select * from node_users where username ='"+username+"';",function(err,rows){
			 if (err)
                return done(err);
			 if (rows.length) {
                return done(null, false, {message: 'That username is already taken.'});
       }

        else {
        var insertQuery = "insert into node_users(username,password,email,status) values('"+username+"','"+password+"','"+email+"',1);";
        var newUserMysql = new Object();
        newUserMysql.username    = username;
        newUserMysql.email    = email;
        newUserMysql.password = password;

        connection.query(insertQuery,function(err,rows){
          if (err) done(null, false, { message: err });
            console.log(rows);
				return done(null, newUserMysql);
				});
      }

      });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    connection.query("select * from node_users where username ='"+username+"';", function (err, rows){
        done(err, rows[0]);
    });
  });
};
