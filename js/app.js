$(function() {

  /************
    TEXT BOXES
   ************/

  var html = CodeMirror.fromTextArea(document.getElementById("html"), {
    theme: "monokai html",
    lineNumbers: true,
    mode: 'xml',
    htmlMode: true,
    defaultValue: "cool"
  });

  var css = CodeMirror.fromTextArea(document.getElementById("css"), {
    theme: "monokai css",
    lineNumbers: true,
    mode: "text/css"
  });

  var js = CodeMirror.fromTextArea(document.getElementById("js"), {
    theme: "monokai js",
    lineNumbers: true,
    mode: "text/javascript"
  });

  var htmlVal = "<!-- Insert your HTML here -->\n" +
                "<p><span>Mesh</span> up your\n" +
                "HTML, CSS and JavaScript.<br /><br />\n\n" +
                "For maximum pleasure,\n" +
                "drag and resize the preview box\n" +
                "by using your pointer\n" +
                "along its sexy border lines.</p>\n";

  var cssVal  = "/* Insert your CSS here */\n" +
                "* { padding: 5px; color: #999; }\n" +
                "span { color: red; }\n";

  var jsVal   = "/* Insert your JavaScript here */\n" +
                "$('body').click(function() {\n" + 
                  "\tconsole.log(\"jQuery's also meshed\");\n" +
                "});";

  html.setValue(htmlVal);
  css.setValue(cssVal);
  js.setValue(jsVal);


  /************************
    Iframe Content Builder 
   ************************/

  var buildContent = function() {
    var htmlContent = html.getValue();
    var cssContent = css.getValue();
    var jsContent = js.getValue();

    return "<html>" +
      "<link rel=\"stylesheet\" " +
      "href=\"http://raw.github.com/necolas/normalize.css/master/normalize.css\" " +
      "type=\"text/css\">" +
      "<style>" +
      cssContent +
      "</style>" +
      htmlContent +
      "<script src=\"http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js\">" +
      "</script>" +
      "<script>" +
      "$(function(){" + 
      jsContent +
      "});" + 
      "</script>" +
      "</html>";
  };


  /*****************
    Event Listeners 
   *****************/

  var delay;
  html.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });

  css.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });

  js.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });
  
  var updatePreview = function() {
    var previewFrame = document.getElementById('preview');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(buildContent());
    preview.close();
  }
  setTimeout(updatePreview, 300);


  /*************************
    Dynamic Text Box Sizing 
   *************************/

  var resizeBoxes = function() {
    var windowHeight = $(window).height();
    var windowWidth   = $(window).width();

    var frameHeight = $('#frame').height(windowHeight / 2);
    var frameWidth  = $('#frame').width(windowWidth / 2);

    $('#preview').height(frameHeight);
    $('#preview').width(frameWidth);  
    
    $textBoxes = $('.CodeMirror');
    $.each($textBoxes, function(idx, box) {
      $(box).height(windowHeight / 2.2);
      $(box).width(windowWidth / 2.15);
    });
  };

  resizeBoxes();

  $('#frame').draggable().resizable({
    handles: 'n, e, s, w, ne, se, sw, nw'
  });


  $(window).resize(function() {
    resizeBoxes();
  });

});