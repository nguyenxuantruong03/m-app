"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import multiMonthPlugin from "@fullcalendar/multimonth";
import toast from "react-hot-toast";
import axios from "axios";
import { redirect, useParams, useRouter } from "next/navigation";
import { format, addHours, addMinutes, addSeconds, subHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AlertModal } from "@/components/modals/alert-modal";
import { Check, Info, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import viLocale from "date-fns/locale/vi";
import { CameraModal } from "@/components/modals/camera-modal";
import { ChooseAttendanceModal } from "@/components/modals/chooseAttendance-modal";
import { NfcModal } from "@/components/modals/nfc-modal";
import { Hint } from "@/components/ui/hint";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import {
  translateAttendanceEnd,
  translateAttendanceStaff,
  translateAttendanceStart,
  translateDeleteEvent,
  translateEvent,
  translateEventLimit,
  translateEventTypes,
  translateInvalidIdToDelete,
  translateWorkTimeMessages,
} from "@/translate/translate-dashboard";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: string;
  attendancestart?: string;
  attendanceend?: string;
}

interface AllEventProps {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: string;
  end: Date | string;
  isEnd: boolean;
  attendancestart?: string;
  attendanceend?: string;
  isCheckAttendanceImage?: boolean;
  isCheckNFC?: boolean;
}

interface AccountItem {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

export default function Home() {
  const params = useParams();
  const userId = useCurrentUser();
  const router = useRouter();
  //language
  const languageToUse = userId?.language || "vi";
  const eventTypeMessage = translateEventTypes(languageToUse);
  const workTimeMessage = translateWorkTimeMessages(languageToUse);
  const attendanceStartMessage = translateAttendanceStart(languageToUse);
  const attendanceEndMessage = translateAttendanceEnd(languageToUse);
  const eventMessage = translateEvent(languageToUse);
  const deleteEventMessage = translateDeleteEvent(languageToUse);
  const attendanceStaffMessage = translateAttendanceStaff(languageToUse);

  const [events, setEvents] = useState([
    { title: eventTypeMessage.birthday, id: "1" },
    { title: eventTypeMessage.overtime, id: "2" },
    { title: eventTypeMessage.shiftChange, id: "3" },
    { title: eventTypeMessage.dayOff, id: "4" },
    { title: eventTypeMessage.busy, id: "5" },
    { title: eventTypeMessage.other, id: "6" },
  ]);
  const [allEvents, setAllEvents] = useState<AllEventProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showNFCModal, setShowNFCModal] = useState(false);
  const [showChooseModal, setShowChooseaModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: "",
  });
  const [isCheckingAttendanceStart, setIsCheckingAttendanceStart] =
    useState(false);
  const [isCheckingAttendanceEnd, setIsCheckingAttendanceEnd] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [isDelayCheckAttendaceText, setDelayCheckAttendaceText] = useState("");
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [dataEventCamera, setDataEventCamera] = useState<string>();

  const filteredData =
    allEvents && allEvents.filter((item) => item.id === dataEventCamera);
  const isCheckAttendanceTitle = filteredData.map((item) => item.title);
  const isCheckAttendanceStart = filteredData.map((item) => item.start);
  const isCheckAttendanceEnd = filteredData.map((item) => item.end);

  //Check nếu như isEnd là true thì disable Button kết thúc
  useEffect(() => {
    // Loại bỏ các sự kiện có thuộc tính 'end' là null
    const filteredEvents = allEvents.filter((event) => event.end !== null);

    // Tìm sự kiện có thời gian bắt đầu mới nhất
    const latestStartEvent = filteredEvents.reduce(
      (prevEvent, currentEvent) => {
        // Chuyển đổi thời gian bắt đầu sang kiểu Date
        const prevStartTime = new Date(prevEvent.start);
        const currentStartTime = new Date(currentEvent.start);

        // So sánh thời gian bắt đầu của hai sự kiện
        return prevStartTime > currentStartTime ? prevEvent : currentEvent;
      },
      filteredEvents[0]
    ); // Khởi tạo giá trị ban đầu là phần tử đầu tiên của mảng
    const isEnd = latestStartEvent && latestStartEvent.isEnd;
    // latestStartEvent sẽ chứa sự kiện có thời gian bắt đầu mới nhất
    setIsEnd(isEnd);
  }, [allEvents]);

  //Check  nếu như trễ hơn 2 tiếng sẽ bị disable Button
  useEffect(() => {
    if (userId) {
      if (!userId.timestartwork) {
        toast.error(workTimeMessage.noWorkTime);
        return;
      }
      const now = new Date();
      const [hours, minutes] = userId.timestartwork.split(":");
      const currentDate = new Date();

      currentDate.setHours(parseInt(hours, 10));
      currentDate.setMinutes(parseInt(minutes, 10));
      const delayTime = now.getTime() - currentDate.getTime();
      const delayHours = delayTime / (1000 * 60 * 60); // 1000 milliseconds * 60 seconds * 60 minutes = 1 hour
      if (delayHours >= 1) {
        setDelayCheckAttendaceText(
          `${workTimeMessage.lateCheckIn} ${
            Math.floor(delayHours) +
            `${workTimeMessage.hours}` +
            Math.floor((delayHours % 1) * 60) +
            `${workTimeMessage.minutes}`
          } ${workTimeMessage.penalty}`
        );
      } else {
        setDelayCheckAttendaceText("");
      }
      // // Kiểm tra xem thời gian chậm trễ có lớn hơn hai giờ không
      if (delayHours >= 2 && now.getMinutes() >= 1) {
        // Xử lý khi trễ 2 tiếng 1 phút
        setIsCheckingAttendanceStart(true);
      } else {
        setIsCheckingAttendanceStart(false);
      }
      // console.log("now", now);
      // console.log("currentDate", currentDate);
      // console.log(
      //   "delayTime:",
      //   Math.floor(delayTime / (1000 * 60 * 60)) +
      //     " hours " +
      //     Math.floor((delayTime % (1000 * 60 * 60)) / (1000 * 60)) +
      //     " minutes " +
      //     Math.floor((delayTime % (1000 * 60)) / 1000) +
      //     " seconds"
      // );
      // console.log(
      //   "delayHours:",
      //   Math.floor(delayHours) +
      //     " hours " +
      //     Math.floor((delayHours % 1) * 60) +
      //     " minutes"
      // );
    }
  }, []);

  //DeleteTime now
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []); // Run only once on component mount

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !userId.id) {
        redirect("/auth/login");
      }
    };
    fetchData();
  }, [userId]);

  const imageCredentials = userId?.imageCredential || undefined;
  // Use the first image from imageCredential hoăc ảnh iamge nêu ko có thì dùng deafault
  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials : null) ||
    userId?.image;

  // Use a ref to track whether draggable setup has been done
  const draggableSetupRef = useRef(false);

  useEffect(() => {
    // Perform draggable setup only if it hasn't been done before
    if (!draggableSetupRef.current) {
      let draggableEl = document.getElementById("draggable-el");
      if (draggableEl) {
        new Draggable(draggableEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            let start = eventEl.getAttribute("start");
            return { title, id, start };
          },
        });
        // Update ref to indicate that draggable setup has been done
        draggableSetupRef.current = true;
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/${params.storeId}/eventcalendar`
        );
        // Update state with the received events
        setAllEvents(response.data);
      } catch (error: unknown) {
        if (
          (error as { response?: { data?: { error?: string } } }).response &&
          (error as { response: { data?: { error?: string } } }).response
            .data &&
          (error as { response: { data: { error?: string } } }).response.data
            .error
        ) {
          // Hiển thị thông báo lỗi cho người dùng
          toast.error(
            (error as { response: { data: { error: string } } }).response.data
              .error
          );
        } else {
          // Hiển thị thông báo lỗi mặc định cho người dùng
          toast.error(workTimeMessage.somethingWentWrong);
        }
      }
    };
    fetchData(); // Call the asynchronous function
  }, [params.storeId]);

  // Thêm state mới
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleCheckAttendanceStart = async () => {
    if (selectedDate) {
      setIsCheckingAttendanceEnd(true);
      setIsAddingEvent(true);
      setIsDeleting(false);
      const today = new Date();
      const dayName = format(today, "EEEE"); // 'EEEE' là định dạng để lấy tên của thứ trong tiếng Anh

      const isToday =
        today.getDate() === selectedDate.getDate() &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getFullYear() === selectedDate.getFullYear();

      if (!isToday) {
        // Show a message or handle the case where it's not today
        toast.error(attendanceStartMessage.cannotCheckInForAnotherDay);
        setIsCheckingAttendanceStart(false);
        setIsCheckingAttendanceEnd(false);
        setIsAddingEvent(false);
        setIsDeleting(false);
        return;
      }

      const dateWorkAttendance = userId?.daywork.join(", ");

      if (dateWorkAttendance && !dateWorkAttendance.includes(dayName)) {
        toast.error(attendanceStartMessage.notYourWorkday);
        setIsCheckingAttendanceStart(false);
        setIsCheckingAttendanceEnd(false);
        setIsAddingEvent(false);
        setIsDeleting(false);
        return;
      }

      try {
        const currentTime = new Date();
        // Giả sử user.timestartwork có dạng "HH:mm" (ví dụ: "07:00")
        if (userId && userId.timestartwork) {
          // Tách giờ và phút từ chuỗi user.timestartwork
          const [hours, minutes] = userId.timestartwork.split(":");
          // Lấy ngày hiện tại
          const currentDate = new Date();
          // Đặt giờ và phút từ user.timestartwork vào ngày hiện tại
          currentDate.setHours(parseInt(hours, 10));
          currentDate.setMinutes(parseInt(minutes, 10));
          if (currentTime.getTime() < currentDate.getTime()) {
            toast.error(
              `${attendanceStartMessage.checkInNotYetTime}:${userId?.timestartwork}!`
            );
          } else {
            const existingEventToday = allEvents.find((event) => {
              const eventDate = new Date(event.start);
              return (
                event.attendancestart === "❎" &&
                eventDate.getDate() === selectedDate.getDate() &&
                eventDate.getMonth() === selectedDate.getMonth() &&
                eventDate.getFullYear() === selectedDate.getFullYear()
              );
            });

            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const existingEventTomorrow = allEvents.find((event) => {
              const eventDate = new Date(event.start);
              return (
                event.attendancestart === "❎" &&
                eventDate.getDate() === tomorrow.getDate() &&
                eventDate.getMonth() === tomorrow.getMonth() &&
                eventDate.getFullYear() === tomorrow.getFullYear()
              );
            });

            if (existingEventToday || existingEventTomorrow) {
              // If attendance record already exists for the day, show a message
              toast.error(attendanceStartMessage.alreadyCheckedIn);
              setIsCheckingAttendanceEnd(false);
              setIsCheckingAttendanceStart(false);
              setIsAddingEvent(false);
              setIsDeleting(false);
            } else {
              const now = new Date();
              const currentDateTime = addSeconds(
                addMinutes(
                  addHours(now, selectedDate.getHours()),
                  selectedDate.getMinutes()
                ),
                selectedDate.getSeconds()
              );
              const vnTimeZone = "Asia/Ho_Chi_Minh";
              const zonedDateTime = utcToZonedTime(currentDateTime, vnTimeZone);
              const formattedDate = format(
                zonedDateTime,
                "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
              );

              const response = await axios.post(
                `/api/${params.storeId}/eventcalendar`,
                {
                  attendancestart: "❎",
                  title: "❎",
                  start: formattedDate,
                }
              );
              router.refresh();
              // Update state with the new event from the response
              setAllEvents((prevEvents) => [...prevEvents, response.data]);
              setIsCheckingAttendanceStart(false);
              setIsCheckingAttendanceEnd(false);
              setIsAddingEvent(false);
              setIsDeleting(false);

              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } border-2 border-green-500 max-w-xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <Avatar>
                          {avatarImage ? (
                            <AvatarImage src={avatarImage} />
                          ) : (
                            <AvatarFallback className="bg-sky-500">
                              <User className="text-white" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-green-500 font-bold flex">
                          <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
                          {attendanceStartMessage.checkInSuccess}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {attendanceStartMessage.user}
                          <span className="font-bold text-blue-500">
                            {userId?.name}
                          </span>
                          - <span className="font-bold">{userId?.email}</span>.
                          {attendanceStartMessage.startTime}:
                          <span className="font-bold">
                            {response.data?.start
                              ? format(
                                  utcToZonedTime(
                                    subHours(new Date(response.data?.start), 7),
                                    vietnamTimeZone
                                  ),
                                  "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                                  { locale: viLocale }
                                )
                              : null}
                          </span>{" "}
                          {attendanceStartMessage.endTime}:{" "}
                          <span className="font-bold">
                            {response.data?.end
                              ? format(
                                  utcToZonedTime(
                                    subHours(new Date(response.data?.end), 7),
                                    vietnamTimeZone
                                  ),
                                  "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                                  { locale: viLocale }
                                )
                              : null}
                          </span>
                          .{" "}
                          <span className="font-bold text-red-500">
                            {isDelayCheckAttendaceText}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {attendanceStartMessage.close}
                    </button>
                  </div>
                </div>
              ));
            }
          }
        }
      } catch (error: unknown) {
        if (
          (error as { response?: { data?: { error?: string } } }).response &&
          (error as { response: { data?: { error?: string } } }).response
            .data &&
          (error as { response: { data: { error?: string } } }).response.data
            .error
        ) {
          // Hiển thị thông báo lỗi cho người dùng
          toast.error(
            (error as { response: { data: { error: string } } }).response.data
              .error
          );
        } else {
          // Hiển thị thông báo lỗi mặc định cho người dùng
          toast.error(attendanceStartMessage.checkOutNotYetTime);
        }
        // Handle request error
        setIsCheckingAttendanceStart(false);
        setIsCheckingAttendanceEnd(false);
        setIsAddingEvent(false);
        setIsDeleting(false);
      }
    }
  };

  const handleCheckAttendanceEnd = async () => {
    if (selectedDate) {
      setIsCheckingAttendanceEnd(true);
      setIsCheckingAttendanceStart(true);
      setIsAddingEvent(true);
      setIsDeleting(false);
      const today = new Date();
      const dayName = format(today, "EEEE"); // 'EEEE' là định dạng để lấy tên của thứ trong tiếng Anh

      const isToday =
        today.getDate() === selectedDate.getDate() &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getFullYear() === selectedDate.getFullYear();

      if (!isToday) {
        // Show a message or handle the case where it's not today
        toast.error(attendanceEndMessage.cannotCheckOutForAnotherDay);
        setIsCheckingAttendanceEnd(false);
        setIsCheckingAttendanceStart(false);
        setIsAddingEvent(false);
        setIsDeleting(false);
        return;
      }

      const dateWorkAttendance = userId?.daywork.join(", ");

      if (dateWorkAttendance && !dateWorkAttendance.includes(dayName)) {
        toast.error(attendanceEndMessage.notYourWorkday);
        setIsCheckingAttendanceStart(false);
        setIsCheckingAttendanceEnd(false);
        setIsAddingEvent(false);
        setIsDeleting(false);
        return;
      }

      try {
        if (isEnd === true) {
          toast.error(attendanceEndMessage.alreadyCheckedOut);
          setIsCheckingAttendanceEnd(false);
          setIsCheckingAttendanceStart(false);
          setIsAddingEvent(false);
          setIsDeleting(false);
        } else {
          const now = new Date();
          const currentDateTime = addSeconds(
            addMinutes(
              addHours(now, selectedDate.getHours()),
              selectedDate.getMinutes()
            ),
            selectedDate.getSeconds()
          );
          const vnTimeZone = "Asia/Ho_Chi_Minh";
          const zonedDateTime = utcToZonedTime(currentDateTime, vnTimeZone);
          const formattedDate = format(
            zonedDateTime,
            "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
          );

          await axios.get(`/api/${params.storeId}/eventcalendarend`);
          const postResponse = await axios.post(
            `/api/${params.storeId}/eventcalendarend`,
            {
              attendanceend: "✅",
              title: "✅",
              start: formattedDate,
              end: null,
            }
          );
          router.refresh();
          // Update state with the new event from the response
          setAllEvents((prevEvents) => [...prevEvents, postResponse.data]);
          setIsCheckingAttendanceEnd(false);
          setIsCheckingAttendanceStart(false);
          setIsAddingEvent(false);
          setIsDeleting(false);

          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } border-2 border-green-500 max-w-xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Avatar>
                      {avatarImage ? (
                        <AvatarImage src={avatarImage} />
                      ) : (
                        <AvatarFallback className="bg-sky-500">
                          <User className="text-white" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-green-500 font-bold flex">
                      <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
                      {attendanceEndMessage.checkOutSuccess}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {attendanceEndMessage.user}
                      <span className="font-bold text-blue-500">
                        {userId?.name}
                      </span>{" "}
                      - <span className="font-bold">{userId?.email}</span>.{" "}
                      {attendanceEndMessage.endTime}:
                      <span className="font-bold">
                        {postResponse.data?.start
                          ? format(
                              utcToZonedTime(
                                subHours(new Date(postResponse.data?.start), 7),
                                vietnamTimeZone
                              ),
                              "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                              { locale: viLocale }
                            )
                          : null}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {attendanceEndMessage.close}
                </button>
              </div>
            </div>
          ));
        }
      } catch (error: unknown) {
        if (
          (error as { response?: { data?: { error?: string } } }).response &&
          (error as { response: { data?: { error?: string } } }).response
            .data &&
          (error as { response: { data: { error?: string } } }).response.data
            .error
        ) {
          setIsCheckingAttendanceEnd(false);
          setIsCheckingAttendanceStart(false);
          setIsAddingEvent(false);
          setIsDeleting(false);
          // Hiển thị thông báo lỗi cho người dùng
          toast.error(
            (error as { response: { data: { error: string } } }).response.data
              .error
          );
        } else {
          // Hiển thị thông báo lỗi mặc định cho người dùng
          toast.error(attendanceEndMessage.checkOutNotYetTime);
        }
        setIsCheckingAttendanceEnd(false);
        setIsCheckingAttendanceStart(false);
        setIsAddingEvent(false);
        setIsDeleting(false);
      }
    }
  };
  // Hàm xử lý khi ngày được chọn trên lịch
  const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
    setSelectedDate(arg.date);
  };

  function addEvent(data: DropArg) {
    // Check if the event is being dropped (not clicked)
    if (data.date) {
      const draggedDate = data.draggedEl.getAttribute("data-date");
      const eventDate = draggedDate ? new Date(draggedDate) : data.date;

      const event = {
        ...newEvent,
        start: data.date,
        title: data.draggedEl.innerText,
        allDay: data.allDay,
        id: new Date().getTime(),
      };

      // Check if the event already exists
      const eventExists = allEvents.some(
        (existingEvent) =>
          existingEvent.title === event.title &&
          existingEvent.start === event.start
      );

      if (!eventExists) {
        // Assuming you have a storeId variable available
        const storeId = params.storeId;

        // Check the number of events for the current date
        const eventsCountForCurrentDate = allEvents.reduce(
          (count, existingEvent) =>
            new Date(existingEvent.start).toDateString() ===
            eventDate.toDateString()
              ? count + 1
              : count,
          0
        );
        setIsCheckingAttendanceEnd(true);
        setIsCheckingAttendanceStart(true);
        setIsAddingEvent(true);
        setIsDeleting(true); // Bắt đầu xử lý POST request
        if (eventsCountForCurrentDate < 3) {
          // Make a POST request to add the event to the database
          axios
            .patch(`/api/${storeId}/eventcalendar`, event)
            .then((response) => {
              setAllEvents((prevEvents) => [...prevEvents, response.data]);
              router.refresh();
              setIsCheckingAttendanceEnd(false);
              setIsCheckingAttendanceStart(false);
              setIsAddingEvent(false);
              setIsDeleting(false);
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } border-2 border-green-500 max-w-xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <Avatar>
                          {avatarImage ? (
                            <AvatarImage src={avatarImage} />
                          ) : (
                            <AvatarFallback className="bg-sky-500">
                              <User className="text-white" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-green-500 font-bold flex">
                          <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
                          {eventMessage.eventAddedSuccess}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {eventMessage.user}
                          <span className="font-bold text-blue-500">
                            {userId?.name}
                          </span>
                          - <span className="font-bold">{userId?.email}</span>.
                          {eventMessage.eventAddedMessage}
                          <span className="font-bold text-red-500">
                            {event.title}
                          </span>{" "}
                          {eventMessage.eventAddedAt}:{" "}
                          <span className="font-bold">
                            {response.data?.start
                              ? format(
                                  utcToZonedTime(
                                    subHours(new Date(response.data?.start), 7),
                                    vietnamTimeZone
                                  ),
                                  "E '-' dd/MM/yyyy '-' HH:mm:ss a",
                                  { locale: viLocale }
                                )
                              : null}
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {eventMessage.close}
                    </button>
                  </div>
                </div>
              ));
            })
            .catch((error) => {
              // Handle request error
              if (
                error.response &&
                error.response.data &&
                error.response.data.error
              ) {
                // Hiển thị thông báo lỗi cho người dùng
                toast.error(error.response.data.error);
              } else {
                // Hiển thị thông báo lỗi mặc định cho người dùng
                toast.error(eventMessage.eventAddError);
              }
              setIsCheckingAttendanceEnd(false);
              setIsCheckingAttendanceStart(false);
              setIsAddingEvent(false);
              setIsDeleting(false);
            });
        } else {
          // Notify the user that the limit is reached
          toast.error(translateEventLimit(languageToUse, event.title));
          setIsCheckingAttendanceEnd(false);
          setIsCheckingAttendanceStart(false);
          setIsAddingEvent(false);
          setIsDeleting(false);
        }
      }
    }
  }

  //Camera
  const handleOpenCameraModal = () => {
    setShowCameraModal(true);
    setShowChooseaModal(false);
  };

  //NFC
  const handleOpenNFCModal = () => {
    setShowNFCModal(true);
    setShowChooseaModal(false);
  };

  //Choose NFC or Camera
  const handleOpenChooseModal = () => {
    setShowChooseaModal(true);
  };

  function handleDeleteModal(data: { event: { id: string; title: string } }) {
    // Check if the event title is "✅"
    if (data.event.title === "✅") {
      handleOpenChooseModal();
      setDataEventCamera(data.event.id);
      return;
    } else if (data.event.title === "❎") {
      return;
    }
    // Nếu title không phải là "✅" hoặc "❎", tiếp tục hiển thị AlertModal
    setShowDeleteModal(true);
    setIdToDelete(data.event.id);
  }

  function handleDelete() {
    if (idToDelete !== null) {
      setIsDeleting(true);
      // Assuming you have a storeId variable available
      const storeId = params.storeId;

      let isEventFound = false;
      // Check if the event with title "❎" or "✅" exists
      allEvents.forEach((event) => {
        if (
          String(event.id) === String(idToDelete) &&
          (event.title === "❎" || event.title === "✅")
        ) {
          isEventFound = true;
        }
      });

      if (isEventFound) {
        // If the event with title "❎" or "✅" is found, show an error message
        toast.error(deleteEventMessage.cannotDeleteEvent);
        setIsDeleting(false);
        return;
      }

      // Convert idToDelete to a string before making the DELETE request
      const eventIdToDelete = idToDelete;
      // Make a DELETE request to delete the event from the database
      axios
        .delete(`/api/${storeId}/eventcalendar`, {
          data: { eventId: eventIdToDelete, userId: userId?.id },
        })
        .then((response) => {
          // Update state to remove the deleted event
          setAllEvents(
            allEvents.filter((event) => String(event.id) !== String(idToDelete))
          );
          setShowDeleteModal(false);
          setIdToDelete(null);

          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } border-2 border-green-500 max-w-xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Avatar>
                      {avatarImage ? (
                        <AvatarImage src={avatarImage} />
                      ) : (
                        <AvatarFallback className="bg-sky-500">
                          <User className="text-white" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-green-500 font-bold flex">
                      <Check className="w-5 h-5 rounded-full bg-green-500 text-white mx-1" />
                      {deleteEventMessage.eventDeletedSuccess}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {deleteEventMessage.user}
                      <span className="font-bold text-blue-500">
                        {userId?.name}
                      </span>{" "}
                      - <span className="font-bold">{userId?.email}</span>.{" "}
                      {deleteEventMessage.eventDeletedMessage}{" "}
                      {response.data.title} {deleteEventMessage.eventDeletedAt}:{" "}
                      <span className="font-bold">{currentTime}</span>.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {deleteEventMessage.close}
                </button>
              </div>
            </div>
          ));
        })
        .catch((error) => {
          // Handle request error
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            // Hiển thị thông báo lỗi cho người dùng
            setShowDeleteModal(false);
            toast.error(error.response.data.error);
          } else {
            // Hiển thị thông báo lỗi mặc định cho người dùng
            toast.error(deleteEventMessage.eventDeleteError);
          }
        })
        .finally(() => {
          setIsDeleting(false); // Set loading state back to false
        });
    } else {
      // Handle the case where idToDelete is null
      if (idToDelete !== null) {
        toast.error(translateInvalidIdToDelete(languageToUse, idToDelete));
      }
    }
  }

  function handleCloseModal() {
    // Check if deletion is in progress, disable cancel button if true
    if (isDeleting) {
      return;
    }

    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: "",
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <nav className="flex justify-center xl:justify-between mb-12 xl:mb-0 p-8">
        <h1 className="font-bold text-2xl text-gray-700 absolute dark:text-slate-400">
          {attendanceStaffMessage.user}
        </h1>
      </nav>
      <main className="flex flex-col items-center justify-between">
        <div className="grid grid-cols-1 xl:grid-cols-10 w-full xl:p-12">
          <div
            id="draggable-el"
            className="grid grid-rows-[auto,1fr] ml-0 mb-8 xl:mb-0 w-full border-2 p-2 rounded-md xl:-ml-8 xl:h-[55%] 2xl:h-[35%] bg-violet-50 dark:bg-[#2a3e4f] xl:sticky xl:top-40"
          >
            <h1 className="flex items-center justify-center gap-x-1 font-bold text-lg mb-2 text-center text-black dark:text-white">
              {attendanceStaffMessage.dragEvent}
              <Hint label="Drag and drop events onto the date." side="top">
                <Info className="w-4 h-4" />
              </Hint>
            </h1>
            <div className="flex items-center justify-between md:block gap-3 xl:space-x-0">
              {events.map((event) => (
                <div
                  className={`fc-event border-2 p-1 mb-2 w-full rounded-md text-center bg-white dark:text-black ${
                    isAddingEvent ? "pointer-events-none opacity-50" : "" // Disable khi đang xử lý
                  }`}
                  title={event.title}
                  key={event.id}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 xl:col-span-8">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin,
                multiMonthPlugin,
              ]}
              headerToolbar={{
                left: "prevYear,prev,next,nextYear today",
                center: "title",
                right: "timeGridWeek,dayGridMonth,multiMonthYear",
              }}
              events={allEvents as EventSourceInput}
              nowIndicator={true}
              editable={false}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
              timeZone="Asia/Ho_Chi_Minh"
              locale="vi"
              eventDidMount={function (info) {
                // Kiểm tra nếu tiêu đề là "✅" hoặc "❎"
                if (info.event.title === "✅" || info.event.title === "❎") {
                  info.event.setProp("editable", false); // Không thể chỉnh sửa
                } else {
                  info.event.setProp("editable", true); // Có thể chỉnh sửa
                }
              }}
            />
          </div>
        </div>

        <AlertModal
          isOpen={showDeleteModal}
          onClose={handleCloseModal}
          onConfirm={handleDelete}
          loading={isDeleting}
          languageToUse={languageToUse}
        />

        <CameraModal
          isOpen={showCameraModal}
          dataEventCamera={dataEventCamera}
          isCheckAttendanceTitle={isCheckAttendanceTitle[0]}
          isCheckAttendanceStart={isCheckAttendanceStart[0]}
          isCheckAttendanceEnd={isCheckAttendanceEnd[0]}
          setShowCameraModal={setShowCameraModal}
          onClose={() => setShowCameraModal(false)}
          loading={false}
          userId={userId?.name}
          languageToUse={languageToUse}
        />

        <NfcModal
          isOpen={showNFCModal}
          loading={false}
          isCheckAttendanceTitle={isCheckAttendanceTitle[0]}
          isCheckAttendanceStart={isCheckAttendanceStart[0]}
          isCheckAttendanceEnd={isCheckAttendanceEnd[0]}
          userId={userId?.name}
          setShowNFCModal={setShowNFCModal}
          onClose={() => setShowNFCModal(false)}
          dataEventNFC={dataEventCamera}
          languageToUse={languageToUse}
        />

        <ChooseAttendanceModal
          isOpen={showChooseModal}
          isCheckAttendanceTitle={isCheckAttendanceTitle[0]}
          isCheckAttendanceStart={isCheckAttendanceStart[0]}
          isCheckAttendanceEnd={isCheckAttendanceEnd[0]}
          onClose={() => setShowChooseaModal(false)}
          userId={userId?.name}
          handleOpenCameraModal={handleOpenCameraModal}
          handleOpenNFCModal={handleOpenNFCModal}
          languageToUse={languageToUse}
        />

        <div className="xl:fixed bottom-4 left-0 z-[9999] m-3 w-full flex justify-center xl:justify-normal item-center space-x-5">
          <Button
            onClick={handleCheckAttendanceStart}
            className="px-4 py-2 rounded-md"
            disabled={isCheckingAttendanceStart}
          >
            {attendanceStaffMessage.attendance}
          </Button>

          <Button
            onClick={handleCheckAttendanceEnd}
            className="px-4 py-2 rounded-md"
            disabled={
              isCheckingAttendanceEnd ||
              isEnd === true
            }
          >
            {attendanceStaffMessage.finish}
          </Button>
        </div>
      </main>
    </RoleGate>
  );
}
