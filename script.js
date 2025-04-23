var rotate = 0;  
var isRunning = false;  

// 随机生成颜色  
var randomColor = function() {  
    return 'rgb(' + Math.random() * 250 + ', ' + Math.random() * 250 + ', ' + Math.random() * 250 + ')';  
};  

// 定义选项数组  
var list = [  
    { title: '大剑', color: randomColor() },  
    { title: '太刀', color: randomColor() },  
    { title: '片手', color: randomColor() },  
    { title: '双刀', color: randomColor() },  
    { title: '大锤', color: randomColor() },  
    { title: '笛子', color: randomColor() },  
    { title: '长枪', color: randomColor() },  
    { title: '铳枪', color: randomColor() },  
    { title: '斩斧', color: randomColor() },  
    { title: '盾斧', color: randomColor() },  
    { title: '虫棍', color: randomColor() },  
    { title: '轻弩', color: randomColor() },  
    { title: '重弩', color: randomColor() },  
    { title: '弓箭', color: randomColor() },  
];  

// 准备区数组  
var readyList = [];  

// 每个部分的角度  
var perAngle = 360 / list.length;  
var main = document.querySelector('.main');  
var temp = document.querySelector('#temp');  

// 创建转盘部分  
function createWheel() {  
    main.innerHTML = ''; // 清空现有的选项  
    
    for (var i in list) {  
        var item = list[i];  

        var newNode = temp.cloneNode(true);  
        newNode.style.display = 'block';  
        newNode.style.transform = 'rotateZ(' + (perAngle * i + perAngle / 2) + 'deg)';  
        newNode.querySelector('.bg').style.background = item.color;  

        // 调整clip-path以形成转盘的比例  
        if (list.length > 2) {  
            var p = perAngle / 2; // 每份的角度两等分  
            var d = Math.tan(p * Math.PI / 180) * 100; // 对边的长度  
            var x = (100 - d) / 2; // 每份对边实际百分比  
            newNode.style.clipPath = `polygon(0% 50%, 100% ${x}%, 100% ${100 - x}%)`;  
        }  

        newNode.querySelector('.title').innerHTML = item.title;  

        // 添加点击事件  
        newNode.onclick = function() {  
            var title = this.querySelector('.title').innerHTML;  
            removeItem(title);  
        };  

        main.appendChild(newNode);  
    }  
}  

function createReadyArea() {  
    var readyArea = document.getElementById('readyArea');  
    readyArea.innerHTML = ''; // 清空准备区  

    readyList.forEach(function(item) {  
        var readyItem = document.createElement('div');  
        readyItem.className = 'ready-item';  
        readyItem.style.backgroundColor = item.color; // 设置背景颜色  
        readyItem.innerHTML = item.title; // 设置标题  

        // 添加点击事件以移回转盘  
        readyItem.onclick = function() {  
            restoreItem(item.title);  
        };  

        readyArea.appendChild(readyItem);  
    });  
}  

// 从数组中移除选项  
function removeItem(title) {  
    if (list.length === 2) {  
        return; // 保留至少两个选项  
    }  

    var removedItem = list.find(item => item.title === title);  
    readyList.push(removedItem); // 添加到准备区数组  
    list = list.filter(item => item.title !== title); // 从列表中移除选中的项  
    perAngle = 360 / list.length;  
    createWheel(); // 重新创建转盘  
    createReadyArea(); // 重新创建准备区域  
}  

// 恢复选项到转盘  
function restoreItem(title) {  
    var restoredItem = readyList.find(item => item.title === title);  
    list.push(restoredItem); // 恢复到转盘的数组  
    readyList = readyList.filter(item => item.title !== title); // 从准备区中移除  
    
    perAngle = 360 / list.length;  
    createWheel(); // 重新创建转盘  
    createReadyArea(); // 重新创建准备区域  
}  

// 开始转盘  
function start() {  
    if (isRunning) {  
        console.warn('转盘正在运转中');  
        return;  
    }  

    isRunning = true;  
    document.querySelector('.winner').innerHTML = '';  

    rotate += Math.random() * 360 + 360 * 3; // 多转3圈  
    main.style.transform = 'rotateZ(-' + rotate + 'deg)';  
}  

// 转盘结束  
function end() {  
    isRunning = false;  

    var index = Math.floor(rotate / perAngle) % list.length;  
    var winner = list[index];  
    document.querySelector('.winner').innerHTML = '选中：' + winner.title;  
}  

// 初始化转盘  
createWheel();