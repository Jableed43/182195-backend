import Swal from "sweetalert2"

// Helpers centralizados de notificación (SweetAlert2) para mantener un estilo
// consistente en toda la app: éxito, error, confirmación y toast rápido.
//
// CRITERIO (cuándo usar cada uno):
//   notifyToast   -> salió bien y la app sigue andando (login, guardar, agregar).
//                    No corta el flujo: aparece en una esquina y se va solo.
//   notifyError   -> algo falló y hay que leerlo. Corta, a propósito.
//   confirmAction -> antes de algo destructivo (borrar, vaciar). Pide sí o no.
//   notifySuccess -> éxito que MERECE cortar (casi nunca). Ojo: como devuelve
//                    una promesa, si le ponés await frena la redirección hasta
//                    que el usuario hace clic en OK. Eso molesta más de lo que suma.

export const notifySuccess = (title, text = "") =>
    Swal.fire({ icon: "success", title, text, confirmButtonColor: "#567cbd" })

export const notifyError = (title, text = "") =>
    Swal.fire({ icon: "error", title, text, confirmButtonColor: "#567cbd" })

export const notifyInfo = (title, text = "") =>
    Swal.fire({ icon: "info", title, text, confirmButtonColor: "#567cbd" })

// Confirmación: devuelve true si el usuario confirma, false si cancela
export const confirmAction = async (title, text = "", confirmText = "Sí, continuar") => {
    const result = await Swal.fire({
        icon: "warning",
        title,
        text,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#567cbd",
        cancelButtonColor: "#6c757d",
    })
    return result.isConfirmed
}

// Toast discreto (esquina superior, se cierra solo) para acciones livianas
export const notifyToast = (title, icon = "success") =>
    Swal.fire({
        toast: true,
        position: "top-end",
        icon,
        title,
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
    })
