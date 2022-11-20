var inputTexBox = $("#input-content");
var progressPercent = $(".progress-percent strong");
var progress_bar = $("#progress_bar");
var check_progress = $(".check-progress");
var pCount = 0;
var upload_file_selector = document.getElementById("upload_file");
var file_input_selector = document.getElementById("file_input");

var totalWords = 0;
var charLen = 0;
var keep1k = false;
var textLength = 1000;
var isprem = false;
if (IS_PREMIUM == 1) {
  textLength = 5000;
  isprem = true;
}
$(document).ready(function () {
  $(".alert-box-ok").on("click", function () {
    console.log("here", keep1k);
    if (keep1k) {
      sendRequest();
    }
  });

  upload_file_selector.addEventListener("click", (event) => {
    event.preventDefault();
    file_input_selector.click();
  });

  file_input_selector.addEventListener("change", (event) => {
    event.preventDefault();
    console.log("here");
    if (file_input_selector.value != "") {
      var formData = new FormData();
      var ddata = document.getElementById("file_input").files[0];
      var ajax_url = BASE_URL + "frontend/plagFileContent";
      formData.append("file", ddata);
      var ajax_data = formData;
      execute_ajax_file(ajax_url, ajax_data);
    }
  });
  inputTexBox.on("keyup", function () {
    countWords();
  });
  countWords();
  setTimeout(() => {
    btn_status("#plagiarism_now", 0);
  }, 2500);
});

// FUNCTIONS
function sendRequest() {
  var innerText = $("#input-content").val() || "";
  var captcharesponse = "";
//   var captcharesponse = grecaptcha.getResponse();

  if (!innerText) {
    alert_box("Input Text Required ", "Validation Error");
  } else if (innerText.length < 20) {
    alert_box("Atleast require minimum 20 characters", "Validation Error");
//   } else if (!captcharesponse) {
//     alert_box("", "Captcha required");
//     $(".alert-box-body").css("height", "170px");
  } else {
    resetResult();
    runLoader();
    btn_status("#plagiarism_now", 1);
    var xhttp = new XMLHttpRequest();

    xhttp.responseType = "json";
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = this.response;
        btn_status("#plagiarism_now", 0);
        if (res.captchaError) {
          alert_box("Wrong Captcha");
          stopLoader(true);
          $("#result").hide();
        } else if (res.error) {
          alert_box(res.msg || "Required input text");
          stopLoader(true);
          $("#result").hide();
        } else {
          $(".plag-percent").html(res.plag + "%");
          $(".uniq-percent").html(res.uniq + "%");
          $("#details").html(res.details);

          if (res.sources) {
            $("#sources").html(res.sources);
            $(".table-wrapper").show();
          }
          $(".result-section").show();
          stopLoader();
          setTimeout(() => {
            $(".rm-plag-btn").on("click", function () {
              var txt = inputTexBox.val() || "";
              if (txt) {
                $("#_text_to_exported").val(txt);
                $("#remove-plag").click();
              }
            });
          }, 300);
        }
        grecaptcha.reset();
      }
    };

    xhttp.open("POST", BASE_URL + "frontend/checkPlag", true);
    var text = document.getElementById("input-content").value;

    console.log("1k", keep1k);
    if (keep1k) {
      try {
        text = text
          .replace(/\s+/gi, " ")
          .split(" ")
          .slice(0, textLength)
          .join(" ");
        document.getElementById("input-content").value = text;
        countWords();
      } catch (error) {
        console.log(error);
        text = text;
      }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
      "text=" + encodeURIComponent(text) + "&captcha=" + captcharesponse
    );
  }
}

function execute_ajax_file(ajax_url, ajax_data) {
  $.ajax({
    type: "POST",
    url: ajax_url,
    data: ajax_data,
    processData: false,
    contentType: false,
    async: true,
    success: function (result) {
      console.log(typeof result);
      $("#input-content").val(result);
      countWords();
    },
  });
}

function countWords() {
  var val = $.trim(inputTexBox.val()) || "";
  if (val.length) {
    var words = val.replace(/\s+/gi, " ").split(" ");
    totalWords = words.length;
    charLen = words.join("").length;
  }
  keep1k = totalWords > textLength ? true : false;
  $(".wordsLen").html(totalWords);
}
function runLoader() {
  $("#result").show();
  document.getElementById("per-result").style.opacity = 0.3;

  $("html, body").animate({ scrollTop: $("#result").offset().top - 100 }, 1000);

  check_progress.addClass("animate-bar");

  if (pCount == 0) {
    pCount = 1;
    var width = 0;
    var id = setInterval(frame, 150);
    function frame() {
      if (width >= 100) {
        document.getElementById("progress-text").innerHTML = "Done";
        clearInterval(id);
        pCount = 0;
      } else {
        width++;
        progressPercent.text(width + "%");
        progress_bar.attr("value", width);
      }
    }
  }
}
function stopLoader(stop) {
  check_progress.removeClass("animate-bar");
  clearInterval();
  if (stop) {
    progressPercent.text("0%");
    progress_bar.attr("value", 0);
    document.getElementById("per-result").style.opacity = 1;
  } else {
    progressPercent.text("100%");
    progress_bar.attr("value", 100);
    setTimeout(() => {
      document.getElementById("per-result").style.opacity = 1;
    }, 500);
  }
}

function resetResult() {
  $("#result, .result-section, .table-wrapper").hide();
  document.getElementById("per-result").style.opacity = 1;
  check_progress.removeClass("animate-bar");
  $(".plag-percent,.uniq-percent").html("--%");
  $("#details").html("");
}
function btn_status(id, status, msg = "") {
  if (status) {
    $(id).text(msg ? msg : "Loading ...");
    $(id).prop("disabled", true);
  } else {
    $(id)
      .text(msg ? msg : REWRITE_BTN)
      .removeAttr("disabled");
  }
}
function submitForm() {
  if (charLen < 20) {
    alert_box("Text too short! <br> required 20 or more then characters");
  } else if (totalWords > textLength) {
    if (isprem) {
      alert_box(
        "Text too Long! <br> click OK to proceed with " + textLength + " words."
      );
    } else {
      alert_box(
        "Text too Long! <br> click OK to proceed with " +
          textLength +
          " words <br> Or <a href='" +
          BASE_URL +
          "'pricing-plans'>Go to Premium</a> ."
      );
      $(".alert-box-body").css("height", "198px");
    }
    //  alert_box("Text too Long! <br> click OK to proceed with "+textLength+" words.");
    var keep1k = true;
  } else {
    sendRequest();
  }
}