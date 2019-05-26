createElement = function ({tag, parent, classList=[], innerHTML, attributes}) {
    let element = document.createElement(tag);
    classList.forEach(function (className) {
        element.classList.add(className);
    });
    if (innerHTML)
        element.innerHTML=innerHTML;

    if (attributes)
        attributes.forEach (function (attribute) {
            element.setAttribute(attribute.name, attribute.value);
        });

    parent.appendChild(element);
    return element;
};

findClosest = function (element, tagName) {
    return element.tagName==tagName ? element : findClosest(element.parentElement, tagName);
};