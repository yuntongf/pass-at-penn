import { toast } from 'react-toastify';

export const toastWarn = (message) => {
    toast.warning(message, {
        position: 'top-center',
        autoClose: 1700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
};

export const toastSuccess = (message) => {
    toast.success(message, {
        position: 'top-center',
        autoClose: 1700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}