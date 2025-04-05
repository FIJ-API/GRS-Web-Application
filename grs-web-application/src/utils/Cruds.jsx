import Swal from "sweetalert2";

export const postBodyCam = async (newBodyCam, toogleModal) => {
    try {
        const formattedBodycam = JSON.stringify(newBodyCam);

        const res = await fetch("http://localhost:8080/bodycams", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedBodycam,
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: "success",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Dados enviados com sucesso!",
                customClass: {
                    popup: "swalAlerta",
                }
            });
            toogleModal && toogleModal();
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Erro ao cadastrar!",
                customClass: {
                    popup: "swalAlerta",
                }
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Erro",
            position: "center",
            backdrop: false,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const getBodyCams = async () => {
    try {
        const res = await fetch("http://localhost:8080/bodycams");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putBodyCam = async (modifiedBodyCam, idBodyCam, toogleModal) => {
    try {
        const formattedBodycam = JSON.stringify(modifiedBodyCam);

        const res = await fetch(`http://localhost:8080/bodycams/${idBodyCam}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedBodycam,
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: "success",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Dados atualizados com sucesso!",
                customClass: {
                    popup: "swalAlerta",
                }
            });
            toogleModal && toogleModal();
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Número de série em conflito!",
                customClass: {
                    popup: "swalAlerta",
                }
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Erro",
            position: "center",
            backdrop: false,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const deleteBodyCam = async (idBodyCam, toogleModal) => {
    try {
        const confirm = await Swal.fire({
            title: "Tem certeza?",
            text: "Essa ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            backdrop: false,
            confirmButtonColor: "#007bff",
            cancelButtonColor: "#ff4d4d",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: "swalAlerta",
            }
        });

        if (confirm.isConfirmed) {
            const res = await fetch(`http://localhost:8080/bodycams/${idBodyCam}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: res.status,
                    position: "center",
                    backdrop: false,
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    text: data.message || "BodyCam removida com sucesso!",
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
                toogleModal && toogleModal();
            } else {
                Swal.fire({
                    icon: "error",
                    title: res.status,
                    position: "center",
                    backdrop: false,
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    text: data.message || "BodyCam não encontrada!",
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erro ao remover bodycam " + idBodyCam + ": ", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            position: "center",
            backdrop: false,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const uploadFile = async (file, toogleModal) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch("http://localhost:8080/bodycams/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        Swal.fire({
            icon: res.ok ? "success" : "error",
            title: res.status,
            backdrop: false,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: data.message || (res.ok ? "Dados enviados com sucesso!" : "Erro ao cadastrar via upload!"),
            customClass: {
                popup: "swalAlerta",
            }
        });

        if (res.ok) {
            toogleModal && toogleModal();
        }

    } catch (error) {
        console.error("Erro ao enviar arquivo: ", error);
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.message || "Erro ao cadastrar via upload!",
            backdrop: false,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};
