const formatMessageTime = timestamp => {
  const now = new Date();
	// message sent today
  if (now.toDateString() === timestamp.toDateString()) {
    return timestamp.toLocaleTimeString(undefined, { timeStyle: 'short' });
	}
	// message sent in past 6 days
  if ((now - timestamp) / 1000 < 518400) {
    return `${timestamp
      .toLocaleString(undefined, { weekday: 'short' })
      .toUpperCase()} ${timestamp.toLocaleTimeString(undefined, {
      timeStyle: 'short'
    })}`;
	}
	// message sent 7 or more days ago
  return `${timestamp
    .toLocaleDateString(undefined, { dateStyle: 'short' })
    .toUpperCase()}, ${timestamp.toLocaleTimeString(undefined, {
    timeStyle: 'short'
  })}`;
};

export default formatMessageTime;
