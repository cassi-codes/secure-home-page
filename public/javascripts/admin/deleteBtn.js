    const deleteModal = document.getElementById('deleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    let currentForm = null;

    const batchDeleteModal = document.getElementById('batchDeleteModal');
    const cancelBatchDeleteBtn = document.getElementById('cancelBatchDelete');
    const confirmBatchDeleteBtn = document.getElementById('confirmBatchDelete');
    const selectedWorkersList = document.getElementById('selectedWorkersList');

    const toggleSelectionBtn = document.getElementById('toggleSelectionMode');
    const deleteSelectedBtn = document.getElementById('deleteSelected');
    const cancelSelectionBtn = document.getElementById('cancelSelection');
    const selectionCheckboxes = document.querySelectorAll('.selection-checkbox');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    let isSelectionMode = false;



    toggleSelectionBtn.addEventListener('click', function() {
        isSelectionMode = true;
        toggleSelectionBtn.classList.add('d-none');
        deleteSelectedBtn.classList.remove('d-none');
        deleteSelectedBtn.classList.add('d-ms-inline');
        cancelSelectionBtn.classList.remove('d-none');
        cancelSelectionBtn.classList.add('d-ms-inline');
        selectionCheckboxes.forEach(cb => {
            cb.classList.remove('d-none');
            cb.classList.add('d-block');
        });
        deleteButtons.forEach(btn => btn.style.display = 'none');
    });



    cancelSelectionBtn.addEventListener('click', function() {
        isSelectionMode = false;
        toggleSelectionBtn.classList.remove('d-none');
        deleteSelectedBtn.classList.add('d-none');
        deleteSelectedBtn.classList.remove('d-ms-inline');
        cancelSelectionBtn.classList.add('d-none');
        cancelSelectionBtn.classList.remove('d-ms-inline');
        selectionCheckboxes.forEach(cb => {
            cb.classList.add('d-none');
            cb.classList.remove('d-block');
            cb.checked = false;
        });
        deleteButtons.forEach(btn => btn.style.display = 'block');
    });



    deleteSelectedBtn.addEventListener('click', function() {
        const selectedCheckboxes = document.querySelectorAll('.selection-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('削除する応募者を選択してください');
            return;
        }
        selectedWorkersList.innerHTML = '';
        const selectedIds = [];
        selectedCheckboxes.forEach(cb => {
            const workerId = cb.dataset.workerId;
            const card = cb.closest('.card');
            const workerName = card.dataset.workerName;
            selectedIds.push(workerId);
            const li = document.createElement('li');
            li.textContent = workerName;
            li.style.marginBottom = '0.5rem';
            selectedWorkersList.appendChild(li);
        });
        confirmBatchDeleteBtn.dataset.selectedIds = JSON.stringify(selectedIds);
        batchDeleteModal.style.display = 'flex';
    });



    cancelBatchDeleteBtn.addEventListener('click', function() {
        batchDeleteModal.style.display = 'none';
    });



    confirmBatchDeleteBtn.addEventListener('click', async function() {
        const selectedIds = JSON.parse(this.dataset.selectedIds || '[]');
        for (const id of selectedIds) {
            try {
                await fetch(`/admin/applicants/${id}?_method=DELETE`, {
                    method: 'POST',
                });
            } catch (error) {
                console.error('Error deleting worker:', error);
            }
        }
        window.location.reload();
    });



    batchDeleteModal.addEventListener('click', function(e) {
        if (e.target === batchDeleteModal) {
            batchDeleteModal.style.display = 'none';
        }
    });



    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            currentForm = this.closest('.delete-form');
            deleteModal.style.display = 'flex';
        });
    });



    cancelDeleteBtn.addEventListener('click', function() {
        deleteModal.style.display = 'none';
        currentForm = null;
    });



    confirmDeleteBtn.addEventListener('click', function() {
        if (currentForm) {
            currentForm.submit();
        }
    });



    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            deleteModal.style.display = 'none';
            currentForm = null;
        }
    });
