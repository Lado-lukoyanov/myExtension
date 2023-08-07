import { useEffect, useState } from 'react';
import '../styles/App.css'
import { getMyCurrencies } from './ApiTest';


export const RatesTable = (): JSX.Element => {
    const [quotes, setQuotes] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        getMyCurrencies("USD", {}).then(
            (res) => {
                if (res.status === 200 && res.data.quotes) {
                    setQuotes(res.data.quotes);
                }
            }
        );
    }, []);

    const rates = quotes ? Object.entries(quotes) : [];
    const valueDollars = rates
        ?.filter((rate) => rate[0] === "USDRUB")
        .map((rate) => parseFloat(rate[1].toFixed(2)))

    const valueEuro = rates
        ?.filter((rate) => rate[0] === "USDEUR")
        .map((rate) => parseFloat(rate[1].toFixed(2)))
    const currentEuro = valueDollars[0] / valueEuro[0]
    const value = currentEuro.toFixed(2)



    return <div className='myPost'>
        <div className='container'>
            <h1 className='myH' >Таблица валют </h1>
            <table className='myTable'>
                <thead>
                    <tr>
                        <th className='myTH'>Валюта</th>
                        <th className='myTH'>Количество</th>
                        <th className='myTH'>Рубль</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='myTH'>USD</td>
                        <td className='myTH'>1</td>
                        <td className='myTH'>{valueDollars}</td>
                    </tr>
                    <tr>
                        <td className='myTH'>EUR</td>
                        <td className='myTH'>1</td>
                        <td className='myTH'>{value}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
}