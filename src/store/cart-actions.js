import { uiActions } from "./ui-slice"
import { cartActions } from "./cart-slice"


export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://reduxcarttest-cd69c-default-rtdb.europe-west1.firebasedatabase.app/cart.json')

            if (!response.ok) {
                throw new Error("Could not fetch data")
            }

            const responseData = await response.json()

            return responseData
        }

        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart(cartData))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Fetching cart data failed!"
            }))
        }
    }
}

//Questa funzione è un thunk, ovvero una funzione action creator che invece di restituire la action da indietro un'altra funzione che eventualmente la 
//restituisce, questo grazie a Redux Toolkit
//Cosi facendo nel mio component c'è scritta meno logica ed il codice è più leggibile(ma è possibile lasciarla nel componente)
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending..",
            message: "sending cart data.."
        }))

        const sendRequest = async () => {
            const response = await fetch('https://reduxcarttest-cd69c-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            })

            if (!response.ok) {
                throw new Error('Sending cart data failed')
            }
        }

        try {
            await sendRequest()
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Sent cart data successfully!"
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending cart data failed!"
            }))
        }

    }
}