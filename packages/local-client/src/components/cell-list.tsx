import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import './cell-list.css';
import axios from 'axios';

const CellList = () => {
  const { fetchCells } = useActions();

  const cells = useTypedSelector((state) => {
    const { order, data } = state.cells;
    return order.map((id) => data[id]);
  });

  const { loading, order, focusedIndex } = useTypedSelector((state) => {
    return state.cells;
  });

  useEffect(() => {
    document
      .querySelector('.focused')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [order, focusedIndex]);

  useEffect(() => {
    fetchCells();
    axios.get('/filename').then((filename) => {
      document.title = `${filename} | JSBook | React App`;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} focused={cell.id === focusedIndex} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {cells.length === 0 && !loading ? (
        <div className="bu-card empty">
          <div className="bu-card-content">Add a new cell to get started</div>
        </div>
      ) : (
        renderedCells
      )}
    </div>
  );
};

export default CellList;
