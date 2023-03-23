import {CartItemType} from '../App';
import {Button} from '@mui/material';
type Props={
    item: CartItemType;
    addToCart:(clickedItem: CartItemType)=>void;
    removeFromCart:(id: number)=>void

}
const CartItem: React.FC<Props> = ({item, addToCart,removeFromCart}) => {
  return (
    <div >
      <h3>{item.title}</h3>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>

      
      <div style={{display:'flex'}}>
      <Button variant="contained" size="small"
      onClick={()=> removeFromCart(item.id)}
      >-</Button>
      <p style={{margin:'0 1rem'}}>{item.amount}</p>
      <Button variant="contained" size="small"
      onClick={()=> addToCart(item)}
      >+</Button>
      </div>
      
      <img src={item.image} alt={item.title} style={{width:'7rem', height:'7rem'}} />

      </div>
      <div>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CartItem
