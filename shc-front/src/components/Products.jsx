import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export function Products() {

    const { data, isLoading } = useQuery('products', () => {
        return fetch('http://localhost:5555/products').then(res =>
            res.json()
        )
    })
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.rows.map(product => (
                        <tr key={product.product_id}>
                            <td><Link to={`/products/${product.product_id}`}>{product.product_name}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}