
import {CartItemType} from '../App'
import {Card,Box} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import {AddShoppingCart} from '@mui/icons-material';
type Props = {
    item:CartItemType;
    handleAddCart:(clickedItem: CartItemType)=>void 
}
const SingleItem: React.FC<Props> = ({item, handleAddCart}) => {
  return (
    <Card sx={{ maxWidth: 345 ,minHeight:"10rem"}} >
      <CardMedia
        component="img"
        alt={item.title}
        height="250"
        image={item.image}
        sx={{objectFit:"cover"}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Box display="flex" justifyContent="space-between">

        <Rating name="read-only" value={item.rating.rate} readOnly />
        <Typography>Price: ${item.price}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> handleAddCart(item)}><AddShoppingCart/></Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default SingleItem