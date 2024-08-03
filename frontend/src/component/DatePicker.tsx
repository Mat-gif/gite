import React, { useState, ChangeEvent } from 'react';
import Swal from "sweetalert2";

interface DatePickerProps {
    onDateChange: (date: string) => void;
    label : string;
    isStart? : boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({  onDateChange,label,isStart }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    const getToday = (): string => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const isMonday = (date: string): boolean => {
        const day = new Date(date).getDay();
        return day === 1;
    };

    const isTuesday = (date: string): boolean => {
        const day = new Date(date).getDay();
        return day === 2;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value;
        if (newDate && (( isStart && !isMonday(newDate))|| (!isStart && !isTuesday(newDate)) )) {
            setSelectedDate(newDate);

            onDateChange(newDate);


        } else {
            let message = isStart ? "Vous ne pouvez pas arriver un lundi." : "Vous ne pouvez pas partir un mardi."

            Swal.fire({
                title: 'Attention !',
                text: message,
                icon: 'warning',
                confirmButtonText: 'ok'
            })

        }
    };

    return (

        <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingInputGroup">Username</label>
            <div className="input-group">
                <div className="input-group-text">{label}</div>
                <input
                    className={"form-control"}
                    type="date"
                    value={selectedDate}
                    onChange={handleChange}
                    min={getToday()}
                />
            </div>
        </div>
)
    ;
};

export default DatePicker;
