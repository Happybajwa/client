import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AppDropzone from "../../App/Components/AppDropzone";
import AppSelectList from "../../App/Components/AppSelectList";
import AppTextInput from "../../App/Components/AppTextInput";
import useProducts from "../../App/hooks/useProducts";
import { Product } from "../../App/Models/Product";
import { yupResolver } from '@hookform/resolvers/yup'
import { ValidationSchema } from "./productValidation";
import Agent from "../../App/Api/Agent";
import { useAppDispatch } from "../../App/Store/ConfigureStore";
import { setProduct } from "../Catalog/CatalogSlice";
import { LoadingButton } from "@mui/lab";

interface Props {
    product?: Product;
    cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
    const { control, reset, handleSubmit, watch, formState: { isDirty, isSubmitting } } = useForm({
        resolver: yupResolver(ValidationSchema)
    });
    const { gender, size } = useProducts();
    const watchFile = watch('file', null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (product && !watchFile && !isDirty) reset(product);
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [product, reset, watchFile, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Product;
            if (product) {
                response = await Agent.Admin.updateProduct(data);
            } else {
                response = await Agent.Admin.createProduct(data);
            }
            dispatch(setProduct(response));
            cancelEdit();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Box component={Paper} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Product Name' />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput type="number" control={control} name='price' label='Price' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={gender} name='gender' label="Gender" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={size} name='size' label="Size" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} type='number' name='quantityInStock' label='Quantity in Stock' />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput control={control} multiline={true} rows={3} name='description' label='Description' />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <AppDropzone control={control} name='file' />
                            {watchFile ? (
                                <img src={watchFile.preview} alt="preview" style={{ maxHeight: 200 }} />
                            ) : (
                                <img src={product?.pictureUrl} style={{ maxHeight: 200 }} />
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={() => cancelEdit()} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}