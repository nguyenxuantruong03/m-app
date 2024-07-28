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
import { Check, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAccountByUserId } from "@/data/account";
import viLocale from "date-fns/locale/vi";
import { CameraModal } from "@/components/modals/camera-modal";
import { ChooseAttendanceModal } from "@/components/modals/chooseAttendance-modal";
import { NfcModal } from "@/components/modals/nfc-modal";
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
  const [events, setEvents] = useState([
    { title: "Sinh nhật", id: "1" },
    { title: "Tăng ca", id: "2" },
    { title: "Đổi giờ", id: "3" },
    { title: "Nghỉ làm", id: "4" },
    { title: "Bận", id: "5" },
    { title: "Khác", id: "6" },
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
  const [isAttendanceStartCalled, setIsAttendanceStartCalled] = useState(false);
  const [account, setAccount] = useState<AccountItem | null>(null);
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
      const now = new Date();
      const [hours, minutes] = userId.timestartwork.split(":");
      const currentDate = new Date();

      currentDate.setHours(parseInt(hours, 10));
      currentDate.setMinutes(parseInt(minutes, 10));
      const delayTime = now.getTime() - currentDate.getTime();
      const delayHours = delayTime / (1000 * 60 * 60); // 1000 milliseconds * 60 seconds * 60 minutes = 1 hour
      if (delayHours >= 1) {
        setDelayCheckAttendaceText(
          `Bạn đã điểm danh trễ ${
            Math.floor(delayHours) +
            " giờ " +
            Math.floor((delayHours % 1) * 60) +
            " phút"
          } và bị -50.000đ. Lý do: Điểm danh trễ.`
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

      try {
        const accountData = await getAccountByUserId(userId.id);
        setAccount(accountData || null);
      } catch (error) {
        toast.error("Invalid Error");
      }
    };
    fetchData();
  }, [userId]);
  
  const imageCredentials = userId?.imageCredential || undefined;
  const isGitHubOrGoogleUser =
    account?.provider === "github" ||
    account?.provider === "google" ||
    account?.provider === "facebook" ||
    account?.provider === "gitlab" ||
    account?.provider === "reddit" ||
    account?.provider === "spotify" ||
    account?.provider === "twitter";
  // Use the first image from imageCredential if available, or randomImage if available
  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials[0] : null) ||
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

  //Dùng để check nếu như ngày hiện tại chưa có ❎ thì disable nếu có thì không
  useEffect(() => {
    const today = new Date();
    const todayEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.start);
      const vnTimeZone = "Asia/Ho_Chi_Minh";
      const zonedDateTimeVN = utcToZonedTime(eventDate, vnTimeZone);
      return (
        zonedDateTimeVN.getDate() === today.getDate() &&
        zonedDateTimeVN.getMonth() === today.getMonth() &&
        zonedDateTimeVN.getFullYear() === today.getFullYear()
      );
    });
    // Kiểm tra nếu có ít nhất một sự kiện trong ngày hiện tại và có ít nhất một sự kiện có attendancestart === "❎"
    const isAttendanceStartCalled = todayEvents.some(
      (event) => event.attendancestart === "❎"
    );
    // Nếu có ít nhất một sự kiện có attendancestart === "❎", không disable, ngược lại thì disable
    setIsAttendanceStartCalled(isAttendanceStartCalled);
  }, [allEvents]);

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
          toast.error("Error fetching data.");
        }
      }
    };
    fetchData(); // Call the asynchronous function
  }, [params.storeId]);

  // Thêm state mới
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleCheckAttendanceStart = async () => {
    if (selectedDate) {
      setIsCheckingAttendanceStart(true);
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
        toast.error("Không thể điểm danh cho ngày khác!");
        setIsCheckingAttendanceStart(false);
        setIsCheckingAttendanceEnd(false);
        setIsAddingEvent(false);
        setIsDeleting(false);
        return;
      }

      const dateWorkAttendance = userId?.daywork.join(", ");

      if (dateWorkAttendance && !dateWorkAttendance.includes(dayName)) {
        toast.error("Hôm nay không phải lịch làm của bạn!");
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
          if (currentTime.getTime() <= currentDate.getTime()) {
            toast.error(
              `Chưa đến giờ điểm danh hãy quay lại lúc:${userId?.timestartwork}!`
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
              toast.error("Đã điểm danh cho hôm nay!");
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
                          {isGitHubOrGoogleUser && avatarImage ? (
                            <AvatarImage src={avatarImage} />
                          ) : avatarImage ? (
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
                          Điểm danh thành công!
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Người dùng{" "}
                          <span className="font-bold text-blue-500">
                            {userId?.name}
                          </span>{" "}
                          - <span className="font-bold">{userId?.email}</span>.
                          Bắt đầu làm vào lúc:{" "}
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
                          và kết thúc vào lúc:{" "}
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
                      Close
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
          toast.error("Đã xảy ra lỗi khi thêm sự kiện.");
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
        toast.error("Không thể kết thúc cho ngày khác!");
        setIsCheckingAttendanceEnd(false);
        setIsCheckingAttendanceStart(false);
        setIsAddingEvent(false);
        setIsDeleting(false);
        return;
      }

      const dateWorkAttendance = userId?.daywork.join(", ");

      if (dateWorkAttendance && !dateWorkAttendance.includes(dayName)) {
        toast.error("Hôm nay không phải lịch làm của bạn!");
        setIsCheckingAttendanceStart(false);
        setIsCheckingAttendanceEnd(false);
        setIsAddingEvent(false);
        setIsDeleting(false);
        return;
      }

      try {
        if (isEnd === true) {
          toast.error("Đã kết thúc cho ngày hiện tại!");
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
                      {isGitHubOrGoogleUser && avatarImage ? (
                        <AvatarImage src={avatarImage} />
                      ) : avatarImage ? (
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
                      Kết thúc thành công!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Người dùng{" "}
                      <span className="font-bold text-blue-500">
                        {userId?.name}
                      </span>{" "}
                      - <span className="font-bold">{userId?.email}</span>. Bạn
                      đã kết thúc vào lúc:{" "}
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
                  Close
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
          toast.error("Chưa đến lúc để kêt thúc!");
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
                          {isGitHubOrGoogleUser && avatarImage ? (
                            <AvatarImage src={avatarImage} />
                          ) : avatarImage ? (
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
                          Thêm sự kiện thành công!
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Người dùng{" "}
                          <span className="font-bold text-blue-500">
                            {userId?.name}
                          </span>{" "}
                          - <span className="font-bold">{userId?.email}</span>.
                          Bạn thêm sự kiện{" "}
                          <span className="font-bold text-red-500">
                            {event.title}
                          </span>{" "}
                          vào lúc:{" "}
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
                      Close
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
                toast.error("Đã xảy ra lỗi khi thêm sự kiện.");
              }
              setIsCheckingAttendanceEnd(false);
              setIsCheckingAttendanceStart(false);
              setIsAddingEvent(false);
              setIsDeleting(false);
            });
        } else {
          // Notify the user that the limit is reached
          toast.error(
            "Đã quá số lần sự kiện trong 1 ngày. Không thể thêm: " + event.title
          );
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
    // Check if the event title is "✅" or "❎"
    if (data.event.title === "✅" || data.event.title === "❎") {
        handleOpenChooseModal();
        setDataEventCamera(data.event.id);
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
        toast.error("Không thể xóa sự kiện này.");
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
          // Check if the deleted event was the last attendance start event
          const isStartEventDeleted = allEvents.some(
            (event) =>
              event.attendancestart === "❎" &&
              String(event.id) !== String(idToDelete)
          );
          if (isStartEventDeleted) {
            setIsAttendanceStartCalled(false); // Reset isAttendanceStartCalled if start event is deleted
          }
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
                      {isGitHubOrGoogleUser && avatarImage ? (
                        <AvatarImage src={avatarImage} />
                      ) : avatarImage ? (
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
                      Xóa sự kiện thành công!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Người dùng{" "}
                      <span className="font-bold text-blue-500">
                        {userId?.name}
                      </span>{" "}
                      - <span className="font-bold">{userId?.email}</span>. Bạn
                      đã xóa sự kiện {response.data.title} vào lúc:{" "}
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
                  Close
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
            toast.error("Đã xảy ra lỗi khi xóa sự kiện.");
          }
        })
        .finally(() => {
          setIsDeleting(false); // Set loading state back to false
        });
    } else {
      // Handle the case where idToDelete is null
      if (idToDelete !== null) {
        toast.error("Invalid idToDelete:", idToDelete);
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
    <>
      <nav className="flex justify-between mb-12 p-4">
        <h1 className="font-bold text-2xl text-gray-700 absolute dark:text-slate-400">
          Nhân viên điểm danh
        </h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
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
              eventDidMount={function(info) {
                // Kiểm tra nếu tiêu đề là "✅" hoặc "❎"
                if (info.event.title === "✅" || info.event.title === "❎") {
                  info.event.setProp('editable', false); // Không thể chỉnh sửa
                } else {
                  info.event.setProp('editable', true); // Có thể chỉnh sửa
                }
              }}
            />
          </div>
          <div
            id="draggable-el"
            className="ml-8 w-full border-2 p-2 rounded-md mt-16 xl:h-[55%] 2xl:h-[35%] bg-violet-50 dark:bg-[#2a3e4f]"
          >
            <h1 className="font-bold text-lg text-center dark:text-black">
              Drag Event
            </h1>
            {events.map((event) => (
              <div
                className={`fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white cursor-pointer dark:text-black ${
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

        <AlertModal
          isOpen={showDeleteModal}
          onClose={handleCloseModal}
          onConfirm={handleDelete}
          loading={isDeleting}
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
        />

        <div className="fixed bottom-4 right-32">
          <Button
            onClick={handleCheckAttendanceStart}
            className="px-4 py-2 rounded-md"
            disabled={isCheckingAttendanceStart}
          >
            Điểm danh
          </Button>
        </div>

        <div className="fixed bottom-4 right-4">
          <Button
            onClick={handleCheckAttendanceEnd}
            className="px-4 py-2 rounded-md"
            disabled={
              !isAttendanceStartCalled ||
              isCheckingAttendanceEnd ||
              isEnd === true
            }
          >
            Kết thúc
          </Button>
        </div>
      </main>
    </>
  );
}
