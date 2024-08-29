import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'
import { sendCartData } from './store/cart-slice';

let isInitial = true //usiamo un flag al di fuori della funzione per evitare la fetch al primo render dell'app

function App() {
  const cart = useSelector(state => state.cart)
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch()

  useEffect(() => { 

    if (isInitial) {
      isInitial = false
      return
    }

    dispatch(sendCartData(cart))

  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>

  );
}

export default App;
