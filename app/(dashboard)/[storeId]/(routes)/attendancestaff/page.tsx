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
import { useParams } from "next/navigation";
import { format, addHours, addMinutes, addSeconds } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AlertModal } from "@/components/modals/alert-modal";
interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
  attendancestart?: string;
  attendanceend?: string;
}

export default function Home() {
  const params = useParams();
  const userId = useCurrentUser();
  const [events, setEvents] = useState([
    { title: "Sinh nhật", id: "1" },
    { title: "Tăng ca", id: "2" },
    { title: "Đổi giờ", id: "3" },
    { title: "Nghỉ làm", id: "4" },
    { title: "Bận", id: "5" },
    { title: "Khác", id: "6" },
  ]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });
  const [isCheckingAttendanceStart, setIsCheckingAttendanceStart] =
    useState(false);
  const [isCheckingAttendanceEnd, setIsCheckingAttendanceEnd] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isAttendanceStartCalled, setIsAttendanceStartCalled] = useState(false);
  const [isEventEnded, setIsEventEnded] = useState(false);

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
    const today = new Date();
    const todayEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.start);
      const vnTimeZone = "Asia/Ho_Chi_Minh";
      const zonedDateTimeVN = utcToZonedTime(eventDate, vnTimeZone);
      return (
        event.attendancestart === "❎" &&
        zonedDateTimeVN.getDate() === today.getDate() &&
        zonedDateTimeVN.getMonth() === today.getMonth() &&
        zonedDateTimeVN.getFullYear() === today.getFullYear()
      );
    });

    // Nếu có sự kiện, đặt state để chỉ định rằng đã gọi cho ngày hiện tại
    if (todayEvents.length > 0) {
      setIsAttendanceStartCalled(true);
    }
  }, [allEvents]);

  useEffect(() => {
    const hasEventEnded = allEvents.some((event) => {
      const eventDate = new Date(event.start);
      const today = new Date();
      today.setHours(today.getHours() + 7);
      const vnTimeZone = "Asia/Ho_Chi_Minh";
      const zonedDateTimeVN = utcToZonedTime(eventDate, vnTimeZone);
      return (
        event.title === "✅" &&
        zonedDateTimeVN.getDate() === today.getDate() &&
        zonedDateTimeVN.getMonth() === today.getMonth() &&
        zonedDateTimeVN.getFullYear() === today.getFullYear()
      );
    });

    // Cập nhật trạng thái isEventEnded
    setIsEventEnded(hasEventEnded);
  }, [allEvents]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/${params.storeId}/eventcalendar`
        );
        // Update state with the received events
        setAllEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      const today = new Date();
      const isToday =
        today.getDate() === selectedDate.getDate() &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getFullYear() === selectedDate.getFullYear();

      if (!isToday) {
        // Show a message or handle the case where it's not today
        toast.error("Không thể điểm danh cho ngày khác!");
        setIsCheckingAttendanceStart(false);
        setIsCheckingAttendanceEnd(false);
        return;
      }

      try {
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
          toast.error("Đã điểm danh cho ngày này!");
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

          // Update state with the new event from the response
          setAllEvents((prevEvents) => [...prevEvents, response.data]);
          toast.success("Điểm danh thành công.");
        }
        setIsCheckingAttendanceStart(false);
        setIsCheckingAttendanceEnd(false);
      } catch (error) {
        // Handle request error
        setIsCheckingAttendanceStart(false);
        setIsCheckingAttendanceEnd(false);
        console.error("Error adding event:", error);
        toast.error("Đã xảy ra lỗi khi thêm sự kiện.");
      }
    }
  };

  const handleCheckAttendanceEnd = async () => {
    if (selectedDate) {
      setIsCheckingAttendanceEnd(true);
      setIsCheckingAttendanceStart(true);
      const today = new Date();
      const isToday =
        today.getDate() === selectedDate.getDate() &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getFullYear() === selectedDate.getFullYear();

      if (!isToday) {
        // Show a message or handle the case where it's not today
        toast.error("Không thể kết thúc cho ngày khác!");
        setIsCheckingAttendanceEnd(false);
        setIsCheckingAttendanceStart(false);
        return;
      }
      try {
        if (isEventEnded) {
          toast.error("Đã kết thúc cho ngày này!");
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

          // Update state with the new event from the response
          setAllEvents((prevEvents) => [...prevEvents, postResponse.data]);
          toast.success("Kết thúc thành công.");
        }
        setIsCheckingAttendanceEnd(false);
        setIsCheckingAttendanceStart(false);
      } catch (error) {
        // Handle request error
        console.error("Error checking or adding event:", error);
        toast.error("Chưa đến lúc để kêt thúc!");
        setIsCheckingAttendanceEnd(false);
        setIsCheckingAttendanceStart(false);
      }
    }
  };

  // Hàm xử lý khi ngày được chọn trên lịch
  const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
    setSelectedDate(arg.date);
    // Hiển thị modal hoặc thực hiện hành động khác nếu cần
  };

  function addEvent(data: DropArg) {
    // Check if the event is being dropped (not clicked)
    if (data.date) {
      const draggedDate = data.draggedEl.getAttribute("data-date");
      const eventDate = draggedDate ? new Date(draggedDate) : data.date;
      const currentTimeVN = new Date();
      // Thêm 7 giờ vào currentTimeVN
      currentTimeVN.setHours(currentTimeVN.getHours() + 7);
      const eventDateTimeVN = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        currentTimeVN.getHours(),
        currentTimeVN.getMinutes(),
        currentTimeVN.getSeconds()
      );
      const vnTimeZone = "Asia/Ho_Chi_Minh";
      const zonedDateTime = utcToZonedTime(eventDateTimeVN, vnTimeZone);
      const formattedDate = format(
        zonedDateTime,
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
      );
      const event = {
        ...newEvent,
        start: formattedDate,
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
        setIsAddingEvent(true); // Bắt đầu xử lý POST request
        if (eventsCountForCurrentDate < 3) {
          // Make a POST request to add the event to the database
          axios
            .patch(`/api/${storeId}/eventcalendar`, event)
            .then((response) => {
              toast.success("Thêm thành công: " + event.title);
              setAllEvents((prevEvents) => [...prevEvents, response.data]);
              setIsAddingEvent(false);
            })
            .catch((error) => {
              // Handle request error
              console.error("Error adding event:", error);
              toast.error("Đã xảy ra lỗi khi thêm sự kiện.");
              setIsAddingEvent(false);
            });
        } else {
          // Notify the user that the limit is reached
          toast.error(
            "Đã quá số lần sự kiện trong 1 ngày. Không thể thêm: " + event.title
          );
          setIsAddingEvent(false);
        }
      }
    }
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    // Set the idToDelete as a string
    setShowDeleteModal(true);
    setIdToDelete(data.event.id);
  }

  function handleDelete() {
    if (idToDelete !== null) {
      setIsDeleting(true);
      // Assuming you have a storeId variable available
      const storeId = params.storeId;

      // Convert idToDelete to a string before making the DELETE request
      const eventIdToDelete = idToDelete;
      // Make a DELETE request to delete the event from the database
      axios
        .delete(`/api/${storeId}/eventcalendar`, {
          data: { eventId: eventIdToDelete, userId: userId?.id },
        })
        .then(() => {
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
          toast.success("Xóa sự kiện thành công.");
        })
        .catch((error) => {
          // Handle request error
          console.error("Error deleting event:", error);
          toast.error("Đã xảy ra lỗi khi xóa sự kiện.");
        })
        .finally(() => {
          setIsDeleting(false); // Set loading state back to false
        });
    } else {
      // Handle the case where idToDelete is null
      console.error("Invalid idToDelete:", idToDelete);
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
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }
  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
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
                left: "prev,next today",
                center: "title",
                right: "timeGridWeek,dayGridMonth,multiMonthYear",
              }}
              events={allEvents as EventSourceInput}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
              timeZone="Asia/Ho_Chi_Minh"
            />
          </div>
          <div
            id="draggable-el"
            className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50"
          >
            <h1 className="font-bold text-lg text-center">Drag Event</h1>
            {events.map((event) => (
              <div
                className={`fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white cursor-pointer ${
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
            disabled={!isAttendanceStartCalled || isCheckingAttendanceEnd}
          >
            Kết thúc
          </Button>
        </div>
      </main>
    </>
  );
}
