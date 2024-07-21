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


// // //////////////////////////////////////////////// رفع صورة التوقيع ////////////////////////////////////////////////////////////////////////

//variables//
let saveSignatureBtn = null;

document
  .getElementById("UploadSigntaurePic")
  .addEventListener("click", function () {
    saveSignatureBtn = "UploadSigntaurePic";
  });

document
  .getElementById("WriteSignature")
  .addEventListener("click", function () {
    saveSignatureBtn = "WriteSignature";
  });
const uploadContainer = document.querySelector(".upload-container");
const mainContainer = document.querySelector(".main-container");
const UploadSigntaurePic = document.getElementById("UploadSigntaurePic");
const imageUpload = document.getElementById("imageUpload");
var imgeURL;
const uploadedImg = null;
//

UploadSigntaurePic.addEventListener("click", function () {
  imageUpload.click();
});

imageUpload.addEventListener("change", function () {
  const file = imageUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageURL = e.target.result;
      const previewImage = document.createElement("img");
      previewImage.classList.add("preview-image");
      previewImage.src = imageURL;
      previewImage.id = "signatureImage";
      imgeURL = imageURL;
      mainContainer.innerHTML =
        '<i class="fa-regular fa-circle-xmark"  style="cursor: pointer;"></i>';
      uploadContainer.innerHTML = "";
      uploadContainer.appendChild(previewImage);
      uploadContainer.classList.add("previewing");
    };
    reader.readAsDataURL(file);
  }
});

removeSignatureImg.addEventListener("click", function (event) {
  event.preventDefault();
  if (uploadContainer.firstChild) {
    uploadContainer.innerHTML = "";
    mainContainer.innerHTML = "";
    uploadContainer.classList.remove("previewing");
    uploadContainer.innerHTML =
      ' <img class="upload-icon" src="img/Rectangle 144.png" alt="Upload Icon"><p>ارفق صورة التوقيع</p>';
  }
});
// // //////////////////////////////////////////////// كتابة التوقيع ////////////////////////////////////////////////////////////////////////
const WriteSignature = document.getElementById("WriteSignature");
WriteSignature.addEventListener("click", function () {
  document.body.classList.add('no-scroll');
  uploadContainer.innerHTML = "";
  mainContainer.innerHTML = "";
  uploadContainer.innerHTML =
    '<canvas id="canvas" width="200" height="200" class="mb-2"></canvas>';
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 4;

  var drawing = false;
  var prevX = 0;
  var prevY = 0;
  var currX = 0;
  var currY = 0;

  function drawLine(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
  }

  canvas.addEventListener("mousedown", handleMouseDown, false);
  canvas.addEventListener("mousemove", handleMouseMove, false);
  canvas.addEventListener("mouseup", handleMouseUp, false);

  canvas.addEventListener("touchstart", handleTouchStart, false);
  canvas.addEventListener("touchmove", handleTouchMove, false);
  canvas.addEventListener("touchend", handleTouchEnd, false);

  function handleMouseDown(e) {
    drawing = true;
    prevX = e.clientX - canvas.getBoundingClientRect().left;
    prevY = e.clientY - canvas.getBoundingClientRect().top;
  }

  function handleMouseMove(e) {
    if (!drawing) return;
    currX = e.clientX - canvas.getBoundingClientRect().left;
    currY = e.clientY - canvas.getBoundingClientRect().top;

    drawLine(prevX, prevY, currX, currY);
    prevX = currX;
    prevY = currY;
  }

  function handleMouseUp() {
    drawing = false;
  }

  function handleTouchStart(e) {
    drawing = true;
    prevX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    prevY = e.touches[0].clientY - canvas.getBoundingClientRect().top;
  }

  function handleTouchMove(e) {
    if (!drawing) return;
    currX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    currY = e.touches[0].clientY - canvas.getBoundingClientRect().top;

    drawLine(prevX, prevY, currX, currY);
    prevX = currX;
    prevY = currY;
  }

  function handleTouchEnd() {
    drawing = false;
  }
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  document.getElementById("clear").addEventListener("click", function () {
    clearCanvas();
  });
 
});
 function SaveWrittenSignature() {
  document.body.classList.remove('no-scroll');
	var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL();
    var link = document.createElement("a");
    link.href = dataURL;
    console.log(link.href);
    $("#signature-modal").modal("hide");

  }
 // Save the uploded signature image
 function SaveUplodedSignature() {
    const img = document.getElementById("signatureImage");
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL("image/jpeg");
    console.log(base64);
    $("#signature-modal").modal("hide");

  }
  document.getElementById("save").addEventListener("click", function () {
    if (saveSignatureBtn === "UploadSigntaurePic") {
      SaveUplodedSignature();
    } else if (saveSignatureBtn === "WriteSignature") {
      SaveWrittenSignature();
    } else {
      console.log("No button has been clicked yet");
    }
  });

//  عدد ايام التفويض/////////////////
document.querySelector('#AuthorizationForm').addEventListener('submit', function (event) {
  event.preventDefault();

		$.ajax({
			type: 'POST',
			url: 'https://jsonplaceholder.typicode.com/posts', 
			data: $(this).serialize(),
			success: function (response) {
				console.log('Form data submitted successfully:', response);

			},
			error: function (error) {
				console.error('Error submitting form data:', error);
			}
		});
})
