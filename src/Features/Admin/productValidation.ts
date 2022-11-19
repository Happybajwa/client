import * as yup from 'yup';

export const ValidationSchema = yup.object({
name:yup.string().required(),
price:yup.number().required().moreThan(1),
gender:yup.string().required(),
size:yup.string().required(),
quantityInStock:yup.number().required().min(0),
description:yup.string().required(),
file:yup.mixed().when('pictureUrl', {
    is:(value:string) => !value,
    then:yup.mixed().required('Please Provide an image')
})
})


