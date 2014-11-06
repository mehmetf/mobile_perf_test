function onMove(ev) {
  var target = document.getElementById('surface');
  var newX = ev.touches[0].clientX - 50;
  var newY = ev.touches[0].clientY - 50;
  var trStr = "translate3d(" + newX + "px," + newY + "px,0)";
  target.style.transform = trStr;
  ev.stopPropagation();
}
