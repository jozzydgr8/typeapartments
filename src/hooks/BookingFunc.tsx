import { Calendar, Modal, DatePicker, Alert } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { onSnapshot } from "firebase/firestore";
import { cartRef } from "../App";
import { bookingType } from "../Types/Types";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface BookingAppProps {
  checkIn: Dayjs | null;
  setCheckIn: (date: Dayjs | null) => void;
  checkOut: Dayjs | null;
  setCheckOut: (date: Dayjs | null) => void;
  setProceedToCheckout: (proceed: boolean) => void;
}

export function BookingApp({ checkIn, setCheckIn, checkOut, setCheckOut, setProceedToCheckout }: BookingAppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<bookingType[]>([]);
  const [alertMessage, setAlertMessage] = useState<{ type: "error" | "success"; message: string } | null>(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(cartRef, (snapshot) => {
      const data: bookingType[] = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          checkIn: dayjs(docData.checkIn, "YYYY-MM-DD"),
          checkOut: dayjs(docData.checkOut, "YYYY-MM-DD"),
        };
      });
      setBookings(data);
    });

    return () => unSubscribe();
  }, []);

  const isDateRangeBooked = (bookings: bookingType[], checkIn: Dayjs | null, checkOut: Dayjs | null): boolean => {
    if (!checkIn || !checkOut) return false;

    return bookings.some((booking) => {
      const existingCheckIn = booking.checkIn;
      const existingCheckOut = booking.checkOut;

      return (
        checkIn.isSame(existingCheckIn, "day") ||
        checkOut.isSame(existingCheckOut, "day") ||
        checkIn.isBetween(existingCheckIn, existingCheckOut, "day", "[)") ||
        checkOut.isBetween(existingCheckIn, existingCheckOut, "day", "(]") ||
        (checkIn.isBefore(existingCheckIn) && checkOut.isAfter(existingCheckOut))
      );
    });
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      setAlertMessage({ type: "error", message: "Please select both check-in and check-out dates." });
      setIsModalOpen(false);
      return;
    }

    const formattedCheckIn = checkIn.format("MMM DD, YYYY");
    const formattedCheckOut = checkOut.format("MMM DD, YYYY");

    if (isDateRangeBooked(bookings, checkIn, checkOut)) {
      setAlertMessage({
        type: "error",
        message: `Selected dates are already booked: ${formattedCheckIn} ➝ ${formattedCheckOut}`,
      });
      setIsModalOpen(false);
      return;
    }

    setAlertMessage({
      type: "success",
      message: `Booking available: ${formattedCheckIn} ➝ ${formattedCheckOut}`,
    });

    setProceedToCheckout(true); // Show the checkout button in the parent component
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="container-fluid">
        {alertMessage && (
          <Alert
            onClick={() => setIsModalOpen(true)}
            message={
              <span>
                {alertMessage.message.split("➝")[0]}
                <SwapRightOutlined style={{ margin: "0 8px", color: "#1890ff" }} />
                {alertMessage.message.split("➝")[1]}
              </span>
            }
            type={alertMessage.type}
            closable
            onClose={() => setAlertMessage(null)}
            style={{ marginBottom: "10px" }}
          />
        )}

        <Calendar onSelect={() => setIsModalOpen(true)} />

        <Modal title="Select Booking Dates" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleBooking}>
          <strong>From</strong>
          <br />
          <DatePicker value={checkIn} onChange={setCheckIn} />
          <br />
          <strong>To</strong>
          <br />
          <DatePicker value={checkOut} onChange={setCheckOut} />
        </Modal>
      </div>
    </section>
  );
}
