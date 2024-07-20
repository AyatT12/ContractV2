jQuery(document).ready(function () {
  ImgUpload();
});

function HideFirstImg() {
  var firstImg = document.getElementById('upload-img1');
  firstImg.style.display = 'none';
}
var imgArray = [];

function ImgUpload() {
  var imgWrap = '';

  $('.upload__inputfile').each(function () {
    $(this).on('change', function (e) {
      imgWrap = $(this).closest('.upload__box').find('.upload_img-wrap_inner');
      var maxLength = 12;
      var files = e.target.files;
      var filesArr = Array.prototype.slice.call(files);
      var uploadBtnBox = document.getElementById('checking-img');
      var uploadBtnBox1 = document.getElementById('upload__btn-box');

      var errorMessageDiv = document.getElementById('error-message');

      if (imgArray.length + filesArr.length > maxLength) {
        uploadBtnBox.disabled = true;
        errorMessageDiv.textContent = 'بحد أدنى صورة واحدة (۱) وحدأقصى اثني عشرة صورة (۱۲) ';
        errorMessageDiv.style.display = 'block';
        uploadBtnBox1.style.display='none';
      } else {
        uploadBtnBox.disabled = false;
        errorMessageDiv.style.display = 'none';
        uploadBtnBox1.style.display='block';

      }

      for (var i = 0; i < Math.min(filesArr.length, maxLength - imgArray.length); i++) {
        (function(f) {
          if (!f.type.match('image.*')) {
            return;
          }

          var reader = new FileReader();
          reader.onload = function (e) {
            var html =
              "<div class='upload__img-box'><div style='background-image: url(" +
              e.target.result +
              ")' data-number='" +
              $('.upload__img-close').length +
              "' data-file='" +
              f.name +
              "' class='img-bg'><div class='upload__img-close'><img src='img/delete.png'></div></div></div>";
            imgWrap.append(html);
            imgArray.push({
              f: f,
              url: e.target.result
            });
            console.log(imgArray);
          };
          reader.readAsDataURL(f);
        })(filesArr[i]);
      }
    });
  });

  $('body').on('click', '.upload__img-close', function (e) {
    e.stopPropagation(); 
    var file = $(this).parent().data('file');

    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].f.name === file) {
        imgArray.splice(i, 1);
        break;
      }
    }

    $(this).parent().parent().remove();
    console.log(imgArray);

    var maxLength = 12;
    var uploadBtnBox = document.getElementById('checking-img');
    var errorMessageDiv = document.getElementById('error-message');
    var uploadBtnBox1 = document.getElementById('upload__btn-box');

    if (imgArray.length >= maxLength) {
      uploadBtnBox.disabled = true;
      errorMessageDiv.textContent = 'بحد أدنى صورة واحدة (۱) وحدأقصى اثني عشرة صورة (۱۲) ';
      errorMessageDiv.style.display = 'block';
      uploadBtnBox1.style.display='none';

    } else {
      uploadBtnBox.disabled = false;
      errorMessageDiv.style.display = 'none';
      uploadBtnBox1.style.display='block';

    }
  });

  $('body').on('click', '.img-bg', function (e) {
    
    var imageUrl = $(this).css('background-image');
    $('#preview-image').attr('src', imageUrl);
    $('#image-preview').modal('show');
  });
}
/////////////////////////////////////////////////////////////////////////search-icon-payment///////////////////////////////////////////////////////////////////
const imagePay = document.getElementById('payment-extra-details');
const dropdownPay = document.getElementById('dropdown-content-payment');

imagePay.addEventListener('click', function () {
    if (dropdownPay.style.display === 'block') {
        dropdownPay.style.display = 'none';
    } else {
        dropdownPay.style.display = 'block';
    }
});
//  //////////////////// check modal phone number input confirmation  /////////////////////////////////

const checkButtons = document.querySelectorAll('.Driver-checkModal-open-button');

checkButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const inputField = document.getElementById('CheckModal-PhoneInput');
    if (inputField) {
      setTimeout(function() {
        inputField.focus();
      }, 1000);

      const submitButton = document.getElementById('DriverCheckButton');

      inputField.addEventListener('input', function() {
        if (inputField.value.length === 11) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      });
    }
  });
});



// ///////////////timer function in the otc modal /////////////////////
var interval; 
var lastClickedButtonId; 

function TimerFunction(buttonId){
  const SendButton = document.getElementById('DriverCheckButton');
  const otcInputs = document.querySelectorAll('.OTP');

  const originalContent = SendButton.innerHTML;

  const spinner = document.createElement('div');
  spinner.classList.add('spinner-border', 'spinner-border-sm', 'text-warning');
  spinner.role = 'status';

  const checkIcon = document.createElement('i');
  checkIcon.classList.add('fa-solid', 'fa-check');

  SendButton.innerHTML = '';
  SendButton.appendChild(spinner);
  SendButton.classList.add('send-check');

  setTimeout(() => {
      SendButton.innerHTML = originalContent;
      SendButton.classList.remove('send-check');
      SendButton.disabled = true;
      otcInputs[0].focus();

  }, 2000);

  if (buttonId !== lastClickedButtonId || !interval) {
    if (interval) {
      clearInterval(interval); 
    }
    lastClickedButtonId = buttonId; 
    var display = document.querySelector('#timerDiv');
    var timer = 300 , minutes, seconds;
    interval =  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = 0;
        clearInterval(interval); 
        $('#checkModalToggle').modal('hide');
      }
    }, 1000);
  }

}
// /////////////otc confirm /////////////////

const otcInputs = document.querySelectorAll('.OTP');
const confirmButton = document.querySelector('#confirmButton');
const ResendButton = document.querySelector('#ResendButton');

otcInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (Array.from(otcInputs).every(input => input.value.trim() !== '')) {
      confirmButton.disabled = false;
    } else {
      confirmButton.disabled = true;
    }
  });
});

confirmButton.addEventListener('click', function() {

  const originalContent = confirmButton.innerHTML;
  const spinner = document.createElement('div');
  spinner.classList.add('spinner-border', 'spinner-border-sm', 'text-warning');
  spinner.role = 'status';
  
  const checkIcon = document.createElement('i');
  checkIcon.classList.add('fa-solid', 'fa-check');
  
  confirmButton.innerHTML = '';
  confirmButton.appendChild(spinner);
  confirmButton.classList.add('send-check');
  
  setTimeout(() => {
      confirmButton.innerHTML = '';
      confirmButton.innerHTML = originalContent;
      confirmButton.classList.remove('send-check');
      confirmButton.disabled = true;
      ResendButton.disabled = false;
  
    }, 2000);
  
})

// 
ResendButton.addEventListener('click', function() {
  const SendButton = document.getElementById('DriverCheckButton');
  const otcInputs = document.querySelectorAll('.OTP');
  SendButton.disabled = false;
	document.getElementById('otc-1').value = '';
		document.getElementById('otc-2').value = '';
		document.getElementById('otc-3').value = '';
		document.getElementById('otc-4').value = '';
		document.getElementById('otc-5').value = '';
		document.getElementById('otc-6').value = '';
    otcInputs[0].focus();

})
