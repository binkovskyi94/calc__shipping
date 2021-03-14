import {
  asd
} from './functions/resize';

asd();
import {
  num1,
  num2
} from './functions/small';
num1();
num2();
import './components/pagination';

const apiCity = document.getElementById('city'),
  nameFirst = document.getElementById('name'),
  nameLast = document.getElementById('surname'),
  numberPhone = document.getElementById('number'),
  coment = document.getElementById('comment'),
  inputWeight = document.getElementById('weight'),
  inputWidth = document.getElementById('width'),
  inputHeight = document.getElementById('height'),
  rngWeight = document.getElementById('weight-range'),
  rngWidth = document.getElementById('width-range'),
  rngHeight = document.getElementById('height-range'),
  loadParcel = document.getElementById('load'),
  deliveryParcel = document.getElementById('del'),
  cargo = document.getElementById('cargo'),
  dateInput = document.getElementById('date'),
  inputPrice = document.getElementById('price'),
  btn = document.getElementById('btn'),
  modalWidth = document.querySelector("#modal-width span"),
  modalHeight = document.querySelector("#modal-height span"),
  modalWeight = document.querySelector("#modal-weight span"),
  modalCity = document.querySelector("#modal-city span"),
  modalDate = document.querySelector("#modal-date span"),
  modalAppartment = document.querySelector("#modal-appartment span"),
  modalName = document.querySelector("#modal-name span"),
  modalSurname = document.querySelector("#modal-surname span"),
  modalPhone = document.querySelector("#modal-phone span"),
  modalComments = document.querySelector("#modal-comments span"),
  modalCost = document.querySelector("#modal-cost span");


document.addEventListener("DOMContentLoaded", () => {

  // City API
  function currentCityAPI() {
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "3b4f890b69mshb7870c383d2b4d0p17928bjsn15f31234a566",
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
        }
      })
      .then(response => response.json())
      .then(json => {
        const city = json.data;
        city.forEach(el => {
          const cityName = el.name;
          const cityElement = document.createElement('option');
          apiCity.append(cityElement);
          cityElement.innerHTML = cityName;
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  currentCityAPI();

  // dateDelivery
  const dateDelivery = datepicker(dateInput, {
    formatter: (input, date) => {
      const value = date.toLocaleDateString();
      input.value = value;
    },
    minDate: new Date(Date.parse(new Date()) + 1000 * 3600 * 24 * 4),
    onSelect: (date) => {
      return dateVal = date.toLocaleDateString();
    }
  });

  // mask phone number
  let inputTel = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask('+3 (999) 999-99-99');
  im.mask(inputTel);

  // cargoValue
  function cargoDrawing() {
    cargo.innerHTML = 0 + (+inputWeight.value) + "kg";
    cargo.style.width = 80 + (+inputWidth.value) + "px";
    cargo.style.height = 80 + (+inputHeight.value) + "px";
  }

  function sumValue(delivery = 0) {

    if (inputWeight.value >= 150) {
      let total = (inputWeight.value * 10 + 1000) + inputWidth.value * 5 + inputHeight.value * 15 + delivery;
      inputPrice.value = `${total} грн`;
      inputPrice.value = total.toLocaleString('ru') + ' ' + 'грн';
    } else {
      let total = inputWeight.value * 10 + inputWidth.value * 5 + inputHeight.value * 15 + delivery;
      inputPrice.value = `${total} грн`;
      inputPrice.value = total.toLocaleString('ru') + ' ' + 'грн';
    }
  }

  function deliveryCost() {
    deliveryParcel.addEventListener('change', function (event) {
      let delivery = 0;
      if (event.target.checked) {
        delivery = 1000;
      } else {
        delivery = 0;
      }
      sumValue(delivery);
    });
  }

  // range-slider
  noUiSlider.create(rngWeight, {
    start: 0,
    tooltips: true,
    connect: [true, false],
    step: 1,
    range: {
      'min': 0,
      'max': 300
    },
    format: wNumb({
      decimals: 0,
    })
  });

  // marger range - input value
  function rangeWeight() {

    const inputsDimensionsWeight = [inputWeight];

    rngWeight.noUiSlider.on('update', function (values, handle) {
      inputsDimensionsWeight[handle].value = Math.round(values[handle]);
      sumValue();
      cargoDrawing();
      deliveryCost();
    });

    const setRangeSliderWeight = (i, value) => {
      let arr = [];
      arr[i] = value;
      rngWeight.noUiSlider.set(arr);
    };

    inputsDimensionsWeight.forEach((el, index) => {
      el.addEventListener('input', (e) => {
        setRangeSliderWeight(index, e.currentTarget.value);
        sumValue();
        deliveryCost();
      });
    });
  }

  rangeWeight();

  // range-slider
  noUiSlider.create(rngWidth, {
    start: 0,
    tooltips: true,
    connect: [true, false],
    step: 1,
    range: {
      'min': 0,
      'max': 15
    },
    format: wNumb({
      decimals: 0,
    })
  });

  // marger range - input value
  function rangeWidth() {

    const inputsDimensionsWidth = [inputWidth];

    rngWidth.noUiSlider.on('update', function (values, handle) {
      inputsDimensionsWidth[handle].value = Math.round(values[handle]);
      sumValue();
      cargoDrawing();
      deliveryCost();
    });

    const setRangeSliderWidth = (i, value) => {
      let arr = [];
      arr[i] = value;
      rngWidth.noUiSlider.set(arr);
    };

    inputsDimensionsWidth.forEach((el, index) => {
      el.addEventListener('input', (e) => {
        setRangeSliderWidth(index, e.currentTarget.value);
        sumValue();
        deliveryCost();
      });
    });
  }

  rangeWidth();

  // range-slider
  noUiSlider.create(rngHeight, {
    start: 0,
    tooltips: true,
    connect: [true, false],
    step: 1,
    range: {
      'min': 0,
      'max': 15
    },
    format: wNumb({
      decimals: 0,
    })
  });

  // marger range - input value
  function rangeHeight() {

    const inputsDimensionsHeight = [inputHeight];

    rngHeight.noUiSlider.on('update', function (values, handle) {
      inputsDimensionsHeight[handle].value = Math.round(values[handle]);
      sumValue();
      cargoDrawing();
      deliveryCost();
    });

    const setRangeSliderHeight = (i, value) => {
      let arr = [];
      arr[i] = value;
      rngHeight.noUiSlider.set(arr);
    };

    inputsDimensionsHeight.forEach((el, index) => {
      el.addEventListener('input', (e) => {
        setRangeSliderHeight(index, e.currentTarget.value);
        sumValue();
        deliveryCost();
      });
    });
  }

  rangeHeight();

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
    });

    function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });

    const modalTimerId = setInterval(openModal, 1000);

    valueInputByModal();
  });

  // sending data to modal
  function valueInputByModal() {
    modalCity.innerHTML = apiCity.value;
    modalWidth.innerHTML = `${inputWidth.value} m`;
    modalHeight.innerHTML = `${inputHeight.value} m`;
    modalWeight.innerHTML = `${inputWeight.value} kg`;
    modalDate.innerHTML = dateInput.value;
    modalName.innerHTML = nameFirst.value;
    modalSurname.innerHTML = nameLast.value;
    modalPhone.innerHTML = numberPhone.value;
    modalComments.innerHTML = coment.value;
    modalCost.innerHTML = inputPrice.value;

    if (loadParcel.checked) {
      modalAppartment.innerHTML = "yes";
    } else {
      modalAppartment.innerHTML = "no";
    }
  }



});
