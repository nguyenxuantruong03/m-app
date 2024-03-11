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

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
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
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });

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
        console.log("addEvent function attached");
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/${params.storeId}/eventcalendar`
        );
        console.log("Data received:", response.data);
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
  const [showCheckButton, setShowCheckButton] = useState(false);

  const handleCheckButtonClick = async () => {
    if (selectedDate) {
      const today = new Date();
      const isToday =
        today.getDate() === selectedDate.getDate() &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getFullYear() === selectedDate.getFullYear();

      if (isToday) {
        try {
          const formattedDate = selectedDate.toISOString();
          const response = await axios.post(
            `/api/${params.storeId}/eventcalendar`,
            {
              title: "✅",
              start: formattedDate,
              allDay: true,
            }
          );
          // Update state with the new event from the response
          setAllEvents((prevEvents) => [...prevEvents, response.data]);
          setShowCheckButton(false);
        } catch (error) {
          // Handle request error
          console.error("Error adding event:", error);
          toast.error("Đã xảy ra lỗi khi thêm sự kiện.");
        }
      } else {
        // Show a message or handle the case where it's not today
        toast.error("Không thể điểm danh cho ngày khác!");
      }
    }
  };

  // Hàm xử lý khi ngày được chọn trên lịch
  const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
    setSelectedDate(arg.date);
    setShowCheckButton(true);
    // Hiển thị modal hoặc thực hiện hành động khác nếu cần
  };

  function addEvent(data: DropArg) {
    // Check if the event is being dropped (not clicked)
    if (data.date) {
      const event = {
        ...newEvent,
        start: data.date.toISOString(),
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

        // Make a POST request to add the event to the database
        axios
          .post(`/api/${storeId}/eventcalendar`, event)
          .then((response) => {
            // Update state with the new event from the response
            setAllEvents((prevEvents) => [...prevEvents, response.data]);
          })
          .catch((error) => {
            // Handle request error
            console.error("Error adding event:", error);
            toast.error("Đã xảy ra lỗi khi thêm sự kiện.");
          });
      }
    }
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    console.log("Event ID:", data.event.id);
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }
  

  function handleDelete() {
    if (idToDelete !== null) {
      // Assuming you have a storeId variable available
      const storeId = params.storeId;
  
      // Convert idToDelete to a string before making the DELETE request
      const eventIdToDelete = idToDelete
      console.log("Deleting Event with ID:", eventIdToDelete);
      // Make a DELETE request to delete the event from the database
      axios
        .delete(`/api/${storeId}/eventcalendar`, { data: { eventId: eventIdToDelete } })
        .then(() => {
          // Update state to remove the deleted event
          setAllEvents((prevEvents) =>
            prevEvents.filter((event) => Number(event.id) !== Number(idToDelete))
          );
          setShowDeleteModal(false);
          setIdToDelete(null);
        })
        .catch((error) => {
          // Handle request error
          console.error("Error deleting event:", error);
          toast.error("Đã xảy ra lỗi khi xóa sự kiện.");
        });
    } else {
      // Handle the case where idToDelete is null
      console.error("Invalid idToDelete:", idToDelete);
    }
  }
  
  

  function handleCloseModal() {
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
                right: "dayGrid,timeGridWeek,dayGridMonth,multiMonthYear",
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
                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
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
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {showCheckButton && (
          <div className="fixed bottom-4 right-4">
            <button
              onClick={handleCheckButtonClick}
              className="bg-violet-600 text-white px-4 py-2 rounded-md"
            >
              Điểm danh
            </button>
          </div>
        )}
      </main>
    </>
  );
}
