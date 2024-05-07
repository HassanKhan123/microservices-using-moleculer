// import { ServiceBroker } from "moleculer";

// const broker = new ServiceBroker();

// // Greeter Service

// broker.createService({
//   name: "greeter",
//   actions: {
//     sayHello(ctx) {
//       return `Hello ${ctx.params.name}`;
//     },
//   },
// });

// async function startApp() {
//   await broker.start();
//   const res = await broker.call("greeter.sayHello", { name: "John" });
//   console.log(res);
//   broker.stop();
// }

// startApp();

import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";
import AuthService from "./services/auth.service.js";

async function startApp() {
  // Start services

  await UserService.start();
  await EmailService.start();
  await AuthService.start();

  try {
    // Simulate user creation
    const newUser = await UserService.call("user.createUser", {
      username: "Khan",
      email: "khan@gmail.com",
    });
    console.log("New user created!", newUser);
    const users = await UserService.call("user.getUsers");
    console.log("users", users);

    // Simulate sending email
    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to our platform",
      content: "Thank you for signing up!!",
    });
    console.log(emailResult);

    // Simulate auth
    const authResult = await AuthService.call("auth.authUser", {
      username: "admin",
      password: "password",
    });
    console.log(authResult);
  } catch (error) {
    console.log(error);
  } finally {
    await UserService.stop();
    await EmailService.stop();
    await AuthService.stop();
  }
}

startApp();
