export const getDateTime = (dataDate) => {
    dataDate = isNaN(parseInt(dataDate)) ? dataDate : parseInt(dataDate);
    var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    if (dataDate != null) {
        var date = new Date(dataDate);

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var year = date.getFullYear();

        var month = date.getMonth();
        month = (month < 10 ? "0" : "") + month;

        var day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return day + "-" + monthArr[Number(month)] + "-" + year + " " + hour + ":" + min;
    }
    return null;
}

export const getTime = (dataDate)=>{
    dataDate = isNaN(parseInt(dataDate)) ? dataDate : parseInt(dataDate);
    if (dataDate != null) {
        var date = new Date(dataDate);

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        
        return hour + ":" + min+":"+sec;
    }
    return null;
}

export const getJSONData=(data)=>{
    return JSON.parse(JSON.stringify(data));
}