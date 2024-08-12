import { inngest } from "./client";


export const sendEmail = inngest.createFunction(
    { id: "send-email" },
    { event: "test/send.email" },
    async ({ event, step }) => {
      await step.run("send-user-email", async () => {
        const { email, userFirstname } = event.data;
  
        try {
          // Call the Next.js API route to send the email using Resend
          const res = await fetch("http://localhost:3001/api/mail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              userFirstname,
            }),
          });
  
          if (!res.ok) {
            throw new Error(`Failed to send email: ${res.statusText}`);
          }
  
          const data = await res.json();
          console.log("Email sent successfully:", data);
          return data;
        } catch (error) {
          console.error("Error sending email:", error);
          throw error; // Rethrow the error if you want to handle it further up the chain
        }

      });
    }
  );
