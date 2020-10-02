const cron = require("node-cron");
const nodemailer = require("nodemailer");
const pool = require("./db");

const main = () => {
  // Variable
  let count = 1;

  // Create mail transporter.
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mayoublaise@gmail.com",
      pass: "sniperdennis",
    },
  });

  // add record every 5 minutes.
  cron.schedule("5 * * * *", async function () {
    await pool.query(
      "INSERT INTO record (description) VALUES($1) RETURNING *",
      [`message ${count}`]
    );

    count++;

    console.log("Record added.");
  });

  // Sending emails every 30 minutes.
  cron.schedule("* * * * *", async function () {
    const allRecord = await pool.query("SELECT * FROM record;");

    let messageOptions = {
      from: "mayoublaise@gmail.com  ",
      to: "tayoukengne@gmail.com",
      subject: "Envoyer mail",
      text: JSON.stringify(allRecord.rows),
    };

    transporter.sendMail(messageOptions, function (error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email successfully sent!");
      }
    });
  });
};

main();

module.exports = main;
