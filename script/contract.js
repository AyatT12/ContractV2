// script for moving between fields + 2 methods for adding foucs to inputs 
var current_fs, next_fs, previous_fs;

function setFocusToFirstInput(fieldset) {
    var firstFocusable = fieldset.find('input, select , textarea').first();
    if (firstFocusable.length) {
        firstFocusable.focus();
    }
}

function moveToNextInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        let formElements = Array.from(event.target.form.querySelectorAll('input, select, button , textarea'));
        let index = formElements.indexOf(event.target);
        
        if (index > -1 && index < formElements.length - 1) {
            let nextElement = formElements[index + 1];
            if (nextElement.tagName === 'BUTTON' || nextElement.type === 'button') {
                nextElement.click();
            } else {
                nextElement.focus();
            }
        }
    }
}

$(document).ready(function () {
    $('input, select, button , textarea').on('keydown', moveToNextInput);

    var firstFieldset = $('fieldset').first();
    setFocusToFirstInput(firstFieldset);
});

$(".next").click(function () {
    current_fs = $(this).closest("fieldset");
    next_fs = $(this).closest("fieldset").next();

    if ($("#progressbar li").eq($("fieldset").index(next_fs))[0].id == "add-driver") {
        var checkbox = document.getElementById("addational-driver");

        if (checkbox.checked) {
            next_fs = $(this).closest("fieldset").next();
        } else {
            next_fs = $(this).closest("fieldset").next().next();
        }
    }
    if ($("#progressbar li").eq($("fieldset").index(next_fs))[0].id == "car") {
      var dropdownContent;
      var currentExtraDetails;
      var allExtraDetails = $('.extra-details');

      $('.table-hover').on('click', '.extra-details', function() {
        $('.car-dropdown-content').hide();

        dropdownContent = $(this).find('.car-dropdown-content');
        currentExtraDetails = $(this);
        allExtraDetails.not(currentExtraDetails).css("box-shadow", "0px 2px 4px 0px #39629C3D");
        dropdownContent.css("display", "block");
        currentExtraDetails.css("box-shadow", "none");
      });

      $(document).on('click', function(event) {
        if (dropdownContent && dropdownContent.css('display') === 'block') {
          if (!$(event.target).closest('.car-dropdown-content').length && !$(event.target).closest('.extra-details').length) {
            dropdownContent.css("display", "none");
            currentExtraDetails.css("box-shadow", "0px 2px 4px 0px #39629C3D");
            currentExtraDetails = null;
          }
        }
      });
    }
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    next_fs.show();
    current_fs.hide();

    setFocusToFirstInput(next_fs);
});

$(".previous").click(function () {
    current_fs = $(this).closest("fieldset");
    previous_fs = $(this).closest("fieldset").prev();

    if ($("#progressbar li").eq($("fieldset").index(current_fs))[0].id == "options") {
        var checkbox = document.getElementById("addational-driver");

        if (checkbox.checked) {
            previous_fs = $(this).closest("fieldset").prev();
        } else {
            previous_fs = $(this).closest("fieldset").prev().prev();
        }
    }

    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    previous_fs.show();
    current_fs.hide();

    setFocusToFirstInput(previous_fs);
});
///////////////////////////////////////////////the-Modal-6-digit-vaildation/////////////////////
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#otc").addEventListener("submit", function (event) {
    event.preventDefault();
    var inputFieldValue = document.getElementById("otc-1");
    var numericValue = parseInt(inputFieldValue.value);

    if (isNaN(numericValue)) {
      console.log("Input value:", numericValue);
      return;
    }
    $.ajax({
      type: "POST",
      url: "https://jsonplaceholder.typicode.com/posts", 
      data: $(this).serialize(),
      success: function (response) {
        console.log("Form data submitted successfully:", response);
      },
      error: function (error) {
        console.error("Error submitting form data:", error);
      },
    });
    document.getElementById("otc-1").value = "";
    document.getElementById("otc-2").value = "";
    document.getElementById("otc-3").value = "";
    document.getElementById("otc-4").value = "";
    document.getElementById("otc-5").value = "";
    document.getElementById("otc-6").value = "";
  });
});

let in1 = document.getElementById("otc-1"),
  ins = document.querySelectorAll('input[type="number"]'),
  splitNumber = function (e) {
    let data = e.data || e.target.value; 
    if (!data) return; 
    if (data.length === 1) return; 

    popuNext(e.target, data);
  },
  popuNext = function (el, data) {
    el.value = data[0]; 
    data = data.substring(1); 
    if (el.nextElementSibling && data.length) {
      popuNext(el.nextElementSibling, data);
    }
  };

ins.forEach(function (input) {
 
  input.addEventListener("keyup", function (e) {
    if (
      e.keyCode === 16 ||
      e.keyCode == 9 ||
      e.keyCode == 224 ||
      e.keyCode == 18 ||
      e.keyCode == 17
    ) {
      return;
    }

    if (
      (e.keyCode === 8 || e.keyCode === 37) &&
      this.previousElementSibling &&
      this.previousElementSibling.tagName === "INPUT"
    ) {
      this.previousElementSibling.select();
    } else if (e.keyCode !== 8 && this.nextElementSibling) {
      this.nextElementSibling.select();
    }

    if (e.target.value.length > 1) {
      splitNumber(e);
    }
  });

  input.addEventListener("focus", function (e) {
    if (this === in1) return;

    if (in1.value == "") {
      in1.focus();
    }
    if (this.previousElementSibling.value == "") {
      this.previousElementSibling.focus();
    }
  });
  const B = document.querySelector(".check-btn.check");
});
in1.addEventListener("input", splitNumber);
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
        if (inputField.value.length === 3) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      });

      submitButton.addEventListener('click', function() {
        console.log(inputField.value);
        const selectedRadio = document.querySelector('input[name="SMS-or-WhatsApp"]:checked');
        if (selectedRadio) {
          console.log(selectedRadio.value);
        } else {
          console.log('No radio option selected');
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

//////////////////////////// tenant details ///////////////////////////////////////////////////////
const image = document.getElementById("tenant-details");
const dropdown = document.getElementById("dropdown-content");
dropdown.style.display == "block"
image.addEventListener("click", function(event) {
if ( dropdown.style.display == "none"){
  dropdown.style.display = "block";
}else{
  dropdown.style.display = "none";

}
});
// // //////////////////////choose-adriver-display////////////////
document.addEventListener("DOMContentLoaded", function () {
  var driverRadio1 = document.getElementById("driver1");
  var driverRadio2 = document.getElementById("driver2");
  var dropdownContainer = document.getElementById("Private-Driver-select");

  driverRadio1.addEventListener("click", function () {
    dropdownContainer.style.display = "none";
  });

  driverRadio2.addEventListener("click", function () {
    if (this.checked) {
      dropdownContainer.style.display = "block";
    } else {
      dropdownContainer.style.display = "none";
    }
  });
});

//////////////////////////// driver details ///////////////////////////////////////////////////////
const image2 = document.getElementById("driver-details");
const dropdown2 = document.getElementById("driver-details-dropdown");

image2.addEventListener("click", function(event) {
  if ( dropdown2.style.display == "block"){
    dropdown2.style.display = "none";
  }else{
    dropdown2.style.display = "block";
  
  }
});


//////////////////////////// aad driver details ///////////////////////////////////////////////////////
const image3 = document.getElementById("add-driver-details");
const dropdown3 = document.getElementById("add-Driver-dropdown");

image3.addEventListener("click", function(event) {
  if ( dropdown3.style.display == "none"){
    dropdown3.style.display = "block";
  }else{
    dropdown3.style.display = "none";
  
  }
});
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


// // /////////// script for scrolling through car category buttons  //////////////////////////////
let isScrolling = false;
let startX, startY, scrollLeft, scrollTop;

const scrollContainer = document.getElementById("scrollContainer");

// Mouse events
scrollContainer.addEventListener("mousedown", (e) => {
  isScrolling = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  startY = e.pageY - scrollContainer.offsetTop;
  scrollLeft = scrollContainer.scrollLeft;
  scrollTop = scrollContainer.scrollTop;
});

scrollContainer.addEventListener("mouseleave", () => {
  isScrolling = false;
});

scrollContainer.addEventListener("mouseup", () => {
  isScrolling = false;
});

scrollContainer.addEventListener("mousemove", (e) => {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const y = e.pageY - scrollContainer.offsetTop;
  const walkX = (x - startX) * 2;
  const walkY = (y - startY) * 2;
  scrollContainer.scrollLeft = scrollLeft - walkX;
  scrollContainer.scrollTop = scrollTop - walkY;
});
// touch events

scrollContainer.addEventListener("touchstart", (e) => {
  isScrolling = true;
  startX = e.touches[0].pageX - scrollContainer.offsetLeft;
  startY = e.touches[0].pageY - scrollContainer.offsetTop;
  scrollLeft = scrollContainer.scrollLeft;
  scrollTop = scrollContainer.scrollTop;
});

scrollContainer.addEventListener("touchmove", (e) => {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.touches[0].pageX - scrollContainer.offsetLeft;
  const y = e.touches[0].pageY - scrollContainer.offsetTop;
  const walkX = (x - startX) * 2;
  const walkY = (y - startY) * 2;
  scrollContainer.scrollLeft = scrollLeft - walkX;
  scrollContainer.scrollTop = scrollTop - walkY;
});

scrollContainer.addEventListener("touchend", () => {
  isScrolling = false;
});
