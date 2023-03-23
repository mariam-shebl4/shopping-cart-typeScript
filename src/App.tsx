import './App.css';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress , Stack, Grid, Drawer} from '@mui/material';
import SingleItem from './components/SingleItem';
import { Box } from '@mui/system';
import {StyledButton} from './App.style'
import {AddShoppingCart} from '@mui/icons-material';
import Cart from './components/Cart';
import Badge from '@mui/material/Badge';


export type CartItemType={
  id:number,
  title:string,
  price:number,
  category:string,
  description:string,
  image:string,
  amount:number;
  rating:{rate:number};
  
}
const getProducts=async():Promise<CartItemType[]> =>await(await fetch('https://fakestoreapi.com/products')).json()


const App=()=> {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItem, setCartItem] = useState([] as CartItemType[])

   const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts  )
  //  console.log(data);
   //Total
   const getTotalItems = (items:CartItemType[])=> {
    return  items.reduce((ack: number, item) => ack + item.amount, 0)
    
   };
   
   
   //add
   const handleAddCart = (clickedItem: CartItemType)=> {
    setCartItem(prev=>{
      //1. is the item already added in the cart
      const isItemCart=prev.find(item=> item.id===clickedItem.id)

      if (isItemCart) {
        return prev.map(item=>(
          item.id=== clickedItem.id? {...item, amount: item.amount +1}:item
        ))
      }

      //first time the item is added
      return[...prev, {...clickedItem, amount:1}]
    })
   };
   //remove
   const handleRemoveFromCart = (id:number)=> {
    setCartItem(prev=>(
      prev.reduce((ack,item)=>{
         if (item.id===id) {
          if(item.amount===1) return ack;
          return[...ack, {...item, amount:item.amount-1}]
         }
         else{
          return[...ack,item]
         }
      },[] as CartItemType[])
    ))
   };

   if (isLoading) return <CircularProgress color="secondary" />
   if(error) return <div>Somthing went wrong ...</div>
  return (
    <Stack my={5} mx={8} >
      <Drawer
      anchor='right'
      open={cartOpen}
      onClose={()=> setCartOpen(false)}
      
    >
      <Cart cartItem={cartItem} addToCart={handleAddCart} removeFromCart={handleRemoveFromCart}/>
    </Drawer>
    <Box>

    <StyledButton onClick={()=> setCartOpen(true)}>
    <Badge badgeContent={getTotalItems(cartItem)} color="error">
    
      <AddShoppingCart  />
    </Badge>
    </StyledButton>
    
    </Box>
      <Grid container spacing={1} >
        {data?.map((item)=>(
  <Grid item xs={12} my={5} sx={{display:'flex'}} sm={4} key={item.id}>
    <SingleItem item={item}  handleAddCart={handleAddCart}/>
  </Grid>

        ))}
  
</Grid>
    </Stack>
  );
}

export default App;
