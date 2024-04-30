var names = [
    "蒲勇宏", "蒲玉章", "秦江", "秦正", "秦卓", "阙棵", "孙洪富", "汪桂平", "王缘", "魏华杨",
    "向涛", "向子坤", "肖松林", "肖涛", "谢代晋丰", "谢世海", "燕能权", "杨东", "杨俊杰", "袁际昊",
    "张垒", "张曦", "赵锐", "赵籽粮", "周鑫", "周严", "朱腾宇", "邹怡翔", "马新艳", "秦悦",
    "沙库娘娘", "石彤彤", "税琳", "唐春艳", "童晓玉", "王钰萱", "吴娇", "徐怀钰", "徐毓蔓", "薛清溶",
    "颜忆雪", "杨铃", "杨诗艺", "杨舒琴", "杨爽", "叶欣", "余孟玲", "郑婧媛", "周倩", "邹婷"
  ];
  
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
  