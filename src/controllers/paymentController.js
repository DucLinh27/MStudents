// const paypal = require("paypal-rest-sdk");

// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id:
//     "AclsyktkK-QOw-GHnMtuC0E1o2j-GcwgkjCe28yVu2VweLCsuv6HVXeiOAhVyyw7KgFl0CAyEraeAQK3",
//   client_secret: "PAYPAL_SCRET",
// });

// let handlePaypalPayment = async (req, res) => {
//   const paymentAmount = req.body.total;

//   const create_payment_json = {
//     intent: "sale",
//     payer: {
//       payment_method: "paypal",
//     },
//     redirect_urls: {
//       return_url: "http://return.url",
//       cancel_url: "http://cancel.url",
//     },
//     transactions: [
//       {
//         item_list: {
//           items: [
//             {
//               name: "item",
//               sku: "item",
//               price: paymentAmount.toString(),
//               currency: "USD",
//               quantity: 1,
//             },
//           ],
//         },
//         amount: {
//           currency: "USD",
//           total: paymentAmount.toString(),
//         },
//         description: "This is the payment description.",
//       },
//     ],
//   };

//   paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//       throw error;
//     } else {
//       for (let i = 0; i < payment.links.length; i++) {
//         if (payment.links[i].rel === "approval_url") {
//           res.redirect(payment.links[i].href);
//         }
//       }
//     }
//   });
// };

// let handleSuccess = async (req, res) => {
//   const payerId = req.query.PayerID;
//   const paymentId = req.query.paymentId;

//   const execute_payment_json = {
//     payer_id: payerId,
//   };

//   paypal.payment.execute(
//     paymentId,
//     execute_payment_json,
//     function (error, payment) {
//       if (error) {
//         console.error(error.response);
//         throw error;
//       } else {
//         console.log(JSON.stringify(payment));
//         res.send("Payment successful!");
//       }
//     }
//   );
// };
// let handleCancel = async (req, res) => {
//   res.send("Payment canceled.");
// };

// module.exports = (req, res) => {
//   handleSuccess;
//   handleCancel;
//   handlePaypalPayment; 
// };
