import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { initDeletedComment, initPinnedComment } from '../../../redux/slice/commentSlice';
import { resetComment } from '../../../redux/slice/commentCreateSlice';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
    dispatch(initDeletedComment());
    dispatch(initPinnedComment());
    dispatch(resetComment());
  }, [pathname, dispatch]);

  return <div />;
}
