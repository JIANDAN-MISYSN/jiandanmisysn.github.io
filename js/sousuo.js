// 搜索引擎切换与提交逻辑
// 已删除原文件中引用不存在元素（#yy、影视搜索）的 bq() / bw() / z() / zi() 死代码
(function () {
    'use strict';

    var radios = document.querySelectorAll('input[name="type"]'),
        form = document.getElementById('super-search-fm'),
        text = document.getElementById('search-text'),
        blankCheckbox = document.getElementById('set-search-blank'),
        groups = document.querySelectorAll('.search-group');

    function save(key, value) {
        localStorage.setItem('superSearch' + key, value);
    }

    function load(key) {
        return localStorage.getItem('superSearch' + key);
    }

    function currentRadio() {
        return document.querySelector('input[name="type"]:checked');
    }

    // 是否新窗口打开搜索结果（默认是）
    function openInNewWindow() {
        var v = load('newWindow');
        return v ? v === '1' : true;
    }

    // 高亮当前搜索引擎所在分组
    function markCurrent(radio) {
        for (var i = 0; i < groups.length; i++) groups[i].classList.remove('s-current');
        radio.closest('.search-group').classList.add('s-current');
    }

    function syncPlaceholder() {
        text.placeholder = currentRadio().getAttribute('data-placeholder');
    }

    function syncAction(keyword) {
        form.action = currentRadio().value + (keyword || '');
    }

    function syncTarget() {
        if (openInNewWindow()) form.target = '_blank';
        else form.removeAttribute('target');
    }

    // 初始化：恢复上次选择的搜索引擎，没有则默认第一个
    function initType() {
        var saved = load('type'),
            radio = saved ? document.querySelector('input[name="type"][value="' + saved + '"]') : null;
        radio = radio || radios[0];
        radio.checked = true;
        markCurrent(radio);
    }

    function onTypeChange(e) {
        save('type', e.target.value);
        syncPlaceholder();
        syncAction();
        markCurrent(e.target);
        text.focus();
    }

    function onBlankChange(e) {
        save('newWindow', e.target.checked ? 1 : -1);
        syncTarget();
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!text.value) {
            text.focus();
            return;
        }
        syncAction(text.value);
        syncTarget();
        if (openInNewWindow()) window.open(form.action, String(+new Date()));
        else location.href = form.action;
    }

    blankCheckbox.checked = openInNewWindow();
    initType();
    syncPlaceholder();
    syncAction();

    for (var i = 0; i < radios.length; i++) radios[i].addEventListener('change', onTypeChange);
    blankCheckbox.addEventListener('change', onBlankChange);
    form.addEventListener('submit', onSubmit);
})();
