import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Badge, Box, IconButton, Stack, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router";
import Order from "../Cart/Order";

export default function ImgMediaCard(props) {
  const history = useHistory();
  const image64 = new Buffer(props.book.image, "base64").toString("binary");
  const [love, setLove] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLikeBook = () => {
    setLove(!love);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "1em" }}>
      <Badge
        invisible={props.book.discount !== 0 ? false : true}
        badgeContent={
          props.book.discount !== 0 &&
          Math.floor(props.book.discount * 100) + "%"
        }
        color="error"
      >
        <Card sx={{ maxWidth: 200 }}>
          <CardMedia
            sx={{ cursor: "pointer" }}
            component="img"
            alt={props.book.name}
            height="200"
            image={image64}
            onClick={(e) => {
              history.push(`/detail-courses/${props.book.id}`);
            }}
          />
          <CardContent
            onClick={(e) => {
              history.push(`/detail-courses/${props.book.id}`);
            }}
            sx={{ padding: "0.5em", cursor: "pointer" }}
          >
            <Typography
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              gutterBottom
              variant="subtitle1"
              component="div"
            >
              {props.book.name}
            </Typography>
            <Stack
              sx={{ width: "100%" }}
              direction={props.book.price <= 1000000 ? "row" : "column"}
              justifyContent={"flex-end"}
              alignItems={props.book.price <= 1000000 ? "center" : "flex-end"}
              spacing={1}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                }}
                color="error"
                gutterBottom
                variant="h6"
                component="div"
              >
                <CurrencyFormat
                  value={
                    Math.round(
                      (props.book.price -
                        props.book.price * props.book.discount) /
                        1000
                    ) * 1000
                  }
                  placeholder="xxx.xxx VND"
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                  renderText={(value) => (
                    <div className="price_discounted">{value}</div>
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  textDecorationLine: "line-through",
                }}
                gutterBottom
                variant="caption"
                component="div"
              >
                <CurrencyFormat
                  value={props.book.price}
                  placeholder="xxx.xxx VND"
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                  renderText={(value) => (
                    <div
                      style={
                        props.book.discount === 0
                          ? { display: "none" }
                          : { display: "block" }
                      }
                      className="price_main"
                    >
                      {value}
                    </div>
                  )}
                />
              </Typography>
            </Stack>
          </CardContent>
          <CardActions sx={{ marginTop: 0, paddingTop: 0 }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="flex-end"
            >
              {love === false ? (
                <Tooltip title="Add to favorite book">
                  <IconButton
                    sx={{ margin: 0 }}
                    color="error"
                    variant="outlined"
                    aria-label="Add to favorite book"
                    onClick={handleLikeBook}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Remove to favorite book">
                  <IconButton
                    sx={{ margin: 0 }}
                    color="error"
                    variant="outlined"
                    aria-label="Remove to favorite book"
                    onClick={handleLikeBook}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Add to shopping cart">
                <IconButton
                  sx={{ margin: 0 }}
                  color="success"
                  variant="outlined"
                  onClick={() => props.addToCart()}
                  aria-label="Add to shopping cart"
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Buy now">
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={handleClickOpen}
                >
                  Buy now
                </Button>
              </Tooltip>
            </Stack>
          </CardActions>
        </Card>
      </Badge>
      <Order
        // cart={props.book}
        open={open}
        onClose={handleClose}
        total={
          Math.round(
            (props.book.price - props.book.price * props.book.discount) / 1000
          ) * 1000
        }
        book={props.book}
      />
    </Box>
  );
}
