// 从文件加载名单
fetch('names.txt')
  .then(response => response.text())
  .then(text => {
    var names = text.split('\n').map(name => name.trim());
    var originalNames = names.slice(); // 备份原始名单数组

    var time;
    var continueDrawing = false; // 控制是否继续抽签

    function getRandomIndex() {
      var randomArray = new Uint32Array(30); // 生成 30 个随机数
      window.crypto.getRandomValues(randomArray);
      return randomArray;
    }

    function begin() {
      document.getElementById("btnBegin").disabled = true;
      continueDrawing = true; // 开始抽签时设置为 true
      chouqian();
    }

    function chouqian() {
      if (continueDrawing) {
        var indices = getRandomIndex();
        var result = "";
        for (var i = 0; i < indices.length; i++) {
          var index = indices[i] % names.length;
          result += names[index] + " "; // 将换行符替换为空格
        }
        result = result.trim(); // 去除首尾空格
        document.getElementById("result").innerHTML = result;

        time = window.setTimeout(chouqian, 2);
      } else {
        document.getElementById("result").innerHTML = "~结束~";
      }
    }

    function end() {
      continueDrawing = false; // 点击结束按钮时停止抽签
      window.clearTimeout(time);
      document.getElementById("btnBegin").disabled = false;
      names = originalNames.slice(); // 恢复原始名单数组
    }

    // 绑定按钮点击事件
    document.getElementById("btnBegin").addEventListener("click", begin);
    document.getElementById("btnEnd").addEventListener("click", end);
  })
  .catch(error => console.error('Error fetching names:', error));
