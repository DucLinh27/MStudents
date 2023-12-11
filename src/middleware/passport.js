import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
// Cấu hình Passport để sử dụng Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1052696457949-1oda41m6npg90b9q0ecd4njt2u6l0rfm.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/login", // change this to /home
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in the database
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // If not, create a new user
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          // add other profile information you want to save
        });
        await user.save();
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user.id }, "duclinhjwt"); // replace 'your_jwt_secret' with your actual JWT secret

      // Save the token in the user session
      user.jwt = token;

      return done(null, user);
    }
  )
);
// Đưa thông tin người dùng vào session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Lấy thông tin người dùng từ session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
