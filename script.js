// 从文件加载名单
fetch('names.txt')
  .then(response => response.text())
  .then(text => {
    var names = text.split('\n').map(name => name.trim());
    // 使用 names 数组进行后续操作

    var name;
    var index = -1;
    var time;

    function begin() {
      document.getElementById("btnBegin").disabled = true;
      chouqian();
    }

    function chouqian() {
      if (names.length > 0) {
        index = Math.floor(Math.random() * 1000 % names.length);
        name = names[index];
        document.getElementById("result").innerHTML = name;
        time = window.setTimeout(chouqian, 2);
      } else {
        document.getElementById("result").innerHTML = "~结束~";
      }
    }

    function end() {
      window.clearTimeout(time);
      document.getElementById("btnBegin").disabled = false;
      names.splice(index, 1);
    }

    // 绑定按钮点击事件
    document.getElementById("btnBegin").addEventListener("click", begin);
    document.getElementById("btnEnd").addEventListener("click", end);
  })
  .catch(error => console.error('Error fetching names:', error));
