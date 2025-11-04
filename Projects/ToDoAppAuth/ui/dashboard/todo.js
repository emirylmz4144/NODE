function newElement() {
    const ulDOM = document.querySelector("#list");
    const liDOM = document.createElement("li");
    liDOM.classList.add('row', 'd-flex', 'align-items-center', 'justify-content-center');
    const user_value = document.querySelector("#task").value.trim();

    let toastElement = document.getElementById("liveToast");
    let toastBody = toastElement.querySelector(".toast-body");

    if (user_value === "") {
        toastElement.classList.remove("text-bg-success");
        toastElement.classList.add("text-bg-danger");
        toastBody.textContent = "Boş bir görev giremezsiniz";

    } else {
        liDOM.innerHTML = `
                <p class="col-sm-10 d-flex align-items-center justify-content-start mb-0 fs-5">${user_value}</p>
                <div class="col-sm-2 d-flex justify-content-end align-items-center">
                    <img src="../img/success.svg" id="success"   class="d-inline col-sm object-fit-contain border rounded bg-success text-white" width="22" height="22">
                    <img src="../img/update.png" id="update" class="d-inline col-sm object-fit-contain border rounded bg-warning" width="22" height="22">
                    <img src="../img/delete.svg" id="remove" class="d-inline col-sm object-fit-contain border rounded bg-danger" width="22 " height="22">
                </div>
        `;


        liDOM.querySelector('#remove').addEventListener('click', function () {

            const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
            deleteModal.show();

            const confirmButton = document.getElementById('confirmDelete');

            //temp olarak atanan değişken onay işlemini klonluyor ve işlemi gerçekleştiriyor
            const newConfirmButton = confirmButton.cloneNode(true);
            //önceki eventları temizliyor yani daha önceki silme işlemleri modalde birikiyor ve bizde temizliyoruz
            confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);

            newConfirmButton.addEventListener('click', function () {
                liDOM.remove();
                deleteModal.hide();
            });
        });



        liDOM.querySelector('#success').addEventListener('click', function () {
            if (!liDOM.classList.contains('bg-success')) {
                liDOM.classList.add("bg-success",'bg-opacity-50');
                liDOM.querySelector("p").classList.add("text-decoration-line-through");
            }
            else {
                liDOM.classList.remove("bg-success");
                liDOM.querySelector("p").classList.remove("text-decoration-line-through");
            }
        });

        liDOM.querySelector('#update').addEventListener('click', () => {
            const p = liDOM.querySelector('p');
            const oldText = p.textContent;

            
            const textarea = document.createElement('textarea');
            textarea.className = 'form-control';
            textarea.value = oldText;

            liDOM.replaceChild(textarea, p);

            
            const saveBtn = document.createElement('button');
            saveBtn.className = 'btn btn-success btn-sm ms-2';
            saveBtn.textContent = 'KAYDET';

            
            textarea.insertAdjacentElement('afterend', saveBtn);

            // kaydet butonuna tıklanınca
            saveBtn.addEventListener('click', function () {
                const newText = textarea.value.trim();
                p.textContent = newText || oldText;

                // textarea yerine yeni p koy
                liDOM.replaceChild(p, textarea);
                saveBtn.remove();
            });
        });


        ulDOM.appendChild(liDOM);
        document.querySelector('#task').value = '';

        toastElement.classList.remove("text-bg-danger");
        toastElement.classList.add("text-bg-success");
        toastBody.textContent = "Görev başarıyla eklendi";
    }

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

const input = document.querySelector('#task');
input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // form submit olmasın
        newElement();
    }
});