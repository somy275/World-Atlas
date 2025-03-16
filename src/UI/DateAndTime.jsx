const DateAndTime = ({ date, setDataComing }) => {
    console.log("chAL");

    let dateInUTCPlusOne = new Date();
    dateInUTCPlusOne.setHours(dateInUTCPlusOne.getUTCHours() + date);

    // Convert the date to the local time
    let localTime = dateInUTCPlusOne.toLocaleString();
    setDataComing(true);
    return localTime;
}


export default DateAndTime