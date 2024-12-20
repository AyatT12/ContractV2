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
        uploadBtnBox1.style.display = 'none';
      } else {
        uploadBtnBox.disabled = false;
        errorMessageDiv.style.display = 'none';
        uploadBtnBox1.style.display = 'block';
      }

      for (var i = 0; i < Math.min(filesArr.length, maxLength - imgArray.length); i++) {
        (function (f) {
          console.log("Selected file type:", f.type);

          if (f.type === 'image/heic' || f.type === 'image/heif' || f.name.endsWith('.heic') || f.name.endsWith('.heif')) {
            console.log("Processing HEIC/HEIF file:", f.name); 

            heic2any({
              blob: f,
              toType: "image/jpeg"
            }).then(function (convertedBlob) {
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
              reader.readAsDataURL(convertedBlob); 
            }).catch(function (err) {
              console.error("Error converting HEIC/HEIF image:", err);
            });
          } else {
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
          }
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
      uploadBtnBox1.style.display = 'none';
    } else {
      uploadBtnBox.disabled = false;
      errorMessageDiv.style.display = 'none';
      uploadBtnBox1.style.display = 'block';
    }
  });

  $('body').on('click', '.img-bg', function (e) {
    var imageUrl = $(this).css('background-image');
    imageUrl = imageUrl.replace(/url\(["']?/, '').replace(/["']?\)/, '');
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
    const base64 = canvas.toDataURL("image/png");
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


// // //////////////////////////////////////////////// رفع صورة الهوية ////////////////////////////////////////////////////////////////////////

//variables//
let saveIDBtn = null;

document
  .getElementById("UploadIDPic")
  .addEventListener("click", function () {
    saveIDBtn = "UploadIDPic";
    console.log(saveIDBtn)
  });
 
const IDuploadContainer = document.querySelector(".ID-upload-container");
const IDmainContainer = document.querySelector(".ID-main-container");
const UploadIDPic = document.getElementById("UploadIDPic");
const IDimageUpload = document.getElementById("IDimageUpload");
var imgeURL;
const IDuploadedImg = null;
//

UploadIDPic.addEventListener("click", function () {
  IDimageUpload.click();
});

IDimageUpload.addEventListener("change", function () {
  const file = IDimageUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const IDimageURL = e.target.result;
      const IDpreviewImage = document.createElement("img");
      IDpreviewImage.classList.add("preview-image");
      IDpreviewImage.src = IDimageURL;
      IDpreviewImage.id = "IDImage";
      imgeURL = IDimageURL;
      IDmainContainer.innerHTML =
        '<i class="fa-regular fa-circle-xmark"  style="cursor: pointer;"></i>';
      IDuploadContainer.innerHTML = "";
      IDuploadContainer.appendChild(IDpreviewImage);
      IDuploadContainer.classList.add("previewing");
    };
    reader.readAsDataURL(file);
  }
});

removeIDImg.addEventListener("click", function (event) {
  event.preventDefault();
  if (IDuploadContainer.firstChild) {
    IDuploadContainer.innerHTML = "";
    IDmainContainer.innerHTML = "";
    IDuploadContainer.classList.remove("previewing");
    IDuploadContainer.innerHTML =
      ' <img class="upload-icon" src="img/Rectangle 144.png" alt="Upload Icon"><p>ارفق صورة الهوية </p>';
  }
});

// // //////////////////////////////////////////////// التقاط صورة الهوية ////////////////////////////////////////////////////////////////////////
const openCameraButton = document.getElementById('openCamera');
document
.getElementById("openCamera")
.addEventListener("click", function () {
  saveIDBtn = "CameraID";
  console.log(saveIDBtn)
});

openCameraButton.addEventListener('click', async () => {
    let videoElement = document.getElementById('videoElement');
    let photo = document.getElementById('photo');

    if (!videoElement) {
        IDuploadContainer.innerHTML = `
            <video id="videoElement" autoplay></video>
            <img id="photo" alt="The screen capture will appear in this box." style="display:none;">
        `;
        videoElement = document.getElementById('videoElement');
        photo = document.getElementById('photo');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;

            await new Promise(resolve => {
                videoElement.onloadedmetadata = () => {
                    resolve();
                };
            });

        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    } else {
        const canvasElement = document.createElement('canvas');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        const context = canvasElement.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());

        const dataUrl = canvasElement.toDataURL('image/png');
        photo.src = dataUrl;
        photo.style.display = 'block';
        videoElement.remove();
    }
});

// Save the uploded IDphoto image
function SaveUplodedIDphoto() {
  const img = document.getElementById("IDImage");
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext("2d");
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  const base64 = canvas.toDataURL("image/jpeg");
  console.log(base64);
  $("#IDphoto-modal").modal("hide");

}
// Save the camera IDphoto image
function SaveCameraIDphoto() {
  const img = document.getElementById("photo");
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext("2d");
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  const base64 = canvas.toDataURL("image/jpeg");
  console.log(base64);
  $("#IDphoto-modal").modal("hide");

}
document.getElementById("ID-photo-save").addEventListener("click", function () {
  if (saveIDBtn === "UploadIDPic") {
    SaveUplodedIDphoto();
  } else if (saveIDBtn === "CameraID"){
    SaveCameraIDphoto();
  }
});
