//create map
const map = L.map('map').setView([-27.222633, -49.6455874], 15);

// create and add tileLayer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon
const icon = L.icon({
    iconUrl: './images/map-marker.svg',
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker;

// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector("[name=lat]").value = lat;
    document.querySelector("[name=lng]").value = lng;

    marker && map.removeLayer(marker);

    // add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map);
})

// adicionar o campo de fotos
function addPhotoField() {
    // pegar o container das fotos #images
    const container = document.querySelector('#images');
    // pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload');
    // realizar o clone da última imagem adicionada.
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);
    // verificar se o campo de imagem está preenchido
    const input = newFieldContainer.children[0];
    if (input.value == '') {
        return;
    }
    //limpar o campo antes de adicionar o container de imagens
    input.value = '';
    // adicionar o clone ao container de #images
    container.appendChild(newFieldContainer);
}

function deleteField(event) {
    const span = event.currentTarget;
    const fieldsContainer = document.querySelectorAll('.new-upload');
    if (fieldsContainer.length < 2) {
        // limpar o valor do campo
        span.parentNode.children[0].value = '';
        return;
    }

    // deletar o campo
    span.parentNode.remove();
}

//troca do sim e não
function toggleSelect(event) {
    const button = event.currentTarget;
    const input = document.querySelectorAll('[name="open_on_weekends"]');
  
    if (input) {
        // Define o valor do input para o valor do botão clicado
        input.value = button.dataset.value;
    
        // Remove a classe 'active' de todos os botões
        const buttons = document.querySelectorAll('.button-select button');
        buttons.forEach(btn => btn.classList.remove('active'));
    
        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');
      } else {
        console.error('Elemento de input [name="open-on-weekends"] não encontrado.');
      }
  }
  

function validate(event) {
    event.preventDefault();

    // Validar os campos
    const name = document.querySelector('[name="name"]').value;
    const about = document.querySelector('[name="about"]').value;
    const whatsapp = document.querySelector('[name="whatsapp"]').value;
    const instructions = document.querySelector('[name="instructions"]').value;
    const opening_hours = document.querySelector('[name="opening_hours"]').value;
    const open_on_weekends = document.querySelectorAll('[name="open-on-weekends"]').value;
    
    const images = document.querySelectorAll('[name="images"]');
    const lat = document.querySelector('[name="lat"]').value;
    const lng = document.querySelector('[name="lng"]').value;
    
    if (name == '' || about == '' || whatsapp == '' || instructions == '' || opening_hours == '' || open_on_weekends == '' || images.length == 0 || lat == '' || lng == '') {
        alert('Todos os campos são obrigatórios!');
        return;
    }
    
    // Validar o número do whatsapp
    const regexWhatsapp = /^(?:\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
    if (!regexWhatsapp.test(whatsapp)) {
        alert('Número do Whatsapp inválido!');
        return;
    }
    
    // Enviar o formulário
    document.querySelector('form').submit();

    // Limpar os inputs
    document.querySelector('[name="name"]').value = '';
    document.querySelector('[name="about"]').value = '';
    document.querySelector('[name="whatsapp"]').value = '';
    document.querySelector('[name="instructions"]').value = '';
    document.querySelector('[name="opening_hours"]').value = '';

    // Mostrar mensagem de sucesso (opcional)
    alert('Orfanato criado com sucesso!');

    // Limpar o formulário
    document.querySelector('form').reset();
}