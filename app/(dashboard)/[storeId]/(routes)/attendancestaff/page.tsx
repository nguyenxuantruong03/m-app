"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { ShieldAlert } from "lucide-react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { format, addHours, addMinutes, addSeconds } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Button } from "@/components/ui/button";
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
        const existingEvent = allEvents.find((event) => {
          const eventDate = new Date(event.start);
          return (
            event.attendancestart === "❎" &&
            eventDate.getDate() === selectedDate.getDate() &&
            eventDate.getMonth() === selectedDate.getMonth() &&
            eventDate.getFullYear() === selectedDate.getFullYear()
          );
        });

        if (existingEvent) {
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
          console.log("Check", response.data);
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
        // First, make a GET request to check if an attendance record already exists
        await axios.get(`/api/${params.storeId}/eventcalendarend`);

        const existingEvent = allEvents.find((event) => {
          const eventDate = new Date(event.start);
          return (
            event.attendanceend === "✅" &&
            eventDate.getDate() === selectedDate.getDate() &&
            eventDate.getMonth() === selectedDate.getMonth() &&
            eventDate.getFullYear() === selectedDate.getFullYear()
          );
        });

        if (existingEvent) {
          // If attendance record already exists for the day, show a message
          toast.error("Đã kết thúc cho ngày này!");
        } else {
          // Continue with the POST request if no existing event is found
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

          const postResponse = await axios.post(
            `/api/${params.storeId}/eventcalendarend`,
            {
              attendanceend: "✅",
              title: "✅",
              start: formattedDate,
            }
          );

          // Update state with the new event from the response
          setAllEvents((prevEvents) => [...prevEvents, postResponse.data]);
          toast.success("Điểm danh thành công.");
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
      const currentTime = new Date();
      const event = {
        ...newEvent,
        start: eventDate.toISOString(),
        title: data.draggedEl.innerText,
        allDay: data.allDay,
        id: new Date().getTime(),
        currentselectedDate: currentTime,
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
            .post(`/api/${storeId}/eventcalendar`, event)
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
          toast.error("Đã quá số lần sự kiện trong 1 ngày. Không thể thêm: " + event.title);
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
          data: { eventId: eventIdToDelete },
        })
        .then(() => {
          // Update state to remove the deleted event
          setAllEvents(
            allEvents.filter((event) => String(event.id) !== String(idToDelete))
          );
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

        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setShowDeleteModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel
                    className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div
                          className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                        >
                          <ShieldAlert
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Delete Event
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this event?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <Button
                        className={`inline-flex w-full justify-center rounded-md 
                        ${
                          isDeleting
                            ? "bg-red-500 cursor-not-allowed"
                            : "bg-red-600"
                        }
                        px-3 py-2 text-sm font-semibold text-white shadow-sm 
                        ${isDeleting ? "opacity-50" : "hover:bg-red-500"}
                        sm:ml-3 sm:w-auto`}
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                      <Button
                        className={`mt-3 inline-flex w-full justify-center rounded-md 
                        ${
                          isDeleting
                            ? "bg-white cursor-not-allowed"
                            : "bg-gray-900"
                        }
                        px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 
                        ring-inset ring-gray-300 
                        ${
                          isDeleting
                            ? "opacity-50 text-black"
                            : "hover:bg-gray-800"
                        }
                        sm:mt-0 sm:w-auto`}
                        onClick={handleCloseModal}
                        disabled={isDeleting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
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
            disabled={isCheckingAttendanceEnd}
          >
            Kết thúc
          </Button>
        </div>
      </main>
    </>
  );
}