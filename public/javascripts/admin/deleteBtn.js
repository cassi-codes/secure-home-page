    const deleteModal = document.getElementById('deleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    let currentForm = null;

    const batchDeleteModal = document.getElementById('batchDeleteModal');
    const cancelBatchDeleteBtn = document.getElementById('cancelBatchDelete');
    const confirmBatchDeleteBtn = document.getElementById('confirmBatchDelete');
    const selectedWorkersList = document.getElementById('selectedWorkersList');

    const errorModal = document.getElementById('errorModal');
    const closeErrorBtn = document.getElementById('closeError');

    const selectionCheckboxes = document.querySelectorAll('.selection-checkbox');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    const navCategoryDeleteBtn = document.getElementById('navCategoryDelete');
    const navCategoryDeleteConfirmBtn = document.getElementById('navCategoryDeleteConfirm');
    const navCategoryCancelBtn = document.getElementById('navCategoryCancel');

    const toggleSelectionModeBtn = document.getElementById('toggleSelectionMode');
    const deleteSelectedBtn = document.getElementById('deleteSelected');
    const cancelSelectionBtn = document.getElementById('cancelSelection');

    let isSelectionMode = false;

    function handleSelectionDeleteClick() {
        const actionButtons = this.parentElement;

        this.classList.add('d-none');

        const confirmBtn = actionButtons.querySelector('#navCategoryDeleteConfirm, #deleteSelected');
        const cancelBtn = actionButtons.querySelector('#navCategoryCancel, #cancelSelection');

        if (confirmBtn) {
            confirmBtn.classList.remove('d-none');
        }
        if (cancelBtn) {
            cancelBtn.classList.remove('d-none');
        }

        if (!isSelectionMode) {
            isSelectionMode = true;
            selectionCheckboxes.forEach(cb => {
                cb.classList.remove('d-none');
                cb.classList.add('d-block');
            });
            deleteButtons.forEach(btn => btn.style.display = 'none');
        }
    }

    function handleCancelClick() {
        const actionButtons = this.parentElement;

        this.classList.add('d-none');

        const confirmBtn = actionButtons.querySelector('#navCategoryDeleteConfirm, #deleteSelected');
        if (confirmBtn) {
            confirmBtn.classList.add('d-none');
        }

        const deleteBtn = actionButtons.querySelector('#navCategoryDelete, #toggleSelectionMode');
        if (deleteBtn) {
            deleteBtn.classList.remove('d-none');
        }

        isSelectionMode = false;
        selectionCheckboxes.forEach(cb => {
            cb.classList.add('d-none');
            cb.classList.remove('d-block');
            cb.checked = false;
        });
        deleteButtons.forEach(btn => btn.style.display = '');
    }

    if (navCategoryDeleteBtn) {
        navCategoryDeleteBtn.addEventListener('click', handleSelectionDeleteClick);
    }

    if (navCategoryCancelBtn) {
        navCategoryCancelBtn.addEventListener('click', handleCancelClick);
    }

    if (toggleSelectionModeBtn) {
        toggleSelectionModeBtn.addEventListener('click', handleSelectionDeleteClick);
    }

    if (cancelSelectionBtn) {
        cancelSelectionBtn.addEventListener('click', handleCancelClick);
    }

    function handleDeleteSelectedClick() {
        const selectedCheckboxes = document.querySelectorAll('.selection-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            errorModal.style.display = 'flex';
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
    }

    if (navCategoryDeleteConfirmBtn) {
        navCategoryDeleteConfirmBtn.addEventListener('click', handleDeleteSelectedClick);
    }

    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener('click', handleDeleteSelectedClick);
    }



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



    closeErrorBtn.addEventListener('click', function() {
        errorModal.style.display = 'none';
    });



    errorModal.addEventListener('click', function(e) {
        if (e.target === errorModal) {
            errorModal.style.display = 'none';
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
