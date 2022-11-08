
import * as yup from 'yup';

export const validationFunction = [
    yup.object({
        fullName: yup.string().required('Full Name is Required'),
        address1: yup.string().required('Address is Required'),
        city: yup.string().required('City is Required'),
        state: yup.string().required('State is Required'),
        postcode: yup.string().required('PostCode is Required'),
        country: yup.string().required('Country is Required')
    }),
    yup.object(),
    yup.object({
        nameOnCard:yup.string().required('Required')
    })
]