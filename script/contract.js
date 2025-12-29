// script for moving between fields + 2 methods for adding focus to inputs
var current_fs, next_fs, previous_fs;


function setFocusToFirstInput(fieldset) {
    let visibleElements = fieldset
        .find('input, select, textarea')
        .filter(':visible');

    if (visibleElements.length) {
        let element = visibleElements.first()[0];
        

        setTimeout(() => {
            element.focus();
            

            if (element.type === 'text' || element.type === 'email' || 
                element.type === 'tel' || element.type === 'number' || 
                element.tagName === 'TEXTAREA') {
                try {
                    element.click(); 
                    const length = element.value.length;
                    element.setSelectionRange(length, length);
                } catch(e) {

                }
            }
        }, 100); 
    }
}


function setFocusToFirstError(fieldset) {
    var errorInputs = fieldset.find(".input-validation-error:visible");

    if (errorInputs.length > 0) {
        let element = errorInputs.first()[0];
        

        setTimeout(() => {
            element.focus();
            element.click();
            
            if (element.type === 'text' || element.type === 'email' || 
                element.type === 'tel' || element.type === 'number' || 
                element.tagName === 'TEXTAREA') {
                try {
                    element.setSelectionRange(0, element.value.length);
                } catch(e) {}
            }
        }, 100);
        
        return true;
    }
    return false;
}

function moveToNextInput(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        let allElements = Array.from(
            event.target.form.querySelectorAll("input, select, textarea, button")
        );

        let visibleElements = allElements.filter(
            (el) => $(el).is(":visible")
        );

        let index = visibleElements.indexOf(event.target);

        if (index > -1 && index < visibleElements.length - 1) {
            let nextElement = visibleElements[index + 1];

            if (nextElement.tagName === "BUTTON" || nextElement.type === "button") {
                nextElement.click();
            }else if(nextElement.type === "checkbox"){
                    nextElement.focus();
            } else {
                setTimeout(() => {
                    nextElement.focus();
                    nextElement.click();
                }, 50);
            }
        }
    }
}

$(document).ready(function () {
    $("input, select, button, textarea").on("keydown", moveToNextInput);


    var firstFieldset = $("fieldset").first();
    setTimeout(() => {
        setFocusToFirstInput(firstFieldset);
    }, 300);
    

    $("input, textarea").on("touchstart", function(e) {
      $(this).focus();
    });
});

$(".next").click(function () {
    current_fs = $(this).closest("fieldset");

    if (setFocusToFirstError(current_fs)) {
        return;
    }

    next_fs = $(this).closest("fieldset").next();

    if (
        $("#progressbar li").eq($("fieldset").index(next_fs))[0].id == "add-driver"
    ) {
        var checkbox = document.getElementById("addational-driver");

        if (checkbox.checked) {
            next_fs = $(this).closest("fieldset").next();
        } else {
            next_fs = $(this).closest("fieldset").next().next();
        }
    }
    
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    next_fs.show();
    current_fs.hide();


    setTimeout(() => {
        setFocusToFirstInput(next_fs);
    }, 150);
});

$(".previous").click(function () {
    current_fs = $(this).closest("fieldset");

    if (setFocusToFirstError(current_fs)) {
        return;
    }

    previous_fs = $(this).closest("fieldset").prev();

    if (
        $("#progressbar li").eq($("fieldset").index(current_fs))[0].id == "options"
    ) {
        var checkbox = document.getElementById("addational-driver");

        if (checkbox.checked) {
            previous_fs = $(this).closest("fieldset").prev();
        } else {
            previous_fs = $(this).closest("fieldset").prev().prev();
        }
    }

    $("#progressbar li")
        .eq($("fieldset").index(current_fs))
        .removeClass("active");

    previous_fs.show();
    current_fs.hide();


    setTimeout(() => {
        setFocusToFirstInput(previous_fs);
    }, 150);
});

$(document).ready(function () {
    const Rentercheck = document.getElementById("CheckRenter");
    const hidden_Renter_inputs = document.getElementsByClassName(
        "hidden-input-row-Renter"
    )[0];

    if (Rentercheck && hidden_Renter_inputs) {
        Rentercheck.addEventListener("click", function () {
            hidden_Renter_inputs.style.display = "block";

            setTimeout(() => {
                setFocusToFirstInput($(hidden_Renter_inputs));
            }, 350);
        });
    }
});
$(document).ready(function () {
      const Drivercheck = document.getElementById("CheckDriver");
    const hidden_Driver_inputs = document.getElementsByClassName(
        "hidden-input-row-Driver"
    )[0];

    if (Drivercheck && hidden_Driver_inputs) {
        Drivercheck.addEventListener("click", function () {
            hidden_Driver_inputs.style.display = "block";

            setTimeout(() => {
                setFocusToFirstInput($(hidden_Driver_inputs));
            }, 350);
        });
    }
})
$(document).ready(function () {
    const AddDrivercheck = document.getElementById("CheckAddDriver");
    const hidden_AddDriver_inputs = document.getElementsByClassName(
        "hidden-input-row-AddDriver"
    )[0];

    if (AddDrivercheck && hidden_AddDriver_inputs) {
        AddDrivercheck.addEventListener("click", function () {
            hidden_AddDriver_inputs.style.display = "block";

            setTimeout(() => {
                setFocusToFirstInput($(hidden_AddDriver_inputs));
            }, 350);
        });
    }
})
//////////////////////////// tenant details ///////////////////////////////////////////////////////
const image = document.getElementById("tenant-details");
const dropdown = document.getElementById("dropdown-content");

image.addEventListener("click", function (event) {
  event.stopPropagation();
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
});

document.addEventListener("click", function (event) {
  if (!image.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = "none";
  }
});

dropdown.addEventListener("click", function (event) {
  event.stopPropagation();
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

image2.addEventListener("click", function (event) {
  event.stopPropagation();
  if (dropdown2.style.display === "none" || dropdown2.style.display === "") {
    dropdown2.style.display = "block";
  } else {
    dropdown2.style.display = "none";
  }
});

document.addEventListener("click", function (event) {
  if (!image2.contains(event.target) && !dropdown2.contains(event.target)) {
    dropdown2.style.display = "none";
  }
});

dropdown2.addEventListener("click", function (event) {
  event.stopPropagation();
});

//////////////////////////// aad driver details ///////////////////////////////////////////////////////
const image3 = document.getElementById("add-driver-details");
const dropdown3 = document.getElementById("add-Driver-dropdown");

image3.addEventListener("click", function (event) {
  event.stopPropagation();
  if (dropdown3.style.display === "none" || dropdown3.style.display === "") {
    dropdown3.style.display = "block";
  } else {
    dropdown3.style.display = "none";
  }
});

document.addEventListener("click", function (event) {
  if (!image3.contains(event.target) && !dropdown3.contains(event.target)) {
    dropdown3.style.display = "none";
  }
});

dropdown3.addEventListener("click", function (event) {
  event.stopPropagation();
});
/////////////////////////////////////////////////////////////////////////search-icon-payment///////////////////////////////////////////////////////////////////
const imagePay = document.getElementById("payment-extra-details");
const dropdownPay = document.getElementById("dropdown-content-payment");

imagePay.addEventListener("click", function (event) {
  event.stopPropagation();
  if (
    dropdownPay.style.display === "none" ||
    dropdownPay.style.display === ""
  ) {
    dropdownPay.style.display = "block";
  } else {
    dropdownPay.style.display = "none";
  }
});

document.addEventListener("click", function (event) {
  if (!imagePay.contains(event.target) && !dropdownPay.contains(event.target)) {
    dropdownPay.style.display = "none";
  }
});

dropdownPay.addEventListener("click", function (event) {
  event.stopPropagation();
});


// Loader Area 
const submitBtn = document.getElementById("SubmitFormBtn");
const LoaderArea = document.getElementById("LoaderArea");

submitBtn.addEventListener("click", function () {
    LoaderArea.style.display = "flex";
    

    $(document).on('keydown.loader keypress.loader', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    

    $('input, select, textarea, button').prop('disabled', true);
    
    $('body').css('pointer-events', 'none');
    LoaderArea.style.pointerEvents = 'all'; 
});
