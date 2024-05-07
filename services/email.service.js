import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

// Email Service

broker.createService({
  name: "email",
  actions: {
    async sendEmail(ctx) {
      const { recipient, subject, content } = ctx.params;

      console.log(`Sending email to ${recipient} with subject ${subject}`);
      console.log(`Content`, content);

      return `Email sent to ${recipient}`;
    },
  },
});

export default broker;
