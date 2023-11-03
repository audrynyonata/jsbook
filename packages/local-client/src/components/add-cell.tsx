import { useActions } from '../hooks/use-actions';
import './add-cell.css';

interface AddButtonProps {
  action: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const AddButton = ({ action, label }: AddButtonProps) => {
  return (
    <button
      className="bu-button bu-is-rounded bu-is-primary bu-is-small"
      onClick={action}
    >
      <span className="bu-icon bu-is-small">
        <i className="fas fa-plus"></i>
      </span>
      <span>{label}</span>
    </button>
  );
};

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell = ({ forceVisible, previousCellId }: AddCellProps) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <AddButton
          action={() => insertCellAfter(previousCellId, 'code')}
          label="Code"
        />
        <AddButton
          action={() => insertCellAfter(previousCellId, 'text')}
          label="Text"
        />
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
