import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSortedMessages } from '../reducers/messages';
import { getPreviousMessages } from '../actions';



const useScroll = () => {
  const elementRef = useRef(null);
  const lockToBottomRef = useRef(true);
  const elementPreviousHeightRef = useRef();
  const requestedMoreMessagesRef = useRef(false);
  const dispatch = useDispatch();
  const messages = useSelector(getSortedMessages);

  const handleScroll = () => {
		const { scrollTop, scrollHeight, offsetHeight } = elementRef.current;

    if (scrollTop === 0 && requestedMoreMessagesRef.current === false) {
      dispatch(getPreviousMessages(messages[0].id));
      requestedMoreMessagesRef.current = true;
    }
    if (scrollTop >= scrollHeight - offsetHeight - 10) {
      lockToBottomRef.current = true;
    } else {
      lockToBottomRef.current = false;
    }
  };

  useEffect(() => {
    elementRef.current.addEventListener('scroll', handleScroll);

    const { scrollHeight, offsetHeight } = elementRef.current;

    if (lockToBottomRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
    if (requestedMoreMessagesRef.current) {
      const currentHeight = scrollHeight - offsetHeight;
      elementRef.current.scrollTop =
        currentHeight - elementPreviousHeightRef.current;
      requestedMoreMessagesRef.current = false;
    }

    elementPreviousHeightRef.current = scrollHeight - offsetHeight;
    return () => elementRef.current.removeEventListener('scroll', handleScroll);
  }, [messages]);

  return elementRef;
};

export default useScroll;
