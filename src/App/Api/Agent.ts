import { PaginatedResponse } from './../Models/pagination';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { request } from 'http';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Store } from '../Store/ConfigureStore';


const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = Store.getState().account.user?.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if(pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
       return response; 
    }

    return response
}, (error: AxiosError) => {
    const { data, status } = error.response!;

    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: '/server-error'
            });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

const requests = {
    get: (url: string, params?:URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: (params:URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters:() => requests.get('products/filters')
}

const TestErrors = {
    get400Error: () => requests.get('error/bad-request'),
    get401Error: () => requests.get('error/unauthorized'),
    get404Error: () => requests.get('error/not-found'),
    get500Error: () => requests.get('error/server-error'),
    getValidationError: () => requests.get('error/validation-error'),
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const Account = {
    login:(values:any) => requests.post('account/login',values),
    register:(values:any) => requests.post('account/register',values),
    currentUser:() => requests.get('account/getCurrentUser')
}
const Orders = {
    list:() => requests.get('orders'),
    fetch:(id:number) => requests.get(`orders/${id}`),
    create:(values:any) => requests.post('orders', values)
}

const Payment ={
    createPaymentIntent:()=>requests.post('payment',{})
}

const Agent = {
    Catalog,
    TestErrors,
    Basket,
    Account,
    Orders,
    Payment
}

export default Agent;