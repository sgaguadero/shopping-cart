import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { Context } from '../main'

export function Product() {
    const params = useParams()
    const { status, setStatus } = useContext(Context)
    const quantity = status.cart.find(item => item.product == params.id)?.quantity
    const { register, handleSubmit } = useForm({
        defaultValues: {
            quantity: quantity
        }
    })

    const { data, isLoading } = useQuery('product', () => {
        return fetch(`http://localhost:5555/products/${params.id}`).then(res =>
            res.json()
        )
    })

    function onSubmit(dataSubmit) {
        setStatus({
            ...status,
            cart: 
            [...status.cart.filter(item => item.product_id !== params.id),
            {
                product: params.id,
                quantity: dataSubmit.quantity,
                price: data.rows[0].unit_price,
                total: dataSubmit.quantity * data.rows[0].unit_price
            }]
        })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!data) {
        return <div>No data available</div>;
    }
    return (
        <div>
            <h3>Product</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <td>{data.rows[0].product_id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{data.rows[0].product_name}</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>{data.rows[0].unit_price}</td>
                    </tr>
                </thead>
            </table>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="quantity">Enter the quantity</label>
                    <input {...register('quantity')} type="number" className="form-control" id="quantity" placeholder="Quantity" />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add to Cart</button>
            </form>
            <div>
                {JSON.stringify(status.cart)}
            </div>

        </div>
    )
}