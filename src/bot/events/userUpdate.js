client.on("userUpdate", (olduser, newuser) => {
  if (newuser.bot) {
    try {
      Bots.findOne({ id: newuser.id }).then((bot) => {
        if (!bot) return;
        if (bot.username != newuser.username) {
          bot.username = newuser.username;
        }
        if (bot.avatar != newuser.avatar) {
          bot.avatar = newuser.avatar;
        }
        if (bot.discriminator != newuser.discriminator) {
          bot.discriminator = newuser.discriminator;
        }
        bot.save();
      });
    } catch (e) {}
  } else if (!newuser.bot) {
    Users.findOne({ id: newuser.id }).then((user) => {
      if (!user) {
      } else {
        fetch("https://discord.rovelstars.com/api/client/users/" + user.id)
          .then((r) => r.json())
          .then((u) => {
            if (
              u.avatar === user.avatar &&
              u.username === user.username &&
              u.discriminator === user.discriminator
            ) {
            } else {
              if (u.avatar !== user.avatar) {
                user.avatar = u.avatar;
              }
              if (u.username !== user.username) {
                user.username = u.username;
              }
              if (u.discriminator !== user.discriminator) {
                user.discriminator = u.discriminator;
              }
              user.save();
            }
          });
      }
    });
  }
});
