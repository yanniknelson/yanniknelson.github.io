let progress = document.getElementById("scrollThumb");
let totalHeight = document.body.scrollHeight - window.innerHeight;
let progressHeight = (window.pageYOffset / totalHeight) * 100;
if (totalHeight < 0) {
  progressHeight = 100;
}
progress.style.height = progressHeight + "%";
window.onresize = function () {
  let totalHeight = document.body.scrollHeight - window.innerHeight;
  let progressHeight = (window.pageYOffset / totalHeight) * 100;
  if (totalHeight < 0) {
    progressHeight = 100;
  }
  progress.style.height = progressHeight + "%";
};
window.onscroll = function () {
  let totalHeight = document.body.scrollHeight - window.innerHeight;
  let progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.height = progressHeight + "%";
};
