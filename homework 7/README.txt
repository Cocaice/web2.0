calculator优化前：38行
calculator优化后：37行（ps:优化前除以0无报错，优化后添加此功能）
puzzle优化前：176行
puzzle优化后：133行

神秘代码：



$('table').children('thead').find('tr th').each(function () { $(this).click(function () { var n = $('table').children('thead').find('tr th').index($(this));
s = $('table' + ' tbody').children().sort(function (a, b) {return a.children[n].innerText.localeCompare(b.children[n].innerText);});$('table').children('tbody').empty().append(s);});});

可排列的网站：
http://dnf.qq.com/cp/a20161103single/?e_code=277395
http://dnf.qq.com/cp/a20161020demention/
