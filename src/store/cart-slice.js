import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++
            if (!existingItem) {
                state.items.push({//non è un problema manipolare direttamente l'array solo grazie a redux toolkit
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingItem.quantity++
                existingItem.totalPrice += newItem.price
            }
        },
        removeItemToCart(state, action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity--
            if (existingItem.quantity > 1) {
                existingItem.quantity--
                existingItem.totalPrice -= existingItem.price
            }
            else {
                state.items = state.items.filter(item => item.id !== id)
            }
        }
    }
})


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

export const cartActions = cartSlice.actions

export default cartSlice