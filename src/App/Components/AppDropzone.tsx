import { UploadFile } from '@mui/icons-material';
import { FormControl, FormHelperText, Typography, useControlled } from '@mui/material'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController, UseControllerProps } from 'react-hook-form'

interface Props extends UseControllerProps {

}

export default function AppDropzone(props: Props) {

    const { fieldState, field } = useController({ ...props, defaultValue: null });

    const dzStyle = {
        display:'flex',
        border:'dashed 3px #eee',
        borderColor:"#eee",
        borderRadius:'5px',
        paddingTop:'30px',
        alignItems:'center',
        height:200,
        width:500
    }

    const dzActive = {
        borderColor:'green'
    }

    //uploading image
    const onDrop = useCallback((acceptedFile:any) => {
        acceptedFile[0] = Object.assign(acceptedFile[0],
            { preview: URL.createObjectURL(acceptedFile[0]) });
        field.onChange(acceptedFile[0]);
    }, [field])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
           <FormControl style={isDragActive ? {...dzStyle, ...dzActive}: dzStyle} error={!!fieldState.error}>
                <input {...getInputProps()}/>
                <UploadFile sx={{fontSize:'60px'}}/>
                <Typography variant='h4'>Drop picture here</Typography>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
           </FormControl>
        </div>
    )
}