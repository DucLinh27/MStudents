import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartItem = (props) => {
  const image64 = new Buffer(props.book.image, "base64").toString("binary");

  console.log("checkprops cartitem", props.book);
  return (
    <ListItem
      sx={{ borderBottom: "1px solid", mt: "0.5em", p: { xs: "0.5em" } }}
      alignItems="center"
    >
      <IconButton onClick={() => props.deleteCart()} size="large" color="error">
        <DeleteOutlineRoundedIcon />
      </IconButton>
      <Box
        sx={{
          width: { sm: "100px", xs: "50px" },
          height: { sm: "100px", xs: "50px" },
        }}
      >
        <img style={{ width: "100%", height: "100%" }} src={image64} />
      </Box>
      <ListItemText
        alignItem="center"
        sx={{
          width: "50%",
          pl: "0.5em",
          pr: "0.5em",
        }}
        primary={
          <Typography
            sx={{
              fontSize: { sm: "16px", xs: "12px" },
              fontWeight: 500,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {props.book.name}
          </Typography>
        }
        secondary={
          <Box
            sx={{
              mt: { sm: "1em", xs: "0.5em" },
              display: "flex",
              flexDirection: { sm: "row", xs: "column-reverse" },
              alignItems: { sm: "center", xs: "flex-start" },
            }}
          >
            <NumericFormat
              value={props.priceDiscounted}
              thousandsGroupStyle="thousands"
              thousandSeparator=","
              suffix={" VND"}
              displayType="text"
              renderText={(value) => (
                <Typography
                  color="error"
                  sx={{
                    fontSize: { sm: "16px", xs: "12px" },
                    fontWeight: 700,
                  }}
                >
                  {value}
                </Typography>
              )}
            />
            <NumericFormat
              value={props.priceMain}
              thousandsGroupStyle="thousands"
              thousandSeparator=","
              suffix={" VND"}
              displayType="text"
              renderText={(value) => (
                <Typography
                  gutterBottom
                  sx={
                    props.book.discount === 0
                      ? { display: "none" }
                      : {
                          display: "flex",
                          ml: { sm: "0.5em", xs: 0 },
                          fontSize: { sm: "16px", xs: "12px" },
                          textDecorationLine: "line-through",
                        }
                  }
                >
                  {value}
                </Typography>
              )}
            />
          </Box>
        }
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ fontWeight: 600 }}>Quantity</Typography>
        <ButtonGroup
          sx={{ mt: { sm: "1em", xs: "0.5em" } }}
          variant="outline"
          color="success"
          size="small"
        >
          <IconButton
            sx={{ width: "0.5em", height: "0.5em" }}
            color="success"
            onClick={() => {
              props.decrease();
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Button sx={{ width: "0.5em", height: "0.5em" }}>
            {props.quantity ? props.quantity : props.book.quantity}
          </Button>
          <IconButton
            sx={{ width: "0.5em", height: "0.5em" }}
            color="success"
            onClick={() => {
              props.increase();
            }}
          >
            <AddIcon />
          </IconButton>
        </ButtonGroup>
      </Box>
    </ListItem>
  );
};

export default CartItem;
