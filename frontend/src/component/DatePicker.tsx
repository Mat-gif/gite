import { useState, ChangeEvent } from 'react';


interface DatePickerProps {
    label?: string;
    onDateChange?: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
        if (onDateChange) {
            onDateChange(newDate);
        }
    };

    return (
        <div>
            {label && <label>{label}</label>}
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleChange}
                />
        </div>
    );
};

export default DatePicker;
