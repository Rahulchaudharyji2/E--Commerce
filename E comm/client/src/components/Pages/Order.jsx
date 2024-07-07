import React, { Fragment, useContext } from 'react';
import CartContext from '../store/card-context';
import { Box, List, ListItem, Divider, ListItemText, Typography, Button } from '@mui/material';
import { fetchOrders } from '../lib/apis';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Order = () => {
  
  const fetchOrderMutation = useMutation(fetchOrders);

  const placeOrderHandler = () => {
    fetchOrderMutation.mutate(Order, {
      onSuccess: () => {
        toast.success('Order Placed Successfully', {
          position: 'top-left',
        });
        clearCart();
      },
      onError: () => {
        toast.error('Error placing order');
      },
    });
  };

  return (
    <>
      <Box sx={{ width: '360px', margin: '5px auto', mt: 5 }}>
        <Typography variant='h5' component="h1">My Order</Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {cart.map((item) => (
            <Fragment key={item.id}>
              <Card variant="outlined" sx={{ display: 'flex', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: 90, height: 90 }}>
                  <img src={item.imageUrl} alt={item.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  
                </Box>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h6">
                    {`${item.productName} x ${item.qty}`}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Rs. {item.price}
                  </Typography>
                </CardContent>
              </Card>
              <Divider />
            </Fragment>
          ))}
        </List>
        <Typography variant='h6' component="h6">Total: Rs. {cart.reduce((total, item) => total + item.price * item.qty, 0)}</Typography>
        <Button variant="outlined" size="small" onClick={placeOrderHandler}>Place Order</Button>
      </Box>
    </>
  );
};


export default Order