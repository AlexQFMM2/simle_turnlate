vscode直接用 live Server 插件运行就可以了，需要修改转盘选项卡数量，或者选项卡信息，只要改js中的list数组就可以了

例如：
```javaScript
var list = [  
    { title: '选项1', color: randomColor() },  
    { title: '选项2', color: randomColor() },  
    { title: '选项3', color: randomColor() },  
    { title: '选项四', color: randomColor() },  

];  
```
改为

```javaScript
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
```
