import dayjs from "dayjs";
import { useMemo } from "react";

const useRelativeTimeText = (lastTime: string | Date | undefined) => {
  const relativeTime = useMemo(() => {
    const lastTimeDayjs = dayjs(lastTime);
    const messageYear = lastTimeDayjs.year();
    const messageMonth = lastTimeDayjs.month();
    const messageDate = lastTimeDayjs.date();

    const newTime = dayjs();
    const newYear = newTime.year();
    const newMonth = newTime.month();
    const newDate = newTime.date();
    if (
      messageYear === newYear &&
      messageMonth === newMonth &&
      messageDate === newDate
    ) {
      return lastTimeDayjs.format("HH:mm");
    } else if (
      messageYear === newYear &&
      messageMonth === newMonth &&
      messageDate === newDate - 1
    ) {
      return "yesterday";
    } else if (
      messageYear === newYear &&
      messageMonth === newMonth &&
      messageDate === newDate - 6
    ) {
      return lastTimeDayjs.format("ww");
    } else {
      return lastTimeDayjs.format("YYYY-MM-DD");
    }
  }, [lastTime]);
  return relativeTime;
};

export default useRelativeTimeText;
// const lastMessageTimeText = useMemo(() => {
//   if (!lastMessage) return null;
//   const time = dayjs(lastMessage?.createdAt);
// const relativeTime = dayjs.updateLocale("en", {
//   relativeTime: {
//     future: "in %s",
//     past: "%s ago",
//     s: "a few seconds",
//     m: "a minute",
//     mm: "%d minutes",
//     h: "an hour",
//     hh: "%d hours",
//     d: "a day",
//     dd: "%d days",
//     M: "a month",
//     MM: "%d months",
//     y: "a year",
//     yy: "%d years",
//   },
// });
// console.log(relativeTime);
