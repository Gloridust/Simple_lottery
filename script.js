// 从文件加载名单
fetch('names.txt')
  .then(response => response.text())
  .then(text => {
    var names = text.split('\n').map(name => name.trim());
    var originalNames = names.slice(); // 备份原始名单数组

    var time;
    var continueDrawing = false; // 控制是否继续抽签
    var results = []; // 存储抽签结果

    function getRandomIndex() {
      var randomArray = new Uint32Array(30); // 生成 30 个随机数
      window.crypto.getRandomValues(randomArray);
      return randomArray;
    }

    function begin() {
      document.getElementById("btnBegin").disabled = true;
      document.getElementById("btnExport").disabled = true;
      continueDrawing = true; // 开始抽签时设置为 true
      chouqian();
    }

    var lastResult = ""; // 用于存储最后一次抽签的结果

    function chouqian() {
      if (continueDrawing) {
        var indices = getRandomIndex();
        var result = "";
        for (var i = 0; i < indices.length; i++) {
          var index = indices[i] % names.length;
          result += names[index] + " ";
        }
        result = result.trim(); // 去除首尾空格
        document.getElementById("result").innerHTML = result;
        lastResult = result; // 更新最后一次抽签结果
    
        time = window.setTimeout(chouqian, 100); // 调整抽签频率
      } else {
        document.getElementById("result").innerHTML = "~结束~";
        document.getElementById("btnExport").disabled = false;
      }
    }
    
    function end() {
      continueDrawing = false; // 点击结束按钮时停止抽签
      window.clearTimeout(time);
      document.getElementById("btnBegin").disabled = false;
      document.getElementById("btnExport").disabled = false; // 启用导出按钮
      names = originalNames.slice(); // 恢复原始名单数组
    }
    
    function exportResults() {
      var blob = new Blob([lastResult], { type: 'text/plain;charset=utf-8' }); // 仅导出最后一次结果
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'result.txt'; // 重命名为 result.txt
      a.click();
      URL.revokeObjectURL(url);
    }
    

    // 绑定按钮点击事件
    document.getElementById("btnBegin").addEventListener("click", begin);
    document.getElementById("btnEnd").addEventListener("click", end);
    document.getElementById("btnExport").addEventListener("click", exportResults);
  })
  .catch(error => console.error('Error fetching names:', error));
