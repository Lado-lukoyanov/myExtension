import axios from 'axios'

interface IMyParams {
    baseUrl: string
    access_key: string
    currencies: string
    method: 'get'
}
const currencies = "EUR,RUB";
const accessKey = "c3eded4bc73f570e91d455c3cd43436e&currencies";
const parametrs: IMyParams = {
    baseUrl: "http://apilayer.net/api/live?",
    method: 'get',
    access_key: accessKey,
    currencies: currencies,
}
export const getMyCurrencies = async (url: string, data: any): Promise<any> => {
    return await axios({
        ...parametrs,
        url: `${parametrs.baseUrl}access_key=${parametrs.access_key}&currencies=${parametrs.currencies}&source=${url}&format=1`,
    }).then((response) => {
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) => {
        return {
            status: error.status,
            data: error.data
        }
    })
}
