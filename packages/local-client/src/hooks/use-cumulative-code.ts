import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const cells = order.map((id) => data[id]);

    const printer = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var print = (value, end) => {
        const root = document.querySelector('#root');
        const portalRoot = document.querySelector('#portal');
        
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            const temp = document.createElement('div');
            const portal = _ReactDOM.createPortal(value, root);
            _ReactDOM.render(portal, temp, () => portalRoot.appendChild(temp));
            if (end !== undefined && end !== null) root.append(end);
          } else {
            root.append(JSON.stringify(value));
            if (end !== undefined && end !== null) root.append(end);
            else root.append(document.createElement('br'));
          }
        } else {
          root.append(value);
          if (end !== undefined && end !== null) root.append(end);
          else root.append(document.createElement('br'));
      }
      }
    `;

    const printerNoOp = `var print = () => {}`;

    const cumulativeCode = [];
    for (let c of cells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(printer);
        } else {
          cumulativeCode.push(printerNoOp);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
};
