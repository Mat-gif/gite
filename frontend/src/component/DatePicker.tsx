import React, { useState, ChangeEvent } from 'react';

interface DatePickerProps {
    onDateChange?: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({  onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    const getToday = (): string => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mois de 01 à 12
        const day = String(today.getDate()).padStart(2, '0'); // Jour de 01 à 31
        return `${year}-${month}-${day}`;
    };

    const isMonday = (date: string): boolean => {
        const day = new Date(date).getDay();
        return day === 1;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value;
        if (newDate && !isMonday(newDate)) {
            setSelectedDate(newDate);
            if (onDateChange) {
                onDateChange(newDate);
            }
        } else {
            alert("Vous ne pouvez pas sélectionner un lundi.");
        }
    };

    return (

        <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingInputGroup">Username</label>
            <div className="input-group">
                <div className="input-group-text">Départ</div>
                <input
                    className={"form-control"}
                    type="date"
                    value={selectedDate}
                    onChange={handleChange}
                    min={getToday()} // Empêche la sélection de dates passées
                />
            </div>
        </div>
)
    ;
};

export default DatePicker;
