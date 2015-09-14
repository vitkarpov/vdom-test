var html2hscript = require('html2hscript');
var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

/**
 * Шаблон должен возвращать VNode
 * Функция h (гиперскрипт) позволяет описать виртуальное дерево, по сути bemjson.
 * В итоге получаем односвязный список VNode, где каждый
 * элемент, начиная от корневой ноды, связан с последующим через .children
 */
function template(count) {
    return h('div', {
        className: 'foo',
        style: {
            padding: '20px',
            border: '1px solid ' + (count % 2) ? 'red' : 'green'
        }
    }, [
        h('span', [ "I was invoked ", String(count), " times!" ])
    ]);
}

(function() {
    // первоначальная отрисовка
    var count = 0;
    var tree = template(count);
    // функция по переданном виртуальном дому,
    // умеет создавать настоящий: ноду со всеми вложенными
    var rootNode = createElement(tree);
    document.body.appendChild(rootNode);

    setInterval(function() {
        // получаем новое дерево
        var newTree = template(++count);

        // накладываем дифф
        var patches = diff(newTree, tree);

        // выполняем точечные изменения в реальном DOM
        patch(rootNode, patches);

        // обновляем дерево, чтобы в следующий
        // раз сравнивать с ним
        tree = newTree;
    }, 1000);
}());
