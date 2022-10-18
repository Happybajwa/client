import { debounce, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore";
import { setProductParams } from "./CatalogSlice";

export default function ProductSearch() {

    const { ProductParams } = useAppSelector(state => state.catalog)
    const [searchBy, setSearchBy] = useState(ProductParams.searchBy);

    const dispatch = useAppDispatch();

    const debouncedSearch = useMemo(
        () =>
            debounce((event: any) => {
                dispatch(setProductParams({ searchBy: event.target.value }));
            }, 1000),
        [dispatch]
    );

    return (
        <TextField
            label='Search Products'
            variant="outlined"
            fullWidth
            value={searchBy || ''}
            onChange={(event: any) => {
                setSearchBy(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}