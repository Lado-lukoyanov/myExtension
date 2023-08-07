import { useEffect, useState } from 'react';
import '../styles/App.css'
import useDebounce from '../hooks/useDebounce';
import { getMyCurrencies } from './ApiTest';

export const Convertor = (): JSX.Element => {

    const [result, setResult] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isCalculated, setIsCalculated] = useState(false);
    const debouncedInput = useDebounce(inputValue, 500)
    const [error, setError] = useState(null);
    const [quotes, setQuotes] = useState<{ [key: string]: number }>({});



    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
        if (!isCalculated) {
            setResult("");
        }

        if (isCalculated && event.target.value === "") {
            setResult("");
        }


        setInputValue(event.target.value.replace(/  +/g, " "));

    }

    useEffect(() => {
        getMyCurrencies("USD", {}).then(
            (res) => {
                if (res.status === 200 && res.data.quotes) {
                    setQuotes(res.data.quotes);
                }
            }
        ).catch((err) => {
            setError(err.message || 'Произошла ошибка при получении курсов валют');
        });
    }, []);


    useEffect(() => {
        const amount = Number(debouncedInput);
        const isValidInput = amount > 0;

        if (isValidInput && quotes && quotes["USDRUB"]) {
            const convertedAmount = amount * quotes["USDRUB"];
            setResult(`Сумма ${amount} $ равна  ${convertedAmount.toFixed(2)} RUB`);
            setIsCalculated(true);
        } else if (inputValue !== "") {
            setIsCalculated(false);
            setResult("введите валидное значение");
        }
    }, [inputValue, debouncedInput, quotes]);

    return (
        <>
            <div className='post'>
                <div className='container'>
                    <h1 className='myH'>Ведите сумму USD</h1>
                    <input className='myIpput'
                        type="text"
                        value={inputValue}
                        placeholder="Введите сумму"
                        onChange={(event) => handleChange(event)} />
                    <p className='myP'> {result} </p>
                    {error && <p className='myError'>{error}</p>} {/* Отображение ошибки */}
                </div>
            </div>
        </>

    );
}



