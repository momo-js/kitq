import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogActions, DialogTitle, Slide, TextField } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TransitionProps } from 'react-transition-group/Transition';
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from '../../state';
import { createPostApi } from '../../api/api';

const regexURL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

type IFormInputs = {
    title: string,
    picturePath: string
}

const schema = yup.object().shape({
    title: yup.string()
        .required('Required.')
        .min(4, 'Min. 4 characters.')
        .max(100, 'Max. 100 characters.'),
    picturePath: yup.string()
        .required('Required.')
        .url('bruh')
        // .matches(regexURL, 'Entera a valid URL.')
});

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
})


const CancelModal = NiceModal.create(() => {
    const modal = useModal()

    const dispatch = useDispatch()
    const { _id } = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.token);

    const { control, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            const res = await createPostApi(_id, data.title, data.picturePath, token)
            const posts = await res.data
            dispatch(setPosts({ posts }))
            modal.remove()
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <Dialog
            maxWidth='lg'
            TransitionComponent={Transition}
            open={modal.visible}
            TransitionProps={{
                onExited: () => modal.remove(),
            }}
        >
            <DialogTitle>
                Add new post
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ minWidth: '75vw', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                    <Controller
                        name='title'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField {...field}
                                placeholder='title'
                                variant='outlined'
                                error={!!errors.title}
                                helperText={errors?.title?.message}
                                fullWidth
                                sx={{ marginBottom: '2rem' }}
                            />
                        )}
                    />
                    <Controller
                        name='picturePath'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField {...field}
                                placeholder='URL'
                                variant='outlined'
                                error={!!errors.picturePath}
                                helperText={errors?.picturePath?.message}
                                fullWidth
                            />
                        )}
                    />
                </Box>
                <DialogActions sx={{ marginBottom: '0.5rem' }}>
                    <Button variant='outlined' onClick={() => {
                        modal.remove()
                    }}>close</Button>
                    <Button variant='contained' type='submit'>submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
})

export default CancelModal
