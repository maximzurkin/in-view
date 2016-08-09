import Registry from './registry';

const initInView = () => {

    const getElements = (selector) =>
        [].slice.call(document.querySelectorAll(selector));

    const inViewport = (element, offset = 0) => {
        let bounds = element.getBoundingClientRect();
        return bounds.bottom > offset
            && bounds.right > offset
            && window.innerWidth - bounds.left > offset
            && window.innerHeight - bounds.top > offset;
    };

    const throttle = (fn, threshold, context) => {
        let prev = 0;
        return () => {
            let now  = new Date().getTime();
            if (now - prev > threshold) {
                fn.call(context);
                prev = now;
            }
        };
    };

    let catalog = { history: [] };

    let inView = (selector) => {
        let elements = getElements(selector);
        if (catalog.history.indexOf(selector) > -1) {
            catalog[selector].elements = elements;
        } else {
            catalog[selector] = new Registry(elements);
            catalog.history.push(selector);
        }
        return catalog[selector];
    };

    inView.is = inViewport;

    return inView;

};

export default initInView();
