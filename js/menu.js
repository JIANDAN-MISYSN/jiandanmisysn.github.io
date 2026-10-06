// 右上角菜单按钮：切换导航列表的展开 / 收起
// 原生 JS 实现，替代原 xd.js + jQuery（原 xd.js 存在未闭合括号的语法错误，菜单实际无法展开）
document.getElementById('menu').addEventListener('click', function () {
    this.classList.toggle('on');
    document.querySelector('.list').classList.toggle('closed');
});
