import css from './LoadMoreBtn.module.css';
import { LoadMoreBtnProps } from './LodeMoreBtn.types';


const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onClick} type="button">    
        Load more
      </button>
    </div>
  );
}

export default LoadMoreBtn;
