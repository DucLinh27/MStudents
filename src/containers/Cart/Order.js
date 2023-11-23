// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Stack } from "@mui/system";
// import * as actions from "../../store/actions";
// import { NumericFormat } from "react-number-format";
// import { connect } from "react-redux";
// import CartItem from "./CartItem";
// import { Redirect, useHistory, withRouter } from "react-router";
// import { Link, Navigate } from "react-router-dom";
// import React, { Component } from "react";
// import { toast } from "react-toastify";

// function TotalPrice(price, tonggia) {
//   return price * tonggia;
// }

// class Order extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       address: "",
//       phone: "",
//       deliveryOption: "",
//       transportFee: 15000,
//       VAT: 5000,
//       quantity: 1,
//     };
//   }

//   componentDidMount() {}

//   componentDidUpdate(prevProps, prevState, snapshot) {}

//   checkValidInput = () => {
//     let isValid = true;
//     let arrInput = ["address", "phone", "deliveryOption"];

//     for (let i = 0; i < arrInput.length; i++) {
//       if (!this.state[arrInput[i]]) {
//         isValid = false;
//         toast.error(`Missing input: ${arrInput[i]}`, {
//           position: "bottom-right",
//           autoClose: 3000,
//         });
//         break;
//       }
//     }
//     return isValid;
//   };

//   handlePayment = async () => {
//     let isValid = this.checkValidInput();
//     if (isValid === false) return;
//     let totalPrice = this.props.book
//       ? this.props.total + this.state.transportFee + this.state.VAT
//       : this.props.total;
//     let date = new Date();
//     let createDate =
//       date.getFullYear() +
//       ("0" + (date.getMonth() + 1)).slice(-2) +
//       ("0" + date.getDate()).slice(-2) +
//       ("0" + date.getHours()).slice(-2) +
//       ("0" + date.getMinutes()).slice(-2) +
//       ("0" + date.getSeconds()).slice(-2);
//     let orderCode =
//       ("0" + date.getHours()).slice(-2) +
//       ("0" + date.getMinutes()).slice(-2) +
//       ("0" + date.getSeconds()).slice(-2);
//     await this.props.createOrder({
//       orderCode: orderCode,
//       createOn: createDate,
//       createBy: this.props.userInfo.lastName,
//       totalPrice: totalPrice,
//       shippingAddress: this.state.address,
//       shippingPhone: this.state.phone,
//       deliveryOption: this.state.deliveryOption,
//       email: this.props.userInfo.email,
//       status: "Payment Not Yet",
//       book: this.props.cart ? this.props.cart : this.props.book,
//     });
//     if (this.state.deliveryOption === "Internet Banking") {
//       await this.props.createPayment({
//         total: totalPrice,
//         orderCode: orderCode,
//       });
//       console.log("check props: ", this.props.urlPayment.url);
//       window.location.href = this.props.urlPayment.url;
//     }

//     if (this.state.deliveryOption === "Cash On Delivery") {
//       this.props.onClose();
//     }
//   };

//   renderBook = () => {
//     let priceDiscounted =
//       Math.round(
//         (this.props.book.price -
//           this.props.book.price * this.props.book.discount) /
//           1000
//       ) * 1000;
//     let priceMain = Math.round(this.props.book.price);
//     return (
//       <CartItem
//         book={this.props.book}
//         priceMain={TotalPrice(priceMain, this.state.quantity)}
//         priceDiscounted={TotalPrice(priceDiscounted, this.state.quantity)}
//         quantity={this.state.quantity}
//         increase={() => {
//           this.setState({
//             quantity: this.state.quantity++,
//           });
//         }}
//         decrease={() => {
//           if (this.state.quantity > 1) {
//             this.setState({
//               quantity: this.state.quantity--,
//             });
//           }
//         }}
//       />
//     );
//   };

//   render() {
//     return (
//       <Dialog
//         fullWidth={true}
//         maxWidth={"md"}
//         open={this.props.open}
//         onClose={this.props.onClose}
//       >
//         <DialogTitle sx={{ fontWeight: "700" }}>
//           Payment Information
//         </DialogTitle>
//         <DialogContent>
//           <Box
//             noValidate
//             component="form"
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               m: "auto",
//             }}
//           >
//             <Stack
//               sx={{
//                 p: "1em",
//                 width: "100%",
//               }}
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={1}
//             >
//               <Typography sx={{ fontWeight: 500 }}>Customer Name:</Typography>
//               <TextField
//                 id="outlined-basic"
//                 label="Customer Name"
//                 size="small"
//                 value={this.props.userInfo.lastName}
//                 color="success"
//                 sx={{ width: { md: "80%", sm: "70%", xs: "60%" } }}
//               />
//             </Stack>
//             <Stack
//               sx={{
//                 p: "1em",
//                 width: "100%",
//               }}
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={1}
//             >
//               <Typography sx={{ fontWeight: 500 }}>Email:</Typography>
//               <TextField
//                 id="outlined-basic"
//                 label="Email"
//                 size="small"
//                 value={this.props.userInfo.email}
//                 color="success"
//                 sx={{ width: { md: "80%", sm: "70%", xs: "60%" } }}
//               />
//             </Stack>
//             <Stack
//               sx={{
//                 p: "1em",
//                 width: "100%",
//               }}
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={1}
//             >
//               <Typography sx={{ fontWeight: 500 }}>Address:</Typography>
//               <TextField
//                 id="outlined-basic"
//                 label="Address"
//                 size="small"
//                 value={this.state.address}
//                 onChange={(e) => {
//                   this.setState({
//                     address: e.target.value,
//                   });
//                 }}
//                 color="success"
//                 sx={{ width: { md: "80%", sm: "70%", xs: "60%" } }}
//               />
//             </Stack>
//             <Stack
//               sx={{
//                 p: "1em",
//                 width: "100%",
//               }}
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={1}
//             >
//               <Typography sx={{ fontWeight: 500 }}>Phone number:</Typography>
//               <TextField
//                 id="standard-basic"
//                 label="Phone number"
//                 size="small"
//                 value={this.state.phone}
//                 onChange={(e) => {
//                   this.setState({
//                     phone: e.target.value,
//                   });
//                 }}
//                 color="success"
//                 sx={{ width: { md: "80%", sm: "70%", xs: "60%" } }}
//               />
//             </Stack>
//             <Stack
//               sx={{
//                 p: "1em",
//                 width: "100%",
//               }}
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={1}
//             >
//               <Typography sx={{ fontWeight: 500 }}>Transport fee:</Typography>
//               <NumericFormat
//                 value={this.state.transportFee}
//                 thousandsGroupStyle="thousands"
//                 thousandSeparator=","
//                 suffix={" VND"}
//                 displayType="text"
//                 renderText={(value) => (
//                   <TextField
//                     id="standard-basic"
//                     label="Total payment"
//                     size="small"
//                     value={value}
//                     color="success"
//                     sx={{ width: { md: "80%", sm: "70%", xs: "60%" } }}
//                   />
//                 )}
//               />
//             </Stack>
//             <Stack
//               sx={{
//                 p: "1em",
//                 width: "100%",
//               }}
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={1}
//             >
//               <Typography sx={{ fontWeight: 500 }}>VAT:</Typography>
//               <NumericFormat
//                 value={this.state.VAT}
//                 thousandsGroupStyle="thousands"
//                 thousandSeparator=","
//                 suffix={" VND"}
//                 displayType="text"
//                 renderText={(value) => (
//                   <TextField
//                     id="standard-basic"
//                     label="Total payment"
//                     size="small"
//                     value={value}
//                     color="success"
//                     sx={{ width: { md: "80%", sm: "70%", xs: "60%" } }}
//                   />
//                 )}
//               />
//             </Stack>
//             <Stack
//               sx={{
//                 p: "1em",
//                 width: "100%",
//               }}
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={1}
//             >
//               <Typography sx={{ fontWeight: 500 }}>Total payment:</Typography>
//               <NumericFormat
//                 value={
//                   this.props.book
//                     ? this.props.total +
//                       this.state.transportFee +
//                       this.state.VAT
//                     : this.props.total
//                 }
//                 thousandsGroupStyle="thousands"
//                 thousandSeparator=","
//                 suffix={" VND"}
//                 displayType="text"
//                 renderText={(value) => (
//                   <TextField
//                     id="standard-basic"
//                     label="Total payment"
//                     size="small"
//                     value={value}
//                     color="success"
//                     sx={{ width: { md: "80%", sm: "70%", xs: "60%" } }}
//                   />
//                 )}
//               />
//             </Stack>
//             <Stack
//               sx={{
//                 p: "1em",
//                 width: "100%",
//               }}
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={1}
//             >
//               <Typography
//                 sx={{
//                   fontSize: "14px",
//                   fontWeight: 500,
//                 }}
//               >
//                 Payment options:
//               </Typography>
//               <FormControl
//                 size="small"
//                 color="success"
//                 sx={{
//                   m: 1,
//                   width: { md: "80%", sm: "70%", xs: "60%" },
//                   heigh: "20px",
//                 }}
//               >
//                 <InputLabel
//                   sx={{ fontSize: "14px" }}
//                   id="demo-simple-select-standard-label"
//                 >
//                   Options
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-helper-label"
//                   id="demo-simple-select-helper"
//                   value={
//                     this.props.numberCart === 0 ? 0 : this.state.deliveryOption
//                   }
//                   onChange={(event) => {
//                     this.setState({
//                       deliveryOption: event.target.value,
//                     });
//                   }}
//                   label="Options"
//                 >
//                   <MenuItem value={"Internet Banking"}>
//                     Internet Banking
//                   </MenuItem>
//                   <MenuItem value={"Cash On Delivery"}>
//                     Cash On Delivery
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Stack>
//             <Stack
//               sx={{
//                 p: "1em",
//                 width: "100%",
//               }}
//               direction={{ md: "row", sm: "column" }}
//               alignItems="flex-Start"
//               justifyContent="space-between"
//               spacing={1}
//             >
//               <Typography
//                 sx={{
//                   fontSize: "14px",
//                   fontWeight: 500,
//                 }}
//               >
//                 Check order again:
//               </Typography>
//               <Stack
//                 direction="column"
//                 sx={{ width: { md: "80%", sm: "100%", xs: "100%" } }}
//               >
//                 {this.props.cart?.map((item, index) => {
//                   let priceDiscounted =
//                     Math.round(
//                       (item.price - item.price * item.discount) / 1000
//                     ) * 1000;
//                   let priceMain = Math.round(item.price);
//                   return (
//                     <CartItem
//                       key={index}
//                       book={item}
//                       priceMain={TotalPrice(priceMain, item.quantity)}
//                       priceDiscounted={TotalPrice(
//                         priceDiscounted,
//                         item.quantity
//                       )}
//                       deleteCart={() => this.props.DeleteCart(item)}
//                       increase={() => this.props.IncreaseQuantity(index)}
//                       decrease={() => this.props.DecreaseQuantity(index)}
//                     />
//                   );
//                 })}
//                 {this.props.book ? this.renderBook() : null}
//               </Stack>
//             </Stack>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={() => {
//               this.handlePayment();
//             }}
//           >
//             Payment
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={this.props.onClose}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   userInfo: state.user.userInfo,

//   urlPayment: state.cart.urlPayment,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeToCart: (book) => dispatch(actions.removeToCart(book)),
//     IncreaseQuantity: (book) => dispatch(actions.IncreaseQuantity(book)),
//     DecreaseQuantity: (book) => dispatch(actions.DecreaseQuantity(book)),
//     DeleteCart: (book) => dispatch(actions.DeleteCart(book)),

//     createOrder: (data) => dispatch(actions.createOrder(data)),
//     createPayment: (total) => dispatch(actions.createPayment(total)),
//   };
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
// Order.js
import React from "react";

const Order = ({ cartItems }) => {
  return (
    <div className="order-container">
      <h2>Order Summary</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
