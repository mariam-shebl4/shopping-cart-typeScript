import CartItem from "./CartItem"
import {CartItemType} from '../App'
import {Typography,Stack} from '@mui/material';
type Props ={
    cartItem:CartItemType[];
    addToCart:(clickedItem: CartItemType)=>void;
    removeFromCart:(id:number) => void;
}
const Cart: React.FC<Props> = ({cartItem,addToCart,removeFromCart}) => {

  const calculateTotal=(items: CartItemType[])=>{
    return   items.reduce((ack:number,item)=>ack + item.amount* item.price, 0)
  }
  return (
    <Stack sx={{width:'25em'}}>
        <h4>Your Shopping Cart</h4>
        {cartItem.length ===0? <p>No items in cart.</p>: null}
        {cartItem.map(item=>(

        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart}/>
        ))}
        {/* Total */}
        <Typography>Total: ${calculateTotal(cartItem).toFixed(2)}</Typography>
    </Stack>
  )
}

export default Cart