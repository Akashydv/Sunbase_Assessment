let formData = [
  {
    "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
    "type": "input",
    "label": "Sample Label",
    "placeholder": "Sample placeholder"
  }, {
    "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
    "type": "select",
    "label": "Sample Label",
    "options": ["Sample Option-1", "Sample Option-2", "Sample Option-3"]
  }, {
    "id": "45002ecf-85cf-4852-bc46-529f94a758f5", 
    "type": "input",
    "label": "Sample Label",
    "placeholder": "Sample Placeholder"
  }, {
    "id": "680cff8d-c7f9-40be-8767-e3d6ba420952", 
    "type": "textarea",
    "label": "Sample Label",
    "placeholder": "Sample Placeholder"
  }];

  

document.addEventListener('DOMContentLoaded', () => {
  renderForm();
});
  
  function renderForm() {
    const form = document.getElementById('customise_form');  
      form.innerHTML = ''; 
      formData.forEach((data, index) => {
        let inputField;
        let label = `<label class="form-label" title="Label">${data.label}</label>
                     <label class="form-label d-none cursor-text" title="Label" contenteditable="true" onkeydown="validatelabelValue(event)" oninput="editLabel(${index}, this.innerText)">${data.label}</label>`;

    if (data.type === 'input') {
      inputField = `<input type="text" class="form-control d-none" value="${data.placeholder}" placeholder="${data.placeholder}" oninput="editPlaceholder(${index}, this.value)" />
                    <input type="text" class="form-control" placeholder="${data.placeholder}" />`;
    } else if (data.type === 'select') {
      inputField = `
        <select class="form-select">
          ${data.options.map((option) => `<option>${option}</option>`).join('')}
        </select>
        <div id="update_selectBox_${index}" class="d-none">
        <button class="btn btn-sm btn-primary mt-2" onclick="addSelectOption(${index})"><i class="bi bi-plus-lg"></i> Option</button>
        ${data.options.map((option, optIndex) => `
          <div class="d-flex align-items-center mt-1" id="selectBox_${index}_editOptions_${optIndex}">
            <input type="text" class="form-control d-none" value="${option}" oninput="editSelectOption(${index}, ${optIndex}, this.value)" />
            <span class="ms-2" onclick="deleteSelectOption(${index}, ${optIndex})"><i class="bi bi-trash3"></i></span>
          </div>
        `).join('')}
        </div>
      `;
    } else if (data.type === 'textarea') {
      inputField = `<textarea class="form-control d-none" rows="3" placeholder="${data.placeholder}" oninput="editPlaceholder(${index}, this.value)">${data.placeholder}</textarea>
                    <textarea class="form-control" rows="3" placeholder="${data.placeholder}"></textarea>`;
    }

        const formGroup =   `<div class="mb-4 form-group" draggable="true" data-index="${index}" id="${data.id}">
            ${label}
            <div class="float-end">
            <span class="cursor-pointer me-2" title="Edit" onclick="toggleEdit(${index})" id="edit-btn-${index}"><i class="bi bi-pencil-square"></i></span>
            <span class="cursor-pointer" title="Delete" onclick="deleteFormField('${index}','${data.id}')"><i class="bi bi-trash3-fill"></i></span>
            </div>
            ${inputField}
          </div>`
          form.innerHTML += formGroup;
      });
      addDragAndDrop();
  }

  function addNewFormField(type){
    debugger
    let inputField;
    const form = document.getElementById('customise_form');  
    let index = formData.length;
        
    if(type == "INPUT"){
      formData.push({
        "id": generateUniqueId(),
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample placeholder"
      });
      inputField = `<input type="text" class="form-control d-none" value="${formData[index].placeholder}" placeholder="${formData[index].placeholder}" oninput="editPlaceholder(${index}, this.value)" />
                    <input type="text" class="form-control" placeholder="${formData[index].placeholder}" />`;
    }else if(type == "SELECT"){
      formData.push({
        "id": generateUniqueId(),
        "type": "select",
        "label": "Sample Label",
        "options": ["Sample Option 1", "Sample Option 2", "Sample Option 3"]
      });
      inputField = `
        <select class="form-select">
          ${formData[index].options.map((option) => `<option>${option}</option>`).join('')}
        </select>
        <div id="update_selectBox_${index}" class="d-none">
        <button class="btn btn-sm btn-primary mt-2" onclick="addSelectOption(${index})"><i class="bi bi-plus-lg"></i> Option</button>
        ${formData[index].options.map((option, optIndex) => `
          <div class="d-flex align-items-center mt-1" id="selectBox_${index}_editOptions_${optIndex}">
            <input type="text" class="form-control d-none" value="${option}" oninput="editSelectOption(${index}, ${optIndex}, this.value)" />
            <span class="ms-2" onclick="deleteSelectOption(${index}, ${optIndex})"><i class="bi bi-trash3"></i></span>
          </div>
        `).join('')}
        </div>
      `;
    }else{
      formData.push({
        "id": generateUniqueId(),
        "type": "textarea",
        "label": "Sample Label",
        "placeholder": "Sample placeholder"
      });
      inputField = `<textarea class="form-control d-none" rows="3" placeholder="${formData[index].placeholder}" oninput="editPlaceholder(${index}, this.value)">${formData[index].placeholder}</textarea>
                    <textarea class="form-control" rows="3" placeholder="${formData[index].placeholder}"></textarea>`;
    }
          const formGroup = document.createElement('div');
          formGroup.classList.add('mb-4', 'form-group');
          formGroup.setAttribute('draggable', true);
          formGroup.setAttribute('data-index', index);
          formGroup.setAttribute('id', formData[index].id);
        
          formGroup.innerHTML = `
            <label class="form-label" title="Label">${formData[index].label}</label>
            <label class="form-label d-none cursor-text" title="Label" contenteditable="true" onkeydown="validatelabelValue(event)" oninput="editLabel(${index}, this.innerText)">${formData[index].label}</label>
            <div class="float-end">
              <span class="cursor-pointer me-2" title="Edit" onclick="toggleEdit(${index})" id="edit-btn-${index}"><i class="bi bi-pencil-square"></i></span>
              <span class="cursor-pointer" title="Delete" onclick="deleteFormField('${index}','${formData[index].id}')"><i class="bi bi-trash3-fill"></i></span>
            </div>
            ${inputField}
          `;
        
          form.appendChild(formGroup);
  }

  function deleteFormField (index,id) {
    formData.splice(index, 1);
    document.getElementById(id).remove();

  }

  function saveForm(){
    console.log(JSON.stringify(formData, null, 2));
  }

  function addDragAndDrop() {
      const draggables = document.querySelectorAll('.form-group');

      draggables.forEach(draggable => {
          draggable.addEventListener('dragstart', (e) => {
              e.dataTransfer.setData('text/plain', e.target.dataset.index);
          });

          draggable.addEventListener('dragover', (e) => {
              e.preventDefault();
          });

          draggable.addEventListener('drop', (e) => {
              e.preventDefault();
              const draggedIndex = e.dataTransfer.getData('text/plain');
              const targetIndex = e.target.closest('.form-group').dataset.index;
              reorderElements(draggedIndex, targetIndex);
          });
      });
  }

  function reorderElements(draggedIndex, targetIndex) {
      const draggedElement = formData.splice(draggedIndex, 1)[0];
      formData.splice(targetIndex, 0, draggedElement);
      renderForm();
  }

  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `fieldId-${timestamp}-${randomNumber}`;
  }
  
function editLabel(index, newLabel) {
  formData[index].label = newLabel;
}

function validatelabelValue(e){
  if(e.key == "Enter"){
    e.preventDefault();
  }
}

function editPlaceholder(index, newPlaceholder) {
  formData[index].placeholder = newPlaceholder;
}

function editSelectOption(index, optIndex, newOption) {
  formData[index].options[optIndex] = newOption;
}

function addSelectOption(index) {
  formData[index].options.push('New Sample Option')
  var optIndex = formData[index].options.length;
  var newOption = `<div class="d-flex align-items-center mt-1" id="selectBox_${index}_editOptions_${optIndex}">
            <input type="text" class="form-control" value="New Sample Option" oninput="editSelectOption(${index},${optIndex}, this.value)" />
            <span class="ms-2" onclick="deleteSelectOption(${index}, ${optIndex})"><i class="bi bi-trash3"></i></span>
          </div>`;
          document.getElementById('update_selectBox_'+index).innerHTML += newOption;
}

function deleteSelectOption(index, optIndex) {
  formData[index].options.splice(optIndex, 1);
  document.getElementById('selectBox_'+index+'_editOptions_'+optIndex).remove();
}

function toggleEdit(index) {
  const formGroup = document.querySelector(`[data-index="${index}"]`);
  const edit = document.getElementById(`edit-btn-${index}`);
  const editBtn = edit.querySelector('i');
  const label = formGroup.querySelectorAll('label');
  const formControls = formGroup.querySelectorAll('.form-control');
  const selectBox = document.getElementById('update_selectBox_'+index);
  if(selectBox){
    selectBox.classList.toggle('d-none');
  }
  if(label){
    label.forEach((e)=>{
      e.classList.toggle('d-none');
    })
  }

  formControls.forEach(control => control.classList.toggle('d-none'));
  if (editBtn.classList.contains('bi-pencil-square')) {
    editBtn.classList.remove('bi-pencil-square');
    editBtn.classList.add('bi-check-lg');
    edit.title = "Save";
  } else {
    editBtn.classList.add('bi-pencil-square');
    editBtn.classList.remove('bi-check-lg');
    edit.title = "Edit";
    renderForm();
  }
}
