// import { Button, Container, Typography } from "@mui/material";
// import { Box, Stack } from "@mui/system";
// import * as actions from "../../store/actions";
// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { useHistory, useLocation, useParams } from "react-router";
// import CelebrationIcon from "@mui/icons-material/Celebration";
// import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

// export const PaymentReturn = (props) => {
//   const history = useHistory();
//   let { code } = useParams();
//   console.log("check params", code);

//   let codeResponse = code.slice(0, 2);
//   let orderCode = code.slice(2, code.length);
//   console.log("check codeResponse", codeResponse);
//   console.log("check ordercode", orderCode);
//   React.useEffect(() => {
//     if (codeResponse === "00") {
//       props.editOrder({
//         orderCode: orderCode,
//         status: "Payment completed",
//       });
//     }
//     if (codeResponse !== "00") {
//       props.editOrder({
//         orderCode: orderCode,
//         status: "Payment not yet",
//       });
//     }
//   }, []);

//   return (
//     <Container maxWidth="xl">
//       <Box
//         sx={{
//           width: "100%",
//           height: "80vh",
//           pl: "2em",
//           pr: "2em",
//           bgcolor: "#fff",
//           borderRadius: "10px",
//           mb: "1em",
//         }}
//       >
//         {codeResponse === "00" ? (
//           <Stack
//             direction="column"
//             spacing={3}
//             sx={{ width: "100%", height: "100%" }}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <CelebrationIcon
//               sx={{
//                 width: "100px",
//                 height: "100px",
//               }}
//               color="success"
//             />
//             <Typography
//               sx={{
//                 fontSize: "24px",
//                 fontWeight: "700",
//                 color: "success",
//               }}
//             >
//               Payment successful!
//             </Typography>
//             <Button
//               onClick={() => history.push("/")}
//               variant="contained"
//               color="success"
//             >
//               Go on shopping
//             </Button>
//           </Stack>
//         ) : codeResponse === "97" ? (
//           <Stack
//             direction="column"
//             spacing={3}
//             sx={{ width: "100%", height: "100%" }}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <CelebrationIcon
//               sx={{
//                 width: "100px",
//                 height: "100px",
//               }}
//               color="success"
//             />
//             <Typography
//               sx={{
//                 fontSize: "24px",
//                 fontWeight: "700",
//                 color: "success",
//               }}
//             >
//               {orderCode}
//             </Typography>
//             <Button
//               onClick={() => history.push("/")}
//               variant="contained"
//               color="success"
//             >
//               Go on shopping
//             </Button>
//           </Stack>
//         ) : (
//           <Stack
//             direction="column"
//             spacing={3}
//             sx={{ width: "100%", height: "100%" }}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <SentimentVeryDissatisfiedIcon
//               sx={{
//                 width: "100px",
//                 height: "100px",
//               }}
//               color="success"
//             />
//             <Typography
//               sx={{
//                 fontSize: "24px",
//                 fontWeight: "700",
//                 color: "success",
//               }}
//             >
//               Payment failed!
//             </Typography>
//             <Button
//               onClick={() => history.push("/")}
//               variant="contained"
//               color="success"
//             >
//               Go on shopping
//             </Button>
//           </Stack>
//         )}
//       </Box>
//     </Container>
//   );
// };

// const mapStateToProps = (state) => ({
//   order: state.cart.order,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     createOrder: (data) => dispatch(actions.createOrder(data)),
//     getOrder: () => dispatch(actions.getOrder()),
//     editOrder: (data) => dispatch(actions.editOrder(data)),
//     createPayment: (total) => dispatch(actions.createPayment(total)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PaymentReturn);
// Payment.js
import React, { useState } from "react";

const Payment = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = () => {
    onSubmit({ cardNumber, expiryDate, cvv });
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <form>
        <label>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <label>Expiry Date:</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <label>CVV:</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
