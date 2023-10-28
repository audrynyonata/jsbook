import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import './cell-list.css';

const CellList = () => {
  const cells = useTypedSelector((state) => {
    const { order, data } = state.cells;
    return order.map((id) => data[id]);
  });

  const focusedIndex = useTypedSelector((state) => {
    return state.cells.focusedIndex;
  });

  useEffect(() => {
    document
      .querySelector('.focused')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [cells, focusedIndex]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} focused={cell.id === focusedIndex} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
