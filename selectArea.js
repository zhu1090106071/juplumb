(function() {
    $("#paletteArea").on("mousedown",function(e){
      var evt = window.event || arguments[0];
      if(evt.target.id == "paletteArea"){
         var isSelect = true;//开始选区
      }
      var selList = $(".drawedItem").get();//获取画板中所有画出的元素
      $(selList).removeClass("seled");//点击画板其他区域，清楚选中效果
      var startX = (evt.x || evt.clientX);
      var startY = (evt.y || evt.clientY);
      var selDiv = $('<div id="selectDiv" style="position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;"></div>')
      $("#paletteArea").append(selDiv)
      selDiv.css({"left":startX+"px","top":startY + "px"});
      var _x = null;
      var _y = null;
      clearEventBubble(evt);
      document.onmousemove = function() {
        evt = window.event || arguments[0];
        if (isSelect) {
          if (selDiv.css("display") == "none") {
            selDiv.css("display","");
          }
          _x = (evt.x || evt.clientX);
          _y = (evt.y || evt.clientY);
          selDiv.css("left", Math.min(_x, startX) + "px");
          selDiv.css("top", Math.min(_y, startY) + "px");
          selDiv.css("width", Math.abs(_x - startX) + "px");
          selDiv.css("height", Math.abs(_y - startY) + "px");
          var _l = selDiv[0].offsetLeft,
              _t = selDiv[0].offsetTop;
          var _w = selDiv[0].offsetWidth,
              _h = selDiv[0].offsetHeight;
          for ( var i = 0; i < selList.length; i++) {
            var sl = selList[i].offsetWidth + selList[i].offsetLeft;
            var st = selList[i].offsetHeight + selList[i].offsetTop;
            if (sl > _l && st > _t && selList[i].offsetLeft < _l + _w && selList[i].offsetTop < _t + _h) {
              if (selList[i].className.indexOf("seled") == -1) {
                selList[i].className = selList[i].className + " seled";
              }
            } else {
              if (selList[i].className.indexOf("seled") != -1) {
                selList[i].className = "drawedItem";
              }
            }
          }
        }
        clearEventBubble(evt);
      }
      document.onmouseup = function() {
        isSelect = false;
        if (selDiv) {
          selDiv.remove();//删除selDiv
          showSelDiv(selList);
        }
        selList = null, _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null;
      }
    })
  })();
  function clearEventBubble(evt) {
    if (evt.stopPropagation)
      evt.stopPropagation();
    else
      evt.cancelBubble = true;
    if (evt.preventDefault)
      evt.preventDefault();
    else
      evt.returnValue = false;
  }
  function showSelDiv(arr) {
    var count = 0;
    var selInfo = "";
    for ( var i = 0; i < arr.length; i++) {
      if (arr[i].className.indexOf("seled") != -1) {
        count++;
        selInfo += arr[i].innerHTML + ",";
      }
    }
    if(count>0){
      console.log("当前选中 " + count + "个 ，分别为：" + selInfo)
    }
   
  }