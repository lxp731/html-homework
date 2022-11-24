// 获取所有的span标签组
var tabs = document.getElementById("tab").getElementsByTagName("span");
// 获取所有的div标签组
var cts = document.getElementById("tab").getElementsByTagName("div");

function changeTab(current) {
    for (i = 0; i < tabs.length; i++) {
        if (tabs[i] == current) {
            tabs[i].className = "tab";
            cts[i].className = "content";
        } else {
            tabs[i].className = "";
            cts[i].className = "";
        }
    }
}