import { useActions } from '../hooks/use-actions';
import './action-bar.css';

interface ActionButtonProps {
  action: React.MouseEventHandler<HTMLButtonElement>;
  icon: string;
}

const ActionButton = ({ action, icon }: ActionButtonProps) => {
  return (
    <button className="bu-button bu-is-primary bu-is-small" onClick={action}>
      <span className="bu-icon">
        <i className={icon}></i>
      </span>
    </button>
  );
};

interface ActionBarProps {
  id: string;
}

const ActionBar = ({ id }: ActionBarProps) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <ActionButton action={() => moveCell(id, 'up')} icon="fas fa-arrow-up" />
      <ActionButton
        action={() => moveCell(id, 'down')}
        icon="fas fa-arrow-down"
      />
      <ActionButton action={() => deleteCell(id)} icon="fas fa-times" />
    </div>
  );
};

export default ActionBar;
