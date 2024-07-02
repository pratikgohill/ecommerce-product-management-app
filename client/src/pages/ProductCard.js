import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <Card sx={{ maxWidth: 300, maxHeight: 300 }}>
      <CardMedia
        component="img"
        height="180"
        image={product.mainImage}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="subtitle1">{product.name}</Typography>
        <Typography variant="caption" color="textSecondary">
          Company: {product.company}
        </Typography>
        <Typography variant="body2">
          Price: ${product.mainPrice}{" "}
          {product.discountedPrice && (
            <span> - ${product.discountedPrice}</span>
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
        <Box>
          <Typography variant="caption" color="textSecondary">
            Overview
          </Typography>
          {product.overview.map((item, index) => (
            <Typography key={index}>
              {item.key}: {item.value}
            </Typography>
          ))}
        </Box>
        {/* <Grid container spacing={1}>
          {product.images.map((image, index) => (
            <Grid item xs={4} key={index}>
              <CardMedia
                component="img"
                height="80"
                image={image}
                alt={`Product Image ${index + 1}`}
              />
            </Grid>
          ))}
        </Grid> */}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
