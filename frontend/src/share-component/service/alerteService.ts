import Swal from "sweetalert2";

export const showSuccessAlert = async (title: string, text: string) => {
    await Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText: 'OK'
    });
};

export const showErrorAlert = async (title: string, text: string) => {
    await Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText: 'OK'
    });
};