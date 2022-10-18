import { Box, Pagination, Typography } from "@mui/material";
import { PageData } from "../Models/pagination";

interface Props {
    pageData: PageData;
    onPageChange: (page: number) => void;

}

export default function AppPagination({ pageData, onPageChange }: Props) {

    const { currentPage, totalCount, totalPages, pageSize } = pageData;

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(currentPage - 1) * pageSize + 1}-
                {currentPage * pageSize > totalCount
                    ? totalCount
                    : currentPage * pageSize} of {pageData?.totalCount} items
            </Typography>
            <Pagination
                count={totalPages}
                color="primary"
                size="large"
                page={currentPage}
                onChange={(e, page) => onPageChange(page)}
            />
        </Box>
    )
}