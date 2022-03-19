const url = 'https://script.google.com/macros/s/AKfycbyrmIgCfnUT4fdyIIgr0dVEQYvEfluFu38NIV7ureMS0nDr6y_v/exec'

var array = []
var displayElement = document.getElementById('display')
var comment = ''
var count = 0

let Move = setInterval(() => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const object = data
            for (var i = 0; i < object.length; i++) {
                array[i] = []
                array[i][0] = object[i].date
                array[i][1] = object[i].start
                array[i][2] = object[i].end
                array[i][3] = object[i].restaurant
            }
        })
    if (count < array.length) {
        comment = '<p>' + array[count][0] + ' ' + array[count][1] + '限から' + array[count][2] + 'まで　' + array[count][3] + '</p>'
        displayElement.insertAdjacentHTML('beforeend', comment)
        count++
    }
}, 1000)

$("#button").click(function () {
    var dateElement = document.getElementById("date")
    var startElement = document.getElementById("start")
    var endElement = document.getElementById("end")
    var restaurantElement = document.getElementById("restaurant")
    var data = {
        date: dateElement.value,
        start: startElement.value,
        end: endElement.value,
        restaurant: restaurantElement.value,
    }
    console.log(data)
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => console.log("Success:", response))
        .catch(error => console.error("Error:", error))
})
