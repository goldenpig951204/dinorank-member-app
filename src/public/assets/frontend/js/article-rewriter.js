var mode = $("#mode").val();
var la = "English";
var done = 0;
var base_url = BASE_URL;
var upload_file_selector = document.getElementById("upload_file");
var file_input_selector = document.getElementById("file_input");
$(document).ready(function () {
  upload_file_selector.addEventListener("click", (event) => {
    event.preventDefault();
    file_input_selector.click();
  });
  file_input_selector.addEventListener("change", (event) => {
    event.preventDefault();
    if (file_input_selector.value != "") {
      var formData = new FormData();
      var ddata = document.getElementById("file_input").files[0];
      var ajax_url = BASE_URL + "frontend/plagFileContent";
      formData.append("file", ddata);
      var ajax_data = formData;
      execute_ajax_file(ajax_url, ajax_data);
    }
  });
  $(document).on("click", ".paraphrasing_levels", function (event) {
    event.preventDefault();
    $(
      ".paraphrasing_levels,.upper_paraphrasing_button_circle,.inner_paraphrasing_button_circle,.inner_title"
    ).removeClass("active");
    $(this).addClass("active");
    var id = $(this).attr("data-id");
    $("#mode").val(id);
    if (id == 3) {
      if (IS_PREMIUM == 1) {
        $("#upper_paraphrasing_button_circle_" + id).addClass("active");
        $("#inner_paraphrasing_button_circle_" + id).addClass("active");
        $("#inner_title" + id).addClass("active");
      } else {
        alert_box(
          "Buy Premium to use Creative mode",
          "Alert",
          false,
          "#3dd9b1 url(" +
            BASE_URL +
            "images/alert-box-header.png) no-repeat center",
          "<a href=" + BASE_URL + "'pricing-plans'>Buy Premium</a>"
        );
        $("#upper_paraphrasing_button_circle_1").addClass("active");
        $("#inner_paraphrasing_button_circle_1").addClass("active");
        $("#inner_title1").addClass("active");
      }
    } else {
      $("#upper_paraphrasing_button_circle_" + id).addClass("active");
      $("#inner_paraphrasing_button_circle_" + id).addClass("active");
      $("#inner_title" + id).addClass("active");
    }
  });
  $("#copy_to_clipboard").on("click", function (event) {
    event.preventDefault();
    let div = document.getElementById("output-content");
    let text = div.innerText;
    let textArea = document.createElement("textarea");
    textArea.width = "1px";
    textArea.height = "1px";
    textArea.background = "transparents";
    textArea.value = text;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    $("#copy_to_clipboard")
      .fadeOut(500, function () {
        $(this).html("Copied");
      })
      .fadeIn(500)
      .delay(2000)
      .fadeOut(500, function () {
        $(this).html('<i class="ti-layers"></i>');
      })
      .fadeIn(500);
  });
  setTimeout(() => {
    btn_status("#paraphrase_now", 0);
  }, 2500);
  $(".output-text-export").on("mouseenter", function () {
    var thisAxn = $(this).attr("data-axn") || "/";
    console.log(thisAxn);
    $("#output-export-tool").attr("action", thisAxn);
  });
  $(window).on("paste", function (e) {
    wordCounter();
  });
  $("#input-content").on("keyup", function (event) {
    event.preventDefault();
    wordCounter();
    var txt = $("#input-content").val();
    if (txt.length > 1500) {
      $("#word_limit_reach").show();
    }
  });
  $(".special_cource_text").hover(
    function () {
      $(".special_cource_text").removeClass("active");
      $(this).addClass("active");
    },
    function () {
      $(".special_cource_text").removeClass("active");
      $(".plan2").addClass("active");
    }
  );
  $("#paraphrase_now").on("click", function (event) {
    event.preventDefault();
    if (HOST == DOMAIN && IS_PREMIUM != 1) {
      var detectadsbocker = true;
      if ($("#adngin-incontent_1-0").html() != "") {
        detectadsbocker = false;
      }
      if (detectadsbocker == true) {
        alert_box(
          "Disable your ad blocker and refresh your page to carry on?",
          "Ad Blocker Found"
        );
        return false;
      }
    }
    onSubmit();
  });
  wordCounter();
});
function execute_ajax_file(ajax_url, ajax_data) {
  $.ajax({
    type: "POST",
    url: ajax_url,
    data: ajax_data,
    processData: false,
    contentType: false,
    async: true,
    beforeSend: function () {
      btn_status("#paraphrase_now", 1);
    },
    success: function (result) {
      console.log(typeof result);
      $("#input-content").val(result);
      wordCounter();
      btn_status("#paraphrase_now", 0);
    },
  });
}
function striptags(txt) {
  return txt.replace(/(<([^>]+)>)/gi, "");
}
function show_model(title, desc) {
  $("#model_title").html(title);
  $("#model_desc").html(desc);
  $("#id01").fadeIn();
}
function wordCounter() {
  var txt = $("#input-content").val();
  var textLength = 500;
  var isprem = false;
  if (txt && txt != "") {
    if (IS_PREMIUM == 1) {
      textLength = 1500;
      isprem = true;
    }
    txt = txt.trim().split(/\s+/);
    $("#total_words").html(
      "(" + txt.length + " " + WORDS_TEXT + " / " + textLength + ")"
    );
  } else {
    $("#total_words").html("(0 " + WORDS_TEXT + " / " + textLength + ")");
  }
}
function btn_status(id, status, msg = "") {
  if (status) {
    $(id)
      .text(msg ? msg : "   Loading ...   ")
      .attr("disabled");
  } else {
    $(id)
      .text(msg ? msg : REWRITE_NOW)
      .removeAttr("disabled");
  }
}
function onSubmit() {
    var captcharesponse = "";
//   var captcharesponse = grecaptcha.getResponse();
  var innerText = $("#input-content").val() || "";
  if (!innerText) {
      alert_box("Input Text Required ", "Validation Error");
    } else if (innerText.length < 20) {
        alert_box("Atleast require minimum 20 characters", "Validation Error");
        //   } else if (!captcharesponse) {
            //     alert_box("", "Captcha required");
    } else {
    var sliceLength = 500;
    if (IS_PREMIUM == 1) {
      sliceLength = 1500;
      isprem = true;
    }
    var strr = innerText
      .replace("'", "`")
      .split(" ")
      .slice(0, sliceLength)
      .join(" ");
    $("#input-content").val(strr);
    wordCounter();
    var strr = strr.replaceAll("â€˜", "`");
    var strr = strr.replaceAll("â€™", "`");
    var breakdata = strr.match(/[^\s.!?]+[^.!?\r\n]+[.!?]*/g);
    var chunks = 1;
    var sendArr = new Array();
    var brdata = "";
    totalLen = breakdata.length;
    $.each(breakdata, function (index, value) {
      brdata += value;
      var chunkLim = 5;
      if (chunks == chunkLim || chunks == totalLen) {
        sendArr.push(brdata);
        brdata = "";
        chunks = 1;
        totalLen = totalLen - chunkLim;
      } else {
        chunks++;
      }
    });
    var mode = $("#mode").val();
    var la = "English";
    var capc = captcharesponse;
    var done = 0;
    var base_url = BASE_URL;
    runAllAjax(strr.split(), mode, la, capc, done);
    function runAllAjax(array, mode, la, capc, done = 0) {
      $("#output-content,#input-content").css("opacity", "0.3");
      $(".paraphrase-loader").fadeIn();
      var i = 0;
      var totlLen = array.length;
      console.log("totlLen", totlLen);
      var percnt = Math.floor(100 / totlLen);
      var percntNew = 0;
      var itrs = totlLen - 1;
      var newPercentageLoader = window.setInterval(function () {
        percntNew++;
        $("#percent-suggested").html(percntNew + "%");
        $("#percent-progress").attr("aria-valuenow", percntNew);
        $("#percent-progress").css("width", percntNew + "%");
      }, 900);
      function next() {
        var strr = array[i];
        $.ajax({
          async: true,
          url: base_url + "frontend/rewriteArticleToolBeta",
          method: "post",
          dataType: "JSON",
          data: { data: strr, mode: mode, lang: lang, captcha: capc },
          beforeSend: function () {
            btn_status("#paraphrase_now", 1, "  Processing... ");
          },
          success: function (resultdata) {
            clearInterval(newPercentageLoader);
            if (resultdata.error) {
              alert_box(resultdata.msg || "Somthing Went Wrong");
            } else {
              resultdata = resultdata.result;
              if (i > itrs) {
                $("#output-content,#input-content").css("opacity", "1");
                $(".paraphrase-loader").fadeOut();
                $(".paraphraser_output_box").show();
              } else {
                if (done == 0) {
                  done = 1;
                }
                percntNew = 100;
                results = resultdata.paraphrase;
                results = results.trim();
                results = results.replace(/4444/g, "\n");
                $("#output-content").html(results);
                $("#_text_to_exported").val(
                  striptags($("#output-content").html())
                );
                $("#output-content-txt").html(
                  striptags($("#output-content").html())
                );
                $("#percent-suggested").html(percntNew + "%");
                $("#percent-progress").attr("aria-valuenow", percntNew);
                $("#percent-progress").css("width", percntNew + "%");
                $("#copy_to_clipboard_box").css("display", "flex");
                i++;
                $("#output-content,#input-content").css("opacity", "1");
                $(".paraphrase-loader").fadeOut();
                $(".paraphraser_output_box").show();
              }
            }
          },
        }).always(function (xh) {
          $("#output-content,#input-content").css("opacity", "1");
          $(".paraphrase-loader").fadeOut();
          clearInterval(newPercentageLoader);
          btn_status("#paraphrase_now", 0, "");
          console.log("captcha reset");
          grecaptcha.reset();
        });
      }
      next();
    }
    $("#select-ouput").click(function () {
      $("#ouput-content-box").selectText();
    });
    jQuery.fn.selectText = function () {
      var doc = document;
      var element = this[0];
      console.log(this, element);
      if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };
    function ahmad_tooltip() {
      $(".qtiperar").each(function (index) {
        var ip = index + 1;
        $(this).attr("id", "tip_" + ip);
      });
      var current = 0;
      $(document).on("click", ".qtiperar", function (event) {
        if ($(this).hasClass("active")) {
        } else {
          $(".qtiperar").removeClass("active");
          $(this).addClass("active");
          $(".qtiperar").removeClass("activeTip");
          $(this).addClass("activeTip");
          $(".tooltip_main").show();
        }
        current = $(this).index();
        var offset = event.pageX - 20;
        var topoff = event.pageY + 27;
        $(".tooltip_main").css({ left: offset + "px", top: topoff + "px" });
        $(".tooltip_main").attr("no", current);
        $("#useword").attr("tip", current);
        var tipword = $(this);
        var ownW = tipword.attr("own");
        if (typeof ownW !== typeof undefined && ownW !== false) {
          $("#ownword").val(ownW);
        } else {
          $("#ownword").val("");
        }
        var title = tipword.attr("data-title").split("|");
        $("#orgWord").html('<span class="word">' + title[0] + "</span> ");
        $("#sugest").html("");
        for (var i = 1; i < title.length; i++) {
          var hword = '<span class="word">' + title[i] + "</span> ";
          $("#sugest").append(hword);
        }
        $(".word").click(function () {
          tipword.html($(this).html());
        });
        $("#useword").click(function () {
          var valw = $("#ownword").val();
          if (valw.length > 0) {
            $(".activeTip").html(valw);
            $(".activeTip").attr("own", valw);
          }
        });
      });
    }
    function ufsuppress() {
      $(".qtiperar").hover(
        function () {
          $(this).attr("ufdata", $(this).attr("data-title"));
          $(this).removeAttr("data-title");
        },
        function () {
          $(this).attr("data-title", $(this).attr("ufdata"));
          $(this).removeAttr("ufdata");
        }
      );
    }
    function arm_qtiper() {
      ahmad_tooltip();
      $(".qtiperar").each(function (index) {
        var orgt = $(this).attr("data-title");
        var piecest = orgt.split("|");
        var originalw =
          '<a class="wrsug" href="javascript:;" onclick="dowordreplace(\'' +
          escape(piecest[0]) +
          "')\">" +
          piecest[0] +
          "</a>";
        var sugst = "";
        var templastelem = $(this);
        for (var t = 1; t < piecest.length; t++) {
          sugst +=
            '<a class="wrsug" href="javascript:;" onclick="dowordreplace(\'' +
            escape(piecest[t]) +
            "')\">" +
            piecest[t] +
            "</a>";
        }
        $(this).qtip({
          api: {
            onRender: function () {
              lastelem = templastelem;
            },
            beforeHide: function () {},
            onContentUpdate: function () {
              $(".sbtexceptr").click(function () {
                var neww = $(this).siblings(".customexcerpt").attr("value");
                neww = $.trim(neww);
                if (neww.length < 1) {
                  return;
                }
                dowordreplace(escape(neww));
              });
            },
          },
          content:
            "<b>Original word:</b> " +
            originalw +
            "<br />" +
            "<b>Word Suggestion(s):</b>" +
            sugst +
            '<br /><b>Or add your own:</b><br /><div><input class="customexcerpt" type="text" /><input class="sbtexceptr" type="button" value="Use" /></div>' +
            '<hr class="allm2" /><b>Click on original word(above) to restore.<br />Click on any alternate words for replacement.<br />Click outside the balloon to close it.</b>',
          show: { when: "click", solo: true },
          hide: "unfocus",
          style: {
            width: 320,
            padding: 5,
            background: "#A2D959",
            color: "black",
            textAlign: "left",
            border: { width: 7, radius: 5, color: "#A2D959" },
            tip: "topLeft",
            name: "dark",
          },
        });
      });
      ufsuppress();
    }
    arm_qtiper();
    $("document").on("click", "#crossTip", function () {
      $(".tooltip_main").hide();
      $(".qtiperar").removeClass("active");
    });
    $(document).mouseup(function (e) {
      var container = $(".tooltip_main");
      var con = $("#crossTip");
      if (!container.is(e.target))
        if (!$("#ownword").is(":focus")) {
          $(".tooltip_main").hide();
          $(".qtiperar").removeClass("active");
        }
      if (con.is(e.target)) container.hide();
    });
  }
}
