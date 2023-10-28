import { Cell } from '../state';
import ActionBar from './action-bar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import './cell-list-item.css';

interface CellListItemProps {
  cell: Cell;
  focused: boolean;
}

const CellListItem = ({ cell, focused }: CellListItemProps) => {
  const { id, type } = cell;
  let child: JSX.Element;

  if (type === 'code') {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={id} />
      </>
    );
  }
  return (
    <div className={`cell-list-item ${focused && 'focused'}`}>{child}</div>
  );
};

export default CellListItem;
