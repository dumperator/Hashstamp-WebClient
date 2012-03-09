(function(){
  $(function(){
    var frames, currentFrame, frame, switchFrame, __i, __len;
    console.log("DOM loaded");
    frames = ['about', 'contact', 'add', 'browse'];
    currentFrame = 'about';
    for (__i = 0, __len = frames.length; __i < __len; ++__i) {
      frame = frames[__i];
      $(".frame#" + frame).hide();
    }
    $(".frame#" + currentFrame).show();
    switchFrame = function(newFrame){
      $(".frame#" + currentFrame).hide();
      $(".frame#" + newFrame).show();
      $("#go-" + currentFrame).removeClass('active');
      $("#go-" + newFrame).addClass('active');
      currentFrame = newFrame;
    };
    for (__i = 0, __len = frames.length; __i < __len; ++__i) {
      frame = frames[__i];
      (__fn.call(this, frame));
    }
    $('#files').change(function(ev){
      var files, file, wh, fr, __i, __len;
      files = ev.target.files;
      console.log("Hashing " + files.length + " files...");
      for (__i = 0, __len = files.length; __i < __len; ++__i) {
        file = files[__i];
        wh = Whirlpool.init();
        wh.add(Date() + "\r\n");
        wh.add($('#files-additional').text() + "\r\n");
        fr = new FileReader();
        fr.onloadstart = __fn;
        fr.onabort = __fn1;
        fr.onload = __fn2;
        fr.onerror = __fn3;
        fr.onprogress = __fn4;
        fr.onloadend = __fn5;
        fr.readAsBinaryString(file);
      }
      function __fn(){
        console.log("FileReader onloadstart");
      }
      function __fn1(){
        console.log("FileReader onabort");
      }
      function __fn2(){
        console.log("FileReader onload");
      }
      function __fn3(){
        alert("There was an error hashing your files.  Your browser may be unsupported.");
      }
      function __fn4(ev){
        console.log("FileReader onprogress");
        wh.add(ev.target.result);
      }
      function __fn5(){
        var hash;
        console.log("FileReader onloadend");
        hash = wh.finalize();
        $("#add .list > tbody").prepend($("<tr><td><table><tbody>" + ("<tr><th>Filename:</th><td>" + file.name + "</td></tr>") + ("<tr><th>Time:</th><td>" + Date() + "</td></tr>") + ("<tr><th>Hash:</th><td>" + hash.substring(0, 16) + "...</td></tr>") + "<tbody></table></td></tr>"));
      }
    });
    console.log("app loaded");
    function __fn(frame){
      $("#go-" + frame).click(function(){
        switchFrame(frame);
      });
    }
  });
}).call(this);
