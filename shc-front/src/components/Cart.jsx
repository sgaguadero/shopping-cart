import React, { useContext, useEffect } from 'react'
import { Context } from '../main'
import { useState } from 'react'
import { ethers, utils } from 'ethers'


export function Cart() {
    const { status, setStatus } = useContext(Context)
    const [account, setAccount] = useState(null)
    const [txOk, setTxOk] = useState(null)
    const [txKo, setTxKo] = useState(null)
    const total = status.cart.reduce((acc, item) => acc + item.total, 0)
    useEffect(() => {
        window.ethereum && window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                console.log(accounts[0])
                setAccount(accounts[0])
                ethereum.on('accountsChanged', (accounts) => {
                    setAccount(accounts[0])
                })
            });
    }, [])

    async function pay() {
        const tx = {
            from: account,
            to: '0x385f303959d1e3e162903c158f1200cc9e4d0dce',
            value: ethers.utils.parseEther(total.toString()).toHexString()
        }
        try {
            const txResponse = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx],
            })
            setTxOk(txResponse)
        } catch (error) {
            setTxKo(error)
        }
    }


    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {status.cart.map(item => (
                    <tr key={item.product}>
                        <td>{item.product}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div>
            <h3>Total: {total}</h3>
            <h4>{account}</h4>
            <button className='btn btn-primary' onClick={() => pay()}>Pay</button>
            {txOk && <div>Transaction ok: {txOk}</div>}
            {txKo && <div>Transaction ko: {txKo}</div>}
        </div>
    </div>
}