import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';

let isInitial = true //usiamo un flag al di fuori della funzione per evitare la fetch al primo render dell'app

function App() {
  const cart = useSelector(state => state.cart)
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: "pending",
        title: "Sending..",
        message: "sending cart data.."
      }))
      const response = await fetch('https://reduxcarttest-cd69c-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })

      if (!response.ok) {
        throw new Error('Sending cart data failed')
      }

      dispatch(uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart data successfully!"
      }))
    }

    //se è la prima volta non voglio effettuare la fetch per non sovrascrivere e renderlo vuoto, da quel momento in poi si
    if (isInitial) {
      isInitial = false
      return
    }

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed!"
      }))
    })
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
