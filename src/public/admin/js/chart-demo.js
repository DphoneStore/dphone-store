
// Single Line Chart
var ctx3 = $("#line-chart").get(0).getContext("2d");
var myChart3 = new Chart(ctx3, {
    type: "line",
    data: {
        labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
        datasets: [{
            label: "Salse",
            fill: false,
            backgroundColor: "rgba(235, 22, 22, .7)",
            data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
        }]
    },
    options: {
        responsive: true
    }
});


// Single Bar Chart
var ctx4 = $("#bar-chart").get(0).getContext("2d");
var myChart4 = new Chart(ctx4, {
    type: "bar",
    data: {
        labels: ["Italy", "France", "Spain", "USA", "Argentina"],
        datasets: [{
            backgroundColor: [
                "rgba(235, 22, 22, .7)",
                "rgba(235, 22, 22, .6)",
                "rgba(235, 22, 22, .5)",
                "rgba(235, 22, 22, .4)",
                "rgba(235, 22, 22, .3)"
            ],
            data: [55, 49, 44, 24, 15]
        }]
    },
    options: {
        responsive: true
    }
});


// Pie Chart
var ctx5 = $("#pie-chart").get(0).getContext("2d");
var myChart5 = new Chart(ctx5, {
    type: "pie",
    data: {
        labels: ["Italy", "France", "Spain", "USA", "Argentina"],
        datasets: [{
            backgroundColor: [
                "rgba(235, 22, 22, .7)",
                "rgba(235, 22, 22, .6)",
                "rgba(235, 22, 22, .5)",
                "rgba(235, 22, 22, .4)",
                "rgba(235, 22, 22, .3)"
            ],
            data: [55, 49, 44, 24, 15]
        }]
    },
    options: {
        responsive: true
    }
});


// Doughnut Chart
var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
var myChart6 = new Chart(ctx6, {
    type: "doughnut",
    data: {
        labels: ["Italy", "France", "Spain", "USA", "Argentina"],
        datasets: [{
            backgroundColor: [
                "rgba(235, 22, 22, .7)",
                "rgba(235, 22, 22, .6)",
                "rgba(235, 22, 22, .5)",
                "rgba(235, 22, 22, .4)",
                "rgba(235, 22, 22, .3)"
            ],
            data: [55, 49, 44, 24, 15]
        }]
    },
    options: {
        responsive: true
    }
});
