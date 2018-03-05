

$('table').children('thead').find('tr th').each(function () { $(this).click(function () { var n = $('table').children('thead').find('tr th').index($(this));
s = $('table' + ' tbody').children().sort(function (a, b) {return a.children[n].innerText.localeCompare(b.children[n].innerText);});$('table').children('tbody').empty().append(s);});});

¿ÉÅÅÁĞµÄÍøÕ¾£º
http://dnf.qq.com/cp/a20161103single/?e_code=277395
http://dnf.qq.com/cp/a20161020demention/


